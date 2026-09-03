// src/services/rbac.service.ts

import api from "@/api/axios";

import type {
  Permission,
  Role,
} from "@/types/rbac";

// ============================================
// NORMALIZERS
// ============================================

const normalizePermission = (permission: any): Permission => {
  if (typeof permission === "string") {
    return {
      name: permission,
    };
  }

  return {
    id: permission?.id,
    name: permission?.name || "",
    guard_name: permission?.guard_name,
    created_at: permission?.created_at,
    updated_at: permission?.updated_at,
  };
};

const normalizePermissions = (
  permissions: any[]
): Permission[] => {
  if (!Array.isArray(permissions)) {
    return [];
  }

  return permissions
    .map(normalizePermission)
    .filter((permission) => Boolean(permission.name));
};

/**
 * Convert backend role format:
 *
 * {
 *   role: "DRIVER",
 *   permissions: []
 * }
 *
 * into frontend format:
 *
 * {
 *   id: "DRIVER",
 *   name: "DRIVER",
 *   permissions: []
 * }
 */
const normalizeRole = (role: any): Role => {
  const roleName =
    role?.name ||
    role?.role ||
    "";

  return {
    id: String(
      role?.id ||
      role?.role_id ||
      roleName
    ),

    name: roleName,

    permissions: Array.isArray(role?.permissions)
      ? role.permissions
          .map((permission: any) =>
            typeof permission === "string"
              ? permission
              : permission?.name
          )
          .filter(Boolean)
      : [],

    created_at: role?.created_at,
    updated_at: role?.updated_at,
  };
};

const normalizeRoles = (
  roles: any[]
): Role[] => {
  if (!Array.isArray(roles)) {
    return [];
  }

  return roles.map(normalizeRole);
};

// ============================================
// GET ROLES + PERMISSIONS
// ============================================

export const getRolesAndPermissions = async () => {
  try {
    console.log(
      "🌐 [RBAC Service] Fetching roles and permissions..."
    );

    const response = await api.get(
      "/admin/roles-permissions"
    );

    console.log(
      "📨 [RBAC Service] Response:",
      response.data
    );

    const data = response?.data?.data;

    const roles = normalizeRoles(
      data?.roles
    );

    const permissions = normalizePermissions(
      data?.availablePermissions
    );

    return {
      roles,
      permissions,
      success: response?.data?.success ?? true,
      message: response?.data?.message,
    };
  } catch (error: any) {
    console.error(
      "❌ [RBAC Service] Failed to fetch roles/permissions:",
      error
    );

    console.error(
      "❌ Status:",
      error?.response?.status
    );

    console.error(
      "❌ Data:",
      error?.response?.data
    );

    throw error;
  }
};

// ============================================
// PERMISSIONS
// ============================================

export const getPermissions = async () => {
  try {
    const response = await api.get(
      "/admin/roles-permissions"
    );

    const permissions =
      response?.data?.data?.availablePermissions;

    return {
      ...response,
      data: normalizePermissions(
        permissions
      ),
    };
  } catch (error: any) {
    console.error(
      "❌ [RBAC Service] Error fetching permissions:",
      error
    );

    throw error;
  }
};

// ============================================
// ROLES
// ============================================

export const getRoles = async (options?: {
  createdBy?: string;
  limit?: number;
  offset?: number;
}) => {
  const params = new URLSearchParams();

  if (options?.createdBy) {
    params.append(
      "created_by",
      options.createdBy
    );
  }

  if (options?.limit !== undefined) {
    params.append(
      "limit",
      options.limit.toString()
    );
  }

  if (options?.offset !== undefined) {
    params.append(
      "offset",
      options.offset.toString()
    );
  }

  const queryString = params.toString();

  const url = queryString
    ? `/admin/roles?${queryString}`
    : "/admin/roles";

  try {
    const response = await api.get(url);

    let roles: any[] = [];

    // Standard response:
    // { success: true, data: [...] }
    if (
      Array.isArray(response?.data?.data)
    ) {
      roles = response.data.data;
    }

    // Paginated:
    // { success: true, data: { data: [...] } }
    else if (
      Array.isArray(
        response?.data?.data?.data
      )
    ) {
      roles =
        response.data.data.data;
    }

    // { success: true, data: { roles: [...] } }
    else if (
      Array.isArray(
        response?.data?.data?.roles
      )
    ) {
      roles =
        response.data.data.roles;
    }

    // Direct array
    else if (
      Array.isArray(response?.data)
    ) {
      roles = response.data;
    }

    return {
      ...response,
      data: normalizeRoles(roles),
    };
  } catch (error: any) {
    console.error(
      "❌ [RBAC Service] Error fetching roles:",
      error
    );

    throw error;
  }
};

// ============================================
// SINGLE ROLE
// ============================================

export const getRoleById = async (
  roleId: string
) => {
  const response = await api.get(
    `/admin/roles/${roleId}`
  );

  if (
    response?.data?.data &&
    typeof response.data.data === "object"
  ) {
    response.data.data =
      normalizeRole(
        response.data.data
      );
  }

  return response;
};

// ============================================
// CREATE ROLE
// ============================================

export const createRole = async (data: {
  name: string;
  permissions: string[];
}) => {
  const response = await api.post(
    "/admin/roles",
    data
  );

  if (
    response?.data?.data &&
    typeof response.data.data === "object"
  ) {
    response.data.data =
      normalizeRole(
        response.data.data
      );
  }

  return response;
};

// ============================================
// UPDATE ROLE
// ============================================

export const updateRole = async (
  roleId: string,
  data: {
    name: string;
    permissions: string[];
  }
) => {
  const normalizedRoleId = String(roleId).trim();

  if (!normalizedRoleId) {
    throw new Error("A role ID is required to update permissions");
  }

  const permissions = Array.from(
    new Set(
      (Array.isArray(data.permissions) ? data.permissions : [])
        .map((permission) => String(permission).trim())
        .filter(Boolean)
    )
  );

  const response = await api.patch(
    `/admin/roles-permissions/${encodeURIComponent(normalizedRoleId)}`,
    {
      role: normalizedRoleId,
      permissions,
    }
  );

  if (
    response?.data?.data &&
    typeof response.data.data === "object" &&
    (response.data.data.name ||
      response.data.data.role ||
      response.data.data.id ||
      response.data.data.role_id)
  ) {
    response.data.data =
      normalizeRole(
        response.data.data
      );
  }

  return response;
};

// ============================================
// DELETE ROLE
// ============================================

export const deleteRole = async (
  roleId: string
) => {
  return api.delete(
    `/admin/roles/${roleId}`
  );
};