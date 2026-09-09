// src/types/rbac.ts

/* =========================================
   PERMISSION
========================================= */

export interface Permission {
  id: string;
  name: string;
  action?: string;
  displayName?: string;
  description?: string | null;

  guard_name?: string;

  createdAt?: string;
  updatedAt?: string;

  // Optional legacy fields
  created_at?: string;
  updated_at?: string;
}


/* =========================================
   RBAC MODULE
========================================= */

export interface RBACModule {
  id: string;
  name: string;
  displayName: string;
  description?: string | null;
  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;

  permissions: Permission[];

  _count?: {
    companyModules?: number;
  };
}


/* =========================================
   ROLE PERMISSION
========================================= */

/**
 * Backend may return rolePermissions
 * either as permission objects or
 * relation objects depending on API.
 */

export interface RolePermission {
  id?: string;

  permissionId?: string;

  permission?: Permission;
}


/* =========================================
   ROLE
========================================= */

export interface Role {
  id: string;

  /**
   * Internal role key
   * Example:
   * compliance_officer
   */
  name: string;

  /**
   * Human readable name
   * Example:
   * Compliance Officer
   */
  displayName: string;

  description?: string | null;

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;

  /**
   * Permissions assigned to this role.
   */
  rolePermissions: RolePermission[];

  /** Permission keys used by the UI and authorization checks. */
  permissions: string[];

  /**
   * Convenient permission ID list for UI.
   *
   * This is frontend-only derived data.
   */
  permissionIds: string[];
}


/* =========================================
   ROLE CREATE
========================================= */

export interface CreateRolePayload {
  name: string;
  displayName: string;
  description?: string;
}


/* =========================================
   ROLE UPDATE
========================================= */

export interface UpdateRolePayload {
  displayName?: string;
  description?: string;
  isActive?: boolean;
}


/* =========================================
   ASSIGN ROLE PERMISSIONS
========================================= */

export interface UpdateRolePermissionsPayload {
  permissionIds: string[];
}


/* =========================================
   MODULE PAYLOADS
========================================= */

export interface CreateModulePayload {
  name: string;
  displayName: string;
  description?: string;
}

export interface UpdateModulePayload {
  displayName?: string;
  isActive?: boolean;
}


/* =========================================
   MODULE PERMISSION
========================================= */

export interface CreateModulePermissionPayload {
  action: string;
  displayName: string;
  description?: string;
}


/* =========================================
   GROUPING
========================================= */

export interface GroupedPermissions {
  [module: string]: Permission[];
}


/* =========================================
   PERMISSION HELPERS
========================================= */

export const hasPermission = (
  permissionIds: string[],
  permissionId: string
): boolean => {
  return permissionIds.includes(
    permissionId
  );
};

export const hasAnyPermission = (
  permissionIds: string[],
  requiredPermissionIds: string[]
): boolean => {
  return requiredPermissionIds.some(
    (permissionId) =>
      permissionIds.includes(permissionId)
  );
};

export const hasAllPermissions = (
  permissionIds: string[],
  requiredPermissionIds: string[]
): boolean => {
  return requiredPermissionIds.every(
    (permissionId) =>
      permissionIds.includes(permissionId)
  );
};


/* =========================================
   GROUP PERMISSIONS BY MODULE
========================================= */

export const groupPermissionsByModule = (
  modules: RBACModule[]
): Record<string, Permission[]> => {
  return modules.reduce(
    (acc, module) => {
      acc[module.name] =
        module.permissions || [];

      return acc;
    },
    {} as Record<string, Permission[]>
  );
};