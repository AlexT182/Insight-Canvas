import { useState } from "react";
import {
  Layout,
  TextAa,
  Palette,
  Stamp,
  UserCircle,
  Lock
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InfographicData, KeyPoint, ACCENT_COLORS, TEMPLATES, TemplateType } from "@/types/infographic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AvatarBuilder } from "./AvatarBuilder";
import { ColorAccessibilityPanel } from "./ColorAccessibilityPanel";
import { FontSettings } from "./FontSettings";
import { Plus } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { PricingDialog } from "@/components/payment/PricingDialog";
import { toast } from "sonner";
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
import { useTranslation } from "react-i18next";
import { SortableKeyPoint } from "./SortableKeyPoint";

interface ElementsSidebarProps {
  data: InfographicData;
  onChange: (data: InfographicData) => void;
}

type TabType = "template" | "content" | "style" | "branding" | "avatar";

const TABS = [
  { id: "template" as const, icon: Layout, labelKey: "sidebar.template" },
  { id: "content" as const, icon: TextAa, labelKey: "sidebar.content" },
  { id: "style" as const, icon: Palette, labelKey: "sidebar.style" },
  { id: "branding" as const, icon: Stamp, labelKey: "sidebar.branding" },
  { id: "avatar" as const, icon: UserCircle, labelKey: "sidebar.avatar" },
];

const TEMPLATE_ICONS: Record<TemplateType, string> = {
  "vertical-story": "📱",
  "report": "📄",
  "presentation": "🖥️",
  "split-hero": "⊞",
  "stats-spotlight": "📊",
  "timeline-flow": "🔀",
  "quote-card": "💬",
  "doodly": "✨",
  "doodly-hero": "✨",
  "doodly-split": "⊟",
  "doodly-grid": "⊞",
};

// Check if template is a doodly variant
const isDoodlyTemplate = (template: TemplateType) => template.startsWith("doodly");

export function ElementsSidebar({ data, onChange }: ElementsSidebarProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("template");
  const { isPro } = useSubscription();

  // Guard against undefined data during initial render
  if (!data) {
    return null;
  }

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

  // Filter tabs based on whether a doodly template is selected
  const visibleTabs = TABS.filter(tab => {
    if (tab.id === "avatar") {
      return isDoodlyTemplate(data.template);
    }
    return true;
  });

  const renderContent = () => {
    switch (activeTab) {
      case "template":
        return (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {TEMPLATES.map((template) => {
                return (
                  <button
                    key={template.id}
                    onClick={() => {
                      if (template.isPremium && !isPro) {
                        toast(t('common.proFeature'), {
                          description: t('common.upgradeToUnlock'),
                          action: {
                            label: t('pricing.upgradeNow'),
                            onClick: () => document.getElementById("header-upgrade-trigger")?.click() // Hacky way or render dialog
                          }
                        });
                        return;
                      }
                      updateField("template", template.id);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-center aspect-square justify-center relative",
                      data.template === template.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border bg-background hover:border-primary/50"
                    )}
                    title={template.description}
                  >
                    {template.isPremium && !isPro && (
                      <div className="absolute top-1 right-1 text-amber-500">
                        <Lock weight="fill" className="w-3 h-3" />
                      </div>
                    )}
                    <div className={cn(
                      "text-lg",
                      data.template === template.id ? "opacity-100" : "opacity-60"
                    )}>
                      {TEMPLATE_ICONS[template.id]}
                    </div>
                    <span className="text-[9px] font-medium leading-tight">{template.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case "content":
        return (
          <div className="p-4 space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-medium">
                {t('sidebar.title')}
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
                {t('sidebar.subtitle')}
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
          </div>
        );

      case "style":
        return (
          <div className="p-4 space-y-6">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">{t('sidebar.themeColor')}</Label>
              <ColorAccessibilityPanel
                accentColor={data.themeColor}
                onAccentColorChange={(color) => updateField("themeColor", color)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">{t('sidebar.fontPairing')}</Label>
              <FontSettings
                data={data}
                onChange={onChange}
              />
            </div>
          </div>
        );

      case "branding":
        return (
          <div className="p-4 space-y-4">
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
            <p className="text-[10px] text-muted-foreground">
              More branding options available in the Design panel →
            </p>
          </div>
        );

      case "avatar":
        return (
          <div className="p-4">
            <AvatarBuilder
              value={data.avatarCustomization}
              onChange={(avatarCustomization) => onChange({ ...data, avatarCustomization })}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex bg-background border-r border-border">
      {/* Vertical Icon Rail - 72px width */}
      <div className="w-[72px] border-r border-border flex flex-col items-center py-4 gap-1 bg-background">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative w-14 h-14 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full bg-primary"
                  style={{ backgroundColor: 'hsl(var(--primary))' }}
                />
              )}

              <Icon
                weight={isActive ? "duotone" : "regular"}
                className="w-6 h-6"
              />
              <span className="text-[9px] font-medium leading-tight">
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <ScrollArea className="flex-1 w-64">
        {renderContent()}
      </ScrollArea>
    </div>
  );
}
