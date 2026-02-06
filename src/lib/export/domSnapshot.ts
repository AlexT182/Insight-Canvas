/**
 * DOM snapshot utilities for high-fidelity export.
 *
 * Key idea: measure sizes using layout metrics that are NOT affected by CSS transforms
 * (e.g. offsetWidth/offsetHeight), and inline computed styles onto a clone.
 */

export async function preflightCheck(element: HTMLElement): Promise<void> {
  // Wait for all fonts to be ready
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  // Force load any custom fonts used in the element
  const computedFont = getComputedStyle(element).fontFamily;
  const fontFamilies = computedFont
    .split(",")
    .map((f) => f.trim().replace(/['"]/g, ""));

  for (const font of fontFamilies) {
    try {
      await document.fonts.load(`400 16px ${font}`);
      await document.fonts.load(`700 16px ${font}`);
    } catch {
      // Font may already be loaded or unavailable
    }
  }

  // Wait for all images to load
  const images = element.querySelectorAll("img");
  const imagePromises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Don't fail on broken images
    });
  });

  await Promise.all(imagePromises);

  // Allow layout to fully settle (3 animation frames for safety)
  await new Promise<void>((r) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => requestAnimationFrame(() => r()))
    )
  );
}

/**
 * Measure element size in a way that is NOT affected by CSS transforms.
 * getBoundingClientRect() includes transforms (e.g., zoom scale), which is a
 * primary cause of WYSINWYG drift.
 */
export function measureUntransformedSize(el: HTMLElement): { width: number; height: number } {
  // offsetWidth/Height ignore transforms; they reflect layout size.
  const ow = el.offsetWidth;
  const oh = el.offsetHeight;
  if (ow > 0 && oh > 0) return { width: ow, height: oh };

  // Fallback for SVG/edge cases
  const rect = el.getBoundingClientRect();
  return { width: Math.round(rect.width), height: Math.round(rect.height) };
}

function normalizeClipPath(value: string): string {
  if (!value || value === "none") return value;

  // Already an SVG path reference or polygon - keep as is
  if (value.includes("url(") || value.includes("polygon(")) {
    return value;
  }

  // inset() is widely supported
  const insetMatch = value.match(/inset\(([^)]+)\)/);
  if (insetMatch) return value;

  return value;
}

function normalizeTransform(element: HTMLElement, value: string): string {
  if (!value || value === "none") return "none";

  const style = getComputedStyle(element);
  const matrix = style.transform;

  // If it's already a matrix, use it directly
  if (matrix && matrix !== "none" && matrix.startsWith("matrix")) {
    return matrix;
  }

  return value;
}

export function inlineComputedStyles(
  source: HTMLElement,
  target: HTMLElement,
  options?: {
    /**
     * WARNING: copying absolute positions via getBoundingClientRect() is brittle
     * across different render hosts. Default false.
     */
    copyAbsolutePositions?: boolean;
  },
): void {
  const sourceStyle = getComputedStyle(source);
  const copyAbsolutePositions = options?.copyAbsolutePositions ?? false;

  const criticalProperties = [
    // Layout & Box Model
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "boxSizing",
    "overflow",
    "overflowX",
    "overflowY",

    // Flexbox & Grid
    "flexDirection",
    "flexWrap",
    "justifyContent",
    "alignItems",
    "alignContent",
    "flex",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "order",
    "gap",
    "gridTemplateColumns",
    "gridTemplateRows",
    "gridColumn",
    "gridRow",

    // Typography
    "fontFamily",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "lineHeight",
    "textAlign",
    "textTransform",
    "letterSpacing",
    "wordSpacing",
    "whiteSpace",
    "wordBreak",
    "overflowWrap",
    "textDecoration",

    // Colors & Backgrounds
    "color",
    "backgroundColor",
    "backgroundImage",
    "backgroundPosition",
    "backgroundSize",
    "backgroundRepeat",
    "backgroundClip",
    "backgroundOrigin",

    // Borders & Shadows
    "border",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "boxShadow",
    "outline",

    // Transforms & Effects
    "transform",
    "transformOrigin",
    "transformStyle",
    "opacity",
    "visibility",
    "zIndex",

    // Clipping
    "clipPath",
    "clip",

    // SVG & Filters
    "fill",
    "stroke",
    "filter",
  ] as const;

  criticalProperties.forEach((prop) => {
    const cssProperty = prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    let value = sourceStyle.getPropertyValue(cssProperty);

    if (value && value !== "none" && value !== "auto" && value !== "normal") {
      if (prop === "transform") {
        value = normalizeTransform(source, value);
      }

      if (prop === "clipPath") {
        value = normalizeClipPath(value);
      }

      target.style.setProperty(cssProperty, value, "important");
    }
  });

  // Optional: copy absolute positions based on live DOM geometry.
  // This is intentionally OFF by default because it can introduce drift.
  if (copyAbsolutePositions && (sourceStyle.position === "absolute" || sourceStyle.position === "fixed")) {
    const rect = source.getBoundingClientRect();
    const parentRect = source.parentElement?.getBoundingClientRect();

    if (parentRect) {
      target.style.setProperty("left", `${rect.left - parentRect.left}px`, "important");
      target.style.setProperty("top", `${rect.top - parentRect.top}px`, "important");
      target.style.setProperty("width", `${rect.width}px`, "important");
      target.style.setProperty("height", `${rect.height}px`, "important");
    }
  }

  const sourceChildren = source.children;
  const targetChildren = target.children;

  for (let i = 0; i < sourceChildren.length && i < targetChildren.length; i++) {
    const sourceChild = sourceChildren[i];
    const targetChild = targetChildren[i];
    if (sourceChild instanceof HTMLElement && targetChild instanceof HTMLElement) {
      inlineComputedStyles(sourceChild, targetChild, options);
    }
  }
}

export function resolveCSSVariables(element: HTMLElement): void {
  const style = getComputedStyle(element);

  // Comprehensive list of color/gradient properties that may use CSS vars
  const colorProps = [
    "backgroundColor",
    "color",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "outlineColor",
    "textDecorationColor",
    "fill",
    "stroke",
    "caretColor",
    "columnRuleColor",
  ];

  colorProps.forEach((prop) => {
    const cssProperty = prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    const value = style.getPropertyValue(cssProperty);
    if (value && value !== "transparent" && value !== "rgba(0, 0, 0, 0)" && value !== "none") {
      element.style.setProperty(cssProperty, value, "important");
    }
  });

  // Resolve background-image (gradients often use CSS vars)
  const bgImage = style.backgroundImage;
  if (bgImage && bgImage !== "none") {
    element.style.setProperty("background-image", bgImage, "important");
  }

  // Resolve box-shadow
  const boxShadow = style.boxShadow;
  if (boxShadow && boxShadow !== "none") {
    element.style.setProperty("box-shadow", boxShadow, "important");
  }

  // Resolve text-shadow
  const textShadow = style.textShadow;
  if (textShadow && textShadow !== "none") {
    element.style.setProperty("text-shadow", textShadow, "important");
  }

  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child instanceof HTMLElement) {
      resolveCSSVariables(child);
    }
  }
}

/**
 * Prepare element for export by:
 * 1. Removing transforms (critical for fidelity)
 * 2. Forcing explicit dimensions
 * 3. Ensuring overflow is visible
 */
export function prepareCloneForExport(
  clone: HTMLElement,
  width: number,
  height: number
): void {
  // Force exact dimensions - do NOT use aspect-ratio as it can cause drift
  clone.style.setProperty("width", `${width}px`, "important");
  clone.style.setProperty("height", `${height}px`, "important");
  clone.style.setProperty("max-width", `${width}px`, "important");
  clone.style.setProperty("max-height", `${height}px`, "important");
  clone.style.setProperty("min-width", `${width}px`, "important");
  clone.style.setProperty("min-height", `${height}px`, "important");

  // Reset any transforms that could cause diagonal rendering
  clone.style.setProperty("transform", "none", "important");
  clone.style.setProperty("transform-origin", "0 0", "important");

  // Ensure proper positioning
  clone.style.setProperty("position", "relative", "important");
  clone.style.setProperty("margin", "0", "important");
  clone.style.setProperty("padding", "0", "important");

  // Prevent overflow clipping issues
  clone.style.setProperty("overflow", "visible", "important");
  clone.style.setProperty("box-sizing", "border-box", "important");

  // Remove aspect-ratio which can cause dimension drift
  clone.style.setProperty("aspect-ratio", "unset", "important");
}

export function createExportHost(width: number, height: number): HTMLDivElement {
  const host = document.createElement("div");
  host.id = "export-host";
  host.style.cssText = `
    position: fixed !important;
    left: -99999px !important;
    top: 0 !important;
    width: ${width}px !important;
    height: ${height}px !important;
    pointer-events: none !important;
    z-index: -9999 !important;
    overflow: visible !important;
    transform: none !important;
    background: transparent !important;
  `;
  return host;
}
