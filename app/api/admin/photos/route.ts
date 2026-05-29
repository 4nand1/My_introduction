import { NextRequest, NextResponse } from "next/server";
import { put, del, list } from "@vercel/blob";

function checkPassword(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "memories/" });
    const files = blobs.map(b => ({
      name: b.pathname.replace("memories/", ""),
      url: b.url,
    }));
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!checkPassword(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const { blobs } = await list({ prefix: "memories/" });
    const nextNum = blobs.length + 1;
    const pathname = `memories/${nextNum}.${ext}`;

    const blob = await put(pathname, file, { access: "public" });
    return NextResponse.json({ ok: true, filename: `${nextNum}.${ext}`, url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkPassword(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  try {
    await del(url);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
