"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import StandardDashboard from "@/components/StandardDashboard";
import OldAgeDashboard from "@/components/OldAgeDashboard";
import HomemakerDashboard from "@/components/HomemakerDashboard";
import MaternalFemaleDashboard from "@/components/MaternalFemaleDashboard";
import MaternalMaleDashboard from "@/components/MaternalMaleDashboard";

type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  gender: string | null;
  category: string | null;
  maternal_support: boolean | null;
};

export default function DashboardRouter() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMsg(null);

      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr || !authData.user) {
        setErrorMsg("Not logged in. Please register/login again.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id,name,email,gender,category,maternal_support")
        .eq("id", authData.user.id)
        .single();

      if (error) {
        setErrorMsg(
          `Profile not found. Go to Register and set Category (Old Age / Homemaker / Student / Worker).`
        );
        setLoading(false);
        return;
      }

      setProfile(data as Profile);
      setLoading(false);
    })();
  }, []);

  const rendered = useMemo(() => {
    if (!profile) return null;

    const gender = (profile.gender || "").toLowerCase();
    const category = (profile.category || "").toLowerCase();
    const maternal = !!profile.maternal_support;

    // 6) Maternal Support YES → Role Split
    if (maternal) {
      if (gender === "female") return <MaternalFemaleDashboard profile={profile} />;
      if (gender === "male") return <MaternalMaleDashboard profile={profile} />;
      // if gender unknown, still show standard with maternal notice
      return <StandardDashboard profile={profile} />;
    }

    // 7) Category based dashboard
    if (category === "old age" || category === "oldage" || category === "senior citizen") {
      return <OldAgeDashboard profile={profile} />;
    }

    if (category === "homemaker") {
      return <HomemakerDashboard profile={profile} />;
    }

    // Student / Worker etc => Standard
    return <StandardDashboard profile={profile} />;
  }, [profile]);

  if (loading) {
    return <div className="text-white/70">Loading dashboard…</div>;
  }

  if (errorMsg) {
    return (
      <div className="text-white">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-white/70 mt-2">{errorMsg}</p>
      </div>
    );
  }

  return rendered;
}