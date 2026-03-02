"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself?",
  "Trouble concentrating on things?",
  "Moving or speaking slowly or being restless?",
  "Thoughts that you would be better off dead?"
];

export default function PHQ9Page() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(0));

  const handleChange = (index: number, value: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const total = answers.reduce((sum, val) => sum + val, 0);

    if (total >= 15) {
      alert("High depression score. Please book a doctor appointment.");
      router.push("/doctor/select");
    } else {
      alert("Your score: " + total);
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1>PHQ-9 Assessment</h1>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <p>{q}</p>
          <select
            onChange={(e) => handleChange(index, Number(e.target.value))}
          >
            <option value={0}>Not at all (0)</option>
            <option value={1}>Several days (1)</option>
            <option value={2}>More than half the days (2)</option>
            <option value={3}>Nearly every day (3)</option>
          </select>
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}