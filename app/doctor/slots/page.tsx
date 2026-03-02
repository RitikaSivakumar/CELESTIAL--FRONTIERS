"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const SLOTS = [
  "Today 5:00 PM",
  "Today 7:30 PM",
  "Tomorrow 10:00 AM",
  "Tomorrow 1:00 PM",
  "Tomorrow 6:00 PM",
];

export default function DoctorSlotsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(SLOTS[0]);

  const phq9 = useMemo(() => {
    const raw = localStorage.getItem("phq9_result");
    return raw ? JSON.parse(raw) : null;
  }, []);

  function book() {
    const booking = {
      slot: selected,
      status: "Booked",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("appointment", JSON.stringify(booking));
    router.push("/doctor/chat");
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>Book a Doctor</h1>

      {phq9 ? (
        <p>
          Your PHQ-9 Score: <b>{phq9.score}</b> ({phq9.severity})
        </p>
      ) : (
        <p>(No PHQ-9 result found)</p>
      )}

      <h3>Select a time slot</h3>

      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {SLOTS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={book}>Confirm Booking</button>
      <button style={{ marginLeft: 10 }} onClick={() => router.push("/dashboard")}>
        Back
      </button>
    </main>
  );
}