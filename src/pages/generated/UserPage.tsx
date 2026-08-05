import React, { useEffect, useState } from "react";
import { listUsers } from "@/api/services/user.service";

export default function UserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    listUsers()
      .then((r: any) => mounted && setUsers(r?.data || []))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Users</h2>
      {loading ? (
        <p>Loading users…</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.id} className="border p-2 rounded">
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-muted-foreground">{u.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
