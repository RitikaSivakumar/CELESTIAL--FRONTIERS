"use client";

import { useMemo, useState } from "react";
import SidebarShell from "@/components/SidebarShell";
import { useRouter } from "next/navigation";

const questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function GAD7Page() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(0));
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => answers.reduce((a, b) => a + b, 0), [answers]);
  const high = score >= 15;

  return (
    <SidebarShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">GAD-7</h1>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="font-medium">{i + 1}. {q}</div>
              <div className="mt-3 grid md:grid-cols-4 gap-2">
                {options.map((op) => (
                  <button
                    key={op.value}
                    onClick={() => {
                      const next = [...answers];
                      next[i] = op.value;
                      setAnswers(next);
                    }}
                    className={`rounded-xl px-3 py-2 border transition ${
                      answers[i] === op.value
                        ? "bg-blue-500/50 border-blue-500/40"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="rounded-xl bg-green-500/80 hover:bg-green-500 px-4 py-3 font-medium"
        >
          Submit GAD-7
        </button>

        {submitted && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2">
            <div className="text-lg font-medium">Score: {score}</div>
            {high ? (
              <>
                <div className="text-red-200">
                  High score detected. Please schedule an appointment.
                </div>
                <button
                  onClick={() => router.push("/doctor")}
                  className="rounded-xl bg-red-500/70 hover:bg-red-500 px-4 py-3 font-medium"
                >
                  Schedule Appointment
                </button>
              </>
            ) : (
              <div className="text-white/70">You’re okay — but support is always available.</div>
            )}
          </div>
        )}
      </div>
    </SidebarShell>
  );
}