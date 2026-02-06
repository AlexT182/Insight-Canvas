import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";

interface PresentationTemplateProps {
  data: InfographicData;
}

export function PresentationTemplate({ data }: PresentationTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;
  const keyPointsFontSize = data.keyPointsFontSize || 12;
  
  // Split points into two columns
  const midpoint = Math.ceil(data.keyPoints.length / 2);
  const leftColumnPoints = data.keyPoints.slice(0, midpoint);
  const rightColumnPoints = data.keyPoints.slice(midpoint);
  
  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden flex flex-col relative"
      style={{ maxWidth: templateConfig.maxWidth, aspectRatio: templateConfig.aspectRatio, fontFamily }}
    >
      {/* Top accent bar */}
      <div 
        className="h-1.5 w-full flex-shrink-0" 
        style={{ 
          background: `linear-gradient(90deg, hsl(${accentColorHsl}), hsl(${accentColorHsl} / 0.6))` 
        }} 
      />
      
      {/* Background gradient */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none"
        style={{ 
          background: `linear-gradient(135deg, hsl(${accentColorHsl}), transparent)` 
        }}
      />
      
      <div className="relative flex-1 flex flex-col p-6 overflow-hidden min-h-0">
        {/* Header */}
        <header className="flex items-start gap-4 mb-5 flex-shrink-0">
          <div 
            className="w-1.5 h-14 rounded-full flex-shrink-0"
            style={{ 
              background: `linear-gradient(180deg, hsl(${accentColorHsl}), hsl(${accentColorHsl} / 0.3))` 
            }}
          />
          <div className="flex-1 min-w-0">
            <h1 
              className="canvas-title break-words"
              style={{ fontSize: `${data.titleFontSize}px` }}
            >
              {data.title || "Your Title Here"}
            </h1>
            {data.subtitle && (
              <p 
                className="font-medium tracking-widest uppercase mt-1.5 break-words" 
                style={{ color: 'hsl(var(--canvas-muted))', fontSize: `${data.subtitleFontSize}px` }}
              >
                {data.subtitle}
              </p>
            )}
          </div>
        </header>
        
        {/* Two-column layout */}
        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-3 content-start overflow-hidden min-h-0 relative">
          {/* Center divider line */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-20 pointer-events-none"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          />
          
          {/* Left column */}
          <div className="flex flex-col justify-evenly min-h-0 gap-2">
            {leftColumnPoints.map((point, index) => (
              <div 
                key={point.id} 
                className="flex items-start gap-3 min-h-0"
              >
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-semibold"
                  style={{ 
                    backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--muted))',
                    color: point.isHighlighted ? 'white' : 'hsl(var(--canvas-text))',
                    fontSize: `${keyPointsFontSize * 0.75}px`,
                    boxShadow: point.isHighlighted ? `0 3px 10px hsl(${accentColorHsl} / 0.3)` : 'none'
                  }}
                >
                  {index + 1}
                </div>
                <p 
                  className="leading-relaxed flex-1 pt-0.5 break-words min-w-0"
                  style={{ 
                    color: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--canvas-text))',
                    fontWeight: point.isHighlighted ? 600 : 400,
                    fontSize: `${keyPointsFontSize}px`
                  }}
                >
                  {point.text}
                </p>
              </div>
            ))}
          </div>
          
          {/* Right column */}
          <div className="flex flex-col justify-evenly min-h-0 gap-2">
            {rightColumnPoints.map((point, index) => (
              <div 
                key={point.id} 
                className="flex items-start gap-3 min-h-0"
              >
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-semibold"
                  style={{ 
                    backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--muted))',
                    color: point.isHighlighted ? 'white' : 'hsl(var(--canvas-text))',
                    fontSize: `${keyPointsFontSize * 0.75}px`,
                    boxShadow: point.isHighlighted ? `0 3px 10px hsl(${accentColorHsl} / 0.3)` : 'none'
                  }}
                >
                  {midpoint + index + 1}
                </div>
                <p 
                  className="leading-relaxed flex-1 pt-0.5 break-words min-w-0"
                  style={{ 
                    color: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--canvas-text))',
                    fontWeight: point.isHighlighted ? 600 : 400,
                    fontSize: `${keyPointsFontSize}px`
                  }}
                >
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Brand signature */}
        <footer className="pt-4 flex-shrink-0">
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
