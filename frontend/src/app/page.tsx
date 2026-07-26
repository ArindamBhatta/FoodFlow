"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ShoppingBag, Utensils, ShieldCheck, Store } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-slate-850 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Utensils className="text-red-500" size={28} />
          <span className="text-xl font-bold tracking-tight text-white">FoodFlow</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ShieldCheck className="text-purple-400" size={18} />
            <span>Admin Portal</span>
          </button>

          <button
            onClick={() => router.push("/vendor")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Store className="text-teal-400" size={18} />
            <span>Vendor Portal</span>
          </button>

          <button className="relative flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-full border border-slate-700 transition-colors">
            <ShoppingBag size={18} />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Full-Stack <span className="text-red-500">Food Ordering</span> System
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed">
          Powered by Express.js (Port 8111), Drizzle ORM, SQLite, Next.js, Redux Toolkit, Tailwind CSS & Radix UI.
        </p>

        {/* System Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <Utensils className="text-orange-400 mb-4" size={36} />
              <h3 className="text-xl font-bold text-white mb-2">Customer Portal</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Browse vendors, view menus, add items to Redux cart, and place orders seamlessly.
              </p>
            </div>
            <span className="mt-6 text-xs text-orange-400 font-semibold uppercase tracking-wider">
              Customer Flow
            </span>
          </div>

          <div
            onClick={() => router.push("/vendor")}
            className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition-all shadow-lg cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <Store className="text-teal-400 mb-4 group-hover:scale-110 transition-transform" size={36} />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                Vendor Dashboard →
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Log in to edit shop details, phone, address, and manage food catalog.
              </p>
            </div>
            <span className="mt-6 text-xs text-teal-400 font-semibold uppercase tracking-wider">
              Vendor Management
            </span>
          </div>

          <div
            onClick={() => router.push("/admin")}
            className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all shadow-lg cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <ShieldCheck className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" size={36} />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                Admin Management →
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Log in as Admin to onboard new restaurant vendors and manage administrators.
              </p>
            </div>
            <span className="mt-6 text-xs text-purple-400 font-semibold uppercase tracking-wider">
              Admin & Onboarding
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
