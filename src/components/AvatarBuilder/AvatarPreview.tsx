import * as React from "react";
import { AvatarCustomization } from "@/types/avatarCustomization";

interface AvatarPreviewProps {
  config: AvatarCustomization;
  size?: number;
  className?: string;
}

export function AvatarPreview({ config, size = 120, className = "" }: AvatarPreviewProps) {
  const { hairstyle, eyeStyle, mouthStyle, accessory, showBlush, faceType } = config;

  // Face shape based on faceType
  const getFaceRadius = () => {
    switch (faceType) {
      case "oval": return "50%";
      case "square": return "20%";
      default: return "50%";
    }
  };

  // Hairstyle paths
  const renderHair = () => {
    switch (hairstyle) {
      case "short":
        return <path d="M12 22C12 12 18 6 28 6C38 6 44 12 44 22" stroke="black" strokeWidth="2.5" fill="black" />;
      case "curly":
        return (
          <>
            <circle cx="14" cy="18" r="6" stroke="black" strokeWidth="2" fill="black" />
            <circle cx="24" cy="12" r="6" stroke="black" strokeWidth="2" fill="black" />
            <circle cx="34" cy="12" r="6" stroke="black" strokeWidth="2" fill="black" />
            <circle cx="42" cy="18" r="6" stroke="black" strokeWidth="2" fill="black" />
            <circle cx="10" cy="28" r="5" stroke="black" strokeWidth="2" fill="black" />
            <circle cx="46" cy="28" r="5" stroke="black" strokeWidth="2" fill="black" />
          </>
        );
      case "ponytail":
        return (
          <>
            <path d="M12 26C12 14 18 8 28 8C38 8 44 14 44 26" stroke="black" strokeWidth="2.5" fill="black" />
            <path d="M44 20C48 16 52 18 52 26C52 34 48 38 44 36" stroke="black" strokeWidth="2.5" fill="black" />
            <ellipse cx="52" cy="40" rx="4" ry="8" stroke="black" strokeWidth="2" fill="black" />
          </>
        );
      case "bun":
        return (
          <>
            <path d="M14 28C14 18 20 12 28 12C36 12 42 18 42 28" stroke="black" strokeWidth="2.5" fill="black" />
            <circle cx="28" cy="8" r="8" stroke="black" strokeWidth="2.5" fill="black" />
          </>
        );
      case "long":
        return (
          <>
            <path d="M12 24C12 14 18 6 28 6C38 6 44 14 44 24" stroke="black" strokeWidth="2.5" fill="black" />
            <path d="M12 24C10 28 10 44 14 48" stroke="black" strokeWidth="2.5" fill="black" />
            <path d="M44 24C46 28 46 44 42 48" stroke="black" strokeWidth="2.5" fill="black" />
          </>
        );
      case "spiky":
        return (
          <>
            <path d="M12 22C12 12 18 6 28 6C38 6 44 12 44 22" stroke="black" strokeWidth="2.5" fill="black" />
            <path d="M16 12L14 2" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 10L22 0" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32 10L34 0" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M40 12L42 2" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case "braids":
        return (
          <>
            <path d="M12 24C12 14 18 6 28 6C38 6 44 14 44 24" stroke="black" strokeWidth="2.5" fill="black" />
            <ellipse cx="8" cy="36" rx="3" ry="10" stroke="black" strokeWidth="2" fill="black" />
            <ellipse cx="48" cy="36" rx="3" ry="10" stroke="black" strokeWidth="2" fill="black" />
          </>
        );
      case "none":
      default:
        return null;
    }
  };

  // Eye styles
  const renderEyes = () => {
    switch (eyeStyle) {
      case "glasses":
        return (
          <>
            <circle cx="22" cy="28" r="4" stroke="black" strokeWidth="2" fill="white" />
            <circle cx="34" cy="28" r="4" stroke="black" strokeWidth="2" fill="white" />
            <line x1="26" y1="28" x2="30" y2="28" stroke="black" strokeWidth="2" />
            <circle cx="23" cy="28" r="1.5" fill="black" />
            <circle cx="35" cy="28" r="1.5" fill="black" />
          </>
        );
      case "happy":
        return (
          <>
            <path d="M20 28C20 28 22 26 24 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 28C32 28 34 26 36 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "wink":
        return (
          <>
            <circle cx="22" cy="28" r="2" fill="black" />
            <path d="M32 28C32 28 34 26 36 28" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "closed":
        return (
          <>
            <line x1="19" y1="28" x2="25" y2="28" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <line x1="31" y1="28" x2="37" y2="28" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "normal":
      default:
        return (
          <>
            <circle cx="22" cy="28" r="2" fill="black" />
            <circle cx="34" cy="28" r="2" fill="black" />
          </>
        );
    }
  };

  // Mouth styles
  const renderMouth = () => {
    switch (mouthStyle) {
      case "grin":
        return <path d="M20 36C20 36 24 42 28 42C32 42 36 36 36 36" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />;
      case "neutral":
        return <line x1="24" y1="38" x2="32" y2="38" stroke="black" strokeWidth="2" strokeLinecap="round" />;
      case "open":
        return (
          <>
            <ellipse cx="28" cy="38" rx="4" ry="3" stroke="black" strokeWidth="2" fill="white" />
          </>
        );
      case "smirk":
        return <path d="M24 38C24 38 28 40 34 36" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />;
      case "smile":
      default:
        return <path d="M22 36C22 36 25 40 28 40C31 40 34 36 34 36" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />;
    }
  };

  // Accessories
  const renderAccessory = () => {
    switch (accessory) {
      case "hat":
        return (
          <>
            <ellipse cx="28" cy="6" rx="18" ry="3" stroke="black" strokeWidth="2" fill="black" />
            <rect x="18" y="0" width="20" height="8" stroke="black" strokeWidth="2" fill="black" />
          </>
        );
      case "headphones":
        return (
          <>
            <path d="M8 28C8 28 6 20 6 14C6 8 12 2 28 2C44 2 50 8 50 14C50 20 48 28 48 28" stroke="black" strokeWidth="2" fill="none" />
            <ellipse cx="8" cy="30" rx="4" ry="6" stroke="black" strokeWidth="2" fill="white" />
            <ellipse cx="48" cy="30" rx="4" ry="6" stroke="black" strokeWidth="2" fill="white" />
          </>
        );
      case "bow":
        return (
          <>
            <circle cx="40" cy="10" r="6" stroke="black" strokeWidth="2" fill="white" />
            <circle cx="44" cy="14" r="6" stroke="black" strokeWidth="2" fill="white" />
            <circle cx="42" cy="12" r="2" fill="black" />
          </>
        );
      case "headband":
        return <path d="M10 20C10 20 18 16 28 16C38 16 46 20 46 20" stroke="black" strokeWidth="3" strokeLinecap="round" />;
      case "chef-hat":
        return (
          <>
            <ellipse cx="28" cy="8" rx="14" ry="6" stroke="black" strokeWidth="2" fill="white" />
            <rect x="16" y="8" width="24" height="10" stroke="black" strokeWidth="2" fill="white" />
            <circle cx="18" cy="6" r="4" stroke="black" strokeWidth="2" fill="white" />
            <circle cx="28" cy="4" r="4" stroke="black" strokeWidth="2" fill="white" />
            <circle cx="38" cy="6" r="4" stroke="black" strokeWidth="2" fill="white" />
          </>
        );
      case "stethoscope":
        return (
          <>
            <path d="M16 42C16 42 18 48 24 48" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="50" r="3" stroke="black" strokeWidth="1.5" fill="white" />
          </>
        );
      case "glasses":
        return (
          <>
            <rect x="14" y="22" width="12" height="8" rx="2" stroke="black" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="30" y="22" width="12" height="8" rx="2" stroke="black" strokeWidth="2" fill="none" opacity="0.5" />
            <line x1="26" y1="26" x2="30" y2="26" stroke="black" strokeWidth="2" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* Face */}
      <circle 
        cx="28" 
        cy="28" 
        r="20" 
        stroke="black" 
        strokeWidth="2.5" 
        fill="white"
        style={{ borderRadius: getFaceRadius() }}
      />
      
      {/* Hair */}
      {renderHair()}
      
      {/* Eyes */}
      {renderEyes()}
      
      {/* Mouth */}
      {renderMouth()}
      
      {/* Blush */}
      {showBlush && (
        <>
          <circle cx="17" cy="34" r="2" fill="#FFB5B5" opacity="0.6" />
          <circle cx="39" cy="34" r="2" fill="#FFB5B5" opacity="0.6" />
        </>
      )}
      
      {/* Accessory */}
      {renderAccessory()}
    </svg>
  );
}
