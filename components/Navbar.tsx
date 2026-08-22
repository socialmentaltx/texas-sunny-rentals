"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Sun } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/rentals", label: "All Rentals" },
    { href: "/faq", label: "FAQ" },
    { href: "/service-area", label: "Service Area" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sun className="text-orange-500 w-8 h-8" />
            <span className="font-black text-xl text-orange-700 tracking-tight">
              Texas Sunny Rentals
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-orange-800 font-semibold hover:text-orange-600 transition"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+15555555555"
              className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-600 transition"
            >
              <Phone className="w-4 h-4" />
              (555) 555-5555
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-orange-800"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-yellow-300 px-4 pb-4 space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-orange-800 font-semibold py-2 border-b border-yellow-400"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+15555555555"
            className="flex items-center gap-1 text-orange-700 font-bold pt-2"
          >
            <Phone className="w-4 h-4" />
            (555) 555-5555
          </a>
        </div>
      )}
    </nav>
  );
}
