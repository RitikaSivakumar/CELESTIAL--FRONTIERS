"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendOtp() {
    setMsg(null);
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return setMsg("Enter email");

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: { shouldCreateUser: false },
    });
    setLoading(false);

    if (error) return setMsg(error.message);
    setSent(true);
    setMsg("OTP sent. Check Inbox + Spam.");
  }

  async function verifyOtp() {
    setMsg(null);
    if (!otp.trim()) return setMsg("Enter OTP");

    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otp.trim(),
      type: "email",
    });
    setLoading(false);

    if (error) return setMsg(error.message);
    if (data.session) router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#070A12] via-[#0B1430] to-[#070A12]">
      <div className="w-full max-w-md rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-white/60 mt-1">Enter email, get OTP, login.</p>

        <div className="mt-6 space-y-3">
          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {sent && (
            <input
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              placeholder="OTP (6–8 digits)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          {!sent ? (
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full rounded-xl bg-blue-500/80 hover:bg-blue-500 px-4 py-3 font-medium"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          ) : (
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full rounded-xl bg-green-500/80 hover:bg-green-500 px-4 py-3 font-medium"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
          )}

          {msg && <div className="text-sm text-white/80">{msg}</div>}

          <div className="text-sm text-white/60">
            New here?{" "}
            <a className="text-blue-300 hover:underline" href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}