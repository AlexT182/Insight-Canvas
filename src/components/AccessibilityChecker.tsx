import { useState, useEffect } from "react";
import { 
  runAccessibilityChecks, 
  getAccessibilityScore,
  type AccessibilityCheck 
} from "@/lib/accessibility";
import { ACCENT_COLORS } from "@/types/infographic";
import { useTheme } from "@/hooks/useTheme";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Eye,
  ChevronDown,
  Info
} from "lucide-react";
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

interface AccessibilityCheckerProps {
  accentColor: string;
}

export function AccessibilityChecker({ accentColor }: AccessibilityCheckerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [checks, setChecks] = useState<AccessibilityCheck[]>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === accentColor)?.hsl || ACCENT_COLORS[0].hsl;

  useEffect(() => {
    const results = runAccessibilityChecks(accentColorHsl, isDarkMode);
    setChecks(results);
  }, [accentColorHsl, isDarkMode]);

  const score = getAccessibilityScore(checks);
  const hasIssues = checks.some(c => c.status === "fail" || c.status === "warning");

  const getStatusIcon = (status: AccessibilityCheck["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case "fail":
        return <XCircle className="w-3.5 h-3.5 text-red-500" />;
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

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium hover:text-primary transition-colors group">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5" />
          <span>Accessibility</span>
          {/* Status indicator */}
          {hasIssues ? (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <AlertTriangle className="w-3 h-3" />
              {checks.filter(c => c.status !== "pass").length}
            </span>
          ) : (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              OK
            </span>
          )}
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-2 space-y-3">
        {/* Overall Score */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: score.color === "success" 
                  ? "linear-gradient(135deg, #10b981, #059669)" 
                  : score.color === "warning"
                  ? "linear-gradient(135deg, #f59e0b, #d97706)"
                  : "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "white"
              }}
            >
              {score.score}%
            </div>
            <div>
              <p className="text-xs font-medium">{score.label}</p>
              <p className="text-[10px] text-muted-foreground">
                {checks.filter(c => c.status === "pass").length}/{checks.length} checks passed
              </p>
            </div>
          </div>
        </div>

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
                          <Info className="w-3 h-3" />
                          {check.recommendation}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[200px]">
                        <p className="text-xs">
                          WCAG 2.1 recommends a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>

        {/* Color Preview */}
        <div className="p-3 rounded-lg border border-border bg-muted/30">
          <p className="text-[10px] font-medium mb-2 text-muted-foreground uppercase tracking-wider">
            Color Preview
          </p>
          <div className="flex gap-2">
            <div 
              className="flex-1 h-8 rounded flex items-center justify-center text-[10px] font-medium"
              style={{ 
                backgroundColor: `hsl(${accentColorHsl})`,
                color: "white"
              }}
            >
              White on Accent
            </div>
            <div 
              className="flex-1 h-8 rounded flex items-center justify-center text-[10px] font-medium border border-border"
              style={{ 
                backgroundColor: isDarkMode ? "hsl(220 25% 10%)" : "white",
                color: `hsl(${accentColorHsl})`
              }}
            >
              Accent on Canvas
            </div>
          </div>
        </div>

        {/* WCAG Info */}
        <p className="text-[10px] text-muted-foreground text-center">
          Based on WCAG 2.1 contrast guidelines
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
