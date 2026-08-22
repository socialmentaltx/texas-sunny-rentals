export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let item: any = null;
  let related: any[] = [];
  try {
    item = await prisma.item.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (item) {
      related = await prisma.item.findMany({
        where: { categoryId: item.categoryId, id: { not: item.id }, available: true },
        take: 3,
      });
    }
  } catch (e) {}

  if (!item) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-600">Home</Link>
        {" / "}
        <Link href="/rentals" className="hover:text-orange-600">Rentals</Link>
        {" / "}
        <Link href={`/rentals?category=${item.category.slug}`} className="hover:text-orange-600">
          {item.category.name}
        </Link>
        {" / "}
        <span className="text-gray-600">{item.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-100 h-80 md:h-[450px] flex items-center justify-center">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl">🎪</span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-orange-500 font-semibold uppercase mb-2">{item.category.name}</p>
          <h1 className="text-3xl font-black text-gray-800 mb-3">{item.name}</h1>
          <p className="text-4xl font-black text-orange-600 mb-6">
            ${item.price.toFixed(0)}
            <span className="text-gray-400 font-normal text-lg ml-2">/ {item.priceUnit}</span>
          </p>

          {item.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
          )}

          <div className="grid grid-cols-2 gap-3 mb-8">
            {item.dimensions && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase font-semibold">Size</p>
                <p className="font-bold text-gray-700">{item.dimensions}</p>
              </div>
            )}
            {item.ageRange && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase font-semibold">Age Range</p>
                <p className="font-bold text-gray-700">{item.ageRange}</p>
              </div>
            )}
            {item.capacity && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase font-semibold">Capacity</p>
                <p className="font-bold text-gray-700">Up to {item.capacity} kids</p>
              </div>
            )}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <h3 className="font-black text-orange-700 mb-3">Ready to Book?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Contact us to check availability and reserve this item for your event.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+15555555555"
                className="flex items-center justify-center gap-2 bg-orange-600 text-white font-bold px-5 py-3 rounded-full hover:bg-orange-700 transition"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-white border border-orange-400 text-orange-600 font-bold px-5 py-3 rounded-full hover:bg-orange-50 transition"
              >
                <Mail className="w-4 h-4" />
                Send Message
              </Link>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-black text-gray-800 mb-6">More from {item.category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((r: any) => (
              <Link key={r.id} href={`/rentals/${r.slug}`} className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="h-36 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                  {r.imageUrl ? (
                    <img src={r.imageUrl} alt={r.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">🎠</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-bold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-orange-600 font-black text-sm mt-1">${r.price.toFixed(0)} / {r.priceUnit}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
