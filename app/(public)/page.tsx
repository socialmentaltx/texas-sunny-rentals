"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Star, Truck, Shield } from "lucide-react";

export default function HomePage() {
  const [data, setData] = useState<{ categories: any[]; featuredItems: any[] }>({
    categories: [],
    featuredItems: [],
  });

  useEffect(() => {
    fetch("/api/public/homepage")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const { categories, featuredItems } = data;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-orange-800 mb-4 leading-tight">
          Texas-Sized Fun
          <br />
          <span className="text-orange-600">Delivered to Your Door</span>
        </h1>
        <p className="text-orange-700 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Premium bounce houses and party rentals — clean, safe, and ready for your next big event.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["5-Star Rated", "Licensed & Insured", "Cleaned & Sanitized", "Easy Online Booking"].map((badge) => (
            <span key={badge} className="bg-white text-orange-700 font-semibold px-4 py-2 rounded-full text-sm shadow">
              ✓ {badge}
            </span>
          ))}
        </div>
        <Link
          href="/rentals"
          className="bg-orange-600 text-white font-black text-lg px-8 py-4 rounded-full hover:bg-orange-700 transition shadow-lg"
        >
          Browse All Rentals →
        </Link>
      </section>

      {/* Trust badges */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />, label: "5-Star Reviews" },
            { icon: <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />, label: "Fully Insured" },
            { icon: <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />, label: "Sanitized Every Use" },
            { icon: <Truck className="w-8 h-8 text-orange-500 mx-auto mb-2" />, label: "Free Delivery & Setup" },
          ].map((item) => (
            <div key={item.label} className="p-4">
              {item.icon}
              <p className="font-bold text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-center text-orange-700 mb-10">Featured Rentals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item: any) => (
                <Link key={item.id} href={`/rentals/${item.slug}`} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">🎪</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-orange-500 font-semibold uppercase mb-1">{item.category.name}</p>
                    <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-orange-600 font-black">
                      ${item.price.toFixed(0)}{" "}
                      <span className="text-gray-400 font-normal text-sm">/ {item.priceUnit}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-center text-orange-700 mb-10">Shop by Category</h2>
            {categories.map((cat: any) => (
              <div key={cat.id} className="mb-14">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-black text-gray-800">{cat.name}</h3>
                  <Link href={`/rentals?category=${cat.slug}`} className="text-orange-600 font-semibold hover:underline">
                    See All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item: any) => (
                    <Link key={item.id} href={`/rentals/${item.slug}`} className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                      <div className="h-44 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl">🎠</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-orange-600 font-black mt-1">
                          ${item.price.toFixed(0)}{" "}
                          <span className="text-gray-400 font-normal text-sm">/ {item.priceUnit}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-orange-600 text-white text-center py-16 px-4">
        <h2 className="text-3xl font-black mb-4">Ready to Book Your Rental?</h2>
        <p className="mb-8 text-orange-100 max-w-xl mx-auto">
          Browse our full selection and get in touch — we make party planning easy.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/rentals" className="bg-white text-orange-600 font-black px-6 py-3 rounded-full hover:bg-yellow-100 transition">
            Browse Rentals
          </Link>
          <Link href="/contact" className="bg-orange-700 text-white font-black px-6 py-3 rounded-full hover:bg-orange-800 transition">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
