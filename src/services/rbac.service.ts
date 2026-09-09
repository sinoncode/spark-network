// src/services/rbac.service.ts

import api from "@/api/axios";

import type {
  Permission,
  Role,
  RolePermission,
  RBACModule,
  CreateRolePayload,
  UpdateRolePayload,
  UpdateRolePermissionsPayload,
  CreateModulePayload,
  UpdateModulePayload,
  CreateModulePermissionPayload,
} from "@/types/rbac";

/* =========================================
   NORMALIZERS
========================================= */
const normalizeRolePermission = (
  item: any
): RolePermission => {
  return {
    id: item?.id,

    permissionId:
      item?.permissionId ||
      item?.permission_id ||
      item?.permission?.id,

    permission:
      item?.permission
        ? normalizePermission(
          item.permission
        )
        : undefined,
  };
};


const normalizeRole = (
  role: any
): Role => {
  const rolePermissions =
    Array.isArray(
      role?.rolePermissions
    )
      ? role.rolePermissions.map(
        normalizeRolePermission
      )
      : [];

  const legacyPermissions = Array.isArray(role?.permissions)
    ? role.permissions.map((permission: any) =>
      typeof permission === "string"
        ? permission
        : permission?.name || permission?.action
    ).filter(Boolean)
    : [];

  const permissionIds =
    rolePermissions
      .map(
        (item: RolePermission) =>
          item.permissionId ||
          item.permission?.id
      )
      .filter(
        (id: string | undefined): id is string =>
          Boolean(id)
      );

  const permissions = Array.from(new Set([
    ...legacyPermissions,
    ...rolePermissions
      .map((item: RolePermission) => item.permission?.name || item.permission?.action)
      .filter((permission: string | undefined): permission is string => Boolean(permission)),
  ]));

  return {
    id: String(
      role?.id || ""
    ),

    name:
      role?.name || "",

    displayName:
      role?.displayName ||
      role?.display_name ||
      role?.name ||
      "",

    description:
      role?.description ?? null,

    isActive:
      role?.isActive ??
      role?.is_active ??
      true,

    createdAt:
      role?.createdAt ||
      role?.created_at,

    updatedAt:
      role?.updatedAt ||
      role?.updated_at,

    rolePermissions,

    permissionIds:
      Array.from(
        new Set(permissionIds)
      ),

    permissions,
  };
};

const normalizePermission = (
  permission: any
): Permission => {
  return {
    id: String(
      permission?.id || ""
    ),

    name:
      permission?.name ||
      permission?.action ||
      "",

    action:
      permission?.action ||
      permission?.name ||
      "",

    displayName:
      permission?.displayName ||
      permission?.display_name ||
      permission?.name ||
      "",

    description:
      permission?.description ??
      null,

    guard_name:
      permission?.guard_name,

    createdAt:
      permission?.createdAt ||
      permission?.created_at,

    updatedAt:
      permission?.updatedAt ||
      permission?.updated_at,

    created_at:
      permission?.created_at ||
      permission?.createdAt,

    updated_at:
      permission?.updated_at ||
      permission?.updatedAt,
  };
};

const normalizePermissions = (
  permissions: any
): Permission[] => {
  if (!Array.isArray(permissions)) {
    return [];
  }

  return permissions
    .map(normalizePermission)
    .filter(
      (permission) =>
        Boolean(permission.id) ||
        Boolean(permission.name)
    );
};

const normalizeModule = (
  module: any
): RBACModule => {
  return {
    id: String(module?.id || ""),
    name: module?.name || "",
    displayName:
      module?.displayName ||
      module?.display_name ||
      module?.name ||
      "",
    description:
      module?.description ?? null,
    isActive:
      module?.isActive ??
      module?.is_active ??
      true,
    createdAt:
      module?.createdAt ||
      module?.created_at,
    updatedAt:
      module?.updatedAt ||
      module?.updated_at,

    permissions: normalizePermissions(
      module?.permissions
    ),

    _count: module?._count
      ? {
        companyModules:
          module._count.companyModules ?? 0,
      }
      : undefined,
  };
};

const normalizeModules = (
  modules: any
): RBACModule[] => {
  if (!Array.isArray(modules)) {
    return [];
  }

  return modules
    .map(normalizeModule)
    .filter((module) => Boolean(module.id));
};

/* =========================================
   ROLES
========================================= */

const normalizeRoles = (
  roles: any
): Role[] => {
  if (!Array.isArray(roles)) {
    return [];
  }

  return roles.map(normalizeRole);
};

/* =========================================
   MODULES
========================================= */

/**
 * GET /admin/rbac/modules
 */
export const getModules = async () => {
  const response = await api.get(
    "/admin/rbac/modules"
  );

  const rawData =
    response?.data?.data;

  return {
    ...response,
    data: normalizeModules(rawData),
  };
};

export const updateRolePermissions =
  async (
    roleId: string,
    data: UpdateRolePermissionsPayload
  ) => {
    const id = String(
      roleId || ""
    ).trim();

    if (!id) {
      throw new Error(
        "Role ID is required"
      );
    }

    const permissionIds =
      Array.from(
        new Set(
          (
            Array.isArray(
              data.permissionIds
            )
              ? data.permissionIds
              : []
          )
            .map((permissionId) =>
              String(
                permissionId
              ).trim()
            )
            .filter(Boolean)
        )
      );

    const response =
      await api.patch(
        `/admin/rbac/roles/${encodeURIComponent(id)}/permissions`,
        {
          permissionIds,
        }
      );

    if (
      response?.data?.data &&
      typeof response.data.data ===
      "object"
    ) {
      response.data.data =
        normalizeRole(
          response.data.data
        );
    }

    return response;
  };
/**
 * POST /admin/rbac/modules
 */
export const createModule = async (
  data: CreateModulePayload
) => {
  const name = String(
    data.name || ""
  ).trim();

  const displayName = String(
    data.displayName || ""
  ).trim();

  if (!name) {
    throw new Error(
      "Module name is required"
    );
  }

  if (!displayName) {
    throw new Error(
      "Module display name is required"
    );
  }

  const response = await api.post(
    "/admin/rbac/modules",
    {
      name,
      displayName,
      description:
        data.description?.trim() || undefined,
    }
  );

  if (response?.data?.data) {
    response.data.data =
      normalizeModule(
        response.data.data
      );
  }

  return response;
};

/**
 * PATCH /admin/rbac/modules/:moduleId
 */
export const updateModule = async (
  moduleId: string,
  data: UpdateModulePayload
) => {
  const id = String(
    moduleId || ""
  ).trim();

  if (!id) {
    throw new Error(
      "Module ID is required"
    );
  }

  const payload: UpdateModulePayload = {};

  if (
    data.displayName !== undefined
  ) {
    payload.displayName =
      String(
        data.displayName
      ).trim();
  }

  if (
    data.isActive !== undefined
  ) {
    payload.isActive =
      Boolean(data.isActive);
  }

  const response = await api.patch(
    `/admin/rbac/modules/${encodeURIComponent(id)}`,
    payload
  );

  if (response?.data?.data) {
    response.data.data =
      normalizeModule(
        response.data.data
      );
  }

  return response;
};

/**
 * DELETE /admin/rbac/modules/:moduleId
 */
export const deleteModule = async (
  moduleId: string
) => {
  const id = String(
    moduleId || ""
  ).trim();

  if (!id) {
    throw new Error(
      "Module ID is required"
    );
  }

  return api.delete(
    `/admin/rbac/modules/${encodeURIComponent(id)}`
  );
};

/* =========================================
   MODULE PERMISSIONS
========================================= */

/**
 * POST /admin/rbac/modules/:moduleId/permissions
 */
export const createModulePermission = async (
  moduleId: string,
  data: CreateModulePermissionPayload
) => {
  const id = String(
    moduleId || ""
  ).trim();

  if (!id) {
    throw new Error(
      "Module ID is required"
    );
  }

  const action = String(
    data.action || ""
  ).trim();

  const displayName = String(
    data.displayName || ""
  ).trim();

  if (!action) {
    throw new Error(
      "Permission action is required"
    );
  }

  if (!displayName) {
    throw new Error(
      "Permission display name is required"
    );
  }

  const response = await api.post(
    `/admin/rbac/modules/${encodeURIComponent(id)}/permissions`,
    {
      action,
      displayName,
      description:
        data.description?.trim() ||
        undefined,
    }
  );

  if (response?.data?.data) {
    response.data.data =
      normalizePermission(
        response.data.data
      );
  }

  return response;
};

/**
 * DELETE
 * /admin/rbac/modules/:moduleId/permissions/:permissionId
 */
export const deleteModulePermission = async (
  moduleId: string,
  permissionId: string
) => {
  const module = String(
    moduleId || ""
  ).trim();

  const permission = String(
    permissionId || ""
  ).trim();

  if (!module) {
    throw new Error(
      "Module ID is required"
    );
  }

  if (!permission) {
    throw new Error(
      "Permission ID is required"
    );
  }

  return api.delete(
    `/admin/rbac/modules/${encodeURIComponent(module)}/permissions/${encodeURIComponent(permission)}`
  );
};

/* =========================================
   ROLES + EXISTING ROLE APIs
========================================= */

export const getRoles = async (
  options?: {
    createdBy?: string;
    limit?: number;
    offset?: number;
  }
) => {
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
      String(options.limit)
    );
  }

  if (options?.offset !== undefined) {
    params.append(
      "offset",
      String(options.offset)
    );
  }

  const query = params.toString();

  const response = await api.get(
    query
      ? `/admin/rbac/roles?${query}`
      : "/admin/rbac/roles"
  );

  let roles: any[] = [];

  if (
    Array.isArray(
      response?.data?.data
    )
  ) {
    roles = response.data.data;
  } else if (
    Array.isArray(
      response?.data?.data?.data
    )
  ) {
    roles =
      response.data.data.data;
  } else if (
    Array.isArray(
      response?.data?.data?.roles
    )
  ) {
    roles =
      response.data.data.roles;
  } else if (
    Array.isArray(
      response?.data
    )
  ) {
    roles = response.data;
  }

  return {
    ...response,
    data: normalizeRoles(roles),
  };
};

export const getRoleById = async (
  roleId: string
) => {
  const id = String(
    roleId || ""
  ).trim();

  if (!id) {
    throw new Error(
      "Role ID is required"
    );
  }

  const response = await api.get(
    `/admin/rbac/roles/${encodeURIComponent(id)}`
  );

  if (response?.data?.data) {
    response.data.data =
      normalizeRole(
        response.data.data
      );
  }

  return response;
};

export const createRole = async (
  data: CreateRolePayload
) => {
  const payload = {
    name: String(
      data.name || ""
    ).trim(),

    displayName: String(
      data.displayName || ""
    ).trim(),

    description:
      data.description?.trim() ||
      undefined,
  };

  if (!payload.name) {
    throw new Error(
      "Role name is required"
    );
  }

  if (!payload.displayName) {
    throw new Error(
      "Role display name is required"
    );
  }

  const response = await api.post(
    "/admin/rbac/roles",
    payload
  );

  if (
    response?.data?.data &&
    typeof response.data.data ===
    "object"
  ) {
    response.data.data =
      normalizeRole(
        response.data.data
      );
  }

  return response;
};

export const updateRole = async (
  roleId: string,
  data: UpdateRolePayload
) => {
  const id = String(
    roleId || ""
  ).trim();

  if (!id) {
    throw new Error(
      "Role ID is required"
    );
  }

  const payload: UpdateRolePayload =
    {};

  if (
    data.displayName !== undefined
  ) {
    payload.displayName =
      String(
        data.displayName
      ).trim();
  }

  if (
    data.description !== undefined
  ) {
    payload.description =
      String(
        data.description
      ).trim();
  }

  if (
    data.isActive !== undefined
  ) {
    payload.isActive =
      Boolean(data.isActive);
  }

  const response = await api.patch(
    `/admin/rbac/roles/${encodeURIComponent(id)}`,
    payload
  );

  if (
    response?.data?.data &&
    typeof response.data.data ===
    "object"
  ) {
    response.data.data =
      normalizeRole(
        response.data.data
      );
  }

  return response;
};
export const deleteRole = async (
  roleId: string
) => {
  const id = String(
    roleId || ""
  ).trim();

  if (!id) {
    throw new Error(
      "Role ID is required"
    );
  }

  return api.delete(
    `/admin/rbac/roles/${encodeURIComponent(id)}`
  );
};

/* =========================================
   LEGACY COMPATIBILITY
========================================= */

export const getPermissions = async () => {
  const modules =
    await getModules();

  const permissions =
    modules.data.flatMap(
      (module) =>
        module.permissions
    );

  return {
    ...modules,
    data: permissions,
  };
};

export const getRolesAndPermissions =
  async () => {
    const [
      rolesResponse,
      modulesResponse,
    ] = await Promise.all([
      getRoles(),
      getModules(),
    ]);

    const permissions =
      modulesResponse.data.flatMap(
        (module) =>
          module.permissions
      );

    return {
      roles: rolesResponse.data,
      permissions,
      modules: modulesResponse.data,
      success: true,
    };
  };