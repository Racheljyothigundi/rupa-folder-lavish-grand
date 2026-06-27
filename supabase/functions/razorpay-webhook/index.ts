import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function validSignature(body: string, signature: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return toHex(digest) === signature;
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");
  const signature = request.headers.get("x-razorpay-signature");
  const rawBody = await request.text();

  if (!secret || !signature || !(await validSignature(rawBody, signature, secret))) {
    return new Response("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const event = String(payload.event ?? "");
  const payment = payload.payload?.payment?.entity;
  const razorpayOrderId = payment?.order_id;
  const razorpayPaymentId = payment?.id;

  if (!razorpayOrderId || !razorpayPaymentId) {
    return new Response("Ignored", { status: 200 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  if (event === "payment.captured" || event === "order.paid") {
    const { error } = await supabase
      .from("orders")
      .update({
        payment_id: razorpayPaymentId,
        payment_status: "completed",
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
      })
      .eq("payment_id", razorpayOrderId);

    if (error) {
      console.error("Unable to confirm paid order", error);
      return new Response("Database update failed", { status: 500 });
    }
  } else if (event === "payment.failed") {
    const { error } = await supabase
      .from("orders")
      .update({ payment_id: razorpayPaymentId, payment_status: "failed" })
      .eq("payment_id", razorpayOrderId);

    if (error) {
      console.error("Unable to mark failed payment", error);
      return new Response("Database update failed", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
});
