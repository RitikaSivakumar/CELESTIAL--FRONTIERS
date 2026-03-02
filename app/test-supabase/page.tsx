"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestSupabasePage() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    async function run() {
      const { data, error } = await supabase.auth.getSession();
      if (error) setStatus("❌ Error: " + error.message);
      else setStatus("✅ Connected! Session: " + (data.session ? "Yes" : "No"));
    }
    run();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Supabase Test</h1>
      <p>{status}</p>
    </main>
  );
}