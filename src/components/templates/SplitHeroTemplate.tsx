import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";

interface SplitHeroTemplateProps {
  data: InfographicData;
}

/** Calculate dynamic font size based on content length and point count */
function getDynamicFontSize(baseSize: number, textLength: number, pointCount: number): number {
  // Scale down for longer text
  const lengthScale = textLength > 60 ? 0.85 : textLength > 40 ? 0.92 : 1;
  // Scale down when there are many points
  const countScale = pointCount > 6 ? 0.85 : pointCount > 4 ? 0.9 : 1;
  return Math.round(baseSize * Math.min(lengthScale, countScale));
}

/** Calculate badge size based on point count */
function getBadgeSize(pointCount: number): string {
  if (pointCount > 6) return "w-6 h-6 text-xs";
  if (pointCount > 4) return "w-7 h-7 text-xs";
  return "w-8 h-8 text-sm";
}

/** Calculate gap size based on point count */
function getGapSize(pointCount: number): string {
  if (pointCount > 6) return "gap-2";
  if (pointCount > 4) return "gap-3";
  return "gap-4";
}

export function SplitHeroTemplate({ data }: SplitHeroTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;
  const keyPointsFontSize = data.keyPointsFontSize || 12;
  const pointCount = data.keyPoints.length;
  const badgeSizeClass = getBadgeSize(pointCount);
  const gapClass = getGapSize(pointCount);

  // Find the longest text to determine dynamic sizing
  const maxTextLength = Math.max(...data.keyPoints.map(p => p.text.length), 0);

  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden relative"
      style={{ maxWidth: templateConfig.maxWidth, aspectRatio: templateConfig.aspectRatio, fontFamily }}
    >
      {/* Content grid - clean 2:3 split */}
      <div className="relative z-10 grid grid-cols-5 h-full">
        {/* Left: Title area (colored section) */}
        <div 
          className="col-span-2 flex flex-col justify-center p-6 relative overflow-hidden"
          style={{ backgroundColor: `hsl(${accentColorHsl})` }}
        >
          {/* Decorative gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: `linear-gradient(180deg, hsl(${accentColorHsl}) 0%, hsl(${accentColorHsl} / 0.8) 100%)`
            }}
          />
          {/* Decorative shape */}
          <div 
            className="absolute top-0 left-0 w-24 h-24 opacity-20 pointer-events-none"
            style={{ 
              background: `linear-gradient(45deg, white 0%, transparent 100%)`,
              clipPath: 'polygon(0 0, 100% 0, 0 100%)'
            }}
          />
          
          <div className="relative z-10">
            <div className="w-6 h-0.5 bg-white/50 mb-3 flex-shrink-0" />
            <h1 
              className="text-white font-bold leading-tight drop-shadow-lg break-words"
              style={{ fontSize: `${data.titleFontSize}px` }}
            >
              {data.title || "Your Title Here"}
            </h1>
            {data.subtitle && (
              <p 
                className="text-white/80 font-medium mt-2 uppercase tracking-widest break-words"
                style={{ fontSize: `${data.subtitleFontSize}px` }}
              >
                {data.subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Right: Key points (light section) */}
        <div className="col-span-3 bg-[hsl(var(--canvas-bg))] flex flex-col p-4 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: `linear-gradient(135deg, transparent 60%, hsl(${accentColorHsl} / 0.08) 100%)`
            }}
          />
          
          {/* Key points in responsive 2-column layout */}
          <div className={`relative flex-1 grid grid-cols-2 gap-x-4 ${gapClass} content-center min-h-0 py-2`}>
            {/* Left column points */}
            <div className={`flex flex-col justify-center ${gapClass}`}>
              {data.keyPoints.slice(0, Math.ceil(pointCount / 2)).map((point, index) => {
                const dynamicSize = getDynamicFontSize(keyPointsFontSize, point.text.length, pointCount);
                return (
                  <div 
                    key={point.id}
                    className="flex items-start gap-2"
                  >
                    <div 
                      className={`${badgeSizeClass} flex-shrink-0 flex items-center justify-center font-bold rounded-full`}
                      style={{ 
                        backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--muted))',
                        color: point.isHighlighted ? 'white' : 'hsl(var(--canvas-muted))',
                        boxShadow: point.isHighlighted ? `0 2px 8px hsl(${accentColorHsl} / 0.3)` : 'none'
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p 
                        className="leading-snug break-words"
                        style={{ 
                          color: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--canvas-text))',
                          fontWeight: point.isHighlighted ? 600 : 400,
                          fontSize: `${dynamicSize}px`
                        }}
                      >
                        {point.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Center vertical divider */}
            <div 
              className="absolute left-1/2 top-[15%] bottom-[15%] w-px -translate-x-1/2 pointer-events-none"
              style={{ backgroundColor: `hsl(${accentColorHsl} / 0.12)` }}
            />
            
            {/* Right column points */}
            <div className={`flex flex-col justify-center ${gapClass}`}>
              {data.keyPoints.slice(Math.ceil(pointCount / 2)).map((point, index) => {
                const actualIndex = Math.ceil(pointCount / 2) + index;
                const dynamicSize = getDynamicFontSize(keyPointsFontSize, point.text.length, pointCount);
                return (
                  <div 
                    key={point.id}
                    className="flex items-start gap-2"
                  >
                    <div 
                      className={`${badgeSizeClass} flex-shrink-0 flex items-center justify-center font-bold rounded-full`}
                      style={{ 
                        backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--muted))',
                        color: point.isHighlighted ? 'white' : 'hsl(var(--canvas-muted))',
                        boxShadow: point.isHighlighted ? `0 2px 8px hsl(${accentColorHsl} / 0.3)` : 'none'
                      }}
                    >
                      {actualIndex + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p 
                        className="leading-snug break-words"
                        style={{ 
                          color: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--canvas-text))',
                          fontWeight: point.isHighlighted ? 600 : 400,
                          fontSize: `${dynamicSize}px`
                        }}
                      >
                        {point.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <footer className="relative pt-2 flex-shrink-0">
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
    </div>
  );
}
