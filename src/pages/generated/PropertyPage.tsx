import React from "react";
import { useProperty } from "@/hooks/useProperty";
import { formatCurrency } from "@/utils/helpers";

export default function PropertyPage() {
  const { properties, loading } = useProperty();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Properties</h2>
      {loading ? (
        <p>Loading properties…</p>
      ) : (
        <ul className="space-y-3">
          {properties.map((p) => (
            <li key={p.id} className="border p-3 rounded">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-muted-foreground">{p.address}</div>
              <div className="text-sm">{formatCurrency(p.price)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
