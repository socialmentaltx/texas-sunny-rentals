export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Tag, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const [itemCount, categoryCount, inquiryCount, unreadCount] = await Promise.all([
    prisma.item.count(),
    prisma.category.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);

  const recentInquiries = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <Link href="/admin/items" className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">{itemCount}</p>
              <p className="text-gray-500 text-sm">Rental Items</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/categories" className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Tag className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">{categoryCount}</p>
              <p className="text-gray-500 text-sm">Categories</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/inquiries" className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">{inquiryCount}</p>
              <p className="text-gray-500 text-sm">
                Inquiries
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-gray-800 text-lg">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-orange-600 text-sm hover:underline">
            View all
          </Link>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="text-gray-400 text-sm">No inquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {recentInquiries.map((inq) => (
              <div
                key={inq.id}
                className={`p-4 rounded-xl border ${inq.read ? "border-gray-100 bg-gray-50" : "border-orange-200 bg-orange-50"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-800">{inq.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{inq.email}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{inq.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
