import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { name, email, body } = await req.json();

    if (typeof name !== "string" || typeof email !== "string" || typeof body !== "string") {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const n = name.trim();
    const e = email.trim();
    const b = body.trim();

    if (n.length < 1 || n.length > 80) {
      return NextResponse.json({ error: "Name must be 1–80 characters." }, { status: 400 });
    }
    if (!EMAIL_RE.test(e) || e.length > 120) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (b.length < 5 || b.length > 2000) {
      return NextResponse.json({ error: "Message must be 5–2000 characters." }, { status: 400 });
    }

    await prisma.message.create({ data: { name: n, email: e, body: b } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
