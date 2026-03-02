"use client";

import { useEffect, useState } from "react";
import SidebarShell from "@/components/SidebarShell";
import supabase from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id;
      if (!uid) return;

      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();

      setProfile(prof);
    })();
  }, []);

  return (
    <SidebarShell>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h1 className="text-2xl font-semibold">Profile</h1>

        {!profile ? (
          <p className="text-white/70 mt-2">Loading...</p>
        ) : (
          <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-white/80">
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">Name: {profile.name}</div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">User ID: {profile.user_id}</div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">Email: {profile.email}</div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">DOB: {profile.dob}</div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">Age: {profile.age}</div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">Gender: {profile.gender}</div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">Category: {profile.category}</div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              Maternal Support: {profile.maternal_support ? "Yes" : "No"}
            </div>
          </div>
        )}
      </div>
    </SidebarShell>
  );
}