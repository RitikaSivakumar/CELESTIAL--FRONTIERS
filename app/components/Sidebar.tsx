"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Assessment", href: "/assessment" },
  { name: "Doctor", href: "/doctor" },
  { name: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <div
      style={{
        width: 240,
        minHeight: "100vh",
        padding: 16,
        background: "#0b1220",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 18 }}>
        Mental Wellness
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {items.map((x) => {
          const active = path === x.href;
          return (
            <Link
              key={x.href}
              href={x.href}
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 12px",
                borderRadius: 12,
                background: active ? "rgba(59,130,246,0.25)" : "transparent",
                border: "1px solid rgba(255,255,255,0.10)",
                display: "block",
              }}
            >
              {x.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}