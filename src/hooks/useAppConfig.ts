import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";

export function useAppConfig() {
    const [config, setConfig] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchConfig = async () => {
        try {
            const { data, error } = await supabase
                .from("app_config")
                .select("key, value");

            if (error) throw error;

            if (data) {
                const configMap = data.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as Record<string, string>);
                setConfig(configMap);
            }
        } catch (error) {
            console.error("Error fetching config:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const updateConfig = async (key: string, value: string) => {
        if (!user) return;

        try {
            // Optimistic update
            setConfig((prev) => ({ ...prev, [key]: value }));

            const { error } = await supabase
                .from("app_config")
                .update({ value, updated_at: new Date().toISOString() })
                .eq("key", key);

            if (error) throw error;
            toast.success("Configuration updated updated");
        } catch (error) {
            console.error("Error updating config:", error);
            toast.error("Failed to update configuration");
            // Revert optimism
            fetchConfig();
        }
    };

    return { config, loading, updateConfig, refreshConfig: fetchConfig };
}
