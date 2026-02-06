export interface ExportPreset {
  id: string;
  name: string;
  platform: "instagram" | "linkedin" | "twitter" | "facebook" | "threads" | "youtube" | "custom";
  width: number;
  height: number;
  aspectRatio: string;
  icon?: string;
}

export type ExportQuality = "standard" | "high" | "ultra";

export const QUALITY_SCALES: Record<ExportQuality, number> = {
  standard: 3,
  high: 4,
  ultra: 6,
};

export const EXPORT_PRESETS: ExportPreset[] = [
  // Custom/Original - first for default
  { id: "original", name: "Original Size", platform: "custom", width: 0, height: 0, aspectRatio: "auto", icon: "📐" },
  
  // Instagram
  { id: "instagram-square", name: "Square Post", platform: "instagram", width: 1080, height: 1080, aspectRatio: "1:1", icon: "📷" },
  { id: "instagram-portrait", name: "Portrait Post", platform: "instagram", width: 1080, height: 1350, aspectRatio: "4:5", icon: "📷" },
  { id: "instagram-story", name: "Story / Reel", platform: "instagram", width: 1080, height: 1920, aspectRatio: "9:16", icon: "📷" },
  { id: "instagram-landscape", name: "Landscape", platform: "instagram", width: 1080, height: 566, aspectRatio: "1.91:1", icon: "📷" },
  
  // Facebook
  { id: "facebook-square", name: "Square Post", platform: "facebook", width: 1200, height: 1200, aspectRatio: "1:1", icon: "📘" },
  { id: "facebook-landscape", name: "Landscape Post", platform: "facebook", width: 1200, height: 630, aspectRatio: "1.91:1", icon: "📘" },
  { id: "facebook-story", name: "Story", platform: "facebook", width: 1080, height: 1920, aspectRatio: "9:16", icon: "📘" },
  { id: "facebook-cover", name: "Cover Photo", platform: "facebook", width: 820, height: 312, aspectRatio: "2.63:1", icon: "📘" },
  { id: "facebook-event", name: "Event Cover", platform: "facebook", width: 1920, height: 1005, aspectRatio: "1.91:1", icon: "📘" },
  
  // LinkedIn
  { id: "linkedin-square", name: "Square Post", platform: "linkedin", width: 1200, height: 1200, aspectRatio: "1:1", icon: "💼" },
  { id: "linkedin-landscape", name: "Landscape Post", platform: "linkedin", width: 1200, height: 627, aspectRatio: "1.91:1", icon: "💼" },
  { id: "linkedin-portrait", name: "Portrait Post", platform: "linkedin", width: 1080, height: 1350, aspectRatio: "4:5", icon: "💼" },
  { id: "linkedin-banner", name: "Profile Banner", platform: "linkedin", width: 1584, height: 396, aspectRatio: "4:1", icon: "💼" },
  { id: "linkedin-article", name: "Article Cover", platform: "linkedin", width: 1200, height: 644, aspectRatio: "1.86:1", icon: "💼" },
  
  // Twitter/X
  { id: "twitter-square", name: "Square Post", platform: "twitter", width: 1200, height: 1200, aspectRatio: "1:1", icon: "𝕏" },
  { id: "twitter-landscape", name: "Landscape Post", platform: "twitter", width: 1600, height: 900, aspectRatio: "16:9", icon: "𝕏" },
  { id: "twitter-portrait", name: "Portrait Post", platform: "twitter", width: 1080, height: 1350, aspectRatio: "4:5", icon: "𝕏" },
  { id: "twitter-header", name: "Header Banner", platform: "twitter", width: 1500, height: 500, aspectRatio: "3:1", icon: "𝕏" },
  
  // Threads
  { id: "threads-square", name: "Square Post", platform: "threads", width: 1080, height: 1080, aspectRatio: "1:1", icon: "🧵" },
  { id: "threads-portrait", name: "Portrait Post", platform: "threads", width: 1080, height: 1350, aspectRatio: "4:5", icon: "🧵" },
  { id: "threads-landscape", name: "Landscape", platform: "threads", width: 1080, height: 566, aspectRatio: "1.91:1", icon: "🧵" },
  
  // YouTube
  { id: "youtube-thumbnail", name: "Thumbnail", platform: "youtube", width: 1280, height: 720, aspectRatio: "16:9", icon: "▶️" },
  { id: "youtube-banner", name: "Channel Banner", platform: "youtube", width: 2560, height: 1440, aspectRatio: "16:9", icon: "▶️" },
  { id: "youtube-short", name: "Short", platform: "youtube", width: 1080, height: 1920, aspectRatio: "9:16", icon: "▶️" },
  { id: "youtube-community", name: "Community Post", platform: "youtube", width: 1200, height: 1200, aspectRatio: "1:1", icon: "▶️" },
];

export const PLATFORM_ICONS: Record<ExportPreset["platform"], string> = {
  instagram: "📷",
  facebook: "📘",
  linkedin: "💼",
  twitter: "𝕏",
  threads: "🧵",
  youtube: "▶️",
  custom: "📐",
};

export const PLATFORM_NAMES: Record<ExportPreset["platform"], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  threads: "Threads",
  youtube: "YouTube",
  custom: "Custom",
};

// Group presets by platform
export const getPresetsByPlatform = () => {
  const platforms = ["instagram", "facebook", "linkedin", "twitter", "threads", "youtube", "custom"] as const;
  return platforms.map(platform => ({
    platform,
    name: PLATFORM_NAMES[platform],
    icon: PLATFORM_ICONS[platform],
    presets: EXPORT_PRESETS.filter(p => p.platform === platform),
  }));
};
