"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#000010] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-white/70 mt-1">Login with email and password.</p>

        <form onSubmit={onLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <input
              className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              type="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <input
              className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-3 font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {msg && <p className="text-sm text-red-300">{msg}</p>}

          <p className="text-sm text-white/70">
            New here?{" "}
            <a className="text-blue-300 underline" href="/register">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}