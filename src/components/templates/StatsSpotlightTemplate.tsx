import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { BrandSignature } from "@/components/BrandSignature";

interface StatsSpotlightTemplateProps {
  data: InfographicData;
}

export function StatsSpotlightTemplate({ data }: StatsSpotlightTemplateProps) {
  const accentColorHsl = ACCENT_COLORS.find(c => c.name === data.accentColor)?.hsl || ACCENT_COLORS[0].hsl;
  const templateConfig = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  const fontConfig = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];
  const fontFamily = fontConfig.family;
  const keyPointsFontSize = data.keyPointsFontSize || 12;
  
  // Limit to 4 cards for grid layout
  const displayPoints = data.keyPoints.slice(0, 4);
  
  return (
    <div 
      className="infographic-canvas w-full rounded-lg overflow-hidden flex flex-col relative"
      style={{ maxWidth: templateConfig.maxWidth, aspectRatio: templateConfig.aspectRatio, fontFamily }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `linear-gradient(180deg, hsl(var(--canvas-bg)) 0%, hsl(var(--muted) / 0.3) 100%)`
        }}
      />
      
      {/* Decorative corner */}
      <div 
        className="absolute top-0 right-0 w-40 h-40 opacity-5 pointer-events-none"
        style={{ 
          background: `hsl(${accentColorHsl})`,
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
        }}
      />
      
      {/* Header */}
      <header className="relative p-6 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-2 h-10 rounded-full"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          />
          <div 
            className="w-12 h-2 rounded-full opacity-30"
            style={{ backgroundColor: `hsl(${accentColorHsl})` }}
          />
        </div>
        <h1 
          className="canvas-title break-words"
          style={{ fontSize: `${data.titleFontSize}px` }}
        >
          {data.title || "Your Title Here"}
        </h1>
        {data.subtitle && (
          <p 
            className="mt-2 uppercase tracking-widest font-medium break-words" 
            style={{ color: 'hsl(var(--canvas-muted))', fontSize: `${data.subtitleFontSize}px` }}
          >
            {data.subtitle}
          </p>
        )}
      </header>
      
      {/* Stats Grid */}
      <div className="relative flex-1 px-6 pb-4 grid grid-cols-2 gap-4 auto-rows-fr min-h-0">
        {displayPoints.map((point, index) => (
          <article 
            key={point.id}
            className="relative p-5 flex flex-col justify-between rounded-sm overflow-hidden min-h-0"
            style={{ 
              backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'hsl(var(--canvas-bg))',
              color: point.isHighlighted ? 'white' : 'hsl(var(--canvas-text))',
              boxShadow: point.isHighlighted 
                ? `0 8px 32px hsl(${accentColorHsl} / 0.4), inset 0 1px 0 rgba(255,255,255,0.1)` 
                : '0 2px 8px hsl(var(--foreground) / 0.05), inset 0 1px 0 hsl(var(--background))'
            }}
          >
            {/* Accent line for non-highlighted cards */}
            {!point.isHighlighted && (
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: `hsl(${accentColorHsl} / 0.3)` }}
              />
            )}
            
            {/* Large number */}
            <div 
              className="text-3xl font-black tracking-tight"
              style={{ opacity: point.isHighlighted ? 0.9 : 0.15 }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            
            {/* Content */}
            <p 
              className="leading-relaxed mt-2 break-words"
              style={{ fontSize: `${keyPointsFontSize}px` }}
            >
              {point.text}
            </p>
            
            {/* Decorative corner */}
            <div 
              className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
              style={{ 
                opacity: 0.1,
                background: point.isHighlighted ? 'white' : `hsl(${accentColorHsl})`,
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
              }}
            />
          </article>
        ))}
      </div>
      
      {/* Brand signature */}
      <footer className="relative px-6 pb-4 flex-shrink-0">
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
