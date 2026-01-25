import { NextRequest, NextResponse } from "next/server";
import { addContact, sendTransactionalEmail } from "@/lib/brevo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Имэйл болон мессеж шаардлагатай" },
        { status: 400 },
      );
    }

    // Add contact to Brevo
    await addContact(email, name ? { NAME: name } : {});

    // Send email notification
    await sendTransactionalEmail({
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Contact Form: ${name || "Anonymous"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact error:", error);
    const message =
      error instanceof Error ? error.message : "Мессеж илгээхэд алдаа гарлаа";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
