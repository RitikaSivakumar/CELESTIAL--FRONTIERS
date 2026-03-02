"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Msg = { from: "user" | "doctor"; text: string; at: string };

export default function DoctorChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("chat_messages");
    if (raw) setMessages(JSON.parse(raw));
  }, []);

  function send() {
    if (!text.trim()) return;

    const newMsgs: Msg[] = [
      ...messages,
      { from: "user", text: text.trim(), at: new Date().toISOString() },
      {
        from: "doctor",
        text: "Thanks for sharing. I’m here with you. Can you tell me what’s been hardest lately?",
        at: new Date().toISOString(),
      },
    ];

    setMessages(newMsgs);
    localStorage.setItem("chat_messages", JSON.stringify(newMsgs));
    setText("");
  }

  return (
    <main style={{ padding: 30, maxWidth: 800 }}>
      <h1>Doctor Chat</h1>

      <div
        style={{
          border: "1px solid #444",
          padding: 12,
          borderRadius: 8,
          minHeight: 200,
          marginBottom: 12,
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet. Say hi 👋</p>
        ) : (
          messages.map((m, i) => (
            <p key={i}>
              <b>{m.from === "user" ? "You" : "Doctor"}:</b> {m.text}
            </p>
          ))
        )}
      </div>

      <input
        style={{ width: "70%" }}
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button style={{ marginLeft: 8 }} onClick={send}>
        Send
      </button>

      <div style={{ marginTop: 18 }}>
        <button onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
      </div>
    </main>
  );
}