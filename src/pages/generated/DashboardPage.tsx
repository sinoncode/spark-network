import React, { useEffect, useState } from "react";
import { loadDashboardStats, getDashboardStats } from "@/store/dashboard.store";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    loadDashboardStats()
      .then((s) => mounted && setStats(s))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      {loading ? <p>Loading stats…</p> : <pre>{JSON.stringify(stats || getDashboardStats(), null, 2)}</pre>}
    </div>
  );
}
