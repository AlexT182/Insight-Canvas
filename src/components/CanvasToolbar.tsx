import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, RotateCcw, Loader2, Settings2 } from "lucide-react";

interface CanvasToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onOpenExportDialog: () => void;
  isExporting?: boolean;
}

export function CanvasToolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onOpenExportDialog,
  isExporting = false,
}: CanvasToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-card rounded-lg border shadow-panel">
      <Button
        variant="ghost"
        size="sm"
        onClick={onZoomOut}
        disabled={zoom <= 0.5}
        className="h-8 w-8 p-0"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      
      <span className="text-xs text-muted-foreground w-12 text-center font-medium">
        {Math.round(zoom * 100)}%
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onZoomIn}
        disabled={zoom >= 1.5}
        className="h-8 w-8 p-0"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onResetZoom}
        className="h-8 w-8 p-0"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-5 bg-border mx-1" />
      
      <Button
        variant="default"
        size="sm"
        className="h-8 px-3"
        onClick={onOpenExportDialog}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        Export
        <Settings2 className="w-3 h-3 ml-1 opacity-60" />
      </Button>
    </div>
  );
}
