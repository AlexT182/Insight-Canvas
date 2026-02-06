// Follow this setup guide to integrate the function with Supabase:
// https://supabase.com/docs/guides/functions

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

console.log("Lemon Squeezy Webhook handler up and running!");

serve(async (req) => {
    try {
        // 1. Validate Request Method
        if (req.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }

        // 2. Verify Signature (Security)
        const secret = Deno.env.get("LEMONSQUEEZY_WEBHOOK_SECRET");
        if (!secret) {
            return new Response("Webhook secret not configured", { status: 500 });
        }

        const jws = req.headers.get("x-signature");
        const body = await req.text();

        if (!jws) {
            return new Response("Missing signature", { status: 401 });
        }

        // Verify HMAC SHA256 signature
        const textEncoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            textEncoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify"]
        );
        const verified = await crypto.subtle.verify(
            "HMAC",
            key,
            hexToUint8Array(jws),
            textEncoder.encode(body)
        );

        if (!verified) {
            return new Response("Invalid signature", { status: 401 });
        }

        // 3. Process Event
        const payload = JSON.parse(body);
        const { meta, data } = payload;
        const eventName = meta.event_name;
        const customData = meta.custom_data || {};
        const userId = customData.user_id;
        const userEmail = data.attributes.user_email;

        console.log(`Received event: ${eventName} for user: ${userId || userEmail}`);

        if (!userId) {
            // If no user_id found in custom_data, try to find by email
            // This part requires Service Role Key to search users
        }

        // Initialize Supabase Admin Client
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // 4. Update Database based on Event
        if (eventName === "order_created" || eventName === "subscription_created" || eventName === "subscription_updated") {
            // Grant Pro Access
            if (data.attributes.status === "paid" || data.attributes.status === "active") {
                const { error } = await supabase
                    .from("profiles")
                    .update({
                        subscription_status: "active",
                        subscription_tier: "pro",
                        lemon_squeezy_customer_id: data.attributes.customer_id,
                        lemon_squeezy_subscription_id: data.id,
                        updated_at: new Date().toISOString()
                    })
                    .eq("id", userId);

                if (error) throw error;
            }
        } else if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
            // Revoke Pro Access
            const { error } = await supabase
                .from("profiles")
                .update({
                    subscription_status: "inactive",
                    subscription_tier: "free",
                    updated_at: new Date().toISOString()
                })
                .eq("id", userId);

            if (error) throw error;
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
});

// Helper: Convert Hex string to Uint8Array
function hexToUint8Array(hexString: string) {
    return new Uint8Array(
        hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
}
