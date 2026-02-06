import * as React from "react";
import { AvatarCustomization, DEFAULT_AVATAR, AvatarStyle } from "@/types/avatarCustomization";
import { AvatarPreview } from "./AvatarPreview";
import { AvatarStyleSelector } from "./AvatarStyleSelector";
import { AvatarFeatureCustomizer } from "./AvatarFeatureCustomizer";
import { Separator } from "@/components/ui/separator";

interface AvatarBuilderProps {
  value: AvatarCustomization;
  onChange: (value: AvatarCustomization) => void;
}

// Preset configurations for each style
const STYLE_PRESETS: Record<AvatarStyle, Partial<AvatarCustomization>> = {
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

export function AvatarBuilder({ value, onChange }: AvatarBuilderProps) {
  const handleStyleChange = (style: AvatarStyle) => {
    // Apply the preset configuration for the selected style
    onChange({
      ...value,
      style,
      ...STYLE_PRESETS[style],
    });
  };

  return (
    <div className="space-y-4">
      {/* Live Preview */}
      <div className="flex justify-center py-3 bg-muted/30 rounded-xl">
        <AvatarPreview config={value} size={100} />
      </div>

      {/* Step 1: Choose Style */}
      <AvatarStyleSelector 
        value={value.style} 
        onChange={handleStyleChange} 
      />

      <Separator />

      {/* Step 2: Customize Features */}
      <AvatarFeatureCustomizer 
        config={value} 
        onChange={onChange} 
      />
    </div>
  );
}

export { AvatarPreview } from "./AvatarPreview";
export { DEFAULT_AVATAR } from "@/types/avatarCustomization";
export type { AvatarCustomization } from "@/types/avatarCustomization";
