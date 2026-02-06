
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Shield, ShieldCheck } from "lucide-react";

interface Profile {
    id: string;
    email: string | null;
    role: "user" | "admin";
    subscription_status: string;
    subscription_tier: string;
    updated_at: string;
}

export default function UserManagement() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const { isAdmin, isLoading: authLoading } = useSubscription();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            toast.error("Unauthorized access");
            navigate("/");
        }
    }, [isAdmin, authLoading, navigate]);

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProfiles(data || []);
        } catch (error: any) {
            toast.error("Failed to fetch users", { description: error.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchProfiles();
        }
    }, [isAdmin]);

    const toggleAdmin = async (id: string, currentRole: string) => {
        const newRole = currentRole === "admin" ? "user" : "admin";
        // Optimistic update
        setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));

        try {
            const { error } = await supabase
                .from("profiles")
                .update({ role: newRole })
                .eq("id", id);

            if (error) throw error;
            toast.success(`User role updated to ${newRole}`);
        } catch (error: any) {
            // Revert
            setProfiles(profiles.map(p => p.id === id ? { ...p, role: currentRole as "user" | "admin" } : p));
            toast.error("Failed to update role", { description: error.message });
        }
    };

    const togglePro = async (id: string, currentTier: string) => {
        const newTier = currentTier === "pro" ? "free" : "pro";
        const newStatus = newTier === "pro" ? "active" : "inactive";

        // Optimistic update
        setProfiles(profiles.map(p => p.id === id ? { ...p, subscription_tier: newTier, subscription_status: newStatus } : p));

        try {
            const { error } = await supabase
                .from("profiles")
                .update({ subscription_tier: newTier, subscription_status: newStatus })
                .eq("id", id);

            if (error) throw error;
            toast.success(`User subscription updated to ${newTier}`);
        } catch (error: any) {
            // Revert
            setProfiles(profiles.map(p => p.id === id ? { ...p, subscription_tier: currentTier, subscription_status: currentTier === "pro" ? "active" : "inactive" } : p));
            toast.error("Failed to update subscription", { description: error.message });
        }
    };

    if (authLoading || (!isAdmin && loading)) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-10 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage user roles and subscriptions.</p>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Subscription</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : profiles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            profiles.map((profile) => (
                                <TableRow key={profile.id}>
                                    <TableCell className="font-medium">{profile.email || "No Email"}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {profile.role === "admin" ? (
                                                <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">
                                                    <ShieldCheck className="w-3 h-3 mr-1" /> Admin
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">User</Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={profile.subscription_tier === "pro" ? "secondary" : "outline"}
                                            className={profile.subscription_tier === "pro" ? "bg-primary/10 text-primary border-primary/20" : ""}
                                        >
                                            {profile.subscription_tier === "pro" ? "PRO" : "FREE"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(profile.updated_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <div className="flex items-center justify-end gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">Admin</span>
                                                <Switch
                                                    checked={profile.role === "admin"}
                                                    onCheckedChange={() => toggleAdmin(profile.id, profile.role)}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">Pro</span>
                                                <Switch
                                                    checked={profile.subscription_tier === "pro"}
                                                    onCheckedChange={() => togglePro(profile.id, profile.subscription_tier)}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
