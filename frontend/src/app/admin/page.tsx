"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import * as Tabs from "@radix-ui/react-tabs";
import { ShieldCheck, UserPlus, Lock, Store, LogOut, Loader2 } from "lucide-react";

export default function AdminPortal() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Token State
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  );

  // Admin Form State
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Vendor Creation Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 1. Admin Login Mutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/admin-login", { email: loginEmail, password: loginPassword });
      return res.data;
    },
    onSuccess: (data) => {
      const authToken = data?.accessToken || data?.data?.accessToken || data?.data?.token;
      if (authToken) {
        localStorage.setItem("adminToken", authToken);
        setToken(authToken);
        setAuthError("");
      } else {
        setAuthError("Login successful but token missing in response.");
      }
    },
    onError: (err: any) => {
      setAuthError(err?.response?.data?.message || "Invalid Admin Credentials.");
    },
  });

  // 2. Admin Signup Mutation
  const signupMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/admin-signup", {
        fullName,
        email: loginEmail,
        password: loginPassword,
        phoneNumber,
      });
      return res.data;
    },
    onSuccess: (data) => {
      const authToken = data?.accessToken || data?.data?.accessToken || data?.data?.token;
      if (authToken) {
        localStorage.setItem("adminToken", authToken);
        setToken(authToken);
        setAuthError("");
      } else {
        setAuthError("Signup successful! Please log in.");
        setAuthMode("login");
      }
    },
    onError: (err: any) => {
      setAuthError(err?.response?.data?.message || "Failed to register admin account.");
    },
  });

  // 3. Fetch All Vendors (Admin)
  const { data: vendorsList, isLoading: vendorsLoading } = useQuery({
    queryKey: ["adminVendors"],
    queryFn: async () => {
      const res = await api.get("/all-vendor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data?.data || res.data || [];
    },
    enabled: !!token,
  });

  // 4. Create Vendor Mutation
  const createVendorMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post(
        "/create-vendor",
        {
          name,
          email,
          password,
          ownerName,
          phone,
          address,
          pincode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      setSuccessMsg(`Vendor "${name}" created successfully!`);
      setName("");
      setEmail("");
      setPassword("");
      setOwnerName("");
      setPhone("");
      setAddress("");
      setPincode("");
      queryClient.invalidateQueries({ queryKey: ["adminVendors"] });
    },
    onError: (err: any) => {
      setSuccessMsg("");
      alert(err?.response?.data?.message || "Failed to create vendor.");
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 mb-10 border-b border-slate-800">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <ShieldCheck className="text-purple-500 group-hover:scale-105 transition-transform" size={32} />
          <h2 className="text-2xl font-bold tracking-tight text-white">Admin Portal</h2>
        </div>
        {token && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout Admin</span>
          </button>
        )}
      </header>

      {!token ? (
        /* Radix UI Tabs for Auth */
        <div className="max-w-md mx-auto bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-purple-500/10 rounded-full mb-3">
              <Lock className="text-purple-400" size={36} />
            </div>
            <h3 className="text-xl font-bold text-white">Admin Access</h3>
            <p className="text-slate-400 text-sm mt-1">Manage platform vendors and administrative controls</p>
          </div>

          <Tabs.Root value={authMode} onValueChange={(val) => setAuthMode(val as any)}>
            <Tabs.List className="flex border-b border-slate-700 mb-6">
              <Tabs.Trigger
                value="login"
                className="flex-1 py-2 text-sm font-medium text-slate-400 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500 transition-colors"
              >
                Sign In
              </Tabs.Trigger>
              <Tabs.Trigger
                value="signup"
                className="flex-1 py-2 text-sm font-medium text-slate-400 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500 transition-colors"
              >
                Register Admin
              </Tabs.Trigger>
            </Tabs.List>

            {authError && (
              <div className="bg-red-900/40 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-4">
                {authError}
              </div>
            )}

            <Tabs.Content value="login" className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <button
                onClick={() => loginMutation.mutate()}
                disabled={loginMutation.isPending}
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loginMutation.isPending && <Loader2 className="animate-spin" size={18} />}
                <span>{loginMutation.isPending ? "Authenticating..." : "Login as Admin"}</span>
              </button>
            </Tabs.Content>

            <Tabs.Content value="signup" className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="System Administrator"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <button
                onClick={() => signupMutation.mutate()}
                disabled={signupMutation.isPending || !fullName || !loginEmail || !loginPassword}
                className="w-full mt-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {signupMutation.isPending && <Loader2 className="animate-spin" size={18} />}
                <span>{signupMutation.isPending ? "Registering..." : "Create Admin Account"}</span>
              </button>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      ) : (
        /* Admin Dashboard Grid */
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Vendor Card */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-700/60">
              <UserPlus className="text-teal-400" size={24} />
              <h3 className="text-lg font-bold text-white">Onboard New Vendor</h3>
            </div>

            {successMsg && (
              <div className="bg-emerald-900/40 border border-emerald-500/50 text-emerald-200 text-sm p-3 rounded-lg mb-4">
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  placeholder="Tasty Bytes Kitchen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Vendor Email
                </label>
                <input
                  type="email"
                  placeholder="vendor@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Initial Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  placeholder="700001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Full Address
              </label>
              <textarea
                placeholder="123 Food Street, Downtown"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500 h-20 resize-none"
              />
            </div>

            <button
              onClick={() => createVendorMutation.mutate()}
              disabled={createVendorMutation.isPending || !name || !email}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {createVendorMutation.isPending && <Loader2 className="animate-spin" size={18} />}
              <span>{createVendorMutation.isPending ? "Registering Vendor..." : "Register Vendor"}</span>
            </button>
          </div>

          {/* Active Vendors List */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-700/60">
              <Store className="text-purple-400" size={24} />
              <h3 className="text-lg font-bold text-white">Active Onboarded Vendors</h3>
            </div>

            {vendorsLoading ? (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="animate-spin" size={18} />
                <span>Loading vendors...</span>
              </div>
            ) : Array.isArray(vendorsList) && vendorsList.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {vendorsList.map((v: any, idx: number) => (
                  <div
                    key={v.id || idx}
                    className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 hover:border-slate-600 transition-colors"
                  >
                    <h4 className="font-bold text-white text-base">{v.name || "Unnamed Shop"}</h4>
                    <p className="text-slate-400 text-xs mt-1">
                      Owner: <span className="text-slate-200">{v.ownerName || "N/A"}</span> | Email:{" "}
                      <span className="text-slate-200">{v.email}</span>
                    </p>
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                      <span>📍</span>
                      <span>{v.address || "No address updated"} ({v.pincode || "No zip"})</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No active vendors registered yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
