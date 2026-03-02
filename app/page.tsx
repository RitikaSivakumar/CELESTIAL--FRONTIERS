import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Mental Wellness App</h1>

      <p>Welcome! This is your personalized wellness platform.</p>

      <Link href="/register">
        <button style={{ marginTop: 20 }}>
          Get Started
        </button>
      </Link>
    </main>
  );
}