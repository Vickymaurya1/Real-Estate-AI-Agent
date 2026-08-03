import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";
  const assistantId = process.env.VAPI_ASSISTANT_ID || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "";

  if (!publicKey || !assistantId) {
    return NextResponse.json(
      {
        publicKey: "",
        assistantId: "",
        demo: true,
        message:
          "Vapi credentials not configured. Set NEXT_PUBLIC_VAPI_PUBLIC_KEY and VAPI_ASSISTANT_ID in your .env.local file.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ publicKey, assistantId, demo: false });
}
