import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { Quote } from "lucide-react";
import { BrandSignature } from "@/components/BrandSignature";

interface QuoteCardTemplateProps {
  data: InfographicData;
}

export function QuoteCardTemplate({ data }: QuoteCardTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;
  const keyPointsFontSize = data.keyPointsFontSize || 12;
  
  // Use highlighted point as main quote, or first point
  const highlightedPoint = data.keyPoints.find(p => p.isHighlighted) || data.keyPoints[0];
  const otherPoints = data.keyPoints.filter(p => p.id !== highlightedPoint?.id).slice(0, 3);

  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden flex flex-col relative"
      style={{ maxWidth: templateConfig.maxWidth, aspectRatio: templateConfig.aspectRatio, fontFamily }}
    >
      {/* Radial gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(ellipse at center, hsl(${accentColorHsl} / 0.08) 0%, transparent 70%)`
        }}
      />
      
      {/* Corner frame elements */}
      <div 
        className="absolute top-0 left-0 w-20 h-20 pointer-events-none"
        style={{ 
          borderTop: `3px solid hsl(${accentColorHsl} / 0.3)`,
          borderLeft: `3px solid hsl(${accentColorHsl} / 0.3)`
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
        style={{ 
          borderBottom: `3px solid hsl(${accentColorHsl} / 0.3)`,
          borderRight: `3px solid hsl(${accentColorHsl} / 0.3)`
        }}
      />
      
      {/* Main quote section */}
      <div className="flex-1 p-10 flex flex-col justify-center items-center relative overflow-hidden min-h-0">
        {/* Large decorative quote marks */}
        <Quote 
          className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
          style={{ color: `hsl(${accentColorHsl})`, opacity: 0.1 }}
        />
        <Quote 
          className="absolute bottom-8 right-8 w-16 h-16 rotate-180 pointer-events-none"
          style={{ color: `hsl(${accentColorHsl})`, opacity: 0.1 }}
        />
        
        {/* Quote text */}
        <p 
          className="font-bold leading-snug text-center relative z-10 px-6 break-words"
          style={{ 
            color: `hsl(${accentColorHsl})`, 
            fontSize: `${data.titleFontSize}px`,
            textShadow: `0 2px 20px hsl(${accentColorHsl} / 0.15)`
          }}
        >
          {highlightedPoint?.text || data.title}
        </p>
        
        {/* Decorative divider */}
        <div className="mt-6 flex items-center gap-3 flex-shrink-0">
          <div 
            className="w-8 h-0.5 rounded-full"
            style={{ backgroundColor: `hsl(${accentColorHsl} / 0.3)` }}
          />
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          />
          <div 
            className="w-8 h-0.5 rounded-full"
            style={{ backgroundColor: `hsl(${accentColorHsl} / 0.3)` }}
          />
        </div>
        
        {/* Subtitle */}
        <p 
          className="mt-4 uppercase tracking-widest font-medium text-center break-words" 
          style={{ color: 'hsl(var(--canvas-muted))', fontSize: `${data.subtitleFontSize}px` }}
        >
          {data.subtitle || "Key Insight"}
        </p>
      </div>
      
      {/* Supporting points - only if available */}
      {otherPoints.length > 0 && (
        <div 
          className="p-5 flex-shrink-0 relative"
          style={{ backgroundColor: `hsl(${accentColorHsl} / 0.06)` }}
        >
          {/* Top border gradient */}
          <div 
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ 
              background: `linear-gradient(90deg, transparent, hsl(${accentColorHsl} / 0.3), transparent)` 
            }}
          />
          
          <div className="grid grid-cols-3 gap-4">
            {otherPoints.map((point) => (
              <div 
                key={point.id}
                className="text-center min-w-0"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full mx-auto mb-2 flex-shrink-0"
                  style={{ backgroundColor: `hsl(${accentColorHsl} / 0.5)` }}
                />
                <p 
                  className="leading-relaxed break-words" 
                  style={{ color: 'hsl(var(--canvas-text))', fontSize: `${keyPointsFontSize}px` }}
                >
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Brand signature */}
      <footer className="relative px-6 py-4 flex-shrink-0">
        <BrandSignature 
          name={data.brandName}
          logo={data.brandLogo}
          type={data.brandSignatureType}
          style={data.brandSignatureStyle}
          size={data.brandSignatureSize}
          accentColorHsl={accentColorHsl}
          align="center"
        />
      </footer>
    </div>
  );
}
