import { create } from "zustand";
import { userService } from "@/services/Users/user.service";

import type {
  User,
  UserRole,
  UserStatus,
  UsersMeta,
} from "@/types/Users/user";

interface UserFilters {
  page: number;
  limit: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}

interface UserState {
  // Users returned by the listing API
  users: User[];

  // Pagination
  meta: UsersMeta | null;

  total: number;
  totalPages: number;

  // Loading states
  isLoading: boolean;
  isFetching: boolean;

  // Error
  error: string | null;

  // Current filters
  filters: UserFilters;

  // Actions
  setFilters: (
    filters: Partial<UserFilters>
  ) => void;

  resetFilters: () => void;

  fetchUsers: (
    page?: number,
    limit?: number,
    search?: string,
    role?: UserRole
  ) => Promise<void>;
}

export const useUserStore =
  create<UserState>((set, get) => ({
    // ========================================================
    // INITIAL STATE
    // ========================================================

    users: [],

    meta: null,

    total: 0,

    totalPages: 0,

    isLoading: false,

    isFetching: false,

    error: null,

    filters: {
      page: 1,
      limit: 20,
      search: undefined,
      role: undefined,
      status: undefined,
    },

    // ========================================================
    // SET FILTERS
    // ========================================================

    setFilters: (newFilters) => {
      set((state) => ({
        filters: {
          ...state.filters,
          ...newFilters,
        },
      }));
    },

    // ========================================================
    // RESET FILTERS
    // ========================================================

    resetFilters: () => {
      set({
        filters: {
          page: 1,
          limit: 20,
          search: undefined,
          role: undefined,
          status: undefined,
        },
      });
    },

    // ========================================================
    // FETCH USERS
    // ========================================================

    fetchUsers: async (page, limit, search, role) => {
      const currentFilters = get().filters;
      const requestFilters = {
        page: page ?? currentFilters.page,
        limit: limit ?? currentFilters.limit,
        search: search ?? currentFilters.search,
        role: role ?? currentFilters.role,
      };

      set({
        isLoading: true,
        isFetching: true,
        error: null,
      });

      try {
        const result =
          await userService.getUsers(
            requestFilters.page,
            requestFilters.limit,
            requestFilters.search,
            requestFilters.role
          );

        console.log(
          "Users API result:",
          result
        );

        console.log(
          "Is users array:",
          Array.isArray(result.data)
        );

        // ----------------------------------------------------
        // result.data = User[]
        // result.meta = pagination
        // ----------------------------------------------------

        set({
          users: result.data ?? [],

          meta: result.meta ?? null,

          total: result.meta?.total ?? 0,

          totalPages:
            result.meta?.totalPages ??
            Math.ceil(
              (result.meta?.total ?? 0) /
                (result.meta?.limit ?? requestFilters.limit)
            ),

          isLoading: false,

          isFetching: false,

          filters: {
            ...currentFilters,
            ...requestFilters,
          },
        });
      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error
        );

        set({
          users: [],

          meta: null,

          total: 0,

          totalPages: 0,

          isLoading: false,

          isFetching: false,

          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch users",
        });
      }
    },
  }));