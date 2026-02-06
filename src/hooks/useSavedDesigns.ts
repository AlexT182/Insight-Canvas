import { useState, useEffect, useCallback } from "react";
import { InfographicData } from "@/types/infographic";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface SavedDesign {
  id: string;
  name: string;
  data: InfographicData;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "infographic-designs";

export function useSavedDesigns() {
  const { user } = useAuth();
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load designs based on auth state
  useEffect(() => {
    const loadDesigns = async () => {
      setIsLoading(true);
      if (user) {
        // Load from Supabase
        const { data, error } = await supabase
          .from("designs")
          .select("*")
          .order("updated_at", { ascending: false });

        if (error) {
          console.error("Failed to load cloud designs:", error);
          toast.error("Failed to load designs from cloud");
        } else {
          // Map Supabase result to SavedDesign interface
          // Note: Supabase likely returns snake_case columns
          const mappedDesigns: SavedDesign[] = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            data: d.data, // jsonb
            createdAt: new Date(d.created_at).getTime(),
            updatedAt: new Date(d.updated_at).getTime(),
          }));
          setDesigns(mappedDesigns);
        }
      } else {
        // Load from LocalStorage
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setDesigns(JSON.parse(stored));
          } else {
            setDesigns([]);
          }
        } catch (error) {
          console.error("Failed to load local designs:", error);
        }
      }
      setIsLoading(false);
    };

    loadDesigns();
  }, [user]);

  // Helper to persist to LocalStorage (Legacy mode)
  const persistLocal = useCallback((newDesigns: SavedDesign[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDesigns));
      setDesigns(newDesigns);
    } catch (error) {
      console.error("Failed to save local designs:", error);
    }
  }, []);

  const saveDesign = useCallback(async (name: string, data: InfographicData): Promise<SavedDesign> => {
    const now = Date.now();
    const designName = name.trim() || `Design ${designs.length + 1}`;

    if (user) {
      // Save to Supabase
      const { data: inserted, error } = await supabase
        .from("designs")
        .insert({
          user_id: user.id,
          name: designName,
          data: data,
        })
        .select()
        .single();

      if (error) {
        toast.error("Failed to save to cloud");
        throw error;
      }

      const newDesign: SavedDesign = {
        id: inserted.id,
        name: inserted.name,
        data: inserted.data,
        createdAt: new Date(inserted.created_at).getTime(),
        updatedAt: new Date(inserted.updated_at).getTime(),
      };

      setDesigns(prev => [newDesign, ...prev]);
      return newDesign;

    } else {
      // Save to LocalStorage
      const newDesign: SavedDesign = {
        id: `design-${now}`,
        name: designName,
        data,
        createdAt: now,
        updatedAt: now,
      };
      const newDesigns = [newDesign, ...designs];
      persistLocal(newDesigns);
      return newDesign;
    }
  }, [designs, persistLocal, user]);

  const updateDesign = useCallback(async (id: string, data: InfographicData) => {
    if (user) {
      // Update in Supabase
      const { error } = await supabase
        .from("designs")
        .update({
          data: data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        toast.error("Failed to update cloud design");
        console.error(error);
        return;
      }

      setDesigns(prev => prev.map(d =>
        d.id === id
          ? { ...d, data, updatedAt: Date.now() }
          : d
      ));

    } else {
      // Update LocalStorage
      const newDesigns = designs.map(design =>
        design.id === id
          ? { ...design, data, updatedAt: Date.now() }
          : design
      );
      persistLocal(newDesigns);
    }
  }, [designs, persistLocal, user]);

  const renameDesign = useCallback(async (id: string, name: string) => {
    const newName = name.trim();
    if (user) {
      // Cloud rename
      const { error } = await supabase
        .from("designs")
        .update({
          name: newName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        toast.error("Failed to rename cloud design");
        return;
      }

      setDesigns(prev => prev.map(d =>
        d.id === id ? { ...d, name: newName, updatedAt: Date.now() } : d
      ));

    } else {
      // Local rename
      const newDesigns = designs.map(design =>
        design.id === id
          ? { ...design, name: newName, updatedAt: Date.now() }
          : design
      );
      persistLocal(newDesigns);
    }
  }, [designs, persistLocal, user]);

  const deleteDesign = useCallback(async (id: string) => {
    if (user) {
      // Cloud delete
      const { error } = await supabase
        .from("designs")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error("Failed to delete cloud design");
        return;
      }

      setDesigns(prev => prev.filter(d => d.id !== id));
    } else {
      // Local delete
      const newDesigns = designs.filter(design => design.id !== id);
      persistLocal(newDesigns);
    }
  }, [designs, persistLocal, user]);

  const duplicateDesign = useCallback(async (id: string): Promise<SavedDesign | null> => {
    const design = designs.find(d => d.id === id);
    if (!design) return null;

    if (user) {
      // Cloud duplicate
      return saveDesign(`${design.name} (copy)`, design.data);
    } else {
      // Local duplicate
      const now = Date.now();
      const newDesign: SavedDesign = {
        id: `design-${now}`,
        name: `${design.name} (copy)`,
        data: { ...design.data },
        createdAt: now,
        updatedAt: now,
      };
      const newDesigns = [newDesign, ...designs];
      persistLocal(newDesigns);
      return newDesign;
    }
  }, [designs, persistLocal, saveDesign, user]);

  return {
    designs,
    saveDesign,
    updateDesign,
    renameDesign,
    deleteDesign,
    duplicateDesign,
    isLoading
  };
}
