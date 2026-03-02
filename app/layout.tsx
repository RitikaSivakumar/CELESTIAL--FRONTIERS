import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mental Wellness App",
  description: "Mental wellness app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}