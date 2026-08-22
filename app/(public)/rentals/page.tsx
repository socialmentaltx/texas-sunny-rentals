export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";


export default async function RentalsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let categories: any[] = [];
  let items: any[] = [];
  try {
    categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
    items = await prisma.item.findMany({
      where: { available: true, ...(category ? { category: { slug: category } } : {}) },
      orderBy: { name: "asc" },
      include: { category: true },
    });
  } catch (e) {}

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-orange-700 mb-2">All Rentals</h1>
      <p className="text-gray-600 mb-8">
        Browse our full selection of bounce houses and party accessories.
      </p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Link
          href="/rentals"
          className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
            !category
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-orange-100"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/rentals?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
              category === cat.slug
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Items grid */}
      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🎪</p>
          <p className="text-xl font-semibold">No items found</p>
          <p className="mt-2">Check back soon or contact us!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/rentals/${item.slug}`}
              className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl">🎠</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-orange-500 font-semibold uppercase mb-1">
                  {item.category.name}
                </p>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                {item.dimensions && (
                  <p className="text-xs text-gray-400 mt-1">{item.dimensions}</p>
                )}
                <p className="text-orange-600 font-black mt-2">
                  ${item.price.toFixed(0)}{" "}
                  <span className="text-gray-400 font-normal text-sm">
                    / {item.priceUnit}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
