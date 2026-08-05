import React from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { user, loading } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Auth Demo</h2>
      {loading ? (
        <p>Loading user…</p>
      ) : user ? (
        <div>
          <p>Name: {(user as any).name}</p>
          <p>Email: {(user as any).email}</p>
        </div>
      ) : (
        <p>No user signed in.</p>
      )}
    </div>
  );
}
