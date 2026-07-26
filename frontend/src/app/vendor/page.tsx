"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Store, Lock, User, Edit3, Image, Phone, MapPin, CheckCircle } from "lucide-react";

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
  const { data: vendorProfile, isLoading: profileLoading } = useQuery({
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
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ ...styles.brand, cursor: "pointer" }} onClick={() => router.push("/")}>
          <Store color="#319795" size={32} />
          <h2>Vendor Portal</h2>
        </div>
        {token && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout Vendor
          </button>
        )}
      </header>

      {!token ? (
        /* Login Screen */
        <div style={styles.authCard}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Lock size={40} color="#319795" />
            <h3 style={{ marginTop: "0.5rem" }}>Vendor Login</h3>
            <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>Log in to manage your shop profile & food catalog</p>
          </div>

          {authError && <div style={styles.errorAlert}>{authError}</div>}

          <div style={styles.formGroup}>
            <label>Vendor Email</label>
            <input
              type="email"
              placeholder="vendor@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button
            onClick={() => loginMutation.mutate()}
            disabled={loginMutation.isPending}
            style={{ ...styles.primaryBtn, backgroundColor: "#319795" }}
          >
            {loginMutation.isPending ? "Authenticating..." : "Login as Vendor"}
          </button>
        </div>
      ) : (
        /* Vendor Profile Dashboard */
        <div style={styles.dashboardContainer}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Edit3 color="#319795" size={24} />
              <h3>Manage Restaurant Profile</h3>
            </div>

            {profileLoading ? (
              <p style={{ color: "#94A3B8" }}>Loading profile details...</p>
            ) : (
              <>
                {updateMsg && <div style={styles.successAlert}>{updateMsg}</div>}

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label>Restaurant / Shop Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Owner Name</label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label>Restaurant Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ ...styles.input, height: "90px", resize: "none" }}
                  />
                </div>

                <button
                  onClick={() => updateProfileMutation.mutate()}
                  disabled={updateProfileMutation.isPending}
                  style={{ ...styles.primaryBtn, backgroundColor: "#319795" }}
                >
                  {updateProfileMutation.isPending ? "Updating Profile..." : "Save Profile Changes"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0F172A",
    color: "#F8FAFC",
    fontFamily: "var(--font-geist-sans), sans-serif",
    padding: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2.5rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #1E293B",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logoutBtn: {
    backgroundColor: "#DC2626",
    color: "#FFF",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "600",
  },
  authCard: {
    maxWidth: "420px",
    margin: "4rem auto",
    backgroundColor: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "1rem",
    padding: "2.5rem",
  },
  dashboardContainer: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "1rem",
    padding: "2rem",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    marginBottom: "1rem",
  },
  input: {
    backgroundColor: "#0F172A",
    border: "1px solid #334155",
    color: "#F8FAFC",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    fontSize: "0.9rem",
    outline: "none",
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#319795",
    color: "#FFF",
    border: "none",
    padding: "0.85rem",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  errorAlert: {
    backgroundColor: "#7F1D1D",
    color: "#FECACA",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    fontSize: "0.85rem",
  },
  successAlert: {
    backgroundColor: "#064E3B",
    color: "#A7F3D0",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    fontSize: "0.85rem",
  },
};
