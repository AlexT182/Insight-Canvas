import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KeyPoint } from "@/types/infographic";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Sparkles, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableKeyPointProps {
  point: KeyPoint;
  index: number;
  onUpdate: (id: string, updates: Partial<KeyPoint>) => void;
  onRemove: (id: string) => void;
  onToggleHighlight: (id: string) => void;
}

export function SortableKeyPoint({
  point,
  index,
  onUpdate,
  onRemove,
  onToggleHighlight,
}: SortableKeyPointProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: point.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-start gap-1.5 p-2 rounded-md border transition-colors bg-background",
        point.isHighlighted
          ? "border-primary/30 bg-primary/5"
          : "border-border",
        isDragging && "opacity-50 shadow-lg z-50"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none cursor-grab active:cursor-grabbing p-0.5 rounded hover:bg-muted transition-colors mt-1"
      >
        <GripVertical className="w-3 h-3 text-muted-foreground/50" />
      </button>
      <div className="flex-1 min-w-0">
        <Textarea
          value={point.text}
          onChange={(e) => onUpdate(point.id, { text: e.target.value })}
          placeholder={`Key point ${index + 1}...`}
          className="min-h-[48px] resize-none bg-transparent border-0 p-0 focus-visible:ring-0 text-xs leading-relaxed"
        />
        <div className="flex items-center gap-1 mt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleHighlight(point.id)}
            className={cn(
              "h-6 px-1.5 text-[10px]",
              point.isHighlighted ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Sparkles className="w-2.5 h-2.5 mr-1" />
            {point.isHighlighted ? "Highlighted" : "Highlight"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(point.id)}
            className="h-6 px-1.5 text-[10px] text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-2.5 h-2.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
