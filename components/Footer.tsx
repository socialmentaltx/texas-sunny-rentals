import Link from "next/link";
import { Sun, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-700 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-6 h-6 text-yellow-300" />
            <span className="font-black text-lg">Texas Sunny Rentals</span>
          </div>
          <p className="text-orange-200 text-sm">
            Clean, safe, and fun bounce houses and party rentals delivered right
            to you.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-1 text-orange-200 text-sm">
            {[
              ["/rentals", "All Rentals"],
              ["/faq", "FAQ"],
              ["/service-area", "Service Area"],
              ["/contact", "Contact Us"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">Contact</h4>
          <ul className="space-y-2 text-orange-200 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (555) 555-5555
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              info@texassunnyrentals.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Texas, USA
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-orange-600 text-center py-4 text-orange-300 text-xs">
        © {new Date().getFullYear()} Texas Sunny Rentals. All rights reserved.
      </div>
    </footer>
  );
}
