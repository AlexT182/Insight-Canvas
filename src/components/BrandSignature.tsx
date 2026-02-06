import { BrandSignatureStyle, BrandSignatureType } from "@/types/infographic";

interface BrandSignatureProps {
  name: string;
  logo: string | null;
  type: BrandSignatureType;
  style: BrandSignatureStyle;
  size: number;
  accentColorHsl: string;
  align?: "left" | "center" | "right";
}

export function BrandSignature({ name, logo, type, style, size, accentColorHsl, align = "right" }: BrandSignatureProps) {
  const alignClass = align === "left" ? "text-left" : align === "center" ? "text-center" : "text-right";
  const flexAlign = align === "left" ? "justify-start" : align === "center" ? "justify-center" : "justify-end";

  // Render logo if type is logo and logo exists
  if (type === "logo" && logo) {
    return (
      <div className={`flex ${flexAlign}`}>
        <img 
          src={logo} 
          alt={name || "Brand logo"} 
          style={{ height: `${size}px` }}
          className="object-contain"
        />
      </div>
    );
  }

  // Fallback to text rendering
  if (!name) return null;

  if (style === "minimal") {
    return (
      <div className={alignClass}>
        <span 
          className="opacity-50 italic"
          style={{ 
            fontSize: `${size}px`,
            color: 'hsl(var(--canvas-muted))'
          }}
        >
          {name}
        </span>
      </div>
    );
  }

  if (style === "accent") {
    return (
      <div className={alignClass}>
        <span 
          className="font-medium"
          style={{ 
            fontSize: `${size}px`,
            color: `hsl(${accentColorHsl})`
          }}
        >
          {name}
        </span>
      </div>
    );
  }

  if (style === "boxed") {
    return (
      <div className={alignClass}>
        <span 
          className="inline-block px-2 py-0.5 font-medium text-white"
          style={{ 
            fontSize: `${size}px`,
            backgroundColor: `hsl(${accentColorHsl})`
          }}
        >
          {name}
        </span>
      </div>
    );
  }

  if (style === "underlined") {
    return (
      <div className={alignClass}>
        <span 
          className="inline-block font-medium border-b-2"
          style={{ 
            fontSize: `${size}px`,
            color: 'hsl(var(--canvas-text))',
            borderColor: `hsl(${accentColorHsl})`
          }}
        >
          {name}
        </span>
      </div>
    );
  }

  return null;
}
