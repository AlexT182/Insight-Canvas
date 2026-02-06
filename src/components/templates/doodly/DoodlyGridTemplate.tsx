import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";
import { AvatarPreview } from "@/components/AvatarBuilder";
import { AvatarCustomization, DEFAULT_AVATAR } from "@/types/avatarCustomization";

interface DoodlyGridTemplateProps {
  data: InfographicData;
}

// Different avatar variations for grid items
const GRID_AVATAR_VARIATIONS: Partial<AvatarCustomization>[] = [
  { hairstyle: "short", eyeStyle: "normal", mouthStyle: "smile" },
  { hairstyle: "curly", eyeStyle: "happy", mouthStyle: "grin" },
  { hairstyle: "ponytail", eyeStyle: "wink", mouthStyle: "smile" },
  { hairstyle: "bun", eyeStyle: "glasses", mouthStyle: "smirk" },
];

/**
 * DoodlyGridTemplate - Team/cards grid layout with multiple character illustrations
 * Best for: Team introductions, feature cards, multi-item displays
 */
export function DoodlyGridTemplate({ data }: DoodlyGridTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === "doodly-grid") || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;

  // Show max 4 items for grid
  const displayPoints = data.keyPoints.slice(0, 4);

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
      <div className="relative flex-1 flex flex-col p-5 overflow-hidden min-h-0">
        {/* Header */}
        <header className="mb-4 flex-shrink-0 text-center">
          <h1 
            className="leading-tight break-words font-bold text-black"
            style={{ fontSize: `${data.titleFontSize - 2}px` }}
          >
            {data.title || "Meet the super Team"}
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
        
        {/* Grid of cards - uses avatar variations for variety */}
        <div className="flex-1 grid grid-cols-2 gap-3 overflow-hidden min-h-0">
          {displayPoints.map((point, index) => {
            // Create a variation of the base avatar for each card
            const avatarConfig: AvatarCustomization = {
              ...data.avatarCustomization,
              ...GRID_AVATAR_VARIATIONS[index % GRID_AVATAR_VARIATIONS.length],
            };
            
            return (
              <div 
                key={point.id} 
                className="flex flex-col items-center p-3 rounded-lg border-2 border-dashed"
                style={{ 
                  borderColor: point.isHighlighted ? `hsl(${accentColorHsl})` : '#e5e7eb',
                  backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl} / 0.05)` : 'transparent'
                }}
              >
                <AvatarPreview config={avatarConfig} size={48} />
                <p 
                  className="mt-2 text-center leading-snug break-words"
                  style={{ 
                    color: point.isHighlighted ? 'black' : '#4b5563',
                    fontWeight: point.isHighlighted ? 600 : 500,
                    fontSize: '11px'
                  }}
                >
                  {point.text.length > 50 ? point.text.slice(0, 50) + '...' : point.text}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Brand signature */}
        <footer className="pt-3 flex-shrink-0">
          <BrandSignature 
            name={data.brandName}
            logo={data.brandLogo}
            type={data.brandSignatureType}
            style={data.brandSignatureStyle}
            size={Math.min(data.brandSignatureSize, 9)}
            accentColorHsl={accentColorHsl}
            align="center"
          />
        </footer>
      </div>
    </div>
  );
}
