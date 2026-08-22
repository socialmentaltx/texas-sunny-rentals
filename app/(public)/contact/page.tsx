"use client";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setStatus(res.ok ? "success" : "error");
    if (res.ok) form.reset();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-orange-700 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-10">
        Have a question or ready to book? We'd love to hear from you!
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input
              name="name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
            <input
              name="phone"
              type="tel"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="(555) 555-5555"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Event Date</label>
            <input
              name="eventDate"
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Tell us about your event..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-orange-600 text-white font-black py-3 rounded-full hover:bg-orange-700 transition disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-600 font-semibold text-center">
              ✓ Message sent! We'll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 font-semibold text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-orange-50 rounded-2xl p-6">
            <h3 className="font-black text-orange-700 mb-4 text-lg">Get in Touch</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <a href="tel:+15555555555" className="hover:text-orange-600">
                  (555) 555-5555
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <a href="mailto:info@texassunnyrentals.com" className="hover:text-orange-600">
                  info@texassunnyrentals.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                Texas, USA
              </li>
            </ul>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-6">
            <h3 className="font-black text-orange-700 mb-2">Hours</h3>
            <p className="text-gray-600 text-sm">
              Monday – Saturday: 8am – 8pm<br />
              Sunday: 10am – 6pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
