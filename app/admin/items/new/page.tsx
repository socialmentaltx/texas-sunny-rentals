export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import ItemForm from "@/components/admin/ItemForm";

export default async function NewItemPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-8">Add New Item</h1>
      <ItemForm categories={categories} />
    </div>
  );
}
