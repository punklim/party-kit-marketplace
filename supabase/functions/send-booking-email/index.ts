import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "limwilfried@gmail.com";

serve(async (req) => {
  try {
    const { type, booking } = await req.json();

    let subject = "";
    let html = "";

    if (type === "new_booking") {
      subject = `Nouvelle réservation - ${booking.client_name}`;
      html = `
        <h2>Nouvelle demande de réservation</h2>
        <p><strong>Client :</strong> ${booking.client_name}</p>
        <p><strong>Email :</strong> ${booking.client_email}</p>
        <p><strong>Téléphone :</strong> ${booking.client_phone}</p>
        <p><strong>Produit :</strong> ${booking.product_name}</p>
        <p><strong>Du :</strong> ${booking.start_date}</p>
        <p><strong>Au :</strong> ${booking.end_date}</p>
        <p><strong>Quantité :</strong> ${booking.quantity}</p>
      `;
    } else if (type === "confirmed_booking") {
      subject = `Votre réservation est confirmée - Éclat Events`;
      html = `
        <h2>Bonjour ${booking.client_name},</h2>
        <p>Nous avons le plaisir de vous confirmer votre réservation.</p>
        <p><strong>Produit :</strong> ${booking.product_name}</p>
        <p><strong>Du :</strong> ${booking.start_date} <strong>au</strong> ${booking.end_date}</p>
        <p><strong>Quantité :</strong> ${booking.quantity}</p>
        <p>Nous vous contacterons sous peu pour finaliser les détails.</p>
        <p>L'équipe Éclat Events</p>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), { status: 400 });
    }

    const to = type === "new_booking" ? ADMIN_EMAIL : booking.client_email;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to,
        subject,
        html,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});