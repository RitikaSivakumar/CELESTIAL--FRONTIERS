"use client";

import SidebarShell from "@/components/SidebarShell";
import DashboardRouter from "@/components/DashboardRouter";

export default function DashboardPage() {
  return (
    <SidebarShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DashboardRouter />
      </div>
    </SidebarShell>
  );
}