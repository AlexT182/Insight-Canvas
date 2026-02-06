import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  EXPORT_PRESETS, 
  getPresetsByPlatform, 
  ExportPreset,
  PLATFORM_ICONS 
} from "@/types/exportPresets";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Check } from "lucide-react";

interface SocialResizePanelProps {
  selectedPreset: ExportPreset | null;
  onPresetChange: (preset: ExportPreset) => void;
}

export function SocialResizePanel({ selectedPreset, onPresetChange }: SocialResizePanelProps) {
  const [openPlatforms, setOpenPlatforms] = useState<string[]>(["instagram"]);
  const platformGroups = getPresetsByPlatform();

  const togglePlatform = (platform: string) => {
    setOpenPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs font-medium">Resize for Social Media</Label>
        <p className="text-[10px] text-muted-foreground">
          Select a platform preset to resize your design
        </p>
      </div>

      {/* Current Selection Badge */}
      {selectedPreset && selectedPreset.id !== "original" && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20">
          <span className="text-sm">{PLATFORM_ICONS[selectedPreset.platform]}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{selectedPreset.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {selectedPreset.width} × {selectedPreset.height}px
            </p>
          </div>
          <Check className="w-4 h-4 text-primary flex-shrink-0" />
        </div>
      )}

      {/* Platform Groups */}
      <ScrollArea className="h-[calc(100vh-340px)]">
        <div className="space-y-1 pr-3">
          {platformGroups.map((group) => (
            <Collapsible
              key={group.platform}
              open={openPlatforms.includes(group.platform)}
              onOpenChange={() => togglePlatform(group.platform)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">{group.icon}</span>
                  <span className="text-xs font-medium">{group.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    ({group.presets.length})
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  openPlatforms.includes(group.platform) && "rotate-180"
                )} />
              </CollapsibleTrigger>
              
              <CollapsibleContent className="pt-1 pb-2">
                <div className="grid grid-cols-1 gap-1 pl-6">
                  {group.presets.map((preset) => {
                    const isSelected = selectedPreset?.id === preset.id;
                    
                    return (
                      <button
                        key={preset.id}
                        onClick={() => onPresetChange(preset)}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md border text-left transition-all",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-border bg-background hover:border-primary/50 hover:bg-muted/30"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{preset.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {preset.width === 0 ? "Auto" : `${preset.width} × ${preset.height}`}
                            {preset.aspectRatio !== "auto" && ` • ${preset.aspectRatio}`}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>

      {/* Dimension Preview */}
      {selectedPreset && selectedPreset.id !== "original" && (
        <div className="p-3 rounded-md border bg-muted/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Output Dimensions
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Aspect Ratio Visual */}
            <div 
              className="border-2 border-primary/60 rounded bg-primary/10 flex items-center justify-center"
              style={{
                width: selectedPreset.width > selectedPreset.height ? 48 : Math.round(48 * (selectedPreset.width / selectedPreset.height)),
                height: selectedPreset.height > selectedPreset.width ? 48 : Math.round(48 * (selectedPreset.height / selectedPreset.width)),
              }}
            >
              <span className="text-[8px] font-mono text-primary/80">
                {selectedPreset.aspectRatio}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {selectedPreset.width} × {selectedPreset.height}
              </p>
              <p className="text-[10px] text-muted-foreground">
                pixels at {selectedPreset.aspectRatio} ratio
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
