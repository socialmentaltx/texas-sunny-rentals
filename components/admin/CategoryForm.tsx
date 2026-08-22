"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
};

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function slugify(str: string) {
    return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      slug: (form.elements.namedItem("slug") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      imageUrl: (form.elements.namedItem("imageUrl") as HTMLInputElement).value,
      sortOrder: parseInt((form.elements.namedItem("sortOrder") as HTMLInputElement).value) || 0,
    };

    const url = category ? `/api/admin/categories/${category.id}` : "/api/admin/categories";
    const method = category ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/categories");
      router.refresh();
    } else {
      const err = await res.json();
      setError(err.error || "Something went wrong");
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 max-w-xl">
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Category Name *</label>
          <input
            name="name"
            required
            defaultValue={category?.name}
            onChange={(e) => {
              const slugInput = e.currentTarget.form?.elements.namedItem("slug") as HTMLInputElement;
              if (slugInput && !category) slugInput.value = slugify(e.target.value);
            }}
            className={inputClass}
            placeholder="Bounce Houses"
          />
        </div>

        <div>
          <label className={labelClass}>Slug *</label>
          <input name="slug" required defaultValue={category?.slug} className={inputClass} placeholder="bounce-houses" />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" rows={3} defaultValue={category?.description || ""} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input name="imageUrl" type="url" defaultValue={category?.imageUrl || ""} className={inputClass} placeholder="https://..." />
        </div>

        <div>
          <label className={labelClass}>Sort Order</label>
          <input name="sortOrder" type="number" defaultValue={category?.sortOrder ?? 0} className={inputClass} />
          <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <div className="flex gap-4 mt-8">
        <button type="submit" disabled={loading} className="bg-orange-600 text-white font-black px-6 py-3 rounded-full hover:bg-orange-700 transition disabled:opacity-60">
          {loading ? "Saving..." : category ? "Update Category" : "Add Category"}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
          Cancel
        </button>
      </div>
    </form>
  );
}
