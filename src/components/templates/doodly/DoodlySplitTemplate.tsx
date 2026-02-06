import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";
import { AvatarPreview } from "@/components/AvatarBuilder";
import {
  IconPlant,
  WavyDivider,
} from "./DoodlyAssets";

interface DoodlySplitTemplateProps {
  data: InfographicData;
}

/**
 * DoodlySplitTemplate - Side-by-side layout with illustration on one side
 * Best for: Feature highlights, about sections
 */
export function DoodlySplitTemplate({ data }: DoodlySplitTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === "doodly-split") || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;
  const keyPointsFontSize = data.keyPointsFontSize || 11;

  // Show max 4 points for this layout
  const displayPoints = data.keyPoints.slice(0, 4);

  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden flex relative bg-white"
      style={{ 
        maxWidth: templateConfig.maxWidth, 
        aspectRatio: templateConfig.aspectRatio, 
        fontFamily,
      }}
    >
      {/* Left side - Illustration */}
      <div className="w-2/5 relative flex flex-col items-center justify-center p-4 border-r-2 border-dashed border-gray-200">
        {/* Main avatar - uses modular avatar system */}
        <AvatarPreview config={data.avatarCustomization} size={90} />
        
        {/* Plant decoration */}
        <IconPlant className="absolute bottom-4 right-2" size={36} />
      </div>

      {/* Right side - Content */}
      <div className="w-3/5 flex flex-col p-5 overflow-hidden min-h-0">
        {/* Header */}
        <header className="mb-3 flex-shrink-0">
          <h1 
            className="leading-tight break-words font-bold text-black"
            style={{ fontSize: `${data.titleFontSize - 2}px` }}
          >
            {data.title || "Your Title Here"}
          </h1>
          {data.subtitle && (
            <p 
              className="mt-2 break-words text-gray-500" 
              style={{ fontSize: `${data.subtitleFontSize - 1}px` }}
            >
              {data.subtitle}
            </p>
          )}
        </header>

        <WavyDivider className="w-full h-2 mb-3 flex-shrink-0" />
        
        {/* Key points */}
        <div className="flex-1 flex flex-col justify-evenly overflow-hidden min-h-0 gap-1.5">
          {displayPoints.map((point) => (
            <div key={point.id} className="flex items-start gap-2 min-h-0">
              <div className="flex-shrink-0 w-4 h-4 mt-0.5">
                {point.isHighlighted ? (
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <rect x="1" y="1" width="14" height="14" rx="2" fill="black" />
                    <path d="M4 8L6 10L12 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="black" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
              <p 
                className="leading-snug break-words flex-1"
                style={{ 
                  color: point.isHighlighted ? 'black' : '#4b5563',
                  fontWeight: point.isHighlighted ? 600 : 400,
                  fontSize: `${keyPointsFontSize}px`
                }}
              >
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-3 flex-shrink-0">
          <div 
            className="inline-block px-3 py-1.5 rounded text-white text-xs font-medium"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          >
            Learn more
          </div>
        </div>
        
        {/* Brand signature */}
        <footer className="pt-2 flex-shrink-0">
          <BrandSignature 
            name={data.brandName}
            logo={data.brandLogo}
            type={data.brandSignatureType}
            style={data.brandSignatureStyle}
            size={Math.min(data.brandSignatureSize, 9)}
            accentColorHsl={accentColorHsl}
            align="right"
          />
        </footer>
      </div>
    </div>
  );
}
