import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [categories, featuredItems] = await Promise.all([
      prisma.category.findMany({
        orderBy: { sortOrder: "asc" },
        include: { items: { where: { available: true }, take: 3 } },
      }),
      prisma.item.findMany({
        where: { featured: true, available: true },
        take: 8,
        include: { category: true },
      }),
    ]);
    return NextResponse.json({ categories, featuredItems });
  } catch (e) {
    return NextResponse.json({ categories: [], featuredItems: [] });
  }
}
