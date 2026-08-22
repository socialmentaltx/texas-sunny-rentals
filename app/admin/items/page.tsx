export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function AdminItems() {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-800">Rental Items</h1>
        <Link
          href="/admin/items/new"
          className="flex items-center gap-2 bg-orange-600 text-white font-bold px-5 py-2.5 rounded-full hover:bg-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Item</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No items yet.{" "}
                  <Link href="/admin/items/new" className="text-orange-600 hover:underline">
                    Add your first item →
                  </Link>
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center text-lg">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : "🎠"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category.name}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-orange-600">
                    ${item.price.toFixed(0)}/{item.priceUnit}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        item.available
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/items/${item.id}/edit`}
                        className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={`/api/admin/items/${item.id}/delete`} method="POST">
                        <button
                          type="submit"
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          onClick={(e) => {
                            if (!confirm("Delete this item?")) e.preventDefault();
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
