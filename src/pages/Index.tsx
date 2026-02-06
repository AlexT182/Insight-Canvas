import { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "@/components/Header";
import { ElementsSidebar } from "@/components/ElementsSidebar";
import { DesignPanel } from "@/components/DesignPanel";
import { InfographicCanvas } from "@/components/InfographicCanvas";
import { CanvasToolbar } from "@/components/CanvasToolbar";
import { ExportPreviewDialog } from "@/components/ExportPreviewDialog";
import { DEFAULT_INFOGRAPHIC, InfographicData, TEMPLATES } from "@/types/infographic";
import { useSavedDesigns } from "@/hooks/useSavedDesigns";
import { toast } from "sonner";
import { exportInfographic } from "@/lib/export/exportInfographic";
import { ExportPreset, ExportQuality, EXPORT_PRESETS } from "@/types/exportPresets";

const Index = () => {
  const [data, setData] = useState<InfographicData>(DEFAULT_INFOGRAPHIC);
  const [zoom, setZoom] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ExportPreset>(EXPORT_PRESETS[0]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    designs, 
    saveDesign, 
    renameDesign, 
    deleteDesign, 
    duplicateDesign 
  } = useSavedDesigns();

  const handleLoadDesign = useCallback((designData: InfographicData) => {
    setData(designData);
    toast.success("Design loaded!", {
      description: "Your saved design has been loaded.",
    });
  }, []);

  // Calculate canvas dimensions based on selected preset or template
  const getCanvasDimensions = useCallback(() => {
    // If a social preset is selected (not original), use its dimensions
    if (selectedPreset.id !== "original" && selectedPreset.width > 0) {
      return {
        width: selectedPreset.width,
        height: selectedPreset.height,
        aspectRatio: selectedPreset.aspectRatio,
      };
    }
    
    // Otherwise use template dimensions
    const template = TEMPLATES.find(t => t.id === data.template) || TEMPLATES[0];
    const maxWidth = parseInt(template.maxWidth);
    const [w, h] = template.aspectRatio.split('/').map(Number);
    return {
      width: maxWidth,
      height: maxWidth * (h / w),
      aspectRatio: template.aspectRatio,
    };
  }, [selectedPreset, data.template]);

  // Auto-fit zoom based on container size and selected preset
  useEffect(() => {
    const updateZoom = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.clientWidth - 64; // padding
      const containerHeight = container.clientHeight - 64;
      
      const { width, height } = getCanvasDimensions();
      
      const scaleX = containerWidth / width;
      const scaleY = containerHeight / height;
      const fitScale = Math.min(scaleX, scaleY, 1);
      
      setZoom(Math.max(0.3, Math.min(fitScale, 1)));
    };

    updateZoom();
    window.addEventListener('resize', updateZoom);
    return () => window.removeEventListener('resize', updateZoom);
  }, [getCanvasDimensions]);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 0.1, 1.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 0.1, 0.5));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const handleExport = useCallback(
    async (preset: ExportPreset, quality: ExportQuality, format: "png" | "pdf", transparentBg: boolean) => {
      if (!canvasRef.current) return;

      const title = data.title || "infographic";
      const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30);

      setIsExporting(true);
      try {
        const result = await exportInfographic({
          root: canvasRef.current,
          preset,
          quality,
          format,
          transparentBg,
          filenameBase: sanitizedTitle,
        });

        toast.success(`${format.toUpperCase()} exported successfully!`, {
          description: `${result.dimensions} at ${result.scale}× resolution`,
        });

        setExportDialogOpen(false);
      } catch (error) {
        console.error("Export failed:", error);
        toast.error("Export failed", {
          description: "There was an error exporting your infographic.",
        });
      } finally {
        setIsExporting(false);
      }
    },
    [data.title],
  );

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header 
        currentData={data}
        designs={designs}
        onSave={saveDesign}
        onLoad={handleLoadDesign}
        onRename={renameDesign}
        onDelete={deleteDesign}
        onDuplicate={duplicateDesign}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Elements Panel */}
        <aside className="flex-shrink-0 hidden md:flex">
          <ElementsSidebar data={data} onChange={setData} />
        </aside>
        
        {/* Canvas Area - Center */}
        <main className="flex-1 canvas-wrapper flex flex-col overflow-hidden min-w-0">
          {/* Toolbar */}
          <div className="p-3 flex justify-center border-b flex-shrink-0 bg-background">
            <CanvasToolbar
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
              onOpenExportDialog={() => setExportDialogOpen(true)}
              isExporting={isExporting}
            />
          </div>
          
          {/* Canvas viewport - centered with auto-fit */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-auto flex items-center justify-center p-8 bg-muted/30"
          >
            <div
              className="transition-transform duration-200 origin-center"
              style={{ transform: `scale(${zoom})` }}
            >
              <div 
                ref={canvasRef} 
                className="shadow-2xl rounded-lg overflow-hidden"
                style={selectedPreset.id !== "original" && selectedPreset.width > 0 ? {
                  width: selectedPreset.width,
                  height: selectedPreset.height,
                } : undefined}
              >
                <InfographicCanvas 
                  data={data} 
                  targetWidth={selectedPreset.id !== "original" ? selectedPreset.width : undefined}
                  targetHeight={selectedPreset.id !== "original" ? selectedPreset.height : undefined}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Design Panel */}
        <aside className="w-72 lg:w-80 flex-shrink-0 hidden md:block overflow-hidden">
          <DesignPanel 
            data={data} 
            onChange={setData} 
            selectedPreset={selectedPreset}
            onPresetChange={setSelectedPreset}
          />
        </aside>
      </div>
      
      <ExportPreviewDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        onExport={handleExport}
        isExporting={isExporting}
        canvasElement={canvasRef.current}
      />
    </div>
  );
};

export default Index;
