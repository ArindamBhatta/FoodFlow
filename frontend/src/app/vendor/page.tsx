"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Store, Lock, Edit3, Loader2, LogOut, CheckCircle } from "lucide-react";

export default function VendorPortal() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Token State
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("vendorToken") : null
  );

  // Vendor Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Edit Profile Form State
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");

  // 1. Vendor Login Mutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/vendor-login", { email, password });
      return res.data;
    },
    onSuccess: (data) => {
      const authToken = data?.accessToken || data?.data?.accessToken || data?.data?.token;
      if (authToken) {
        localStorage.setItem("vendorToken", authToken);
        setToken(authToken);
        setAuthError("");
      } else {
        setAuthError("Login successful but token missing.");
      }
    },
    onError: (err: any) => {
      setAuthError(err?.response?.data?.message || "Invalid Vendor Credentials.");
    },
  });

  // 2. Fetch Vendor Profile details
  const { isLoading: profileLoading } = useQuery({
    queryKey: ["vendorProfile", token],
    queryFn: async () => {
      const res = await api.get("/get-vendor-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile = res.data?.data || res.data;
      if (profile) {
        setName(profile.name || "");
        setOwnerName(profile.ownerName || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
        setPincode(profile.pincode || "");
      }
      return profile;
    },
    enabled: !!token,
  });

  // 3. Update Vendor Profile Mutation
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const res = await api.patch(
        "/update-vendor-profile",
        {
          name,
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
      setUpdateMsg("Vendor profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendorProfile"] });
    },
    onError: (err: any) => {
      setUpdateMsg("");
      alert(err?.response?.data?.message || "Failed to update profile.");
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
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
          <Store className="text-teal-400 group-hover:scale-105 transition-transform" size={32} />
          <h2 className="text-2xl font-bold tracking-tight text-white">Vendor Portal</h2>
        </div>
        {token && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout Vendor</span>
          </button>
        )}
      </header>

      {!token ? (
        /* Login Card */
        <div className="max-w-md mx-auto bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-teal-500/10 rounded-full mb-3">
              <Lock className="text-teal-400" size={36} />
            </div>
            <h3 className="text-xl font-bold text-white">Vendor Portal Access</h3>
            <p className="text-slate-400 text-sm mt-1">Log in to manage your shop profile & catalog</p>
          </div>

          {authError && (
            <div className="bg-red-900/40 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-4">
              {authError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Vendor Email
              </label>
              <input
                type="email"
                placeholder="vendor@restaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <button
              onClick={() => loginMutation.mutate()}
              disabled={loginMutation.isPending}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loginMutation.isPending && <Loader2 className="animate-spin" size={18} />}
              <span>{loginMutation.isPending ? "Authenticating..." : "Login as Vendor"}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Vendor Profile Dashboard */
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-700/60">
              <Edit3 className="text-teal-400" size={24} />
              <h3 className="text-xl font-bold text-white">Manage Restaurant Profile</h3>
            </div>

            {profileLoading ? (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="animate-spin" size={18} />
                <span>Loading profile details...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {updateMsg && (
                  <div className="bg-emerald-900/40 border border-emerald-500/50 text-emerald-200 text-sm p-3 rounded-lg flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-400" />
                    <span>{updateMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Shop / Restaurant Name
                    </label>
                    <input
                      type="text"
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
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
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
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Restaurant Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500 h-24 resize-none"
                  />
                </div>

                <button
                  onClick={() => updateProfileMutation.mutate()}
                  disabled={updateProfileMutation.isPending}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {updateProfileMutation.isPending && <Loader2 className="animate-spin" size={18} />}
                  <span>{updateProfileMutation.isPending ? "Updating Profile..." : "Save Profile Changes"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
