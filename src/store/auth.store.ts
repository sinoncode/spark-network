import { create } from "zustand";
import { AuthService } from "@/api/services/auth.service";
import { toast } from "@/lib/toast";

interface LoginData {
  email: string;
  password: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  permissions: string[];
}

interface AuthStore {
  loading: boolean;
  error: string | null;
  user: User | null;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
}

const decodeJwt = (token: string): JwtPayload => {
  const payload = token.split(".")[1];

  if (!payload) {
    throw new Error("Invalid JWT token");
  }

  return JSON.parse(
    decodeURIComponent(
      atob(payload)
        .split("")
        .map(
          (char) =>
            "%" +
            ("00" + char.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    )
  );
};

const isTokenExpired = (payload: JwtPayload): boolean => {
  if (!payload.exp) return false;
  return Date.now() >= payload.exp * 1000;
};

/**
 * Attempt to restore the user session from an existing access_token
 * in localStorage. Returns null if there is no token or if it is expired.
 */
const rehydrateUserFromToken = (): User | null => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const jwtUser = decodeJwt(token);

    if (isTokenExpired(jwtUser)) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }

    return {
      id: jwtUser.sub,
      name: jwtUser.username,
      email: jwtUser.email,
      username: jwtUser.username,
      role: jwtUser.role,
      permissions: [],
    };
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  error: null,
  // Restore user from JWT on every page load so that a refresh
  // doesn't wipe out the authenticated session.
  user: rehydrateUserFromToken(),

  login: async (data) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await AuthService.login(data);

      const payload = response?.data ?? response;

      const token =
        payload?.data?.accessToken ??
        payload?.accessToken ??
        payload?.data?.token ??
        payload?.token ??
        payload?.access_token ??
        payload?.data?.access_token ??
        null;

      const refreshToken =
        payload?.data?.refreshToken ??
        payload?.refreshToken ??
        payload?.data?.refresh_token ??
        payload?.refresh_token ??
        null;

      if (!token) {
        throw new Error(
          "No authentication token received from the server"
        );
      }

      // Save token
      localStorage.setItem("access_token", token);

      if (refreshToken) {
        localStorage.setItem(
          "refresh_token",
          refreshToken
        );
      }

      // Decode JWT
      const jwtUser = decodeJwt(token);

      // Create frontend user
      const user: User = {
        id: jwtUser.sub,
        name: jwtUser.username,
        email: jwtUser.email,
        username: jwtUser.username,
        role: jwtUser.role,
        permissions: [],
      };

      set({ user });

      console.log("Authenticated user:", user);

      toast.success("Login successful");

      return true;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      set({
        error: message,
        user: null,
      });

      toast.error(message);

      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      set({
        user: null,
      });

      toast.success("Logged out successfully");
    }
  },
}));