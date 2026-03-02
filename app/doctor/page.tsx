"use client";

import { useMemo, useState } from "react";
import SidebarShell from "@/components/SidebarShell";
import supabase from "@/lib/supabaseClient";

const slots = [
  "Today 6:00 PM",
  "Today 7:30 PM",
  "Tomorrow 10:00 AM",
  "Tomorrow 4:00 PM",
  "Day After 11:00 AM",
];

export default function DoctorPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [manualDate, setManualDate] = useState("");
  const [manualTime, setManualTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const manualSlot = useMemo(() => {
    if (!manualDate || !manualTime) return "";
    return `${manualDate} ${manualTime}`;
  }, [manualDate, manualTime]);

  async function book(slotText: string) {
    setStatus(null);
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return setStatus("Login required.");

    const { error } = await supabase.from("appointments").insert({
      user_id: uid,
      slot: slotText,
      status: "booked",
    });

    if (error) return setStatus(error.message);
    setStatus(`Appointment booked ✅ (${slotText})`);
  }

  async function sendMessage() {
    setStatus(null);
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return setStatus("Login required.");
    if (!message.trim()) return setStatus("Type a message first.");

    const { error } = await supabase.from("messages").insert({
      user_id: uid,
      content: message.trim(),
    });

    if (error) return setStatus(error.message);
    setMessage("");
    setStatus("Message sent to doctor ✅");
  }

  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <h1 className="text-2xl font-semibold">Doctor Support</h1>
          <p className="text-white/70 mt-1">
            Book from available slots or schedule manually. You can also text the doctor.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <h2 className="text-lg font-medium">Available Slots</h2>
            <div className="mt-3 space-y-2">
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left rounded-xl px-4 py-3 border transition ${
                    selected === s
                      ? "bg-blue-500/40 border-blue-500/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => selected && book(selected)}
              className="mt-4 w-full rounded-xl bg-green-500/80 hover:bg-green-500 px-4 py-3 font-medium"
            >
              Book Selected Slot
            </button>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
            <h2 className="text-lg font-medium">Manual Schedule</h2>

            <input
              type="date"
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={manualDate}
              onChange={(e) => setManualDate(e.target.value)}
            />
            <input
              type="time"
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={manualTime}
              onChange={(e) => setManualTime(e.target.value)}
            />

            <button
              onClick={() => manualSlot && book(manualSlot)}
              className="w-full rounded-xl bg-green-500/80 hover:bg-green-500 px-4 py-3 font-medium"
            >
              Book Manual Slot
            </button>

            <hr className="border-white/10 my-2" />

            <h2 className="text-lg font-medium">Text Doctor</h2>
            <textarea
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none min-h-[110px]"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="w-full rounded-xl bg-blue-500/80 hover:bg-blue-500 px-4 py-3 font-medium"
            >
              Send Message
            </button>
          </div>
        </div>

        {status && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white/80">
            {status}
          </div>
        )}
      </div>
    </SidebarShell>
  );
}