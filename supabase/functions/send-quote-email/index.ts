import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "limwilfried@gmail.com";

serve(async (req) => {
  try {
    const { full_name, email, phone, message, estimated_total } = await req.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: TO_EMAIL,
        subject: `Nouvelle demande de devis - ${full_name}`,
        html: `
          <h2>Nouvelle demande de devis</h2>
          <p><strong>Client :</strong> ${full_name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Message :</strong> ${message || "Aucun"}</p>
          <p><strong>Total estimé :</strong> ${estimated_total} MAD</p>
        `,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});