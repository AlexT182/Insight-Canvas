import * as React from "react";
import { useMemo } from "react";
import { InfographicData, TEMPLATES } from "@/types/infographic";
import {
  VerticalStoryTemplate,
  SplitHeroTemplate,
  StatsSpotlightTemplate,
  TimelineFlowTemplate,
  QuoteCardTemplate,
  ReportTemplate,
  PresentationTemplate,
} from "./templates";
import {
  DoodlyTemplate,
  DoodlyHeroTemplate,
  DoodlySplitTemplate,
  DoodlyGridTemplate,
} from "./templates/doodly";

interface InfographicCanvasProps {
  data: InfographicData;
  targetWidth?: number;
  targetHeight?: number;
}

/**
 * InfographicCanvas - Main canvas component that renders the appropriate template
 * 
 * Design Principles:
 * - Each template is a focused, self-contained component
 * - Consistent visual hierarchy across all templates
 * - Proper overflow handling with break-words and min-h-0
 * - Accessible color contrast for text readability
 * - Export-safe: no animations that could cause layout shifts
 * - Supports dynamic resizing for social media exports with "contain" strategy
 */
export function InfographicCanvas({ data, targetWidth, targetHeight }: InfographicCanvasProps) {
  // Get the template's native dimensions
  const templateConfig = useMemo(() => {
    return TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
  }, [data.template]);

  // Calculate native template dimensions
  const nativeDimensions = useMemo(() => {
    const maxWidth = parseInt(templateConfig.maxWidth);
    const [w, h] = templateConfig.aspectRatio.split('/').map(Number);
    return {
      width: maxWidth,
      height: maxWidth * (h / w),
    };
  }, [templateConfig]);

  // Calculate scale to fit template within target dimensions (contain strategy)
  const fitScale = useMemo(() => {
    if (!targetWidth || !targetHeight) return 1;
    
    const scaleX = targetWidth / nativeDimensions.width;
    const scaleY = targetHeight / nativeDimensions.height;
    return Math.min(scaleX, scaleY);
  }, [targetWidth, targetHeight, nativeDimensions]);

  const renderTemplate = () => {
    switch (data.template) {
      case "split-hero":
        return <SplitHeroTemplate data={data} />;
      case "stats-spotlight":
        return <StatsSpotlightTemplate data={data} />;
      case "timeline-flow":
        return <TimelineFlowTemplate data={data} />;
      case "quote-card":
        return <QuoteCardTemplate data={data} />;
      case "presentation":
        return <PresentationTemplate data={data} />;
      case "report":
        return <ReportTemplate data={data} />;
      case "doodly":
        return <DoodlyTemplate data={data} />;
      case "doodly-hero":
        return <DoodlyHeroTemplate data={data} />;
      case "doodly-split":
        return <DoodlySplitTemplate data={data} />;
      case "doodly-grid":
        return <DoodlyGridTemplate data={data} />;
      case "vertical-story":
      default:
        return <VerticalStoryTemplate data={data} />;
    }
  };

  // If target dimensions are specified, center the scaled template within the frame
  if (targetWidth && targetHeight) {
    return (
      <div 
        className="infographic-canvas relative flex items-center justify-center bg-background"
        style={{ 
          width: targetWidth, 
          height: targetHeight,
        }}
      >
        <div 
          className="transform-gpu"
          style={{
            transform: `scale(${fitScale})`,
            transformOrigin: 'center center',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    );
  }

  return (
    <div className="infographic-canvas">
      {renderTemplate()}
    </div>
  );
}
