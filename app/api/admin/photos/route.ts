import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MEMORIES_DIR = path.join(process.cwd(), "public", "memories");

function checkPassword(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    if (!fs.existsSync(MEMORIES_DIR)) fs.mkdirSync(MEMORIES_DIR, { recursive: true });
    const files = fs.readdirSync(MEMORIES_DIR)
      .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .sort();
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!checkPassword(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    if (!fs.existsSync(MEMORIES_DIR)) fs.mkdirSync(MEMORIES_DIR, { recursive: true });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const existing = fs.readdirSync(MEMORIES_DIR).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
    const nextNum = existing.length + 1;
    const filename = `${nextNum}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(MEMORIES_DIR, filename), buffer);

    return NextResponse.json({ ok: true, filename });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkPassword(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { filename } = await req.json();
  if (!filename || filename.includes("..")) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  try {
    fs.unlinkSync(path.join(MEMORIES_DIR, filename));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
