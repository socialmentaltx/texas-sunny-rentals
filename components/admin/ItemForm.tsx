"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string };
type Item = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  priceUnit: string;
  imageUrl: string | null;
  dimensions: string | null;
  ageRange: string | null;
  capacity: number | null;
  featured: boolean;
  available: boolean;
  categoryId: string;
};

export default function ItemForm({
  categories,
  item,
}: {
  categories: Category[];
  item?: Item;
}) {
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
      price: parseFloat((form.elements.namedItem("price") as HTMLInputElement).value),
      priceUnit: (form.elements.namedItem("priceUnit") as HTMLSelectElement).value,
      imageUrl: (form.elements.namedItem("imageUrl") as HTMLInputElement).value,
      dimensions: (form.elements.namedItem("dimensions") as HTMLInputElement).value,
      ageRange: (form.elements.namedItem("ageRange") as HTMLInputElement).value,
      capacity: (form.elements.namedItem("capacity") as HTMLInputElement).value,
      featured: (form.elements.namedItem("featured") as HTMLInputElement).checked,
      available: (form.elements.namedItem("available") as HTMLInputElement).checked,
      categoryId: (form.elements.namedItem("categoryId") as HTMLSelectElement).value,
    };

    const url = item ? `/api/admin/items/${item.id}` : "/api/admin/items";
    const method = item ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/items");
      router.refresh();
    } else {
      const err = await res.json();
      setError(err.error || "Something went wrong");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelClass}>Item Name *</label>
          <input
            name="name"
            required
            defaultValue={item?.name}
            onChange={(e) => {
              const slugInput = e.currentTarget.form?.elements.namedItem("slug") as HTMLInputElement;
              if (slugInput && !item) slugInput.value = slugify(e.target.value);
            }}
            className={inputClass}
            placeholder="15ft Bounce House"
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Slug *</label>
          <input
            name="slug"
            required
            defaultValue={item?.slug}
            className={inputClass}
            placeholder="15ft-bounce-house"
          />
          <p className="text-xs text-gray-400 mt-1">URL-friendly identifier (auto-filled from name)</p>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Category *</label>
          <select name="categoryId" required defaultValue={item?.categoryId} className={inputClass}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Price *</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={item?.price}
            className={inputClass}
            placeholder="199.00"
          />
        </div>

        <div>
          <label className={labelClass}>Price Unit</label>
          <select name="priceUnit" defaultValue={item?.priceUnit || "day"} className={inputClass}>
            <option value="day">Per Day</option>
            <option value="event">Per Event</option>
            <option value="hour">Per Hour</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={item?.description || ""}
            className={inputClass}
            placeholder="Describe this item..."
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Image URL</label>
          <input
            name="imageUrl"
            type="url"
            defaultValue={item?.imageUrl || ""}
            className={inputClass}
            placeholder="https://..."
          />
          <p className="text-xs text-gray-400 mt-1">Direct link to an image (upload support coming soon)</p>
        </div>

        <div>
          <label className={labelClass}>Dimensions</label>
          <input
            name="dimensions"
            defaultValue={item?.dimensions || ""}
            className={inputClass}
            placeholder="15 x 15 ft"
          />
        </div>

        <div>
          <label className={labelClass}>Age Range</label>
          <input
            name="ageRange"
            defaultValue={item?.ageRange || ""}
            className={inputClass}
            placeholder="3-12 years"
          />
        </div>

        <div>
          <label className={labelClass}>Capacity (kids)</label>
          <input
            name="capacity"
            type="number"
            min="0"
            defaultValue={item?.capacity || ""}
            className={inputClass}
            placeholder="8"
          />
        </div>

        <div className="flex items-center gap-6 pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="available"
              type="checkbox"
              defaultChecked={item?.available ?? true}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm font-semibold text-gray-700">Available</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={item?.featured ?? false}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm font-semibold text-gray-700">Featured on Homepage</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white font-black px-6 py-3 rounded-full hover:bg-orange-700 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : item ? "Update Item" : "Add Item"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
