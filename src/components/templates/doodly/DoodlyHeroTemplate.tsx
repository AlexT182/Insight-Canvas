import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";
import { AvatarPreview } from "@/components/AvatarBuilder";
import {
  IconArrowCurved,
  ScribbleUnderline,
} from "./DoodlyAssets";

interface DoodlyHeroTemplateProps {
  data: InfographicData;
}

/**
 * DoodlyHeroTemplate - Centered hero layout with large character illustration
 * Best for: Social media posts, announcements
 */
export function DoodlyHeroTemplate({ data }: DoodlyHeroTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === "doodly-hero") || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;

  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden flex flex-col relative bg-white"
      style={{ 
        maxWidth: templateConfig.maxWidth, 
        aspectRatio: templateConfig.aspectRatio, 
        fontFamily,
      }}
    >
      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-10 text-center overflow-hidden min-h-0">
        
        {/* Large avatar illustration - uses modular avatar system */}
        <div className="mb-6 flex-shrink-0">
          <AvatarPreview config={data.avatarCustomization} size={100} />
        </div>

        {/* Title with underline */}
        <header className="mb-4 flex-shrink-0 relative">
          <h1 
            className="leading-tight break-words font-bold text-black"
            style={{ fontSize: `${data.titleFontSize + 4}px` }}
          >
            {data.title || "Your Title Here"}
          </h1>
          <ScribbleUnderline className="w-3/4 h-3 mx-auto mt-1 opacity-60" />
        </header>

        {/* Subtitle */}
        {data.subtitle && (
          <p 
            className="break-words text-gray-600 max-w-xs" 
            style={{ fontSize: `${data.subtitleFontSize}px` }}
          >
            {data.subtitle}
          </p>
        )}

        {/* CTA with arrow */}
        <div className="mt-6 flex items-center gap-2 flex-shrink-0">
          <div 
            className="px-5 py-2.5 rounded-md text-white font-medium"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          >
            Learn more
          </div>
          <IconArrowCurved size={20} />
        </div>
        
        {/* Brand signature */}
        <footer className="absolute bottom-4 right-6">
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
    </div>
  );
}
