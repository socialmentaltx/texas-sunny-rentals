import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, slug, description, price, priceUnit, imageUrl, dimensions, ageRange, capacity, featured, available, categoryId } = body;

  if (!name || !slug || !categoryId || price == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const item = await prisma.item.create({
    data: {
      name,
      slug,
      description: description || null,
      price: parseFloat(price),
      priceUnit: priceUnit || "day",
      imageUrl: imageUrl || null,
      dimensions: dimensions || null,
      ageRange: ageRange || null,
      capacity: capacity ? parseInt(capacity) : null,
      featured: !!featured,
      available: available !== false,
      categoryId,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
