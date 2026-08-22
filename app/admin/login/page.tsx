"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Sun } from "lucide-react";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Sun className="w-8 h-8 text-orange-500" />
          <span className="font-black text-xl text-orange-700">Texas Sunny Rentals</span>
        </div>
        <h1 className="text-2xl font-black text-center text-gray-800 mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="admin@texassunnyrentals.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white font-black py-3 rounded-full hover:bg-orange-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
