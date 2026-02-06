import { InfographicData, GOOGLE_FONTS, BRAND_SIGNATURE_STYLES, BrandSignatureType } from "@/types/infographic";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, X, Type, Image } from "lucide-react";
import { useRef } from "react";

interface FontSettingsProps {
  data: InfographicData;
  onChange: (data: InfographicData) => void;
}

export function FontSettings({ data, onChange }: FontSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const updateField = <K extends keyof InfographicData>(
    field: K,
    value: InfographicData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Logo file must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange({ ...data, brandLogo: result, brandSignatureType: "logo" });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ ...data, brandLogo: null, brandSignatureType: "text" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const selectedFont = GOOGLE_FONTS.find(f => f.id === data.fontFamily) || GOOGLE_FONTS[0];

  // Group fonts by category
  const groupedFonts = {
    vietnamese: GOOGLE_FONTS.filter(f => f.vietnameseOptimized),
    sansSerif: GOOGLE_FONTS.filter(f => f.category === "sans-serif" && !f.vietnameseOptimized),
    serif: GOOGLE_FONTS.filter(f => f.category === "serif"),
    display: GOOGLE_FONTS.filter(f => f.category === "display"),
  };

  const FontButton = ({ font }: { font: typeof GOOGLE_FONTS[0] }) => (
    <button
      key={font.id}
      onClick={() => updateField("fontFamily", font.id)}
      className={cn(
        "p-2 rounded-md border text-left transition-all",
        data.fontFamily === font.id
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border bg-background hover:border-primary/50"
      )}
    >
      <span 
        className="text-sm font-medium block truncate"
        style={{ fontFamily: font.family }}
      >
        {font.name}
      </span>
      <span className="text-[9px] text-muted-foreground capitalize">
        {font.vietnameseOptimized ? "Vietnamese" : font.category}
      </span>
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Font Family Selection - Grouped by Category */}
      <div className="space-y-3">
        <Label className="text-xs font-medium">Font Family</Label>
        
        {/* Vietnamese-Optimized */}
        {groupedFonts.vietnamese.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Vietnamese-Optimized
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {groupedFonts.vietnamese.map((font) => (
                <FontButton key={font.id} font={font} />
              ))}
            </div>
          </div>
        )}

        {/* Sans-Serif */}
        {groupedFonts.sansSerif.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Sans-Serif
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {groupedFonts.sansSerif.map((font) => (
                <FontButton key={font.id} font={font} />
              ))}
            </div>
          </div>
        )}

        {/* Serif */}
        {groupedFonts.serif.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Serif
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {groupedFonts.serif.map((font) => (
                <FontButton key={font.id} font={font} />
              ))}
            </div>
          </div>
        )}

        {/* Display */}
        {groupedFonts.display.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Display
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {groupedFonts.display.map((font) => (
                <FontButton key={font.id} font={font} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Title Font Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium">Title Size</Label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {data.titleFontSize}px
          </span>
        </div>
        <Slider
          value={[data.titleFontSize]}
          onValueChange={([value]) => updateField("titleFontSize", value)}
          min={14}
          max={48}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>14px</span>
          <span>48px</span>
        </div>
      </div>

      {/* Subtitle Font Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium">Subtitle Size</Label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {data.subtitleFontSize}px
          </span>
        </div>
        <Slider
          value={[data.subtitleFontSize]}
          onValueChange={([value]) => updateField("subtitleFontSize", value)}
          min={8}
          max={24}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>8px</span>
          <span>24px</span>
        </div>
      </div>

      {/* Key Points Font Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium">Key Points Size</Label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {data.keyPointsFontSize}px
          </span>
        </div>
        <Slider
          value={[data.keyPointsFontSize]}
          onValueChange={([value]) => updateField("keyPointsFontSize", value)}
          min={8}
          max={20}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>8px</span>
          <span>20px</span>
        </div>
      </div>

      {/* Brand Signature Type Toggle */}
      <div className="space-y-2">
        <Label className="text-xs font-medium">Brand Signature Type</Label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => updateField("brandSignatureType", "text")}
            className={cn(
              "p-2 rounded-md border flex items-center justify-center gap-2 transition-all",
              data.brandSignatureType === "text"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border bg-background hover:border-primary/50"
            )}
          >
            <Type className="w-4 h-4" />
            <span className="text-xs font-medium">Text</span>
          </button>
          <button
            onClick={() => data.brandLogo && updateField("brandSignatureType", "logo")}
            disabled={!data.brandLogo}
            className={cn(
              "p-2 rounded-md border flex items-center justify-center gap-2 transition-all",
              data.brandSignatureType === "logo"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border bg-background hover:border-primary/50",
              !data.brandLogo && "opacity-50 cursor-not-allowed"
            )}
          >
            <Image className="w-4 h-4" />
            <span className="text-xs font-medium">Logo</span>
          </button>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <Label className="text-xs font-medium">Brand Logo</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={handleLogoUpload}
          className="hidden"
        />
        {data.brandLogo ? (
          <div className="relative p-3 rounded-md border bg-muted/30">
            <img 
              src={data.brandLogo} 
              alt="Brand logo" 
              className="max-h-12 mx-auto object-contain"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={removeLogo}
              className="absolute top-1 right-1 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-9 text-xs"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            Upload Logo
          </Button>
        )}
        <p className="text-[9px] text-muted-foreground">PNG, JPG, SVG, or WebP. Max 5MB.</p>
      </div>

      {/* Brand Signature Style - Only show for text type */}
      {data.brandSignatureType === "text" && (
        <div className="space-y-2">
          <Label className="text-xs font-medium">Brand Text Style</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {BRAND_SIGNATURE_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => updateField("brandSignatureStyle", style.id)}
                className={cn(
                  "p-2 rounded-md border text-left transition-all",
                  data.brandSignatureStyle === style.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border bg-background hover:border-primary/50"
                )}
              >
                <span className="text-xs font-medium block">{style.name}</span>
                <span className="text-[9px] text-muted-foreground">{style.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brand Signature Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium">Brand Size</Label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {data.brandSignatureSize}px
          </span>
        </div>
        <Slider
          value={[data.brandSignatureSize]}
          onValueChange={([value]) => updateField("brandSignatureSize", value)}
          min={8}
          max={60}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>8px</span>
          <span>60px</span>
        </div>
      </div>

      {/* Preview */}
      <div 
        className="p-3 rounded-md border bg-muted/30 space-y-1"
        style={{ fontFamily: selectedFont.family }}
      >
        <p 
          className="font-bold leading-tight text-foreground"
          style={{ fontSize: `${Math.min(data.titleFontSize, 20)}px` }}
        >
          Title Preview
        </p>
        <p 
          className="text-muted-foreground uppercase tracking-wider"
          style={{ fontSize: `${Math.min(data.subtitleFontSize, 12)}px` }}
        >
          Subtitle preview
        </p>
        <p 
          className="text-foreground"
          style={{ fontSize: `${Math.min(data.keyPointsFontSize, 12)}px` }}
        >
          • Key point preview
        </p>
        <div className="mt-2 pt-2 border-t border-border/50">
          {data.brandSignatureType === "logo" && data.brandLogo ? (
            <img 
              src={data.brandLogo} 
              alt="Brand" 
              style={{ height: `${data.brandSignatureSize}px` }}
              className="object-contain"
            />
          ) : (
            <p 
              className="text-muted-foreground italic"
              style={{ fontSize: `${data.brandSignatureSize}px` }}
            >
              {data.brandName || "brand signature"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
