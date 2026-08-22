import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { name, slug, description, price, priceUnit, imageUrl, dimensions, ageRange, capacity, featured, available, categoryId } = body;

  const item = await prisma.item.update({
    where: { id },
    data: {
      name,
      slug,
      description: description || null,
      price: parseFloat(price),
      priceUnit,
      imageUrl: imageUrl || null,
      dimensions: dimensions || null,
      ageRange: ageRange || null,
      capacity: capacity ? parseInt(capacity) : null,
      featured: !!featured,
      available: !!available,
      categoryId,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.item.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
