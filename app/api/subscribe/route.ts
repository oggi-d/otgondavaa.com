import { NextRequest, NextResponse } from "next/server";
import { addContact } from "@/lib/brevo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await addContact(email, name ? { NAME: name } : {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
