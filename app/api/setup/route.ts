import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// One-time setup endpoint — delete after use
export async function GET() {
  try {
    const email = process.env.ADMIN_EMAIL || "admin@texassunnyrentals.com";
    const password = process.env.ADMIN_PASSWORD || "TexasSunny2024!";
    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.adminUser.upsert({
      where: { email },
      update: { password: hashed },
      create: { email, password: hashed, name: "Admin" },
    });

    // Also seed sample categories
    const cats = [
      { name: "Bounce Houses", slug: "bounce-houses", sortOrder: 1 },
      { name: "Water Slides", slug: "water-slides", sortOrder: 2 },
      { name: "Combo Units", slug: "combo-units", sortOrder: 3 },
      { name: "Party Extras", slug: "party-extras", sortOrder: 4 },
    ];
    for (const cat of cats) {
      await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
    }

    return NextResponse.json({ ok: true, adminEmail: user.email, categoriesSeeded: cats.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
