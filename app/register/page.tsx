"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    age: "",
    gender: "",
    category: "",
    maternal_support: "No",
  });

  const [error, setError] = useState("");

  function calculateAge(dob: string) {
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }

  async function handleRegister(e: any) {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ create auth user
      const { data, error: authError } =
        await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });

      if (authError) {
        setError(authError.message);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("User not created");
        return;
      }

      // 2️⃣ wait briefly to ensure auth session exists
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 3️⃣ insert profile
      const { error: profileError } =
        await supabase.from("profiles").insert({
          id: user.id,
          name: form.name,
          email: form.email,
          dob: form.dob,
          age: Number(form.age),
          gender: form.gender,
          category: form.category,
          maternal_support: form.maternal_support,
        });

      if (profileError) {
        setError(profileError.message);
        return;
      }

      alert("Registration successful");

      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <br /><br />

        <input
          type="date"
          value={form.dob}
          onChange={(e) =>
            setForm({
              ...form,
              dob: e.target.value,
              age: calculateAge(e.target.value),
            })
          }
        />

        <br /><br />

        <input value={form.age} disabled />

        <br /><br />

        <select
          value={form.gender}
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <br /><br />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="">Category</option>
          <option>Student</option>
          <option>Worker</option>
          <option>Old Age</option>
          <option>Homemaker</option>
        </select>

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

    </div>
  );
}