"use client";

import React, { useMemo } from "react";

export type Slot = { label: string; value: string };

export function generateSlots() {
  // simple demo slots (hackathon)
  const days = 7;
  const times = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];
  const res: Slot[] = [];

  const now = new Date();
  for (let d = 0; d < days; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() + d);
    const dayLabel = date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

    for (const t of times) {
      const label = `${dayLabel} • ${t}`;
      const value = `${date.toISOString().slice(0, 10)} ${t}`;
      res.push({ label, value });
    }
  }
  return res;
}

export default function DoctorSlots({
  selected,
  onPick,
}: {
  selected: string | null;
  onPick: (v: string) => void;
}) {
  const slots = useMemo(() => generateSlots(), []);

  return (
    <div className="grid md:grid-cols-2 gap-2">
      {slots.map((s) => (
        <button
          key={s.value}
          onClick={() => onPick(s.value)}
          className={`text-left px-4 py-3 rounded-xl border ${
            selected === s.value ? "border-white bg-white/15" : "border-white/10 bg-white/5"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}