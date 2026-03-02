import Link from "next/link";

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 34, marginBottom: 6 }}>Your Space</h1>
      <p style={{ opacity: 0.75 }}>
        Track mood • Take assessments • Book help
      </p>

      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 14,
        }}
      >
        <Card
          title="Take PHQ-9"
          desc="Quick depression screening with scoring."
          href="/assessment/phq9"
        />
        <Card
          title="Assessments Hub"
          desc="View completed test results."
          href="/dashboard/assessments"
        />
        <Card
          title="Book Doctor"
          desc="Pick a slot and confirm booking."
          href="/doctor/slots"
        />
        <Card
          title="Chat Doctor"
          desc="Continue conversation & guidance."
          href="/doctor/chat"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "white",
        borderRadius: 16,
        padding: 16,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "block",
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ opacity: 0.75, marginTop: 6 }}>{desc}</p>
      <span style={{ opacity: 0.85 }}>Open →</span>
    </Link>
  );
}