"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarShell from "@/components/SidebarShell";
import { supabase } from "@/lib/supabaseClient";

const QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

// 0..3 each
const OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

function severity(score: number) {
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  return "Severe";
}

export default function GAD7Page() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(0));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const score = useMemo(() => answers.reduce((a, b) => a + b, 0), [answers]);
  const level = useMemo(() => severity(score), [score]);

  async function submit() {
    setSaving(true);
    setMsg(null);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setMsg("Please login first.");
      setSaving(false);
      return;
    }

    // Save to DB (mentalAssessments)
    const { error } = await supabase.from("mental_assessments").insert({
      user_id: auth.user.id,
      type: "GAD-7",
      score,
      severity: level,
      answers,
      needs_review: score >= 15,
    });

    if (error) {
      setMsg(error.message);
      setSaving(false);
      return;
    }

    // 10-12) Prompt scheduling if moderate/high
    if (score >= 10) {
      router.push(`/doctor/book?reason=gad7&score=${score}`);
      return;
    }

    setMsg("Saved ✅ You’re doing okay. Keep checking in weekly.");
    setSaving(false);
  }

  return (
    <SidebarShell>
      <div className="max-w-3xl space-y-5">
        <h1 className="text-3xl font-bold">GAD-7 Anxiety Check</h1>
        <p className="text-white/70">Over the last 2 weeks, how often have you been bothered by the following problems?</p>

        <div className="space-y-4">
          {QUESTIONS.map((q, idx) => (
            <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold mb-2">
                {idx + 1}. {q}
              </div>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      const next = [...answers];
                      next[idx] = o.value;
                      setAnswers(next);
                    }}
                    className={`px-3 py-2 rounded-lg border ${
                      answers[idx] === o.value ? "border-white bg-white/15" : "border-white/10 bg-white/5"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
          <div>
            <div className="text-white/70">Your score</div>
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-white/70">Severity: {level}</div>
            <div className="text-xs text-white/50 mt-2">This is not a diagnostic tool.</div>
          </div>

          <button
            disabled={saving}
            onClick={submit}
            className="px-5 py-3 rounded-xl bg-blue-500 font-semibold disabled:opacity-60"
          >
            {saving ? "Saving…" : "Submit"}
          </button>
        </div>

        {msg && <div className="text-white/80">{msg}</div>}
      </div>
    </SidebarShell>
  );
}