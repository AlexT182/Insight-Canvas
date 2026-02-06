import { useState } from "react";
import { SavedDesign } from "@/hooks/useSavedDesigns";
import { InfographicData } from "@/types/infographic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Save, 
  FolderOpen, 
  MoreVertical, 
  Trash2, 
  Copy, 
  Pencil,
  FileText,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface SavedDesignsPanelProps {
  currentData: InfographicData;
  designs: SavedDesign[];
  onSave: (name: string, data: InfographicData) => SavedDesign;
  onLoad: (data: InfographicData) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function SavedDesignsPanel({
  currentData,
  designs,
  onSave,
  onLoad,
  onRename,
  onDelete,
  onDuplicate,
}: SavedDesignsPanelProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [designName, setDesignName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleSave = () => {
    onSave(designName || `Design ${designs.length + 1}`, currentData);
    setDesignName("");
    setSaveDialogOpen(false);
  };

  const handleLoad = (design: SavedDesign) => {
    onLoad(design.data);
    setLoadDialogOpen(false);
  };

  const handleRename = (id: string) => {
    if (editName.trim()) {
      onRename(id, editName);
    }
    setEditingId(null);
    setEditName("");
  };

  const startEditing = (design: SavedDesign) => {
    setEditingId(design.id);
    setEditName(design.name);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1.5">
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Design</DialogTitle>
            <DialogDescription>
              Save your current infographic design to browser storage.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="design-name" className="text-sm font-medium">
                Design Name
              </label>
              <Input
                id="design-name"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder={`Design ${designs.length + 1}`}
                className="h-9"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Title: {currentData.title || "(untitled)"}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1.5" />
              Save Design
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Dialog */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1.5">
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Load</span>
            {designs.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                {designs.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Load Design</DialogTitle>
            <DialogDescription>
              Load a previously saved infographic design.
            </DialogDescription>
          </DialogHeader>
          
          {designs.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No saved designs yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Save your current design to see it here
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-[400px] -mx-6 px-6">
              <div className="space-y-2 py-2">
                {designs.map((design) => (
                  <div
                    key={design.id}
                    className={cn(
                      "group flex items-center gap-3 p-3 rounded-lg border transition-colors",
                      "hover:border-primary/50 hover:bg-muted/50 cursor-pointer"
                    )}
                    onClick={() => editingId !== design.id && handleLoad(design)}
                  >
                    <div 
                      className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: `hsl(var(--primary) / 0.1)`,
                      }}
                    >
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {editingId === design.id ? (
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onBlur={() => handleRename(design.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRename(design.id);
                            if (e.key === "Escape") {
                              setEditingId(null);
                              setEditName("");
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="h-7 text-sm"
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-sm truncate">{design.name}</p>
                      )}
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                        <span className="truncate">{design.data.title || "(untitled)"}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          {format(design.updatedAt, "MMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          startEditing(design);
                        }}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onDuplicate(design.id);
                        }}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(design.id);
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
