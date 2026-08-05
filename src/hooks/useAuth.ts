import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const authLoading = useAuthStore((state) => state.loading);

  useEffect(() => {
    setUser(null);
  }, []);

  return { user, loading: authLoading };
}
