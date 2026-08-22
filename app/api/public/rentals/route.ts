import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  try {
    const [categories, items] = await Promise.all([
      prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.item.findMany({
        where: { available: true, ...(category ? { category: { slug: category } } : {}) },
        orderBy: { name: "asc" },
        include: { category: true },
      }),
    ]);
    return NextResponse.json({ categories, items });
  } catch (e) {
    return NextResponse.json({ categories: [], items: [] });
  }
}
