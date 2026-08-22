"use client";
import Link from "next/link";
import { Sun, LayoutDashboard, Package, Tag, MessageSquare, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-700 text-white flex flex-col">
        <div className="p-6 border-b border-orange-600">
          <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-yellow-300" />
            <div>
              <p className="font-black text-sm">Texas Sunny Rentals</p>
              <p className="text-orange-300 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/admin", icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard" },
            { href: "/admin/items", icon: <Package className="w-4 h-4" />, label: "Rental Items" },
            { href: "/admin/categories", icon: <Tag className="w-4 h-4" />, label: "Categories" },
            { href: "/admin/inquiries", icon: <MessageSquare className="w-4 h-4" />, label: "Inquiries" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-orange-600">
          <button
            onClick={async () => { await fetch('/api/admin/auth/logout', { method: 'POST' }); window.location.href = '/admin/login'; }}
            className="flex items-center gap-2 text-orange-300 hover:text-white text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
