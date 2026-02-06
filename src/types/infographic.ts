import { AvatarCustomization, DEFAULT_AVATAR } from "./avatarCustomization";

export interface KeyPoint {
  id: string;
  text: string;
  isHighlighted: boolean;
}

export type TemplateType =
  | "vertical-story"
  | "report"
  | "presentation"
  | "split-hero"
  | "stats-spotlight"
  | "timeline-flow"
  | "quote-card"
  | "doodly"
  | "doodly-hero"
  | "doodly-split"
  | "doodly-grid";

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  aspectRatio: string;
  maxWidth: string;
  isPremium?: boolean;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "vertical-story",
    name: "Vertical Story",
    description: "Perfect for social media and mobile",
    aspectRatio: "9/16",
    maxWidth: "420px",
  },
  {
    id: "report",
    name: "Report",
    description: "Professional document format",
    aspectRatio: "3/4",
    maxWidth: "560px",
    isPremium: true,
  },
  {
    id: "presentation",
    name: "Presentation",
    description: "Widescreen slide format",
    aspectRatio: "16/9",
    maxWidth: "720px",
  },
  {
    id: "split-hero",
    name: "Split Hero",
    description: "Bold title with dramatic color block",
    aspectRatio: "1/1",
    maxWidth: "560px",
  },
  {
    id: "stats-spotlight",
    name: "Stats Spotlight",
    description: "Large numbers with highlights",
    aspectRatio: "4/5",
    maxWidth: "480px",
    isPremium: true,
  },
  {
    id: "timeline-flow",
    name: "Timeline Flow",
    description: "Connected nodes with flowing line",
    aspectRatio: "9/16",
    maxWidth: "420px",
    isPremium: true,
  },
  {
    id: "quote-card",
    name: "Quote Card",
    description: "Large pull-quote style",
    aspectRatio: "1/1",
    maxWidth: "520px",
  },
  {
    id: "doodly",
    name: "Doodly",
    description: "Hand-drawn Notion-inspired style",
    aspectRatio: "4/5",
    maxWidth: "480px",
  },
  {
    id: "doodly-hero",
    name: "Doodly Hero",
    description: "Centered hero with large illustration",
    aspectRatio: "1/1",
    maxWidth: "480px",
  },
  {
    id: "doodly-split",
    name: "Doodly Split",
    description: "Side-by-side text and illustration",
    aspectRatio: "1/1",
    maxWidth: "520px",
    isPremium: true,
  },
  {
    id: "doodly-grid",
    name: "Doodly Grid",
    description: "Team or feature cards layout",
    aspectRatio: "1/1",
    maxWidth: "520px",
    isPremium: true,
  },
];

export interface FontConfig {
  id: string;
  name: string;
  family: string;
  category: "sans-serif" | "serif" | "display";
  vietnameseOptimized?: boolean;
}

export const GOOGLE_FONTS: FontConfig[] = [
  // Vietnamese-optimized fonts (excellent Vietnamese support)
  { id: "be-vietnam-pro", name: "Be Vietnam Pro", family: "'Be Vietnam Pro', sans-serif", category: "sans-serif", vietnameseOptimized: true },
  { id: "quicksand", name: "Quicksand", family: "'Quicksand', sans-serif", category: "sans-serif", vietnameseOptimized: true },
  { id: "mulish", name: "Mulish", family: "'Mulish', sans-serif", category: "sans-serif", vietnameseOptimized: true },
  { id: "source-sans", name: "Source Sans 3", family: "'Source Sans 3', sans-serif", category: "sans-serif", vietnameseOptimized: true },
  { id: "open-sans", name: "Open Sans", family: "'Open Sans', sans-serif", category: "sans-serif", vietnameseOptimized: true },
  // Standard fonts
  { id: "inter", name: "Inter", family: "'Inter', sans-serif", category: "sans-serif" },
  { id: "poppins", name: "Poppins", family: "'Poppins', sans-serif", category: "sans-serif" },
  { id: "roboto", name: "Roboto", family: "'Roboto', sans-serif", category: "sans-serif" },
  { id: "montserrat", name: "Montserrat", family: "'Montserrat', sans-serif", category: "display" },
  { id: "playfair", name: "Playfair Display", family: "'Playfair Display', serif", category: "serif" },
  { id: "lora", name: "Lora", family: "'Lora', serif", category: "serif" },
  { id: "oswald", name: "Oswald", family: "'Oswald', sans-serif", category: "display" },
  { id: "raleway", name: "Raleway", family: "'Raleway', sans-serif", category: "sans-serif" },
  { id: "merriweather", name: "Merriweather", family: "'Merriweather', serif", category: "serif" },
  { id: "nunito", name: "Nunito", family: "'Nunito', sans-serif", category: "sans-serif" },
];

export type BrandSignatureStyle = "minimal" | "accent" | "boxed" | "underlined";
export type BrandSignatureType = "text" | "logo";

export const BRAND_SIGNATURE_STYLES: { id: BrandSignatureStyle; name: string; description: string }[] = [
  { id: "minimal", name: "Minimal", description: "Subtle italic text" },
  { id: "accent", name: "Accent", description: "Colored brand text" },
  { id: "boxed", name: "Boxed", description: "Text with background" },
  { id: "underlined", name: "Underlined", description: "With accent underline" },
];

// Legacy types (kept for backward compatibility with existing templates)
export type DoodlyCharacterId =
  | "glasses"
  | "curly"
  | "ponytail"
  | "beard"
  | "bun"
  | "doctor"
  | "chef"
  | "developer"
  | "teacher"
  | "artist"
  | "scientist"
  | "nurse"
  | "engineer"
  | "lawyer"
  | "musician"
  | "photographer"
  | "waving"
  | "thinking"
  | "celebrating"
  | "pointing";

export interface InfographicData {
  title: string;
  subtitle: string;
  keyPoints: KeyPoint[];
  brandName: string;
  brandLogo: string | null;
  brandSignatureType: BrandSignatureType;
  accentColor: string;
  template: TemplateType;
  fontFamily: string;
  titleFontSize: number;
  subtitleFontSize: number;
  keyPointsFontSize: number;
  brandSignatureStyle: BrandSignatureStyle;
  brandSignatureSize: number;
  // New modular avatar system
  avatarCustomization: AvatarCustomization;
  // Legacy field for backward compatibility
  doodlyCharacter: DoodlyCharacterId;
}

export const DEFAULT_INFOGRAPHIC: InfographicData = {
  title: "Strategic Insights for Modern Business",
  subtitle: "Key findings from our latest analysis",
  keyPoints: [
    { id: "1", text: "Digital transformation drives 40% revenue growth", isHighlighted: true },
    { id: "2", text: "Customer experience is the top priority for 73% of leaders", isHighlighted: false },
    { id: "3", text: "AI adoption accelerates operational efficiency by 35%", isHighlighted: false },
    { id: "4", text: "Sustainable practices improve brand perception significantly", isHighlighted: false },
    { id: "5", text: "Remote-first strategies increase talent pool access by 5x", isHighlighted: false },
  ],
  brandName: "your branding",
  brandLogo: null,
  brandSignatureType: "text",
  accentColor: "teal",
  template: "vertical-story",
  fontFamily: "inter",
  titleFontSize: 24,
  subtitleFontSize: 12,
  keyPointsFontSize: 12,
  brandSignatureStyle: "minimal",
  brandSignatureSize: 10,
  avatarCustomization: DEFAULT_AVATAR,
  doodlyCharacter: "glasses",
};

export const ACCENT_COLORS = [
  { name: "teal", hsl: "174 62% 47%" },
  { name: "blue", hsl: "217 91% 60%" },
  { name: "indigo", hsl: "239 84% 67%" },
  { name: "violet", hsl: "263 70% 58%" },
  { name: "purple", hsl: "280 68% 55%" },
  { name: "rose", hsl: "346 77% 50%" },
  { name: "red", hsl: "0 72% 51%" },
  { name: "orange", hsl: "25 95% 53%" },
  { name: "amber", hsl: "38 92% 50%" },
  { name: "yellow", hsl: "48 96% 53%" },
  { name: "lime", hsl: "84 81% 44%" },
  { name: "emerald", hsl: "160 84% 39%" },
  { name: "cyan", hsl: "189 94% 43%" },
  { name: "sky", hsl: "199 89% 48%" },
  { name: "slate", hsl: "215 16% 47%" },
  { name: "zinc", hsl: "240 4% 46%" },
] as const;
