"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assessment", label: "Assessments" },
  { href: "/doctor", label: "Doctor" },
  { href: "/profile", label: "Profile" },
];

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  async function onLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070A12] via-[#0B1430] to-[#070A12]">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`h-screen sticky top-0 border-r border-white/10 bg-white/5 backdrop-blur-xl transition-all ${
            open ? "w-64" : "w-16"
          }`}
        >
          <div className="p-4 flex items-center justify-between">
            <div className={`font-semibold ${open ? "block" : "hidden"}`}>Mental Wellness</div>
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg px-2 py-1 bg-white/10 hover:bg-white/20"
              title="Toggle"
            >
              ☰
            </button>
          </div>

          <nav className="px-2 space-y-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
                    ${active ? "bg-white/15" : "hover:bg-white/10"}
                  `}
                >
                  <span className="text-lg">•</span>
                  <span className={`${open ? "block" : "hidden"}`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 w-full p-3">
            <button
              onClick={onLogout}
              className="w-full rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 px-3 py-2 text-sm"
            >
              {open ? "Logout" : "⎋"}
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}