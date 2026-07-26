"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ShieldCheck, UserPlus, LogIn, Store, Lock, Mail, Phone, MapPin, User, UserCheck } from "lucide-react";

export default function AdminPortal() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mode: "login" | "signup"
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
      // Reset form
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
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ ...styles.brand, cursor: "pointer" }} onClick={() => router.push("/")}>
          <ShieldCheck color="#805AD5" size={32} />
          <h2>Admin Portal</h2>
        </div>
        {token && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout Admin
          </button>
        )}
      </header>

      {!token ? (
        /* Login / Signup Auth Card */
        <div style={styles.authCard}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Lock size={40} color="#805AD5" />
            <h3 style={{ marginTop: "0.5rem" }}>
              {authMode === "login" ? "Admin Login" : "Create Admin Account"}
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>
              {authMode === "login"
                ? "Sign in to manage & onboard restaurant vendors"
                : "Register a new System Administrator account"}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div style={styles.tabContainer}>
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
              }}
              style={{
                ...styles.tabBtn,
                borderBottom: authMode === "login" ? "2px solid #805AD5" : "none",
                color: authMode === "login" ? "#F8FAFC" : "#94A3B8",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode("signup");
                setAuthError("");
              }}
              style={{
                ...styles.tabBtn,
                borderBottom: authMode === "signup" ? "2px solid #805AD5" : "none",
                color: authMode === "signup" ? "#F8FAFC" : "#94A3B8",
              }}
            >
              Register Admin
            </button>
          </div>

          {authError && <div style={styles.errorAlert}>{authError}</div>}

          {authMode === "signup" && (
            <>
              <div style={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="System Administrator"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={styles.input}
                />
              </div>
            </>
          )}

          <div style={styles.formGroup}>
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {authMode === "login" ? (
            <button
              onClick={() => loginMutation.mutate()}
              disabled={loginMutation.isPending}
              style={styles.primaryBtn}
            >
              {loginMutation.isPending ? "Authenticating..." : "Login as Admin"}
            </button>
          ) : (
            <button
              onClick={() => signupMutation.mutate()}
              disabled={signupMutation.isPending || !fullName || !loginEmail || !loginPassword}
              style={{ ...styles.primaryBtn, backgroundColor: "#319795" }}
            >
              {signupMutation.isPending ? "Registering..." : "Create Admin Account"}
            </button>
          )}
        </div>
      ) : (
        /* Admin Dashboard: Create Vendor & List Vendors */
        <div style={styles.dashboardGrid}>
          {/* Create Vendor Form */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <UserPlus color="#319795" size={24} />
              <h3>Onboard New Vendor</h3>
            </div>

            {successMsg && <div style={styles.successAlert}>{successMsg}</div>}

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label>Shop / Restaurant Name</label>
                <input
                  type="text"
                  placeholder="Tasty Bytes Kitchen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Owner Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={styles.input}
                />
              </div>

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
                <label>Initial Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="700001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label>Full Address</label>
              <textarea
                placeholder="123 Food Street, Downtown"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ ...styles.input, height: "80px", resize: "none" }}
              />
            </div>

            <button
              onClick={() => createVendorMutation.mutate()}
              disabled={createVendorMutation.isPending || !name || !email}
              style={{ ...styles.primaryBtn, backgroundColor: "#319795" }}
            >
              {createVendorMutation.isPending ? "Creating Vendor..." : "Register Vendor"}
            </button>
          </div>

          {/* Vendors List */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Store color="#805AD5" size={24} />
              <h3>Active Onboarded Vendors</h3>
            </div>

            {vendorsLoading ? (
              <p style={{ color: "#94A3B8" }}>Loading vendors list...</p>
            ) : Array.isArray(vendorsList) && vendorsList.length > 0 ? (
              <div style={styles.vendorList}>
                {vendorsList.map((v: any, idx: number) => (
                  <div key={v.id || idx} style={styles.vendorItem}>
                    <div>
                      <h4 style={{ margin: 0, color: "#F8FAFC" }}>{v.name || "Unnamed Shop"}</h4>
                      <p style={{ margin: "0.2rem 0", color: "#94A3B8", fontSize: "0.85rem" }}>
                        Owner: {v.ownerName || "N/A"} | Email: {v.email}
                      </p>
                      <span style={{ fontSize: "0.8rem", color: "#CBD5E1" }}>
                        📍 {v.address || "Address not updated"} ({v.pincode || "No Zip"})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#94A3B8" }}>No vendors created yet.</p>
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
    maxWidth: "440px",
    margin: "3rem auto",
    backgroundColor: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "1rem",
    padding: "2.5rem",
  },
  tabContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    borderBottom: "1px solid #334155",
  },
  tabBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
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
    backgroundColor: "#805AD5",
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
  vendorList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxHeight: "500px",
    overflowY: "auto",
  },
  vendorItem: {
    backgroundColor: "#0F172A",
    border: "1px solid #334155",
    borderRadius: "0.75rem",
    padding: "1rem",
  },
};
