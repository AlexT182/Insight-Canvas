import * as React from "react";
import { TEMPLATES, TemplateType } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";

interface BaseTemplateProps {
  templateId: TemplateType;
  fontFamily: string;
  accentColorHsl: string;
  brandName: string;
  brandLogo: string | null;
  brandSignatureType: "text" | "logo";
  brandSignatureStyle: "minimal" | "accent" | "boxed" | "underlined";
  brandSignatureSize: number;
  children: React.ReactNode;
  brandAlign?: "left" | "center" | "right";
  showBrand?: boolean;
  className?: string;
}

/**
 * Base template wrapper that ensures consistent:
 * - Aspect ratio and max-width
 * - Font family application
 * - Canvas background and shadow
 * - Brand signature placement
 * - Overflow prevention
 */
export function BaseTemplate({
  templateId,
  fontFamily,
  accentColorHsl,
  brandName,
  brandLogo,
  brandSignatureType,
  brandSignatureStyle,
  brandSignatureSize,
  children,
  brandAlign = "right",
  showBrand = true,
  className = "",
}: BaseTemplateProps) {
  const templateConfig = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];

  return (
    <div 
      className={`infographic-canvas w-full rounded-lg overflow-hidden relative flex flex-col ${className}`}
      style={{ 
        maxWidth: templateConfig.maxWidth, 
        aspectRatio: templateConfig.aspectRatio, 
        fontFamily 
      }}
    >
      {children}
      
      {showBrand && (
        <div className="relative px-6 py-4 flex-shrink-0 mt-auto">
          <BrandSignature 
            name={brandName}
            logo={brandLogo}
            type={brandSignatureType}
            style={brandSignatureStyle}
            size={brandSignatureSize}
            accentColorHsl={accentColorHsl}
            align={brandAlign}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Clamps text length to prevent overflow
 */
export function clampText(text: string, maxChars: number = 100): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + "...";
}

/**
 * Calculate responsive font size based on text length
 */
export function getResponsiveFontSize(
  baseFontSize: number, 
  textLength: number, 
  threshold: number = 50
): number {
  if (textLength <= threshold) return baseFontSize;
  const scale = Math.max(0.75, threshold / textLength);
  return Math.round(baseFontSize * scale);
}
