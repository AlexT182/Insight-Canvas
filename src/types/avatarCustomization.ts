// Avatar Customization Types
// Modular system for building custom Doodly avatars

export type AvatarStyle = "simple" | "detailed" | "minimal" | "cartoon";

export type HairstyleType = 
  | "none" 
  | "short" 
  | "curly" 
  | "ponytail" 
  | "bun" 
  | "long" 
  | "spiky" 
  | "braids";

export type FaceType = "round" | "oval" | "square";

export type EyeStyle = "normal" | "glasses" | "happy" | "wink" | "closed";

export type MouthStyle = "smile" | "grin" | "neutral" | "open" | "smirk";

export type AccessoryType = 
  | "none" 
  | "hat" 
  | "headphones" 
  | "bow" 
  | "headband" 
  | "chef-hat" 
  | "stethoscope"
  | "glasses";

export type ClothingStyle = "casual" | "professional" | "creative" | "sporty";

export interface AvatarCustomization {
  style: AvatarStyle;
  hairstyle: HairstyleType;
  hairColor: "black" | "brown" | "blonde" | "red" | "gray";
  faceType: FaceType;
  eyeStyle: EyeStyle;
  mouthStyle: MouthStyle;
  accessory: AccessoryType;
  clothing: ClothingStyle;
  showBlush: boolean;
}

export const DEFAULT_AVATAR: AvatarCustomization = {
  style: "simple",
  hairstyle: "short",
  hairColor: "black",
  faceType: "round",
  eyeStyle: "normal",
  mouthStyle: "smile",
  accessory: "none",
  clothing: "casual",
  showBlush: true,
};

// Avatar style presets for quick selection
export const AVATAR_STYLE_PRESETS: { id: AvatarStyle; name: string; description: string }[] = [
  { id: "simple", name: "Simple", description: "Clean & minimal look" },
  { id: "detailed", name: "Detailed", description: "More expressive features" },
  { id: "minimal", name: "Minimal", description: "Ultra-clean design" },
  { id: "cartoon", name: "Cartoon", description: "Fun & playful style" },
];

export const HAIRSTYLE_OPTIONS: { id: HairstyleType; name: string }[] = [
  { id: "none", name: "Bald" },
  { id: "short", name: "Short" },
  { id: "curly", name: "Curly" },
  { id: "ponytail", name: "Ponytail" },
  { id: "bun", name: "Bun" },
  { id: "long", name: "Long" },
  { id: "spiky", name: "Spiky" },
  { id: "braids", name: "Braids" },
];

export const EYE_STYLE_OPTIONS: { id: EyeStyle; name: string }[] = [
  { id: "normal", name: "Normal" },
  { id: "glasses", name: "Glasses" },
  { id: "happy", name: "Happy" },
  { id: "wink", name: "Wink" },
  { id: "closed", name: "Closed" },
];

export const MOUTH_STYLE_OPTIONS: { id: MouthStyle; name: string }[] = [
  { id: "smile", name: "Smile" },
  { id: "grin", name: "Big Grin" },
  { id: "neutral", name: "Neutral" },
  { id: "open", name: "Open" },
  { id: "smirk", name: "Smirk" },
];

export const ACCESSORY_OPTIONS: { id: AccessoryType; name: string }[] = [
  { id: "none", name: "None" },
  { id: "hat", name: "Hat" },
  { id: "headphones", name: "Headphones" },
  { id: "bow", name: "Bow" },
  { id: "headband", name: "Headband" },
  { id: "chef-hat", name: "Chef Hat" },
  { id: "stethoscope", name: "Stethoscope" },
  { id: "glasses", name: "Sunglasses" },
];

export const CLOTHING_OPTIONS: { id: ClothingStyle; name: string }[] = [
  { id: "casual", name: "Casual" },
  { id: "professional", name: "Professional" },
  { id: "creative", name: "Creative" },
  { id: "sporty", name: "Sporty" },
];
