import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";
import { AvatarPreview } from "@/components/AvatarBuilder";
import {
  WavyDivider,
} from "./DoodlyAssets";

interface DoodlyTemplateProps {
  data: InfographicData;
}

/**
 * DoodlyTemplate - Notion Doodly Style with black & white hand-drawn aesthetic
 * Layout: List style with character illustration
 */
export function DoodlyTemplate({ data }: DoodlyTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === "doodly") || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;
  const keyPointsFontSize = data.keyPointsFontSize || 12;

  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden flex flex-col relative bg-white"
      style={{ 
        maxWidth: templateConfig.maxWidth, 
        aspectRatio: templateConfig.aspectRatio, 
        fontFamily,
      }}
    >
      {/* Content container */}
      <div className="relative flex-1 flex flex-col px-8 py-10 overflow-hidden min-h-0">
        {/* Header */}
        <header className="mb-5 flex-shrink-0">
          <h1 
            className="leading-tight break-words font-bold text-black"
            style={{ fontSize: `${data.titleFontSize}px` }}
          >
            {data.title || "Your Title Here"}
          </h1>
          {data.subtitle && (
            <p 
              className="mt-3 break-words text-gray-600" 
              style={{ fontSize: `${data.subtitleFontSize}px` }}
            >
              {data.subtitle}
            </p>
          )}
        </header>

        <WavyDivider className="w-full h-3 mb-4 flex-shrink-0" />
        
        {/* Key points */}
        <div className="flex-1 flex flex-col justify-evenly overflow-hidden min-h-0 gap-2">
          {data.keyPoints.map((point) => (
            <div key={point.id} className="flex items-start gap-3 min-h-0">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                {point.isHighlighted ? (
                  <svg viewBox="0 0 20 20" className="w-full h-full">
                    <rect x="2" y="2" width="16" height="16" rx="2" fill="black" />
                    <path d="M5 10L8 13L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" className="w-full h-full">
                    <rect x="2" y="2" width="16" height="16" rx="2" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                )}
              </div>
              <p 
                className="leading-relaxed break-words flex-1"
                style={{ 
                  color: point.isHighlighted ? 'black' : '#374151',
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
        <div className="mt-5 flex-shrink-0">
          <div 
            className="inline-block px-4 py-2 rounded-md text-white text-sm font-medium"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          >
            Learn more
          </div>
        </div>
        
        {/* Brand signature */}
        <footer className="pt-3 flex-shrink-0">
          <BrandSignature 
            name={data.brandName}
            logo={data.brandLogo}
            type={data.brandSignatureType}
            style={data.brandSignatureStyle}
            size={data.brandSignatureSize}
            accentColorHsl={accentColorHsl}
            align="right"
          />
        </footer>
      </div>

      {/* Avatar - uses modular avatar system */}
      <div className="absolute bottom-3 right-6">
        <AvatarPreview config={data.avatarCustomization} size={52} />
      </div>
    </div>
  );
}
