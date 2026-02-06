import { jsPDF } from "jspdf";
import { ExportPreset, ExportQuality, QUALITY_SCALES } from "@/types/exportPresets";
import {
  createExportHost,
  inlineComputedStyles,
  measureUntransformedSize,
  preflightCheck,
  resolveCSSVariables,
  prepareCloneForExport,
} from "./domSnapshot";

type ExportFormat = "png" | "pdf";

interface ExportOptions {
  root: HTMLElement;
  preset: ExportPreset;
  quality: ExportQuality;
  format: ExportFormat;
  transparentBg: boolean;
  filenameBase: string;
}

interface ExportResult {
  dimensions: string;
  scale: number;
}

// ============================================================
// 4. MANUAL CANVAS RENDERING (Bypass html-to-image issues)
// ============================================================

/**
 * Render element to canvas using native browser SVG serialization
 * This approach is more reliable than html-to-image for complex CSS
 */
async function renderToCanvas(
  element: HTMLElement,
  width: number,
  height: number,
  scale: number,
  backgroundColor: string | null
): Promise<HTMLCanvasElement> {
  // Create high-resolution canvas
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Set high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.scale(scale, scale);
  
  // Fill background
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Clone the element and prepare for serialization
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Critical: Prepare clone with fixed dimensions and no transforms
  prepareCloneForExport(clone, width, height);
  
  // Inline all computed styles from original to clone
  inlineComputedStyles(element, clone);
  
  // Resolve CSS variables
  resolveCSSVariables(clone);
  
  // Create wrapper with proper namespace
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    width: ${width}px;
    height: ${height}px;
    overflow: visible;
    position: relative;
  `;
  wrapper.appendChild(clone);
  
  // Temporarily add to DOM to compute final styles
  const exportHost = createExportHost(width, height);
  exportHost.appendChild(wrapper);
  document.body.appendChild(exportHost);
  
  // Wait for styles to be applied
  await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  
  // Serialize to SVG foreignObject
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute('xmlns', svgNS);
  
  const foreignObject = document.createElementNS(svgNS, 'foreignObject');
  foreignObject.setAttribute('width', '100%');
  foreignObject.setAttribute('height', '100%');
  foreignObject.setAttribute('x', '0');
  foreignObject.setAttribute('y', '0');
  
  // Clone again with all inlined styles for the SVG
  const svgClone = wrapper.cloneNode(true) as HTMLElement;
  svgClone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  foreignObject.appendChild(svgClone);
  svg.appendChild(foreignObject);
  
  // Cleanup temporary DOM element
  exportHost.remove();
  
  // Serialize SVG to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  
  // Create data URL
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);
  
  // Load SVG as image and draw to canvas
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(svgUrl);
      resolve(canvas);
    };
    
    img.onerror = (e) => {
      URL.revokeObjectURL(svgUrl);
      reject(new Error('Failed to render SVG to canvas'));
    };
    
    img.src = svgUrl;
  });
}

// ============================================================
// 5. FALLBACK: Use html-to-image with enhanced options
// ============================================================

async function renderWithHtmlToImage(
  element: HTMLElement,
  width: number,
  height: number,
  scale: number,
  backgroundColor: string | null
): Promise<HTMLCanvasElement> {
  // Dynamic import to avoid bundling issues
  const { toCanvas } = await import('html-to-image');
  
  // Create a clean clone with all styles inlined
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Critical: Prepare clone with fixed dimensions and no transforms
  prepareCloneForExport(clone, width, height);
  
  // Inline all styles
  inlineComputedStyles(element, clone);
  resolveCSSVariables(clone);
  
  // Create export host
  const host = createExportHost(width, height);
  host.appendChild(clone);
  document.body.appendChild(host);
  
  try {
    await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
    
    const canvas = await toCanvas(clone, {
      pixelRatio: scale,
      backgroundColor: backgroundColor ?? undefined,
      cacheBust: true,
      includeQueryParams: true,
      skipAutoScale: true,
      skipFonts: true,
      fetchRequestInit: {
        mode: 'cors',
        cache: 'force-cache',
      },
      filter: (node: Node) => {
        if (!(node instanceof HTMLElement)) return true;
        return node.getAttribute("data-export-hide") !== "true";
      },
    });
    
    return canvas;
  } finally {
    host.remove();
  }
}

// ============================================================
// 6. MAIN CAPTURE FUNCTION
// ============================================================

function getCanvasNode(root: HTMLElement): HTMLElement {
  const node = root.querySelector('.infographic-canvas') as HTMLElement | null;
  return node ?? root;
}

/**
 * Temporarily neutralize transforms on ancestor elements to get accurate measurements.
 * Returns a cleanup function to restore the original transforms.
 */
function neutralizeAncestorTransforms(element: HTMLElement): () => void {
  const originalTransforms: { el: HTMLElement; transform: string }[] = [];
  
  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    const currentTransform = parent.style.transform;
    if (currentTransform) {
      originalTransforms.push({ el: parent, transform: currentTransform });
      parent.style.transform = 'none';
    }
    
    // Also check computed style for transforms set via classes
    const computedTransform = getComputedStyle(parent).transform;
    if (computedTransform && computedTransform !== 'none' && !currentTransform) {
      originalTransforms.push({ el: parent, transform: '' });
      parent.style.transform = 'none';
    }
    
    parent = parent.parentElement;
  }
  
  return () => {
    originalTransforms.forEach(({ el, transform }) => {
      el.style.transform = transform;
    });
  };
}

function getComputedBackground(el: HTMLElement, transparentBg: boolean): string | null {
  if (transparentBg) return null;
  const bg = getComputedStyle(el).backgroundColor;
  if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return '#ffffff';
  return bg;
}

async function captureToCanvas(options: {
  root: HTMLElement;
  scale: number;
  transparentBg: boolean;
}): Promise<{ canvas: HTMLCanvasElement; width: number; height: number; backgroundColor: string | null }> {
  const target = getCanvasNode(options.root);
  
  // CRITICAL: Temporarily remove parent transforms (e.g., zoom) to get accurate dimensions
  const restoreTransforms = neutralizeAncestorTransforms(target);
  
  // Wait for layout to settle after transform change
  await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  
  // IMPORTANT: boundingClientRect includes transforms (e.g. editor zoom).
  // Use transform-independent layout metrics to prevent drift.
  const { width, height } = measureUntransformedSize(target);
  const backgroundColor = getComputedBackground(target, options.transparentBg);

  // Step 1: Pre-flight check
  await preflightCheck(target);

  // Step 2: Try native rendering first, fall back to html-to-image
  let canvas: HTMLCanvasElement;
  
  try {
    // html-to-image is more reliable for complex CSS, use it as primary
    canvas = await renderWithHtmlToImage(target, width, height, options.scale, backgroundColor);
  } catch (nativeError) {
    console.warn('html-to-image failed, falling back to native SVG rendering:', nativeError);
    canvas = await renderToCanvas(target, width, height, options.scale, backgroundColor);
  }
  
  // Restore original transforms
  restoreTransforms();

  return { canvas, width, height, backgroundColor };
}

// ============================================================
// 7. PRESET FITTING & OUTPUT
// ============================================================

function fitCanvasToPreset(
  sourceCanvas: HTMLCanvasElement,
  preset: ExportPreset,
  backgroundColor: string | null
): { canvas: HTMLCanvasElement; dimensions: string } {
  // If no preset or original size, return as-is
  if (!preset || preset.width <= 0 || preset.height <= 0) {
    return { 
      canvas: sourceCanvas, 
      dimensions: `${sourceCanvas.width}x${sourceCanvas.height}` 
    };
  }

  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = preset.width;
  finalCanvas.height = preset.height;

  const ctx = finalCanvas.getContext('2d');
  if (!ctx) {
    return { canvas: sourceCanvas, dimensions: `${sourceCanvas.width}x${sourceCanvas.height}` };
  }

  // High-quality scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Fill background
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, preset.width, preset.height);
  }

  // Calculate fit dimensions - CONTAIN mode
  const sourceRatio = sourceCanvas.width / sourceCanvas.height;
  const targetRatio = preset.width / preset.height;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (sourceRatio > targetRatio) {
    drawWidth = preset.width;
    drawHeight = preset.width / sourceRatio;
    offsetX = 0;
    offsetY = Math.round((preset.height - drawHeight) / 2);
  } else {
    drawHeight = preset.height;
    drawWidth = preset.height * sourceRatio;
    offsetX = Math.round((preset.width - drawWidth) / 2);
    offsetY = 0;
  }

  drawWidth = Math.round(drawWidth);
  drawHeight = Math.round(drawHeight);

  ctx.drawImage(sourceCanvas, offsetX, offsetY, drawWidth, drawHeight);

  return { 
    canvas: finalCanvas, 
    dimensions: `${preset.width}x${preset.height}` 
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string = 'image/png'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error('Failed to create image blob'));
        else resolve(blob);
      },
      mimeType,
      1.0
    );
  });
}

async function downloadBlob(blob: Blob, filename: string): Promise<void> {
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
}

// ============================================================
// MAIN EXPORT FUNCTION
// ============================================================

export async function exportInfographic(options: ExportOptions): Promise<ExportResult> {
  const scale = QUALITY_SCALES[options.quality];

  // Capture the infographic to a high-resolution canvas
  const { canvas: sourceCanvas, backgroundColor } = await captureToCanvas({
    root: options.root,
    scale,
    transparentBg: options.transparentBg,
  });

  // Fit to preset dimensions if needed
  const { canvas: finalCanvas, dimensions } = fitCanvasToPreset(
    sourceCanvas,
    options.preset,
    backgroundColor
  );

  const filename = `${options.filenameBase}_${dimensions}_${scale}x`;

  if (options.format === 'png') {
    const blob = await canvasToBlob(finalCanvas, 'image/png');
    await downloadBlob(blob, `${filename}.png`);
    return { dimensions, scale };
  }

  // PDF export
  const imgData = finalCanvas.toDataURL('image/png', 1.0);
  const imgWidth = finalCanvas.width;
  const imgHeight = finalCanvas.height;
  const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';

  const pdf = new jsPDF({
    orientation,
    unit: 'px',
    format: [imgWidth, imgHeight],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(`${filename}.pdf`);

  return { dimensions, scale };
}
