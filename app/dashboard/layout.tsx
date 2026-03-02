import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* LEFT SIDEBAR */}
      <aside
        style={{
          width: 260,
          background: "linear-gradient(180deg,#0f172a,#0b1220)",
          color: "white",
          padding: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>Mental Wellness</h2>
        <p style={{ opacity: 0.7, marginTop: 6, fontSize: 13 }}>
          Your space • Assessments • Doctor
        </p>

        <nav style={{ marginTop: 20, display: "grid", gap: 12 }}>
          <Link style={linkStyle} href="/dashboard">
            🏠 Dashboard Home
          </Link>

          <Link style={linkStyle} href="/dashboard/assessments">
            ✅ Assessments
          </Link>

          <Link style={linkStyle} href="/assessment/phq9">
            🧠 PHQ-9 Test
          </Link>

          <Link style={linkStyle} href="/doctor/slots">
            📅 Book Doctor
          </Link>

          <Link style={linkStyle} href="/doctor/chat">
            💬 Chat Doctor
          </Link>

          <Link style={linkStyle} href="/profile">
            👤 Profile
          </Link>
        </nav>

        <div style={{ marginTop: 24, opacity: 0.65, fontSize: 12 }}>
          Tip: Start with PHQ-9, we’ll add GAD-7 next.
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          padding: 28,
          background: "radial-gradient(circle at top,#0b1220,#060913)",
          color: "white",
        }}
      >
        {children}
      </main>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  display: "block",
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: "white",
  background: "rgba(255,255,255,0.06)",
};