import { useState, useRef } from "react";
import { InfographicData, GOOGLE_FONTS, BRAND_SIGNATURE_STYLES } from "@/types/infographic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Type, ChevronDown, Award, Upload, X, Image, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SocialResizePanel } from "./SocialResizePanel";
import { ExportPreset, EXPORT_PRESETS } from "@/types/exportPresets";

interface DesignPanelProps {
  data: InfographicData;
  onChange: (data: InfographicData) => void;
  selectedPreset?: ExportPreset | null;
  onPresetChange?: (preset: ExportPreset) => void;
}

export function DesignPanel({ data, onChange, selectedPreset, onPresetChange }: DesignPanelProps) {
  const [typographyOpen, setTypographyOpen] = useState(true);
  const [brandingOpen, setBrandingOpen] = useState(true);
  const [internalPreset, setInternalPreset] = useState<ExportPreset>(EXPORT_PRESETS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const activePreset = selectedPreset ?? internalPreset;
  const handlePresetChange = onPresetChange ?? setInternalPreset;

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
    <div className="h-full flex flex-col bg-card border-l">
      {/* Tabs Header */}
      <Tabs defaultValue="design" className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-2 flex-shrink-0">
          <TabsList className="w-full justify-start bg-transparent h-12 p-0 gap-4">
            <TabsTrigger
              value="resize"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-2 text-sm flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Resize
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-2 text-sm"
            >
              Design
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Resize Tab - Social Media Presets */}
        <TabsContent value="resize" className="flex-1 overflow-hidden m-0">
          <div className="p-4 h-full">
            <SocialResizePanel 
              selectedPreset={activePreset}
              onPresetChange={handlePresetChange}
            />
          </div>
        </TabsContent>

        {/* Design Tab */}
        <TabsContent value="design" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {/* Typography Section */}
              <Collapsible open={typographyOpen} onOpenChange={setTypographyOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <span>Typography</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    typographyOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 space-y-4">
                  {/* Font Family Selection */}
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
                  </div>

                  {/* Typography Preview */}
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
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Branding Section */}
              <Collapsible open={brandingOpen} onOpenChange={setBrandingOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Branding</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    brandingOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 space-y-4">
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
                  </div>

                  {/* Brand Signature Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="brand-signature" className="text-xs font-medium">
                      Brand Signature
                    </Label>
                    <Input
                      id="brand-signature"
                      value={data.brandName}
                      onChange={(e) => updateField("brandName", e.target.value)}
                      placeholder="Your brand name..."
                      className="h-9 text-sm"
                    />
                  </div>

                  {/* Branding Preview */}
                  <div className="p-3 rounded-md border bg-muted/30">
                    <p className="text-[10px] text-muted-foreground mb-2">Preview</p>
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
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
