import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CreateOrderRequest {
  cart_items?: Array<{
    id: string;
    name: string;
    qty?: string;
    image?: string;
    price: number;
    count: number;
  }>;
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

function getDeliveryCharge(subtotal: number) {
  if (subtotal <= 0) return 0;
  if (subtotal < 499) return 99;
  if (subtotal <= 999) return 49;
  return 0;
}

function getCodDeliveryCharge(city: string, state: string) {
  const normalizedCity = city.trim().toLowerCase();
  const normalizedState = state.trim().toLowerCase();

  if (normalizedCity === "hyderabad") return 50;
  if (normalizedState.includes("andhra")) return 90;
  return 70;
}

async function createRazorpayOrder(amount: number, receipt: string): Promise<{ id: string } | null> {
  const keyId = Deno.env.get("RAZORPAY_KEY_ID") ?? Deno.env.get("RAZORPAY_API_KEY");
  const keySecret =
    Deno.env.get("RAZORPAY_KEY_SECRET") ?? Deno.env.get("RAZORPAY_API_SECRET");

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
        receipt: receipt.slice(0, 40),
        payment_capture: 1,
        notes: { merchant_order_id: receipt },
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
      cart_items,
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

    if ((payment_method === "razorpay" || payment_method === "upi") &&
      (!(Deno.env.get("RAZORPAY_KEY_ID") ?? Deno.env.get("RAZORPAY_API_KEY")) ||
        !(Deno.env.get("RAZORPAY_KEY_SECRET") ?? Deno.env.get("RAZORPAY_API_SECRET")))) {
      return new Response(JSON.stringify({ error: "Razorpay is not configured. Add Razorpay keys to Supabase secrets." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let orderId: string;

    if (cart_items?.length) {
      const cleanItems = cart_items
        .map((item) => ({
          ...item,
          id: String(item.id || "").trim(),
          name: String(item.name || "").trim(),
          qty: String(item.qty || "").trim(),
          price: Number(item.price),
          count: Number(item.count),
        }))
        .filter((item) => item.id && item.name && item.price > 0 && item.count > 0);

      if (!cleanItems.length) {
        return new Response(JSON.stringify({ error: "Cart is empty" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const ids = cleanItems.map((item) => item.id);
      const [{ data: products }, { data: giftBoxes }] = await Promise.all([
        supabase.from("products").select("id, name, qty, mrp, discount, stock").in("id", ids),
        supabase.from("gift_boxes").select("id, name, price").in("id", ids),
      ]);

      const productById = new Map((products ?? []).map((product) => [product.id, product]));
      const giftBoxById = new Map((giftBoxes ?? []).map((giftBox) => [giftBox.id, giftBox]));

      const orderItems = cleanItems.map((item) => {
        const product = productById.get(item.id);
        const giftBox = giftBoxById.get(item.id);
        const unitPrice = product
          ? Math.round(Number(product.mrp) * (1 - Number(product.discount) / 100))
          : giftBox
            ? Number(giftBox.price)
            : Math.round(item.price);

        if (product && Number(product.stock) < item.count) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        return {
          product_id: product ? item.id : null,
          gift_box_id: giftBox ? item.id : null,
          item_name: `${product?.name ?? giftBox?.name ?? item.name}${product?.qty || item.qty ? ` - ${product?.qty ?? item.qty}` : ""}`,
          item_type: product ? "product" : giftBox ? "gift_box" : "custom",
          quantity: item.count,
          unit_price: unitPrice,
          total_price: unitPrice * item.count,
        };
      });

      const subtotal = orderItems.reduce((sum, item) => sum + item.total_price, 0);
      const shippingCost = getDeliveryCharge(subtotal) +
        (payment_method === "cod" ? getCodDeliveryCharge(shipping_city, shipping_state) : 0);
      const totalAmount = subtotal + shippingCost;

      const { data: createdOrder, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          shipping_name,
          shipping_phone,
          shipping_address_line1,
          shipping_address_line2: shipping_address_line2 || null,
          shipping_city,
          shipping_state,
          shipping_pincode,
          subtotal,
          shipping_cost: shippingCost,
          total_amount: totalAmount,
          payment_method,
          payment_status: payment_method === "cod" ? "pending" : "processing",
          status: payment_method === "cod" ? "confirmed" : "pending",
          notes: notes || null,
          confirmed_at: payment_method === "cod" ? new Date().toISOString() : null,
        })
        .select("id")
        .single();

      if (orderError || !createdOrder) {
        console.error("Order creation error:", orderError);
        return new Response(JSON.stringify({ error: orderError?.message || "Order creation failed" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      orderId = createdOrder.id;

      const { error: itemError } = await supabase
        .from("order_items")
        .insert(orderItems.map((item) => ({ ...item, order_id: orderId })));

      if (itemError) {
        console.error("Order item creation error:", itemError);
        await supabase.from("orders").delete().eq("id", orderId);
        return new Response(JSON.stringify({ error: itemError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      for (const item of orderItems) {
        if (!item.product_id) continue;
        const product = productById.get(item.product_id);
        if (!product) continue;
        await supabase
          .from("products")
          .update({ stock: Number(product.stock) - item.quantity })
          .eq("id", item.product_id);
      }
    } else {
      const { data: rpcOrderId, error: orderError } = await supabase.rpc("create_order_from_cart", {
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

      orderId = rpcOrderId;
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
          razorpay_key_id:
            Deno.env.get("RAZORPAY_KEY_ID") ?? Deno.env.get("RAZORPAY_API_KEY"),
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
