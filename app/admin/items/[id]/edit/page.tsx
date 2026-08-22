import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ItemForm from "@/components/admin/ItemForm";

export default async function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    prisma.item.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!item) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-8">Edit Item</h1>
      <ItemForm categories={categories} item={item} />
    </div>
  );
}
