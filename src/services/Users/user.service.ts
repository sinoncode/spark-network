import api from "@/api/axios";

import type {
  ApiResponse,
  User,
  UserDetails,
  UserRole,
  UserStatus,
  UsersMeta,
} from "@/types/Users/user";

// ============================================================
// API TYPES
// ============================================================

interface UsersApiData {
  data: User[];
  meta: UsersMeta;
}

interface UserActionResponse {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  xpTotal: number;
  level: number;
}

// ============================================================
// FILTERS
// ============================================================

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}

// ============================================================
// USER SERVICE
// ============================================================

class UserService {
  /**
   * ==========================================================
   * GET USERS
   * ==========================================================
   *
   * GET /admin/users?page=1&limit=20
   *
   * Optional:
   * ?search=driver
   * ?role=DRIVER
   */
  async getUsers(
    page = 1,
    limit = 20,
    search?: string,
    role?: UserRole
  ): Promise<UsersApiData> {
    const response =
      await api.get<
        ApiResponse<UsersApiData>
      >("/admin/users", {
        params: {
          page,
          limit,

          ...(search?.trim()
            ? {
                search: search.trim(),
              }
            : {}),

          ...(role
            ? {
                role,
              }
            : {}),
        },
      });

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Failed to fetch users"
      );
    }

    return response.data.data;
  }

  /**
   * ==========================================================
   * GET SINGLE USER
   * ==========================================================
   *
   * GET /admin/users/:userId
   */
  async getUser(
    userId: string
  ): Promise<UserDetails> {
    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const response =
      await api.get<
        ApiResponse<UserDetails>
      >(
        `/admin/users/${encodeURIComponent(
          userId
        )}`
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Failed to fetch user"
      );
    }

    return response.data.data;
  }

  /**
   * ==========================================================
   * GENERIC UPDATE USER
   * ==========================================================
   *
   * PATCH /admin/users/:userId
   *
   * The exact payload depends on your backend contract.
   */
  async updateUser(
    userId: string,
    payload: Record<string, unknown>
  ): Promise<UserActionResponse> {
    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const response =
      await api.patch<
        ApiResponse<UserActionResponse>
      >(
        `/admin/users/${encodeURIComponent(
          userId
        )}`,
        payload
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Failed to update user"
      );
    }

    return response.data.data;
  }

  /**
   * ==========================================================
   * SUSPEND USER
   * ==========================================================
   */
  async suspendUser(
    userId: string,
    payload: Record<string, unknown>
  ): Promise<UserActionResponse> {
    return this.updateUser(
      userId,
      payload
    );
  }

  /**
   * ==========================================================
   * BAN USER
   * ==========================================================
   */
  async banUser(
    userId: string,
    payload: Record<string, unknown>
  ): Promise<UserActionResponse> {
    return this.updateUser(
      userId,
      payload
    );
  }

  /**
   * ==========================================================
   * REACTIVATE USER
   * ==========================================================
   */
  async reactivateUser(
    userId: string,
    payload: Record<string, unknown>
  ): Promise<UserActionResponse> {
    return this.updateUser(
      userId,
      payload
    );
  }

  /**
   * ==========================================================
   * CHANGE USER ROLE
   * ==========================================================
   */
  async changeRole(
    userId: string,
    payload: Record<string, unknown>
  ): Promise<UserActionResponse> {
    return this.updateUser(
      userId,
      payload
    );
  }

  /**
   * ==========================================================
   * SET USER XP
   * ==========================================================
   */
    async setXp(
    userId: string,
    payload: Record<string, unknown>
  ): Promise<UserActionResponse> {
    return this.updateUser(
      userId,
      payload
    );
  }

  /**
   * ==========================================================
   * DELETE USER
   * ==========================================================
   */
  async deleteUser(
    userId: string
  ): Promise<void> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const response =
      await api.delete<
        ApiResponse<unknown>
      >(
        `/admin/users/${encodeURIComponent(
          userId
        )}`
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Failed to delete user"
      );
    }
  }
}

export const userService =
  new UserService();