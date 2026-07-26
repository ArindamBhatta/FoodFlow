"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ShoppingBag, Utensils, ShieldCheck, Store } from "lucide-react";

export default function Home() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={styles.container}>
      {/* Header / Navbar */}
      <header style={styles.header}>
        <div style={styles.logoGroup}>
          <Utensils style={{ color: "#E53E3E" }} size={28} />
          <span style={styles.logoText}>FoodFlow</span>
        </div>

        <div style={styles.navActions}>
          <button style={styles.cartBtn}>
            <ShoppingBag size={20} />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span style={styles.badge}>{totalCartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={styles.hero}>
        <h1 style={styles.title}>
          Full-Stack <span style={{ color: "#E53E3E" }}>Food Ordering</span> System
        </h1>
        <p style={styles.subtitle}>
          Powered by Express.js (Port 8001), Drizzle ORM, SQLite, Next.js, Redux Toolkit, & TanStack Query.
        </p>

        {/* System Cards */}
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <Utensils size={32} style={{ color: "#DD6B20" }} />
            <h3>Customer Portal</h3>
            <p>Browse vendors, view menus, add items to Redux cart, and place orders.</p>
          </div>

          <div style={styles.card}>
            <Store size={32} style={{ color: "#319795" }} />
            <h3>Vendor Dashboard</h3>
            <p>Manage food items, upload menu images, and track active incoming orders.</p>
          </div>

          <div style={styles.card}>
            <ShieldCheck size={32} style={{ color: "#805AD5" }} />
            <h3>Admin Management</h3>
            <p>Unified identity base (`Person`) managing customer & vendor role permissions.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0F172A",
    color: "#F8FAFC",
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 3rem",
    borderBottom: "1px solid #1E293B",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  cartBtn: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#1E293B",
    color: "#F8FAFC",
    border: "1px solid #334155",
    padding: "0.6rem 1.2rem",
    borderRadius: "9999px",
    cursor: "pointer",
    fontWeight: "600",
  },
  badge: {
    backgroundColor: "#E53E3E",
    color: "#FFF",
    fontSize: "0.75rem",
    borderRadius: "50%",
    padding: "0.2rem 0.5rem",
    marginLeft: "0.25rem",
  },
  hero: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "4rem 2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "1rem",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#94A3B8",
    maxWidth: "650px",
    margin: "0 auto 3.5rem auto",
    lineHeight: "1.6",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    textAlign: "left",
  },
  card: {
    backgroundColor: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "1rem",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};
