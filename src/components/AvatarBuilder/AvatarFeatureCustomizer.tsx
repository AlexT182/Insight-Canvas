import * as React from "react";
import { 
  AvatarCustomization, 
  HAIRSTYLE_OPTIONS, 
  EYE_STYLE_OPTIONS, 
  MOUTH_STYLE_OPTIONS, 
  ACCESSORY_OPTIONS,
  HairstyleType,
  EyeStyle,
  MouthStyle,
  AccessoryType
} from "@/types/avatarCustomization";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AvatarFeatureCustomizerProps {
  config: AvatarCustomization;
  onChange: (config: AvatarCustomization) => void;
}

interface FeatureSelectorProps<T extends string> {
  label: string;
  options: { id: T; name: string }[];
  value: T;
  onChange: (value: T) => void;
}

function FeatureSelector<T extends string>({ label, options, value, onChange }: FeatureSelectorProps<T>) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all border",
              value === option.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:border-primary/50 hover:bg-muted"
            )}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AvatarFeatureCustomizer({ config, onChange }: AvatarFeatureCustomizerProps) {
  const updateFeature = <K extends keyof AvatarCustomization>(
    feature: K,
    value: AvatarCustomization[K]
  ) => {
    onChange({ ...config, [feature]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium mb-1">Customize Features</p>
        <p className="text-[10px] text-muted-foreground">Adjust details to create your unique avatar</p>
      </div>

      {/* Hairstyle */}
      <FeatureSelector<HairstyleType>
        label="Hairstyle"
        options={HAIRSTYLE_OPTIONS}
        value={config.hairstyle}
        onChange={(value) => updateFeature("hairstyle", value)}
      />

      {/* Eyes */}
      <FeatureSelector<EyeStyle>
        label="Eyes"
        options={EYE_STYLE_OPTIONS}
        value={config.eyeStyle}
        onChange={(value) => updateFeature("eyeStyle", value)}
      />

      {/* Mouth */}
      <FeatureSelector<MouthStyle>
        label="Expression"
        options={MOUTH_STYLE_OPTIONS}
        value={config.mouthStyle}
        onChange={(value) => updateFeature("mouthStyle", value)}
      />

      {/* Accessories */}
      <FeatureSelector<AccessoryType>
        label="Accessories"
        options={ACCESSORY_OPTIONS}
        value={config.accessory}
        onChange={(value) => updateFeature("accessory", value)}
      />

      {/* Blush Toggle */}
      <div className="flex items-center justify-between pt-2 border-t">
        <div>
          <Label htmlFor="blush" className="text-xs font-medium">Show Blush</Label>
          <p className="text-[10px] text-muted-foreground">Add rosy cheeks</p>
        </div>
        <Switch
          id="blush"
          checked={config.showBlush}
          onCheckedChange={(checked) => updateFeature("showBlush", checked)}
        />
      </div>
    </div>
  );
}
