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
      alert("High PHQ-9 score detected. Please book a doctor appointment.");
      router.push("/doctor/select");
    } else {
      alert("PHQ-9 Score: " + total);
      router.push("/dashboard");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>PHQ-9 Assessment</h1>
        <p className="subtext">
          Answer all questions. This helps us understand your current mood state.
        </p>

        {questions.map((q, index) => (
          <div className="q" key={index}>
            <p>
              <b>Q{index + 1}.</b> {q}
            </p>

            <select
              value={answers[index]}
              onChange={(e) => handleChange(index, Number(e.target.value))}
            >
              <option value={0}>Not at all (0)</option>
              <option value={1}>Several days (1)</option>
              <option value={2}>More than half the days (2)</option>
              <option value={3}>Nearly every day (3)</option>
            </select>
          </div>
        ))}

        <button onClick={handleSubmit}>Submit PHQ-9</button>
      </div>
    </div>
  );
}