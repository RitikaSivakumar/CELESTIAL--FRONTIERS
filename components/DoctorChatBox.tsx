"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Msg = {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
};

export default function DoctorChatBox() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  async function load() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const { data } = await supabase
      .from("messages")
      .select("id,user_id,content,created_at")
      .eq("user_id", auth.user.id)
      .order("id", { ascending: false })
      .limit(20);

    setMsgs((data as Msg[])?.reverse() ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function send() {
    setStatus(null);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return setStatus("Login required.");
    if (!text.trim()) return;

    const { error } = await supabase.from("messages").insert({
      user_id: auth.user.id,
      content: text.trim(),
    });

    if (error) return setStatus(error.message);

    setText("");
    setStatus("Sent ✅");
    await load();
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="font-semibold text-lg mb-2">Text Doctor</div>

      <div className="max-h-56 overflow-auto space-y-2 border border-white/10 rounded-xl p-3 bg-black/10">
        {msgs.length === 0 ? (
          <div className="text-white/60">No messages yet.</div>
        ) : (
          msgs.map((m) => (
            <div key={m.id} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">
              <div className="text-white/90">{m.content}</div>
              <div className="text-xs text-white/50">
                {new Date(m.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 outline-none"
        />
        <button onClick={send} className="px-4 py-2 rounded-xl bg-blue-500 font-semibold">
          Send
        </button>
      </div>

      {status && <div className="text-white/70 mt-2">{status}</div>}
    </div>
  );
}