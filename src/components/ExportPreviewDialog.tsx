import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPORT_PRESETS, PLATFORM_ICONS, ExportPreset, type ExportQuality } from "@/types/exportPresets";
import { Download, Image, FileText, Loader2, Lock } from "lucide-react";
import { toCanvas } from "html-to-image";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
interface ExportPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (preset: ExportPreset, quality: ExportQuality, format: "png" | "pdf", transparentBg: boolean) => void;
  isExporting: boolean;
  canvasElement: HTMLDivElement | null;
}

const QUALITY_CONFIG = {
  standard: { scale: 3, label: "Standard (3×)", description: "Web-ready, crisp display", fileSize: "~500KB" },
  high: { scale: 4, label: "High (4×)", description: "Print-ready, sharp details", fileSize: "~1.5MB" },
  ultra: { scale: 6, label: "Ultra (6×)", description: "Maximum clarity, lossless", fileSize: "~4MB" },
};

export function ExportPreviewDialog({
  open,
  onOpenChange,
  onExport,
  isExporting,
  canvasElement,
}: ExportPreviewDialogProps) {
  const { isPro } = useSubscription();
  const [selectedPreset, setSelectedPreset] = useState<ExportPreset>(EXPORT_PRESETS[0]);
  const [quality, setQuality] = useState<ExportQuality>("high");
  const [format, setFormat] = useState<"png" | "pdf">("png");
  const [transparentBg, setTransparentBg] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Generate preview when dialog opens or canvas changes
  useEffect(() => {
    if (open && canvasElement) {
      generatePreview();
    }
  }, [open, canvasElement]);

  const generatePreview = async () => {
    if (!canvasElement) return;

    // Find the actual infographic canvas
    const target = canvasElement.querySelector(".infographic-canvas") as HTMLElement || canvasElement;

    setIsGeneratingPreview(true);
    try {
      // Wait for fonts to be ready
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const canvas = await toCanvas(target, {
        pixelRatio: 1,
        cacheBust: true,
      });
      setPreviewImage(canvas.toDataURL("image/png"));
    } catch (error) {
      console.error("Preview generation failed:", error);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  // Group presets by platform
  const groupedPresets = {
    instagram: EXPORT_PRESETS.filter(p => p.platform === "instagram"),
    linkedin: EXPORT_PRESETS.filter(p => p.platform === "linkedin"),
    twitter: EXPORT_PRESETS.filter(p => p.platform === "twitter"),
    custom: EXPORT_PRESETS.filter(p => p.platform === "custom"),
  };

  const handleExport = () => {
    onExport(selectedPreset, quality, format, transparentBg);
  };

  // Calculate preview dimensions
  const getPreviewDimensions = () => {
    const maxWidth = 280;
    const maxHeight = 320;

    if (selectedPreset.width === 0) {
      // Original size - use canvas dimensions
      if (!canvasElement) return { width: maxWidth, height: maxHeight };
      const ratio = canvasElement.offsetWidth / canvasElement.offsetHeight;
      if (ratio > maxWidth / maxHeight) {
        return { width: maxWidth, height: maxWidth / ratio };
      }
      return { width: maxHeight * ratio, height: maxHeight };
    }

    const ratio = selectedPreset.width / selectedPreset.height;
    if (ratio > maxWidth / maxHeight) {
      return { width: maxWidth, height: maxWidth / ratio };
    }
    return { width: maxHeight * ratio, height: maxHeight };
  };

  const previewDims = getPreviewDimensions();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-background">
        <DialogHeader>
          <DialogTitle>Export Preview</DialogTitle>
          <DialogDescription>
            Preview your infographic and choose export settings
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Preview Area */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={previewRef}
              className="relative bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden"
              style={{ width: previewDims.width, height: previewDims.height }}
            >
              {isGeneratingPreview ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <p className="text-xs">Generating preview...</p>
                </div>
              ) : previewImage ? (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-white rounded"
                  style={{
                    backgroundImage: `url(${previewImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              ) : (
                <div className="absolute inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-xs font-medium">Preview unavailable</p>
                  </div>
                </div>
              )}

              {/* Crop guides for non-original presets */}
              {selectedPreset.width > 0 && (
                <>
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                </>
              )}
            </div>

            {/* Dimensions info */}
            <div className="text-center">
              <p className="text-sm font-medium">
                {selectedPreset.width > 0
                  ? `${selectedPreset.width} × ${selectedPreset.height}px`
                  : "Original Dimensions"
                }
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedPreset.aspectRatio} aspect ratio
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-5">
            {/* Preset Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Export Preset</Label>
              <Select
                value={selectedPreset.id}
                onValueChange={(id) => setSelectedPreset(EXPORT_PRESETS.find(p => p.id === id)!)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="original">📐 Original Size</SelectItem>

                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    {PLATFORM_ICONS.instagram} Instagram
                  </div>
                  {groupedPresets.instagram.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.width}×{p.height})
                    </SelectItem>
                  ))}

                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    {PLATFORM_ICONS.linkedin} LinkedIn
                  </div>
                  {groupedPresets.linkedin.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.width}×{p.height})
                    </SelectItem>
                  ))}

                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    {PLATFORM_ICONS.twitter} Twitter / X
                  </div>
                  {groupedPresets.twitter.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.width}×{p.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quality Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Export Quality</Label>
              <RadioGroup value={quality} onValueChange={(v) => setQuality(v as ExportQuality)}>
                {(Object.entries(QUALITY_CONFIG) as [ExportQuality, typeof QUALITY_CONFIG.standard][]).map(([key, config]) => (
                  <div
                    key={key}
                    className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors ${quality === key ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                      }`}
                    onClick={() => setQuality(key)}
                  >
                    <RadioGroupItem value={key} id={key} />
                    <div className="flex-1">
                      <Label htmlFor={key} className="cursor-pointer font-medium">
                        {config.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{config.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{config.fileSize}</span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">File Format</Label>
              <div className="flex gap-2">
                <Button
                  variant={format === "png" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat("png")}
                  className="flex-1"
                >
                  <Image className="w-4 h-4 mr-2" />
                  PNG
                </Button>
                <Button
                  variant={format === "pdf" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (!isPro) {
                      toast("PDF Export is a Pro feature", {
                        description: "Upgrade to export as PDF.",
                      });
                      return;
                    }
                    setFormat("pdf");
                  }}
                  className="flex-1 relative"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                  {!isPro && <Lock className="w-3 h-3 ml-2 text-amber-500" />}
                </Button>
              </div>
            </div>

            {/* Background Option - PNG only */}
            {format === "png" && (
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label className="text-sm font-medium">Transparent Background</Label>
                  <p className="text-xs text-muted-foreground">Remove solid background color</p>
                </div>
                <Button
                  variant={transparentBg ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (!isPro) {
                      toast("Transparent background is a Pro feature", {
                        description: "Upgrade to enable this option.",
                      });
                      return;
                    }
                    setTransparentBg(!transparentBg);
                  }}
                >
                  {transparentBg ? "On" : "Off"}
                  {!isPro && <Lock className="w-3 h-3 ml-2 text-amber-500" />}
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export {format.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { QUALITY_CONFIG };
