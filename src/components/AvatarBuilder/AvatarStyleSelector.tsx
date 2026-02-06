import * as React from "react";
import { AvatarStyle, AVATAR_STYLE_PRESETS, AvatarCustomization, DEFAULT_AVATAR } from "@/types/avatarCustomization";
import { cn } from "@/lib/utils";
import { AvatarPreview } from "./AvatarPreview";

interface AvatarStyleSelectorProps {
  value: AvatarStyle;
  onChange: (style: AvatarStyle) => void;
}

// Preset configurations for each style
const STYLE_CONFIGS: Record<AvatarStyle, Partial<AvatarCustomization>> = {
  simple: {
    hairstyle: "short",
    eyeStyle: "normal",
    mouthStyle: "smile",
    accessory: "none",
    showBlush: true,
  },
  detailed: {
    hairstyle: "curly",
    eyeStyle: "glasses",
    mouthStyle: "grin",
    accessory: "none",
    showBlush: true,
  },
  minimal: {
    hairstyle: "none",
    eyeStyle: "normal",
    mouthStyle: "neutral",
    accessory: "none",
    showBlush: false,
  },
  cartoon: {
    hairstyle: "spiky",
    eyeStyle: "happy",
    mouthStyle: "grin",
    accessory: "bow",
    showBlush: true,
  },
};

export function AvatarStyleSelector({ value, onChange }: AvatarStyleSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium mb-1">Choose Avatar Style</p>
        <p className="text-[10px] text-muted-foreground">Select a preset style to start customizing</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {AVATAR_STYLE_PRESETS.map((preset) => {
          const previewConfig = { ...DEFAULT_AVATAR, ...STYLE_CONFIGS[preset.id] };
          
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all bg-white",
                value === preset.id
                  ? "border-primary ring-2 ring-primary/20 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
            >
              <AvatarPreview config={previewConfig} size={56} />
              <div className="text-center">
                <p className="text-xs font-medium">{preset.name}</p>
                <p className="text-[9px] text-muted-foreground">{preset.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
