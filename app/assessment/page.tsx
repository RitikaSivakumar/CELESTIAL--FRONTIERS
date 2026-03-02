"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AssessmentsHub() {
  const [phq9, setPhq9] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("phq9_result");
    setPhq9(raw ? JSON.parse(raw) : null);
  }, []);

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Assessments</h1>
      <p style={{ opacity: 0.75 }}>
        Your saved results (stored locally for now).
      </p>

      <div
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 16,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>PHQ-9</h3>

        {phq9 ? (
          <>
            <p>
              Score: <b>{phq9.score}</b> ({phq9.severity})
            </p>
            <p style={{ opacity: 0.7, fontSize: 13 }}>
              Saved at: {new Date(phq9.createdAt).toLocaleString()}
            </p>
            <Link href="/assessment/phq9" style={btnStyle}>
              Retake PHQ-9
            </Link>
          </>
        ) : (
          <>
            <p style={{ opacity: 0.8 }}>No PHQ-9 result yet.</p>
            <Link href="/assessment/phq9" style={btnStyle}>
              Start PHQ-9
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: 10,
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: 10,
  color: "white",
  background: "rgba(59,130,246,0.85)",
};