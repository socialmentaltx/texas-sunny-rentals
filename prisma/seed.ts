import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Admin user
  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || "changeme123", 12);
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@texassunnyrentals.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@texassunnyrentals.com",
      password: hashed,
      name: "Admin",
    },
  });
  console.log("✓ Admin user created");

  // Sample categories
  const bounceHouses = await prisma.category.upsert({
    where: { slug: "bounce-houses" },
    update: {},
    create: { name: "Bounce Houses", slug: "bounce-houses", description: "Classic inflatable bounce houses for all ages.", sortOrder: 1 },
  });
  const waterSlides = await prisma.category.upsert({
    where: { slug: "water-slides" },
    update: {},
    create: { name: "Water Slides", slug: "water-slides", description: "Cool off with our water slides.", sortOrder: 2 },
  });
  const combos = await prisma.category.upsert({
    where: { slug: "combo-units" },
    update: {},
    create: { name: "Combo Units", slug: "combo-units", description: "Bounce + slide in one unit.", sortOrder: 3 },
  });
  const partyExtras = await prisma.category.upsert({
    where: { slug: "party-extras" },
    update: {},
    create: { name: "Party Extras", slug: "party-extras", description: "Tables, chairs, tents, and more.", sortOrder: 4 },
  });
  console.log("✓ Categories created");

  // Sample items
  const sampleItems = [
    { name: "Classic 15ft Bounce House", slug: "classic-15ft-bounce-house", price: 149, dimensions: "15 x 15 ft", ageRange: "3-12 years", capacity: 8, featured: true, categoryId: bounceHouses.id },
    { name: "XL 20ft Bounce House", slug: "xl-20ft-bounce-house", price: 199, dimensions: "20 x 20 ft", ageRange: "3-15 years", capacity: 12, featured: true, categoryId: bounceHouses.id },
    { name: "Tropical Water Slide", slug: "tropical-water-slide", price: 249, dimensions: "18 x 10 ft", ageRange: "5-15 years", capacity: 6, featured: true, categoryId: waterSlides.id },
    { name: "Bounce & Slide Combo", slug: "bounce-slide-combo", price: 229, dimensions: "20 x 15 ft", ageRange: "3-14 years", capacity: 10, featured: true, categoryId: combos.id },
    { name: "Tables & Chairs (10-person set)", slug: "tables-chairs-10", price: 79, categoryId: partyExtras.id },
    { name: "Canopy Tent 10x10", slug: "canopy-tent-10x10", price: 59, categoryId: partyExtras.id },
  ];

  for (const item of sampleItems) {
    await prisma.item.upsert({
      where: { slug: item.slug },
      update: {},
      create: { ...item, available: true, description: `Rent our ${item.name} for your next event!` },
    });
  }
  console.log("✓ Sample items created");

  console.log("\n✅ Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
