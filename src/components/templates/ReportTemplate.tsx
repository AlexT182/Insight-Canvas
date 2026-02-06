import * as React from "react";
import { InfographicData, ACCENT_COLORS, TEMPLATES, GOOGLE_FONTS } from "@/types/infographic";
import { Circle, CheckCircle2 } from "lucide-react";
import { BrandSignature } from "@/components/BrandSignature";

interface ReportTemplateProps {
  data: InfographicData;
}

export function ReportTemplate({ data }: ReportTemplateProps) {
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
        className="h-2 w-full flex-shrink-0" 
        style={{ 
          background: `linear-gradient(90deg, hsl(${accentColorHsl}), hsl(${accentColorHsl} / 0.7))` 
        }} 
      />
      
      {/* Side accent line */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 opacity-20 pointer-events-none"
        style={{ backgroundColor: `hsl(${accentColorHsl})` }}
      />
      
      <div className="relative flex-1 flex flex-col p-8 overflow-hidden min-h-0">
        {/* Header with icon */}
        <header className="pb-5 mb-5 border-b-2 flex-shrink-0" style={{ borderColor: `hsl(${accentColorHsl} / 0.2)` }}>
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
              style={{ 
                backgroundColor: `hsl(${accentColorHsl} / 0.1)`,
                border: `2px solid hsl(${accentColorHsl} / 0.2)`
              }}
            >
              <div 
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: `hsl(${accentColorHsl})` }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 
                className="canvas-title break-words"
                style={{ fontSize: `${data.titleFontSize}px` }}
              >
                {data.title || "Your Title Here"}
              </h1>
              {data.subtitle && (
                <p 
                  className="font-medium tracking-widest uppercase mt-2 break-words" 
                  style={{ color: 'hsl(var(--canvas-muted))', fontSize: `${data.subtitleFontSize}px` }}
                >
                  {data.subtitle}
                </p>
              )}
            </div>
          </div>
        </header>
        
        {/* Key points list */}
        <div className="flex-1 flex flex-col justify-evenly overflow-hidden min-h-0 gap-1">
          {data.keyPoints.map((point, index) => (
            <div 
              key={point.id}
              className="flex items-start gap-4 py-1 min-h-0"
            >
              {/* Checkbox/indicator */}
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: point.isHighlighted ? `hsl(${accentColorHsl})` : 'transparent',
                  border: point.isHighlighted ? 'none' : `2px solid hsl(${accentColorHsl} / 0.3)`
                }}
              >
                {point.isHighlighted ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-3 h-3" style={{ color: `hsl(${accentColorHsl} / 0.4)` }} />
                )}
              </div>
              
              {/* Content */}
              <p 
                className="leading-relaxed flex-1 break-words min-w-0"
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
        
        {/* Footer with page number */}
        <footer 
          className="pt-5 flex justify-between items-end border-t flex-shrink-0" 
          style={{ borderColor: `hsl(${accentColorHsl} / 0.1)` }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: `hsl(${accentColorHsl} / 0.3)` }}
            />
            <span className="text-[10px] font-medium tracking-wide" style={{ color: 'hsl(var(--canvas-muted))' }}>
              PAGE 01
            </span>
          </div>
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
