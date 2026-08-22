import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-8">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
