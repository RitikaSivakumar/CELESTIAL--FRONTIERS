"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SidebarShell from "@/components/SidebarShell";
import DoctorSlots from "@/components/DoctorSlots";
import DoctorChatBox from "@/components/DoctorChatBox";
import { supabase } from "@/lib/supabaseClient";

export default function BookDoctorPage() {
  const params = useSearchParams();
  const router = useRouter();

  const reason = params.get("reason") || "assessment";
  const score = params.get("score") || "";

  const [slot, setSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function book() {
    setStatus(null);
    setSaving(true);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setStatus("Login required.");
      setSaving(false);
      return;
    }

    if (!slot) {
      setStatus("Pick a slot first.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      user_id: auth.user.id,
      slot,
      status: "booked",
    });

    if (error) {
      setStatus(error.message);
      setSaving(false);
      return;
    }

    setStatus(`Appointment booked ✅ (${slot})`);
    setSaving(false);

    // 19) Always return to dashboard
    setTimeout(() => router.push("/dashboard"), 800);
  }

  return (
    <SidebarShell>
      <div className="max-w-4xl space-y-5">
        <h1 className="text-3xl font-bold">Schedule Doctor</h1>
        <p className="text-white/70">
          Your score suggests you may benefit from talking to a doctor.
          {score ? ` (score: ${score})` : ""} — reason: {reason}
        </p>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold text-lg mb-3">Pick an available time slot</div>
          <DoctorSlots selected={slot} onPick={setSlot} />

          <button
            onClick={book}
            disabled={saving}
            className="mt-4 px-5 py-3 rounded-xl bg-blue-500 font-semibold disabled:opacity-60"
          >
            {saving ? "Booking…" : "Confirm Booking"}
          </button>

          {status && <div className="text-white/80 mt-2">{status}</div>}
        </div>

        {/* 13) Doctor chat anytime */}
        <DoctorChatBox />

        <div className="text-xs text-white/50">
          This platform provides support and reminders. It does not replace professional medical advice.
        </div>
      </div>
    </SidebarShell>
  );
}