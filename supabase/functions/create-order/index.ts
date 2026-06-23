import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CreateOrderRequest {
  shipping_name: string;
  shipping_phone: string;
  shipping_address_line1: string;
  shipping_address_line2?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  payment_method: string;
  notes?: string;
}

async function createRazorpayOrder(amount: number, receipt: string): Promise<{ id: string } | null> {
  const keyId = Deno.env.get("RAZORPAY_KEY_ID");
  const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

  if (!keyId || !keySecret) {
    console.error("Razorpay credentials not configured");
    return null;
  }

  const auth = btoa(`${keyId}:${keySecret}`);

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: receipt,
        payment_capture: 1,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Razorpay order creation failed:", error);
      return null;
    }

    const data = await response.json();
    return { id: data.id };
  } catch (err) {
    console.error("Razorpay API error:", err);
    return null;
  }
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

  async function sendOrderConfirmation(orderId: string) {
    try {
      await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({ order_id: orderId }),
        }
      );
    } catch (err) {
      console.error("Failed to send order email:", err);
    }
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

    const body: CreateOrderRequest = await req.json();
    const {
      shipping_name,
      shipping_phone,
      shipping_address_line1,
      shipping_address_line2,
      shipping_city,
      shipping_state,
      shipping_pincode,
      payment_method,
      notes,
    } = body;

    if (!shipping_name || !shipping_phone || !shipping_address_line1 || !shipping_city || !shipping_state || !shipping_pincode) {
      return new Response(JSON.stringify({ error: "Missing required shipping fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validPaymentMethods = ["razorpay", "upi", "cod", "bank_transfer"];
    if (!validPaymentMethods.includes(payment_method)) {
      return new Response(JSON.stringify({ error: "Invalid payment method" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: orderId, error: orderError } = await supabase.rpc("create_order_from_cart", {
      _user_id: user.id,
      _shipping_name: shipping_name,
      _shipping_phone: shipping_phone,
      _shipping_address_line1: shipping_address_line1,
      _shipping_address_line2: shipping_address_line2 || null,
      _shipping_city: shipping_city,
      _shipping_state: shipping_state,
      _shipping_pincode: shipping_pincode,
      _payment_method: payment_method,
      _notes: notes || null,
    });

    if (orderError) {
      console.error("Order creation error:", orderError);
      return new Response(JSON.stringify({ error: orderError.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*, items:order_items(*)")
      .eq("id", orderId)
      .single();

    if (fetchError) {
      console.error("Fetch order error:", fetchError);
      return new Response(JSON.stringify({ error: "Failed to fetch created order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (payment_method === "razorpay" || payment_method === "upi") {
      const razorpayOrder = await createRazorpayOrder(order.total_amount, order.order_number);

      if (razorpayOrder) {
        const { error: updateError } = await supabase
          .from("orders")
          .update({ payment_id: razorpayOrder.id })
          .eq("id", orderId);

        if (updateError) {
          console.error("Failed to update payment_id:", updateError);
        }

        return new Response(JSON.stringify({
          order,
          razorpay_order_id: razorpayOrder.id,
          razorpay_key_id: Deno.env.get("RAZORPAY_KEY_ID"),
        }), {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // For COD and bank transfer, send confirmation email immediately
    if (payment_method === "cod" || payment_method === "bank_transfer") {
      await sendOrderConfirmation(orderId);
    }

    return new Response(JSON.stringify({ order }), {
      status: 201,
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
