export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-800">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 bg-orange-600 text-white font-bold px-5 py-2.5 rounded-full hover:bg-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Slug</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Items</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No categories yet.{" "}
                  <Link href="/admin/categories/new" className="text-orange-600 hover:underline">
                    Add your first →
                  </Link>
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cat.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cat._count.items}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cat.sortOrder}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/categories/${cat.id}/edit`}
                      className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition inline-flex"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
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
