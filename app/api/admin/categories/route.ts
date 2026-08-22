import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, slug, description, imageUrl, sortOrder } = body;

  if (!name || !slug) return NextResponse.json({ error: "Name and slug required" }, { status: 400 });

  const cat = await prisma.category.create({
    data: { name, slug, description: description || null, imageUrl: imageUrl || null, sortOrder: sortOrder ?? 0 },
  });

  return NextResponse.json(cat, { status: 201 });
}
