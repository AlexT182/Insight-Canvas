import { InfographicData, KeyPoint, ACCENT_COLORS, TEMPLATES, TemplateType } from "@/types/infographic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Smartphone, FileText, Monitor, LayoutGrid, BarChart3, GitBranch, Quote, Type, ChevronDown, Sparkles, Users, Columns, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableKeyPoint } from "./SortableKeyPoint";
import { FontSettings } from "./FontSettings";
import { AccessibilityChecker } from "./AccessibilityChecker";
import { AvatarBuilder } from "./AvatarBuilder";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface EditorPanelProps {
  data: InfographicData;
  onChange: (data: InfographicData) => void;
}

const TEMPLATE_ICONS: Record<TemplateType, React.ReactNode> = {
  "vertical-story": <Smartphone className="w-4 h-4" />,
  "report": <FileText className="w-4 h-4" />,
  "presentation": <Monitor className="w-4 h-4" />,
  "split-hero": <LayoutGrid className="w-4 h-4" />,
  "stats-spotlight": <BarChart3 className="w-4 h-4" />,
  "timeline-flow": <GitBranch className="w-4 h-4" />,
  "quote-card": <Quote className="w-4 h-4" />,
  "doodly": <Sparkles className="w-4 h-4" />,
  "doodly-hero": <Sparkles className="w-4 h-4" />,
  "doodly-split": <Columns className="w-4 h-4" />,
  "doodly-grid": <Users className="w-4 h-4" />,
};

// Check if template is a doodly variant
const isDoodlyTemplate = (template: TemplateType) => template.startsWith("doodly");

export function EditorPanel({ data, onChange }: EditorPanelProps) {
  const [fontSettingsOpen, setFontSettingsOpen] = useState(false);
  const [avatarBuilderOpen, setAvatarBuilderOpen] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateField = <K extends keyof InfographicData>(
    field: K,
    value: InfographicData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addKeyPoint = () => {
    const newPoint: KeyPoint = {
      id: Date.now().toString(),
      text: "",
      isHighlighted: false,
    };
    updateField("keyPoints", [...data.keyPoints, newPoint]);
  };

  const updateKeyPoint = (id: string, updates: Partial<KeyPoint>) => {
    updateField(
      "keyPoints",
      data.keyPoints.map((point) =>
        point.id === id ? { ...point, ...updates } : point
      )
    );
  };

  const removeKeyPoint = (id: string) => {
    updateField(
      "keyPoints",
      data.keyPoints.filter((point) => point.id !== id)
    );
  };

  const toggleHighlight = (id: string) => {
    updateField(
      "keyPoints",
      data.keyPoints.map((point) =>
        point.id === id ? { ...point, isHighlighted: !point.isHighlighted } : point
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.keyPoints.findIndex((p) => p.id === active.id);
      const newIndex = data.keyPoints.findIndex((p) => p.id === over.id);
      updateField("keyPoints", arrayMove(data.keyPoints, oldIndex, newIndex));
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="text-base font-semibold text-foreground">Content Editor</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Craft your infographic
        </p>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Template</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => updateField("template", template.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-md border transition-all text-center",
                    data.template === template.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border bg-background hover:border-primary/50"
                  )}
                  title={template.description}
                >
                  <div className={cn(
                    "p-1 rounded",
                    data.template === template.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {TEMPLATE_ICONS[template.id]}
                  </div>
                  <span className="text-[9px] font-medium leading-tight">{template.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter a compelling title..."
              className="h-9 text-sm"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <Label htmlFor="subtitle" className="text-xs font-medium">
              Subtitle
            </Label>
            <Input
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => updateField("subtitle", e.target.value)}
              placeholder="Brief context or tagline..."
              className="h-9 text-sm"
            />
          </div>

          {/* Key Points */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Key Points</Label>
              <span className="text-[10px] text-muted-foreground">
                {data.keyPoints.length}/7
              </span>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={data.keyPoints.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-1.5">
                  {data.keyPoints.map((point, index) => (
                    <SortableKeyPoint
                      key={point.id}
                      point={point}
                      index={index}
                      onUpdate={updateKeyPoint}
                      onRemove={removeKeyPoint}
                      onToggleHighlight={toggleHighlight}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {data.keyPoints.length < 7 && (
              <Button
                variant="outline"
                size="sm"
                onClick={addKeyPoint}
                className="w-full h-8 text-xs"
              >
                <Plus className="w-3 h-3 mr-1.5" />
                Add Key Point
              </Button>
            )}
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Accent Color</Label>
            <div className="flex flex-wrap gap-1.5">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => updateField("accentColor", color.name)}
                  className={cn(
                    "w-7 h-7 rounded-full transition-all",
                    data.accentColor === color.name
                      ? "ring-2 ring-offset-2 ring-foreground scale-110"
                      : "hover:scale-105"
                  )}
                  style={{ backgroundColor: `hsl(${color.hsl})` }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Typography Settings - Collapsible */}
          <Collapsible open={fontSettingsOpen} onOpenChange={setFontSettingsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <Type className="w-3.5 h-3.5" />
                <span>Typography</span>
              </div>
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform",
                fontSettingsOpen && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <FontSettings data={data} onChange={onChange} />
            </CollapsibleContent>
          </Collapsible>

          {/* Avatar Builder - Only for Doodly templates */}
          {isDoodlyTemplate(data.template) && (
            <Collapsible open={avatarBuilderOpen} onOpenChange={setAvatarBuilderOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium hover:text-primary transition-colors">
                <div className="flex items-center gap-2">
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Avatar Builder</span>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  avatarBuilderOpen && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <AvatarBuilder 
                  value={data.avatarCustomization} 
                  onChange={(avatarCustomization) => onChange({ ...data, avatarCustomization })} 
                />
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Accessibility Checker */}
          <AccessibilityChecker accentColor={data.accentColor} />

          {/* Brand Name */}
          <div className="space-y-1.5">
            <Label htmlFor="brand" className="text-xs font-medium">
              Brand Signature
            </Label>
            <Input
              id="brand"
              value={data.brandName}
              onChange={(e) => updateField("brandName", e.target.value)}
              placeholder="Your brand name..."
              className="h-9 text-sm"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
