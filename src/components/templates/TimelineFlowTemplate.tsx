import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";

interface TimelineFlowTemplateProps {
  data: InfographicData;
}

export function TimelineFlowTemplate({ data }: TimelineFlowTemplateProps) {
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
      {/* Gradient accent bar at top */}
      <div 
        className="h-2 w-full flex-shrink-0" 
        style={{ 
          background: `linear-gradient(90deg, hsl(${accentColorHsl}), hsl(${accentColorHsl} / 0.5))` 
        }} 
      />
      
      {/* Horizontal line pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(${accentColorHsl}) 1px, transparent 1px)`,
          backgroundSize: '100% 40px'
        }}
      />
      
      {/* Header */}
      <header className="relative p-6 pb-4 flex-shrink-0">
        <h1 
          className="canvas-title break-words"
          style={{ fontSize: `${data.titleFontSize}px` }}
        >
          {data.title || "Your Title Here"}
        </h1>
        {data.subtitle && (
          <p 
            className="mt-2 uppercase tracking-widest break-words" 
            style={{ color: 'hsl(var(--canvas-muted))', fontSize: `${data.subtitleFontSize}px` }}
          >
            {data.subtitle}
          </p>
        )}
      </header>
      
      {/* Timeline content */}
      <div className="flex-1 px-6 relative overflow-hidden min-h-0">
        {/* Vertical line with gradient */}
        <div 
          className="absolute left-10 top-0 bottom-0 w-0.5"
          style={{ 
            background: `linear-gradient(180deg, hsl(${accentColorHsl}) 0%, hsl(${accentColorHsl} / 0.2) 100%)` 
          }}
        />
        
        {/* Glow behind line */}
        <div 
          className="absolute left-8 top-0 bottom-0 w-5 blur-xl opacity-20 pointer-events-none"
          style={{ backgroundColor: `hsl(${accentColorHsl})` }}
        />
        
        {/* Timeline items */}
        <div className="flex flex-col justify-evenly h-full py-4 min-h-0">
          {data.keyPoints.map((point, index) => (
            <div 
              key={point.id}
              className="flex items-start gap-5 relative pl-1 min-h-0"
            >
              {/* Node */}
              <div className="relative flex-shrink-0">
                {point.isHighlighted && (
                  <div 
                    className="absolute inset-0 rounded-full scale-150 opacity-30 pointer-events-none"
                    style={{ backgroundColor: `hsl(${accentColorHsl})` }}
                  />
                )}
                <div 
                  className="relative w-8 h-8 z-10 flex items-center justify-center font-bold rounded-full"
                  style={{ 
                    backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--canvas-bg))',
                    color: point.isHighlighted ? 'white' : 'hsl(var(--canvas-text))',
                    fontSize: `${keyPointsFontSize * 0.9}px`,
                    border: point.isHighlighted ? 'none' : `2px solid hsl(${accentColorHsl} / 0.3)`,
                    boxShadow: point.isHighlighted ? `0 4px 12px hsl(${accentColorHsl} / 0.4)` : 'none'
                  }}
                >
                  {index + 1}
                </div>
              </div>
              
              {/* Content card */}
              <div 
                className="flex-1 p-3 rounded-sm min-w-0"
                style={{ 
                  backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl} / 0.08)` : 'transparent',
                  borderLeft: point.isHighlighted ? `3px solid hsl(${accentColorHsl})` : '3px solid transparent'
                }}
              >
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
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Brand signature */}
      <footer className="relative px-6 py-4 flex-shrink-0">
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
  );
}
