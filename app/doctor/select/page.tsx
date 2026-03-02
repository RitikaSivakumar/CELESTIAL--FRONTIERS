"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  languages: string[];
};

const DOCTORS: Doctor[] = [
  {
    id: "doc_1",
    name: "Dr. Asha Menon",
    specialization: "Clinical Psychologist",
    experienceYears: 8,
    languages: ["English", "Malayalam", "Hindi"],
  },
  {
    id: "doc_2",
    name: "Dr. Rahul Nair",
    specialization: "Psychiatrist",
    experienceYears: 10,
    languages: ["English", "Hindi"],
  },
  {
    id: "doc_3",
    name: "Dr. Meera Iyer",
    specialization: "Counseling Psychologist",
    experienceYears: 6,
    languages: ["English", "Tamil", "Hindi"],
  },
];

type AssignedDoctor = {
  doctorId: string;
  doctorName: string;
  specialization: string;
};

export default function DoctorSelectPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const [saved, setSaved] = useState(false);

  // If already assigned, show it
  const assigned: AssignedDoctor | null = useMemo(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("mw_assigned_doctor") : null;
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, [saved]);

  useEffect(() => {
    // Set default selection
    if (!selectedId && DOCTORS.length > 0) {
      setSelectedId(DOCTORS[0].id);
    }
  }, [selectedId]);

  function assignDoctor() {
    const doc = DOCTORS.find((d) => d.id === selectedId);
    if (!doc) return;

    const payload: AssignedDoctor = {
      doctorId: doc.id,
      doctorName: doc.name,
      specialization: doc.specialization,
    };

    localStorage.setItem("mw_assigned_doctor", JSON.stringify(payload));
    setSaved(true);

    // After assigning, go to slots page
    router.push("/doctor/slots");
  }

  function clearDoctor() {
    localStorage.removeItem("mw_assigned_doctor");
    setSaved((s) => !s);
  }

  return (
    <main className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Select Doctor</h1>
            <p className="text-gray-700 mt-1">
              Choose one doctor. Only your assigned doctor will access your test results (later we’ll enforce with backend).
            </p>
          </div>

          <Link href="/dashboard" className="text-blue-700 underline">
            Back to Dashboard
          </Link>
        </div>

        {assigned && (
          <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-black font-semibold">Assigned Doctor:</p>
            <p className="text-black">
              {assigned.doctorName} — {assigned.specialization}
            </p>
            <button
              onClick={clearDoctor}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Change Doctor
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {DOCTORS.map((doc) => {
            const active = doc.id === selectedId;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedId(doc.id)}
                className={`text-left border rounded-xl p-4 hover:bg-gray-50 ${
                  active ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"
                }`}
              >
                <div className="text-black font-semibold">{doc.name}</div>
                <div className="text-gray-700 text-sm">{doc.specialization}</div>
                <div className="text-gray-600 text-sm mt-1">
                  Experience: {doc.experienceYears} years
                </div>
                <div className="text-gray-600 text-sm">
                  Languages: {doc.languages.join(", ")}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={assignDoctor}
          className="w-full bg-blue-600 text-white p-3 rounded mt-6 hover:bg-blue-700"
        >
          Confirm & Continue to Slots
        </button>
      </div>
    </main>
  );
}