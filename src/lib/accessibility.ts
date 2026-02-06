/**
 * Color Contrast and Accessibility Utilities
 * Based on WCAG 2.1 guidelines
 */

/**
 * Parse HSL string to values
 * Accepts formats: "174 62% 47%" or "174, 62%, 47%"
 */
export function parseHSL(hsl: string): { h: number; s: number; l: number } | null {
  const match = hsl.match(/(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)%?\s*,?\s*(\d+(?:\.\d+)?)%?/);
  if (!match) return null;
  
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Calculate relative luminance per WCAG 2.1
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLin = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLin = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLin = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(luminance1: number, luminance2: number): number {
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get contrast ratio between two HSL colors
 */
export function getHSLContrastRatio(hsl1: string, hsl2: string): number {
  const color1 = parseHSL(hsl1);
  const color2 = parseHSL(hsl2);
  
  if (!color1 || !color2) return 1;
  
  const rgb1 = hslToRgb(color1.h, color1.s, color1.l);
  const rgb2 = hslToRgb(color2.h, color2.s, color2.l);
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  return getContrastRatio(lum1, lum2);
}

/**
 * WCAG conformance levels
 */
export type WCAGLevel = "AAA" | "AA" | "AA-Large" | "Fail";

/**
 * Check WCAG conformance level based on contrast ratio
 * AAA: 7:1 for normal text, 4.5:1 for large text
 * AA: 4.5:1 for normal text, 3:1 for large text
 */
export function getWCAGLevel(contrastRatio: number, isLargeText: boolean = false): WCAGLevel {
  if (isLargeText) {
    if (contrastRatio >= 4.5) return "AAA";
    if (contrastRatio >= 3) return "AA";
    return "Fail";
  } else {
    if (contrastRatio >= 7) return "AAA";
    if (contrastRatio >= 4.5) return "AA";
    if (contrastRatio >= 3) return "AA-Large";
    return "Fail";
  }
}

/**
 * Accessibility check result
 */
export interface AccessibilityCheck {
  id: string;
  label: string;
  description: string;
  status: "pass" | "warning" | "fail";
  contrastRatio?: number;
  wcagLevel?: WCAGLevel;
  recommendation?: string;
}

/**
 * Light mode canvas background (from index.css)
 */
const LIGHT_CANVAS_BG = "0 0% 100%"; // white
const LIGHT_CANVAS_TEXT = "220 30% 8%"; // near-black
const DARK_CANVAS_BG = "220 25% 10%"; // dark blue-gray
const DARK_CANVAS_TEXT = "210 25% 95%"; // near-white

/**
 * Run accessibility checks for an infographic
 */
export function runAccessibilityChecks(
  accentColorHsl: string,
  isDarkMode: boolean = false
): AccessibilityCheck[] {
  const checks: AccessibilityCheck[] = [];
  
  const canvasBg = isDarkMode ? DARK_CANVAS_BG : LIGHT_CANVAS_BG;
  const canvasText = isDarkMode ? DARK_CANVAS_TEXT : LIGHT_CANVAS_TEXT;
  
  // Check 1: Accent color on canvas background (highlighted text)
  const accentOnBgRatio = getHSLContrastRatio(accentColorHsl, canvasBg);
  const accentOnBgLevel = getWCAGLevel(accentOnBgRatio, false);
  checks.push({
    id: "accent-on-bg",
    label: "Highlighted Text",
    description: "Accent color on canvas background",
    status: accentOnBgLevel === "Fail" ? "fail" : accentOnBgLevel === "AA-Large" ? "warning" : "pass",
    contrastRatio: accentOnBgRatio,
    wcagLevel: accentOnBgLevel,
    recommendation: accentOnBgLevel === "Fail" 
      ? "Choose a darker accent color for better readability" 
      : undefined,
  });
  
  // Check 2: Body text on canvas background
  const textOnBgRatio = getHSLContrastRatio(canvasText, canvasBg);
  const textOnBgLevel = getWCAGLevel(textOnBgRatio, false);
  checks.push({
    id: "text-on-bg",
    label: "Body Text",
    description: "Regular text on canvas background",
    status: textOnBgLevel === "Fail" ? "fail" : textOnBgLevel === "AA-Large" ? "warning" : "pass",
    contrastRatio: textOnBgRatio,
    wcagLevel: textOnBgLevel,
  });
  
  // Check 3: White text on accent color (for highlighted items like badges)
  const whiteOnAccentRatio = getHSLContrastRatio("0 0% 100%", accentColorHsl);
  const whiteOnAccentLevel = getWCAGLevel(whiteOnAccentRatio, true); // Large text for badges
  checks.push({
    id: "white-on-accent",
    label: "Badge Text",
    description: "White text on accent-colored badges",
    status: whiteOnAccentLevel === "Fail" ? "fail" : whiteOnAccentLevel === "AA" ? "pass" : "warning",
    contrastRatio: whiteOnAccentRatio,
    wcagLevel: whiteOnAccentLevel,
    recommendation: whiteOnAccentLevel === "Fail"
      ? "Choose a darker accent color for readable badge text"
      : undefined,
  });
  
  return checks;
}

/**
 * Get overall accessibility score
 */
export function getAccessibilityScore(checks: AccessibilityCheck[]): {
  score: number;
  label: string;
  color: string;
} {
  const passed = checks.filter(c => c.status === "pass").length;
  const warnings = checks.filter(c => c.status === "warning").length;
  const failed = checks.filter(c => c.status === "fail").length;
  
  const score = Math.round((passed / checks.length) * 100);
  
  if (failed > 0) {
    return { score, label: "Needs Improvement", color: "destructive" };
  }
  if (warnings > 0) {
    return { score, label: "Good", color: "warning" };
  }
  return { score, label: "Excellent", color: "success" };
}
