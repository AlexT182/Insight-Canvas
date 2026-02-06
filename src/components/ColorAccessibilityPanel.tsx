import { useState, useMemo } from "react";
import { 
  runAccessibilityChecks, 
  getAccessibilityScore,
  getHSLContrastRatio,
  parseHSL,
  type AccessibilityCheck 
} from "@/lib/accessibility";
import { ACCENT_COLORS } from "@/types/infographic";
import { useTheme } from "@/hooks/useTheme";
import { 
  CheckCircle,
  Warning,
  XCircle,
  Eye,
  CaretDown,
  Info,
  Sparkle,
  Check
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorAccessibilityPanelProps {
  accentColor: string;
  onAccentColorChange: (color: string) => void;
}

// Light/dark canvas backgrounds
const LIGHT_CANVAS_BG = "0 0% 100%";
const DARK_CANVAS_BG = "220 25% 10%";

/**
 * Calculate luminance-adjusted color suggestion for better contrast
 */
function suggestAccessibleColor(hsl: string, targetRatio: number, isLight: boolean): string | null {
  const parsed = parseHSL(hsl);
  if (!parsed) return null;
  
  const bgHsl = isLight ? LIGHT_CANVAS_BG : DARK_CANVAS_BG;
  let { h, s, l } = parsed;
  
  // Adjust lightness to meet target contrast
  if (isLight) {
    // For light backgrounds, darken the color
    while (l > 10 && getHSLContrastRatio(`${h} ${s}% ${l}%`, bgHsl) < targetRatio) {
      l -= 5;
    }
  } else {
    // For dark backgrounds, lighten the color
    while (l < 90 && getHSLContrastRatio(`${h} ${s}% ${l}%`, bgHsl) < targetRatio) {
      l += 5;
    }
  }
  
  return `${h} ${s}% ${l}%`;
}

export function ColorAccessibilityPanel({ 
  accentColor, 
  onAccentColorChange 
}: ColorAccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  const selectedColorData = ACCENT_COLORS.find(c => c.name === accentColor) || ACCENT_COLORS[0];
  const accentColorHsl = selectedColorData.hsl;

  const checks = useMemo(() => 
    runAccessibilityChecks(accentColorHsl, isDarkMode), 
    [accentColorHsl, isDarkMode]
  );
  
  const score = useMemo(() => 
    getAccessibilityScore(checks), 
    [checks]
  );

  const hasIssues = checks.some(c => c.status === "fail" || c.status === "warning");

  // Calculate auto-fix suggestion
  const suggestedFix = useMemo(() => {
    if (!hasIssues) return null;
    const suggestion = suggestAccessibleColor(accentColorHsl, 4.5, !isDarkMode);
    if (!suggestion) return null;
    
    // Find a color in the palette that matches or is closest
    const matchingColor = ACCENT_COLORS.find(c => {
      const ratio = getHSLContrastRatio(c.hsl, isDarkMode ? DARK_CANVAS_BG : LIGHT_CANVAS_BG);
      return ratio >= 4.5;
    });
    
    return matchingColor || null;
  }, [accentColorHsl, hasIssues, isDarkMode]);

  const getStatusIcon = (status: AccessibilityCheck["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle weight="fill" className="w-4 h-4 text-emerald-500" />;
      case "warning":
        return <Warning weight="fill" className="w-4 h-4 text-amber-500" />;
      case "fail":
        return <XCircle weight="fill" className="w-4 h-4 text-red-500" />;
    }
  };

  const getWCAGBadgeColor = (level: string | undefined) => {
    switch (level) {
      case "AAA":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "AA":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "AA-Large":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  // Calculate contrast ratio for live preview
  const contrastOnCanvas = getHSLContrastRatio(accentColorHsl, isDarkMode ? DARK_CANVAS_BG : LIGHT_CANVAS_BG);
  const contrastWhiteOnAccent = getHSLContrastRatio("0 0% 100%", accentColorHsl);

  return (
    <div className="space-y-4">
      {/* Accent Color Grid */}
      <div className="space-y-2">
        <Label className="text-xs font-medium">Accent Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {ACCENT_COLORS.map((color) => {
            const colorRatio = getHSLContrastRatio(color.hsl, isDarkMode ? DARK_CANVAS_BG : LIGHT_CANVAS_BG);
            const meetsAA = colorRatio >= 4.5;
            
            return (
              <TooltipProvider key={color.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onAccentColorChange(color.name)}
                      className={cn(
                        "relative w-full aspect-square rounded-lg transition-all",
                        accentColor === color.name
                          ? "ring-2 ring-offset-2 ring-foreground scale-105"
                          : "hover:scale-105"
                      )}
                      style={{ backgroundColor: `hsl(${color.hsl})` }}
                    >
                      {/* Accessibility indicator */}
                      <span className={cn(
                        "absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center",
                        meetsAA 
                          ? "bg-emerald-500" 
                          : "bg-amber-500"
                      )}>
                        {meetsAA ? (
                          <Check weight="bold" className="w-2 h-2 text-white" />
                        ) : (
                          <Warning weight="bold" className="w-2 h-2 text-white" />
                        )}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    <p className="font-medium">{color.name}</p>
                    <p className="text-muted-foreground">
                      Contrast: {colorRatio.toFixed(1)}:1 
                      {meetsAA ? " ✓ AA" : " ⚠ Low"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      {/* Live Contrast Preview */}
      <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Live Preview
          </span>
          <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold",
            contrastOnCanvas >= 4.5 
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
              : contrastOnCanvas >= 3
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}>
            {contrastOnCanvas >= 4.5 ? "PASS" : contrastOnCanvas >= 3 ? "LARGE TEXT ONLY" : "FAIL"}
          </span>
        </div>
        
        {/* Large Contrast Ratio Display */}
        <div className="text-center py-2">
          <div 
            className="text-4xl font-bold tabular-nums"
            style={{ color: `hsl(${accentColorHsl})` }}
          >
            {contrastOnCanvas.toFixed(2)}:1
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Accent on {isDarkMode ? "dark" : "light"} canvas
          </p>
        </div>

        {/* Color Combination Previews */}
        <div className="grid grid-cols-2 gap-2">
          <div 
            className="h-10 rounded flex items-center justify-center text-[11px] font-medium"
            style={{ 
              backgroundColor: `hsl(${accentColorHsl})`,
              color: "white"
            }}
          >
            White on Accent
          </div>
          <div 
            className="h-10 rounded flex items-center justify-center text-[11px] font-medium border border-border"
            style={{ 
              backgroundColor: isDarkMode ? "hsl(220 25% 10%)" : "white",
              color: `hsl(${accentColorHsl})`
            }}
          >
            Accent on Canvas
          </div>
        </div>
        
        {/* Second ratio for white on accent */}
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">White on accent:</span>
          <span className={cn(
            "font-mono font-medium",
            contrastWhiteOnAccent >= 4.5 ? "text-emerald-600" : 
            contrastWhiteOnAccent >= 3 ? "text-amber-600" : "text-red-600"
          )}>
            {contrastWhiteOnAccent.toFixed(2)}:1
          </span>
        </div>
      </div>

      {/* Accessibility Checks */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium hover:text-primary transition-colors group">
          <div className="flex items-center gap-2">
            <Eye weight="duotone" className="w-4 h-4" />
            <span>WCAG 2.2 Compliance</span>
            {/* Status indicator */}
            {hasIssues ? (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <Warning weight="fill" className="w-3 h-3" />
                {checks.filter(c => c.status !== "pass").length}
              </span>
            ) : (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <CheckCircle weight="fill" className="w-3 h-3" />
                OK
              </span>
            )}
          </div>
          <CaretDown weight="bold" className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-2 space-y-3">
          {/* Auto-fix suggestion */}
          {hasIssues && suggestedFix && (
            <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-900/10">
              <div className="flex items-start gap-2">
                <Sparkle weight="fill" className="w-4 h-4 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
                    Auto-fix Available
                  </p>
                  <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-0.5">
                    Switch to "{suggestedFix.name}" for better contrast
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAccentColorChange(suggestedFix.name)}
                    className="mt-2 h-7 text-[10px] border-amber-300 hover:bg-amber-100 dark:border-amber-700"
                  >
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Individual Checks */}
          <div className="space-y-2">
            <TooltipProvider>
              {checks.map((check) => (
                <div 
                  key={check.id}
                  className={cn(
                    "flex items-start gap-2 p-2.5 rounded-lg border transition-colors",
                    check.status === "pass" && "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/50 dark:bg-emerald-900/10",
                    check.status === "warning" && "border-amber-200 bg-amber-50/50 dark:border-amber-800/50 dark:bg-amber-900/10",
                    check.status === "fail" && "border-red-200 bg-red-50/50 dark:border-red-800/50 dark:bg-red-900/10",
                  )}
                >
                  <div className="mt-0.5">
                    {getStatusIcon(check.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{check.label}</span>
                      {check.wcagLevel && (
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold",
                          getWCAGBadgeColor(check.wcagLevel)
                        )}>
                          {check.wcagLevel}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {check.description}
                    </p>
                    {check.contrastRatio && (
                      <p className="text-[10px] text-muted-foreground">
                        Contrast: <span className="font-mono font-medium">{check.contrastRatio.toFixed(2)}:1</span>
                      </p>
                    )}
                    {check.recommendation && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1 cursor-help">
                            <Info weight="fill" className="w-3 h-3" />
                            {check.recommendation}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-[200px]">
                          <p className="text-xs">
                            WCAG 2.2 recommends a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
              ))}
            </TooltipProvider>
          </div>

          {/* WCAG Info */}
          <p className="text-[10px] text-muted-foreground text-center">
            Based on WCAG 2.2 contrast guidelines
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
