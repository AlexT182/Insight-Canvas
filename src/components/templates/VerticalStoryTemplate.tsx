import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { CheckCircle2 } from "lucide-react";
import { BrandSignature } from "@/components/BrandSignature";

interface VerticalStoryTemplateProps {
  data: InfographicData;
}

export function VerticalStoryTemplate({ data }: VerticalStoryTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;
  const keyPointsFontSize = data.keyPointsFontSize || 12;

  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden flex flex-col relative"
      style={{ maxWidth: templateConfig.maxWidth, aspectRatio: templateConfig.aspectRatio, fontFamily }}
    >
      {/* Top accent bar */}
      <div 
        className="h-2 w-full flex-shrink-0 relative" 
        style={{ backgroundColor: `hsl(${accentColorHsl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(hsl(${accentColorHsl}) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Side accent line */}
      <div 
        className="absolute left-0 top-20 bottom-20 w-1 rounded-r-full opacity-30"
        style={{ backgroundColor: `hsl(${accentColorHsl})` }}
      />
      
      <div className="relative flex-1 flex flex-col p-7 overflow-hidden min-h-0">
        {/* Header section */}
        <header className="mb-6 flex-shrink-0">
          <div 
            className="w-10 h-1 rounded-full mb-4"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          />
          <h1 
            className="canvas-title leading-tight break-words"
            style={{ fontSize: `${data.titleFontSize}px` }}
          >
            {data.title || "Your Title Here"}
          </h1>
          {data.subtitle && (
            <p 
              className="font-medium tracking-widest uppercase mt-3" 
              style={{ color: 'hsl(var(--canvas-muted))', fontSize: `${data.subtitleFontSize}px` }}
            >
              {data.subtitle}
            </p>
          )}
        </header>
        
        {/* Key points - flex container with even distribution */}
        <div className="flex-1 flex flex-col justify-evenly overflow-hidden min-h-0 gap-2">
          {data.keyPoints.map((point, index) => (
            <div 
              key={point.id}
              className="flex items-start gap-4 min-h-0"
            >
              {/* Number/icon indicator */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'transparent',
                  border: point.isHighlighted ? 'none' : `2px solid hsl(${accentColorHsl} / 0.25)`,
                  boxShadow: point.isHighlighted ? `0 4px 12px hsl(${accentColorHsl} / 0.3)` : 'none'
                }}
              >
                {point.isHighlighted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: `hsl(${accentColorHsl} / 0.6)` }}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1 min-w-0">
                <p 
                  className="leading-relaxed break-words"
                  style={{ 
                    color: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--canvas-text))',
                    fontWeight: point.isHighlighted ? 600 : 400,
                    fontSize: `${keyPointsFontSize}px`
                  }}
                >
                  {point.text}
                </p>
                {point.isHighlighted && (
                  <div 
                    className="w-16 h-0.5 mt-2 rounded-full"
                    style={{ backgroundColor: `hsl(${accentColorHsl} / 0.3)` }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Brand signature */}
        <footer className="pt-6 flex-shrink-0">
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
