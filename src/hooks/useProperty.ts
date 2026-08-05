import { useEffect } from "react";
import { usePropertyStore } from "@/store/propertyStore";
import type { Property } from "@/types/property";

export function useProperty() {
  const properties = usePropertyStore((state) => state.properties) as Property[];
  const loading = usePropertyStore((state) => state.loading);
  const fetchProperties = usePropertyStore((state) => state.fetchProperties);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading };
}
