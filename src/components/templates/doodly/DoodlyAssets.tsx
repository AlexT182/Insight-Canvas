import * as React from "react";

/**
 * Doodly Assets Collection - Notion-inspired hand-drawn SVG components
 * All components are black & white with optional accent color support
 */

interface DoodlyIconProps {
  className?: string;
  size?: number;
  accentColor?: string;
}

// ============================================
// CHARACTERS
// ============================================

export function CharacterGlasses({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="20" stroke="black" strokeWidth="2.5" fill="white" />
      <path d="M12 22C12 12 20 6 28 6C36 6 44 12 44 22" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M44 22C46 18 48 20 48 24C48 28 44 26 44 26" stroke="black" strokeWidth="2" fill="black" />
      <circle cx="22" cy="28" r="4" stroke="black" strokeWidth="2" fill="white" />
      <circle cx="34" cy="28" r="4" stroke="black" strokeWidth="2" fill="white" />
      <line x1="26" y1="28" x2="30" y2="28" stroke="black" strokeWidth="2" />
      <circle cx="23" cy="28" r="1.5" fill="black" />
      <circle cx="35" cy="28" r="1.5" fill="black" />
      <path d="M22 36C22 36 25 40 28 40C31 40 34 36 34 36" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="34" r="2" fill="#FFB5B5" opacity="0.6" />
      <circle cx="39" cy="34" r="2" fill="#FFB5B5" opacity="0.6" />
    </svg>
  );
}

export function CharacterCurlyHair({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="18" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Curly hair */}
      <circle cx="14" cy="18" r="6" stroke="black" strokeWidth="2" fill="black" />
      <circle cx="24" cy="12" r="6" stroke="black" strokeWidth="2" fill="black" />
      <circle cx="34" cy="12" r="6" stroke="black" strokeWidth="2" fill="black" />
      <circle cx="42" cy="18" r="6" stroke="black" strokeWidth="2" fill="black" />
      <circle cx="10" cy="28" r="5" stroke="black" strokeWidth="2" fill="black" />
      <circle cx="46" cy="28" r="5" stroke="black" strokeWidth="2" fill="black" />
      {/* Eyes */}
      <circle cx="22" cy="28" r="2" fill="black" />
      <circle cx="34" cy="28" r="2" fill="black" />
      {/* Smile */}
      <path d="M22 38C22 38 25 42 28 42C31 42 34 38 34 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <circle cx="16" cy="34" r="2.5" fill="#FFB5B5" opacity="0.5" />
      <circle cx="40" cy="34" r="2.5" fill="#FFB5B5" opacity="0.5" />
    </svg>
  );
}

export function CharacterPonytail({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Hair with ponytail */}
      <path d="M12 26C12 14 18 8 28 8C38 8 44 14 44 26" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M44 20C48 16 52 18 52 26C52 34 48 38 44 36" stroke="black" strokeWidth="2.5" fill="black" />
      <ellipse cx="52" cy="40" rx="4" ry="8" stroke="black" strokeWidth="2" fill="black" />
      {/* Eyes closed happy */}
      <path d="M20 28C20 28 22 26 24 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 28C32 28 34 26 36 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Big smile */}
      <path d="M20 36C20 36 24 42 28 42C32 42 36 36 36 36" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <circle cx="16" cy="34" r="2" fill="#FFB5B5" opacity="0.6" />
      <circle cx="40" cy="34" r="2" fill="#FFB5B5" opacity="0.6" />
    </svg>
  );
}

export function CharacterBeard({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="26" r="16" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Short hair */}
      <path d="M12 22C12 12 18 6 28 6C38 6 44 12 44 22" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Beard */}
      <path d="M14 30C14 30 16 48 28 48C40 48 42 30 42 30" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Eyes */}
      <circle cx="22" cy="24" r="2" fill="black" />
      <circle cx="34" cy="24" r="2" fill="black" />
      {/* Eyebrows */}
      <path d="M18 20L26 18" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 18L38 20" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CharacterBun({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="32" r="16" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Hair */}
      <path d="M14 28C14 18 20 12 28 12C36 12 42 18 42 28" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Bun on top */}
      <circle cx="28" cy="8" r="8" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Eyes */}
      <circle cx="22" cy="30" r="2" fill="black" />
      <circle cx="34" cy="30" r="2" fill="black" />
      {/* Small smile */}
      <path d="M24 38C24 38 26 40 28 40C30 40 32 38 32 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <circle cx="16" cy="36" r="2" fill="#FFB5B5" opacity="0.5" />
      <circle cx="40" cy="36" r="2" fill="#FFB5B5" opacity="0.5" />
    </svg>
  );
}

// ============================================
// DECORATIVE ICONS
// ============================================

export function IconHashtag({ className = "", size = 24 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

export function IconStar({ className = "", size = 24 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="black">
      <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
    </svg>
  );
}

export function IconStarOutline({ className = "", size = 24 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
      <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
    </svg>
  );
}

export function IconHeart({ className = "", size = 24, accentColor }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={accentColor || "black"}>
      <path d="M12 21C12 21 3 13 3 8C3 4 6 2 9 2C11 2 12 4 12 4C12 4 13 2 15 2C18 2 21 4 21 8C21 13 12 21 12 21Z" />
    </svg>
  );
}

export function IconHeartOutline({ className = "", size = 24 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
      <path d="M12 21C12 21 3 13 3 8C3 4 6 2 9 2C11 2 12 4 12 4C12 4 13 2 15 2C18 2 21 4 21 8C21 13 12 21 12 21Z" />
    </svg>
  );
}

export function IconLightning({ className = "", size = 24 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="black">
      <polygon points="13,2 3,14 11,14 8,22 18,10 11,10" />
    </svg>
  );
}

export function IconSpeechBubble({ className = "", size = 32 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path 
        d="M6 6C6 4.34 7.34 3 9 3H23C24.66 3 26 4.34 26 6V18C26 19.66 24.66 21 23 21H13L7 27V21H9C7.34 21 6 19.66 6 18V6Z" 
        stroke="black" 
        strokeWidth="2"
        fill="white"
      />
    </svg>
  );
}

export function IconSpeechBubbleHeart({ className = "", size = 32 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path 
        d="M6 6C6 4.34 7.34 3 9 3H23C24.66 3 26 4.34 26 6V18C26 19.66 24.66 21 23 21H13L7 27V21H9C7.34 21 6 19.66 6 18V6Z" 
        stroke="black" 
        strokeWidth="2"
        fill="white"
      />
      <path d="M16 8C15 8 14 9 14 10.5C14 13 16 15 16 15C16 15 18 13 18 10.5C18 9 17 8 16 8Z" fill="black" />
    </svg>
  );
}

export function IconArrowCurved({ className = "", size = 24 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16C4 10 8 6 14 6H20" />
      <path d="M16 2L20 6L16 10" />
    </svg>
  );
}

export function IconSparkle({ className = "", size = 16 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="black" strokeWidth="1.5">
      <line x1="8" y1="1" x2="8" y2="15" />
      <line x1="1" y1="8" x2="15" y2="8" />
      <line x1="3" y1="3" x2="13" y2="13" />
      <line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  );
}

export function IconDots({ className = "", size = 24 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="black">
      <circle cx="4" cy="4" r="2" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="20" cy="4" r="2" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="20" cy="12" r="2" />
      <circle cx="4" cy="20" r="2" />
      <circle cx="12" cy="20" r="2" />
      <circle cx="20" cy="20" r="2" />
    </svg>
  );
}

export function IconFlowerPot({ className = "", size = 32 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M10 28H22L20 20H12L10 28Z" stroke="black" strokeWidth="2" fill="white" />
      <ellipse cx="16" cy="20" rx="6" ry="3" stroke="black" strokeWidth="2" fill="white" />
      <path d="M16 17C16 17 14 14 14 12C14 10 15 9 16 9C17 9 18 10 18 12C18 14 16 17 16 17Z" stroke="black" strokeWidth="1.5" fill="white" />
      <path d="M16 14C14 13 12 14 12 14" stroke="black" strokeWidth="1.5" fill="none" />
      <path d="M16 14C18 13 20 14 20 14" stroke="black" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="6" r="2" fill="black" />
    </svg>
  );
}

export function IconPlant({ className = "", size = 40 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Pot */}
      <path d="M12 36H28L26 28H14L12 36Z" stroke="black" strokeWidth="2" fill="white" />
      <rect x="11" y="26" width="18" height="4" rx="1" stroke="black" strokeWidth="2" fill="white" />
      {/* Stem */}
      <path d="M20 26V16" stroke="black" strokeWidth="2" />
      {/* Leaves */}
      <path d="M20 20C16 18 14 14 14 10C18 10 22 14 20 20Z" stroke="black" strokeWidth="2" fill="white" />
      <path d="M20 16C24 14 28 10 28 6C24 6 20 10 20 16Z" stroke="black" strokeWidth="2" fill="white" />
      <path d="M16 14C16 14 18 16 20 16" stroke="black" strokeWidth="1.5" />
      <path d="M24 10C24 10 22 12 20 12" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

export function IconCoffee({ className = "", size = 32 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 12H22V24C22 26.2 20.2 28 18 28H10C7.8 28 6 26.2 6 24V12Z" stroke="black" strokeWidth="2" fill="white" />
      <path d="M22 14H24C26.2 14 28 15.8 28 18C28 20.2 26.2 22 24 22H22" stroke="black" strokeWidth="2" />
      <path d="M10 6C10 6 10 8 12 8C14 8 14 6 14 6" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4C16 4 16 6 18 6C20 6 20 4 20 4" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconLaptop({ className = "", size = 40 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="8" width="28" height="20" rx="2" stroke="black" strokeWidth="2" fill="white" />
      <rect x="10" y="12" width="20" height="12" stroke="black" strokeWidth="1.5" fill="none" />
      <path d="M2 28H38L36 32H4L2 28Z" stroke="black" strokeWidth="2" fill="white" />
      <ellipse cx="20" cy="30" rx="4" ry="1" fill="black" opacity="0.3" />
    </svg>
  );
}

export function IconMagnifier({ className = "", size = 28 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="12" cy="12" r="8" stroke="black" strokeWidth="2.5" fill="white" />
      <line x1="18" y1="18" x2="26" y2="26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="10" cy="10" r="2" fill="white" stroke="black" strokeWidth="1" />
    </svg>
  );
}

export function IconPencil({ className = "", size = 28 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M4 24L6 18L20 4L24 8L10 22L4 24Z" stroke="black" strokeWidth="2" fill="white" />
      <line x1="16" y1="8" x2="20" y2="12" stroke="black" strokeWidth="2" />
      <path d="M4 24L6 20" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ============================================
// WAVY LINES & DIVIDERS
// ============================================

export function WavyDivider({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 12" preserveAspectRatio="none">
      <path 
        d="M0 6C20 2 40 10 60 6C80 2 100 10 120 6C140 2 160 10 180 6C200 2 200 6 200 6" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function ScribbleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 12" preserveAspectRatio="none">
      <path 
        d="M2 8C30 4 60 10 100 6C140 2 170 9 198 5" 
        stroke="black" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// ============================================
// PROFESSIONAL CHARACTERS
// ============================================

export function CharacterDoctor({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Hair */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Stethoscope */}
      <path d="M16 42C16 42 18 48 24 48" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="50" r="3" stroke="black" strokeWidth="1.5" fill="white" />
      <path d="M40 42C40 42 38 46 36 46" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Head mirror */}
      <circle cx="28" cy="8" r="5" stroke="black" strokeWidth="2" fill="white" />
      <circle cx="28" cy="8" r="2" fill="black" opacity="0.3" />
      {/* Eyes */}
      <circle cx="22" cy="28" r="2" fill="black" />
      <circle cx="34" cy="28" r="2" fill="black" />
      {/* Smile */}
      <path d="M22 38C22 38 25 42 28 42C31 42 34 38 34 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function CharacterChef({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="32" r="16" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Chef hat */}
      <ellipse cx="28" cy="10" rx="14" ry="8" stroke="black" strokeWidth="2" fill="white" />
      <rect x="16" y="10" width="24" height="12" stroke="black" strokeWidth="2" fill="white" />
      <circle cx="18" cy="8" r="5" stroke="black" strokeWidth="2" fill="white" />
      <circle cx="28" cy="5" r="5" stroke="black" strokeWidth="2" fill="white" />
      <circle cx="38" cy="8" r="5" stroke="black" strokeWidth="2" fill="white" />
      {/* Eyes closed happy */}
      <path d="M21 30C21 30 23 28 25 30" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 30C31 30 33 28 35 30" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Mustache */}
      <path d="M22 38C22 38 25 36 28 36C31 36 34 38 34 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <circle cx="17" cy="36" r="2" fill="#FFB5B5" opacity="0.5" />
      <circle cx="39" cy="36" r="2" fill="#FFB5B5" opacity="0.5" />
    </svg>
  );
}

export function CharacterDeveloper({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="18" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Messy hair */}
      <path d="M12 22C12 14 18 6 28 6C38 6 44 14 44 22" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M16 12L14 6" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 10L22 4" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 10L36 4" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 12L44 8" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Big glasses */}
      <rect x="14" y="22" width="12" height="10" rx="2" stroke="black" strokeWidth="2" fill="white" />
      <rect x="30" y="22" width="12" height="10" rx="2" stroke="black" strokeWidth="2" fill="white" />
      <line x1="26" y1="27" x2="30" y2="27" stroke="black" strokeWidth="2" />
      {/* Eyes behind glasses */}
      <circle cx="20" cy="27" r="2" fill="black" />
      <circle cx="36" cy="27" r="2" fill="black" />
      {/* Small smile */}
      <path d="M24 38C24 38 26 40 28 40C30 40 32 38 32 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Headphones */}
      <path d="M10 26C8 26 6 28 6 32C6 36 8 38 10 38" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 26C48 26 50 28 50 32C50 36 48 38 46 38" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 26C10 18 18 10 28 10C38 10 46 18 46 26" stroke="black" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function CharacterTeacher({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Neat hair with bun */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      <ellipse cx="28" cy="8" rx="6" ry="4" stroke="black" strokeWidth="2" fill="black" />
      {/* Reading glasses */}
      <ellipse cx="21" cy="28" rx="5" ry="4" stroke="black" strokeWidth="1.5" fill="white" />
      <ellipse cx="35" cy="28" rx="5" ry="4" stroke="black" strokeWidth="1.5" fill="white" />
      <line x1="26" y1="28" x2="30" y2="28" stroke="black" strokeWidth="1.5" />
      <line x1="16" y1="26" x2="12" y2="24" stroke="black" strokeWidth="1.5" />
      <line x1="40" y1="26" x2="44" y2="24" stroke="black" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="21" cy="28" r="1.5" fill="black" />
      <circle cx="35" cy="28" r="1.5" fill="black" />
      {/* Warm smile */}
      <path d="M22 38C22 38 25 42 28 42C31 42 34 38 34 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Book/pointer */}
      <rect x="44" y="40" width="8" height="10" stroke="black" strokeWidth="1.5" fill="white" />
      <line x1="46" y1="43" x2="50" y2="43" stroke="black" strokeWidth="1" />
      <line x1="46" y1="46" x2="50" y2="46" stroke="black" strokeWidth="1" />
    </svg>
  );
}

export function CharacterArtist({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Beret */}
      <ellipse cx="28" cy="14" rx="14" ry="6" stroke="black" strokeWidth="2" fill="black" />
      <circle cx="28" cy="8" r="3" stroke="black" strokeWidth="2" fill="black" />
      <path d="M14 14C14 14 18 20 28 20C38 20 42 14 42 14" stroke="black" strokeWidth="2" />
      {/* Expressive eyes */}
      <circle cx="22" cy="28" r="3" fill="black" />
      <circle cx="34" cy="28" r="3" fill="black" />
      <circle cx="23" cy="27" r="1" fill="white" />
      <circle cx="35" cy="27" r="1" fill="white" />
      {/* Creative smile */}
      <path d="M20 38C20 38 24 44 28 44C32 44 36 38 36 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Paint brush */}
      <line x1="46" y1="36" x2="52" y2="48" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="53" cy="50" rx="3" ry="2" fill="black" />
      {/* Paint splatter */}
      <circle cx="8" cy="42" r="3" fill="#FFB5B5" />
      <circle cx="12" cy="38" r="2" fill="#B5D4FF" />
    </svg>
  );
}

export function CharacterScientist({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Wild Einstein hair */}
      <path d="M10 28C8 20 14 10 28 10C42 10 48 20 46 28" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M10 24C6 22 4 26 6 30" stroke="black" strokeWidth="2" fill="black" />
      <path d="M46 24C50 22 52 26 50 30" stroke="black" strokeWidth="2" fill="black" />
      <path d="M18 10C16 6 20 4 22 6" stroke="black" strokeWidth="2" fill="black" />
      <path d="M38 10C40 6 36 4 34 6" stroke="black" strokeWidth="2" fill="black" />
      {/* Lab goggles */}
      <ellipse cx="21" cy="28" rx="6" ry="5" stroke="black" strokeWidth="2" fill="white" />
      <ellipse cx="35" cy="28" rx="6" ry="5" stroke="black" strokeWidth="2" fill="white" />
      <rect x="26" y="26" width="4" height="4" fill="black" />
      {/* Eyes */}
      <circle cx="21" cy="28" r="2" fill="black" />
      <circle cx="35" cy="28" r="2" fill="black" />
      {/* Excited expression */}
      <ellipse cx="28" cy="40" rx="4" ry="3" stroke="black" strokeWidth="2" fill="white" />
      {/* Flask */}
      <path d="M48 44L52 52H44L48 44Z" stroke="black" strokeWidth="1.5" fill="white" />
      <circle cx="48" cy="50" r="2" fill="#B5FFB5" />
    </svg>
  );
}

// ============================================
// NEW PROFESSIONAL CHARACTERS
// ============================================

export function CharacterNurse({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Hair */}
      <path d="M14 28C14 18 20 12 28 12C36 12 42 18 42 28" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Nurse cap */}
      <rect x="18" y="6" width="20" height="10" rx="2" stroke="black" strokeWidth="2" fill="white" />
      <path d="M26 8V14M23 11H29" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="22" cy="28" r="2" fill="black" />
      <circle cx="34" cy="28" r="2" fill="black" />
      {/* Warm smile */}
      <path d="M22 38C22 38 25 42 28 42C31 42 34 38 34 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Stethoscope */}
      <path d="M18 44C18 48 22 50 26 50" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="51" r="2" stroke="black" strokeWidth="1.5" fill="white" />
      {/* Blush */}
      <circle cx="16" cy="34" r="2" fill="#FFB5B5" opacity="0.5" />
      <circle cx="40" cy="34" r="2" fill="#FFB5B5" opacity="0.5" />
    </svg>
  );
}

export function CharacterEngineer({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Short hair */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Hard hat */}
      <ellipse cx="28" cy="10" rx="16" ry="6" stroke="black" strokeWidth="2" fill="white" />
      <rect x="12" y="6" width="32" height="6" rx="1" stroke="black" strokeWidth="2" fill="white" />
      <line x1="28" y1="2" x2="28" y2="6" stroke="black" strokeWidth="2" />
      {/* Safety glasses */}
      <rect x="16" y="24" width="10" height="7" rx="1" stroke="black" strokeWidth="1.5" fill="white" />
      <rect x="30" y="24" width="10" height="7" rx="1" stroke="black" strokeWidth="1.5" fill="white" />
      <line x1="26" y1="27" x2="30" y2="27" stroke="black" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="21" cy="27" r="1.5" fill="black" />
      <circle cx="35" cy="27" r="1.5" fill="black" />
      {/* Determined smile */}
      <path d="M24 38C24 38 26 40 28 40C30 40 32 38 32 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Wrench */}
      <path d="M46 44L50 48M48 42L52 46" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="42" r="3" stroke="black" strokeWidth="1.5" fill="white" />
    </svg>
  );
}

export function CharacterLawyer({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Neat slicked hair */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M14 22C14 22 20 20 28 20C36 20 42 22 42 22" stroke="black" strokeWidth="2" />
      {/* Sophisticated glasses */}
      <rect x="16" y="25" width="10" height="8" rx="1" stroke="black" strokeWidth="1.5" fill="white" />
      <rect x="30" y="25" width="10" height="8" rx="1" stroke="black" strokeWidth="1.5" fill="white" />
      <line x1="26" y1="29" x2="30" y2="29" stroke="black" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="21" cy="29" r="1.5" fill="black" />
      <circle cx="35" cy="29" r="1.5" fill="black" />
      {/* Confident expression */}
      <path d="M24 40C24 40 26 42 28 42C30 42 32 40 32 40" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Tie */}
      <path d="M28 48V54M25 52L28 56L31 52" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Briefcase */}
      <rect x="44" y="42" width="10" height="8" rx="1" stroke="black" strokeWidth="1.5" fill="white" />
      <line x1="46" y1="42" x2="46" y2="40" stroke="black" strokeWidth="1.5" />
      <line x1="52" y1="42" x2="52" y2="40" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

export function CharacterMusician({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Long flowing hair */}
      <path d="M12 28C12 16 18 8 28 8C38 8 44 16 44 28" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M12 28C10 32 10 40 14 46" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M44 28C46 32 46 40 42 46" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Closed happy eyes */}
      <path d="M20 28C20 28 22 26 24 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 28C32 28 34 26 36 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Singing mouth */}
      <ellipse cx="28" cy="40" rx="4" ry="3" stroke="black" strokeWidth="2" fill="white" />
      {/* Music notes */}
      <path d="M48 20C48 16 52 16 52 20V28" stroke="black" strokeWidth="1.5" />
      <circle cx="48" cy="28" r="3" fill="black" />
      <path d="M4 24C4 20 8 20 8 24V32" stroke="black" strokeWidth="1.5" />
      <circle cx="4" cy="32" r="3" fill="black" />
    </svg>
  );
}

export function CharacterPhotographer({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Messy creative hair */}
      <path d="M12 24C12 14 18 8 28 8C38 8 44 14 44 24" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M16 10L12 4" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 10L44 4" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* One eye closed (taking photo) */}
      <circle cx="22" cy="28" r="2" fill="black" />
      <path d="M32 28L38 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Focused expression */}
      <path d="M24 40C24 40 26 38 28 38C30 38 32 40 32 40" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Camera */}
      <rect x="42" y="32" width="12" height="10" rx="2" stroke="black" strokeWidth="1.5" fill="white" />
      <circle cx="48" cy="37" r="3" stroke="black" strokeWidth="1.5" fill="white" />
      <rect x="45" y="30" width="6" height="3" rx="1" stroke="black" strokeWidth="1" fill="white" />
      {/* Camera strap */}
      <path d="M42 34C38 34 36 38 36 42" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

// ============================================
// CHARACTER POSES/EXPRESSIONS
// ============================================

export function CharacterWaving({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Simple hair */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Happy eyes */}
      <path d="M20 28C20 28 22 26 24 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 28C32 28 34 26 36 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Big smile */}
      <path d="M20 38C20 38 24 44 28 44C32 44 36 38 36 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Waving arm */}
      <path d="M46 24C48 20 52 18 54 22" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 22C54 18 56 16 56 16" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 22C56 20 58 20 58 20" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 22C56 24 58 24 58 24" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="16" cy="36" r="2.5" fill="#FFB5B5" opacity="0.5" />
      <circle cx="40" cy="36" r="2.5" fill="#FFB5B5" opacity="0.5" />
    </svg>
  );
}

export function CharacterThinking({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Hair */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Thinking eyes - looking up */}
      <circle cx="22" cy="26" r="2" fill="black" />
      <circle cx="34" cy="26" r="2" fill="black" />
      {/* Raised eyebrow */}
      <path d="M30 22C30 22 33 20 38 22" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Pursed lips */}
      <ellipse cx="28" cy="40" rx="2" ry="1.5" stroke="black" strokeWidth="2" fill="white" />
      {/* Hand on chin */}
      <path d="M40 44C42 42 44 42 44 46C44 50 42 52 40 52" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Thought bubbles */}
      <circle cx="48" cy="14" r="5" stroke="black" strokeWidth="1.5" fill="white" />
      <circle cx="44" cy="22" r="3" stroke="black" strokeWidth="1.5" fill="white" />
      <circle cx="42" cy="28" r="2" stroke="black" strokeWidth="1" fill="white" />
    </svg>
  );
}

export function CharacterCelebrating({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Excited hair - standing up */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      <path d="M18 10L16 2" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 8L28 0" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 10L40 2" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Star eyes */}
      <polygon points="22,28 23,25 24,28 27,28 25,30 26,33 22,31 18,33 19,30 17,28" fill="black" />
      <polygon points="34,28 35,25 36,28 39,28 37,30 38,33 34,31 30,33 31,30 29,28" fill="black" />
      {/* Big excited smile */}
      <path d="M18 38C18 38 22 46 28 46C34 46 38 38 38 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Raised arms */}
      <path d="M6 24L2 16" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 24L54 16" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      {/* Confetti */}
      <rect x="2" y="10" width="4" height="4" fill="black" transform="rotate(15 4 12)" />
      <rect x="52" y="8" width="4" height="4" fill="black" transform="rotate(-20 54 10)" />
      <circle cx="6" cy="20" r="2" fill="#FFB5B5" />
      <circle cx="50" cy="18" r="2" fill="#B5D4FF" />
    </svg>
  );
}

export function CharacterPointing({ className = "", size = 56 }: DoodlyIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="30" r="17" stroke="black" strokeWidth="2.5" fill="white" />
      {/* Hair */}
      <path d="M14 26C14 16 20 10 28 10C36 10 42 16 42 26" stroke="black" strokeWidth="2.5" fill="black" />
      {/* Winking eye */}
      <circle cx="22" cy="28" r="2" fill="black" />
      <path d="M32 28L38 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Smirk */}
      <path d="M24 40C24 40 28 42 34 38" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Pointing arm */}
      <path d="M46 30L56 26" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 26L60 24" stroke="black" strokeWidth="2" strokeLinecap="round" />
      {/* Emphasis lines */}
      <line x1="58" y1="20" x2="62" y2="18" stroke="black" strokeWidth="1.5" />
      <line x1="60" y1="24" x2="64" y2="24" stroke="black" strokeWidth="1.5" />
      <line x1="58" y1="28" x2="62" y2="30" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

// ============================================
// CHARACTER SELECTION HELPER
// ============================================

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

export const DOODLY_CHARACTERS = [
  { id: "glasses" as const, component: CharacterGlasses, name: "Glasses", category: "casual" },
  { id: "curly" as const, component: CharacterCurlyHair, name: "Curly Hair", category: "casual" },
  { id: "ponytail" as const, component: CharacterPonytail, name: "Ponytail", category: "casual" },
  { id: "beard" as const, component: CharacterBeard, name: "Beard", category: "casual" },
  { id: "bun" as const, component: CharacterBun, name: "Bun", category: "casual" },
  { id: "doctor" as const, component: CharacterDoctor, name: "Doctor", category: "professional" },
  { id: "chef" as const, component: CharacterChef, name: "Chef", category: "professional" },
  { id: "developer" as const, component: CharacterDeveloper, name: "Developer", category: "professional" },
  { id: "teacher" as const, component: CharacterTeacher, name: "Teacher", category: "professional" },
  { id: "artist" as const, component: CharacterArtist, name: "Artist", category: "professional" },
  { id: "scientist" as const, component: CharacterScientist, name: "Scientist", category: "professional" },
  { id: "nurse" as const, component: CharacterNurse, name: "Nurse", category: "professional" },
  { id: "engineer" as const, component: CharacterEngineer, name: "Engineer", category: "professional" },
  { id: "lawyer" as const, component: CharacterLawyer, name: "Lawyer", category: "professional" },
  { id: "musician" as const, component: CharacterMusician, name: "Musician", category: "professional" },
  { id: "photographer" as const, component: CharacterPhotographer, name: "Photographer", category: "professional" },
  { id: "waving" as const, component: CharacterWaving, name: "Waving", category: "expression" },
  { id: "thinking" as const, component: CharacterThinking, name: "Thinking", category: "expression" },
  { id: "celebrating" as const, component: CharacterCelebrating, name: "Celebrating", category: "expression" },
  { id: "pointing" as const, component: CharacterPointing, name: "Pointing", category: "expression" },
];

export function getCharacterComponent(id: DoodlyCharacterId) {
  const character = DOODLY_CHARACTERS.find(c => c.id === id);
  return character?.component || CharacterGlasses;
}

export type DoodlyIconId = 
  | "hashtag" | "star" | "star-outline" | "heart" | "heart-outline" 
  | "lightning" | "speech-bubble" | "speech-heart" | "arrow" | "sparkle" 
  | "dots" | "flower-pot" | "plant" | "coffee" | "laptop" | "magnifier" | "pencil";

export const DOODLY_ICONS = [
  { id: "hashtag" as const, component: IconHashtag, name: "Hashtag", category: "symbols" },
  { id: "star" as const, component: IconStar, name: "Star", category: "symbols" },
  { id: "star-outline" as const, component: IconStarOutline, name: "Star Outline", category: "symbols" },
  { id: "heart" as const, component: IconHeart, name: "Heart", category: "symbols" },
  { id: "heart-outline" as const, component: IconHeartOutline, name: "Heart Outline", category: "symbols" },
  { id: "lightning" as const, component: IconLightning, name: "Lightning", category: "symbols" },
  { id: "speech-bubble" as const, component: IconSpeechBubble, name: "Speech Bubble", category: "communication" },
  { id: "speech-heart" as const, component: IconSpeechBubbleHeart, name: "Speech Heart", category: "communication" },
  { id: "arrow" as const, component: IconArrowCurved, name: "Arrow", category: "communication" },
  { id: "sparkle" as const, component: IconSparkle, name: "Sparkle", category: "symbols" },
  { id: "dots" as const, component: IconDots, name: "Dots", category: "patterns" },
  { id: "flower-pot" as const, component: IconFlowerPot, name: "Flower Pot", category: "nature" },
  { id: "plant" as const, component: IconPlant, name: "Plant", category: "nature" },
  { id: "coffee" as const, component: IconCoffee, name: "Coffee", category: "objects" },
  { id: "laptop" as const, component: IconLaptop, name: "Laptop", category: "objects" },
  { id: "magnifier" as const, component: IconMagnifier, name: "Magnifier", category: "objects" },
  { id: "pencil" as const, component: IconPencil, name: "Pencil", category: "objects" },
];

export function getIconComponent(id: DoodlyIconId) {
  const icon = DOODLY_ICONS.find(i => i.id === id);
  return icon?.component || IconHashtag;
}
