"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Female");
  const [category, setCategory] = useState("Student");
  const [maternalSupport, setMaternalSupport] = useState("No");

  const age = useMemo(() => {
    if (!dob) return "";
    const birth = new Date(dob);
    const today = new Date();
    let a = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) a--;
    return a;
  }, [dob]);

  function handleRegister() {
    if (!name || !email || !dob) {
      alert("Please fill all required fields");
      return;
    }

    const user = {
      name,
      userId,
      email,
      dob,
      age,
      gender,
      category,
      maternalSupport,
    };

    localStorage.setItem("user", JSON.stringify(user));

    router.push("/dashboard");
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>Create your account</h1>

      <br />

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <label>Date of Birth</label>
      <br />

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <br />
      <br />

      <p>Age: {age}</p>

      <label>Gender</label>
      <br />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option>Female</option>
        <option>Male</option>
        <option>Other</option>
      </select>

      <br />
      <br />

      <label>Category</label>
      <br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Student</option>
        <option>Worker</option>
        <option>Old Age</option>
        <option>Homemaker</option>
      </select>

      <br />
      <br />

      <label>Maternal Support</label>
      <br />

      <select
        value={maternalSupport}
        onChange={(e) =>
          setMaternalSupport(e.target.value)
        }
      >
        <option>No</option>
        <option>Yes</option>
      </select>

      <br />
      <br />

      <button onClick={handleRegister}>
        Register
      </button>
    </main>
  );
}