import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
  if (!keySecret) return false;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(keySecret);
  const msgData = encoder.encode(`${orderId}|${paymentId}`);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBytes = await crypto.subtle.sign("HMAC", key, msgData);
  const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));

  return signature === expectedSignature;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isValid = await verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Payment verification failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_id: razorpay_payment_id,
        payment_status: "completed",
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", order_id)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Order update error:", updateError);
      return new Response(JSON.stringify({ error: "Failed to update order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*, items:order_items(*)")
      .eq("id", order_id)
      .single();

    if (fetchError) {
      console.error("Fetch order error:", fetchError);
      return new Response(JSON.stringify({ error: "Failed to fetch order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send order confirmation email
    try {
      const emailResponse = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({ order_id: order.id }),
        }
      );
      if (!emailResponse.ok) {
        console.error("Failed to send order email");
      }
    } catch (emailErr) {
      console.error("Email sending error:", emailErr);
    }

    return new Response(JSON.stringify({ success: true, order }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
