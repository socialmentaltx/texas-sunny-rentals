import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, eventDate, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await prisma.contactSubmission.create({
    data: {
      name,
      email,
      phone: phone || null,
      eventDate: eventDate ? new Date(eventDate) : null,
      message,
    },
  });

  return NextResponse.json({ success: true });
}
