import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

function checkPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const [content, projects, captions] = await Promise.all([
      prisma.content.findUnique({ where: { id: "main" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.memoryCaption.findMany(),
    ]);

    const memoryCaptions = Object.fromEntries(
      captions.map((c: { filename: string; caption: string }) => [c.filename, c.caption])
    );

    return NextResponse.json({
      hero: content?.hero ?? {},
      contact: content?.contact ?? {},
      projects,
      memoryCaptions,
    });
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, content } = body;

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  try {
    const { hero, contact, projects, memoryCaptions } = content;

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Save hero + contact
      if (hero !== undefined || contact !== undefined) {
        await tx.content.upsert({
          where: { id: "main" },
          create: { id: "main", hero: hero ?? {}, contact: contact ?? {} },
          update: {
            ...(hero !== undefined && { hero }),
            ...(contact !== undefined && { contact }),
          },
        });
      }

      // Replace all projects
      if (Array.isArray(projects)) {
        await tx.project.deleteMany();
        if (projects.length > 0) {
          await tx.project.createMany({
            data: projects.map((p: { id: string; title: string; subtitle: string; year: string; description: string; tags: string; live?: string; repo?: string }, i: number) => ({
              id: p.id,
              title: p.title,
              subtitle: p.subtitle,
              year: p.year,
              description: p.description,
              tags: p.tags,
              live: p.live ?? "",
              repo: p.repo ?? "",
              order: i,
            })),
          });
        }
      }

      // Upsert memory captions
      if (memoryCaptions && typeof memoryCaptions === "object") {
        for (const [filename, caption] of Object.entries(memoryCaptions)) {
          if (caption) {
            await tx.memoryCaption.upsert({
              where: { filename },
              create: { filename, caption: caption as string },
              update: { caption: caption as string },
            });
          } else {
            await tx.memoryCaption.deleteMany({ where: { filename } });
          }
        }
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
