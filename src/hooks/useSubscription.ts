
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function useSubscription() {
    const { user } = useAuth();
    const [isPro, setIsPro] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkSubscription() {
            if (!user) {
                setIsPro(false);
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("subscription_status, subscription_tier")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    console.error("Error fetching subscription:", error);
                    setIsPro(false);
                } else {
                    // Lemon Squeezy status: 'active', 'on_trial', etc.
                    setIsPro(
                        data.subscription_status === "active" ||
                        data.subscription_tier === "pro"
                    );
                }
            } catch (error) {
                console.error("Error checking subscription:", error);
                setIsPro(false);
            } finally {
                setIsLoading(false);
            }
        }

        checkSubscription();
    }, [user]);

    const initiateCheckout = (checkoutUrl: string) => {
        if (!user) {
            toast.error("Please sign in to upgrade");
            return;
        }

        if (!checkoutUrl) {
            toast.error("Checkout configuration missing");
            return;
        }

        // Lemon Squeezy supports passing custom data via query params
        // checkout[custom][user_id] = user.id
        const url = new URL(checkoutUrl);
        url.searchParams.append("checkout[custom][user_id]", user.id);
        url.searchParams.append("checkout[email]", user.email || "");

        // Redirect current tab to Lemon Squeezy Checkout
        window.location.href = url.toString();
    };

    return { isPro, isLoading, initiateCheckout };
}
