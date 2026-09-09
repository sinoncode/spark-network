import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import {
  getRolesAndPermissions,
  getRoles,
  getPermissions,
  getRoleById,

  getModules,
  createModule as apiCreateModule,
  updateModule as apiUpdateModule,
  deleteModule as apiDeleteModule,

  createModulePermission as apiCreateModulePermission,
  deleteModulePermission as apiDeleteModulePermission,

  createRole as apiCreateRole,
  updateRole as apiUpdateRole,
  updateRolePermissions as apiUpdateRolePermissions,
  deleteRole as apiDeleteRole,
} from "@/services/rbac.service";

import type {
  Role,
  Permission,
  RBACModule,
  CreateModulePayload,
  UpdateModulePayload,
  CreateModulePermissionPayload,
  CreateRolePayload,
  UpdateRolePayload,
} from "@/types/rbac";

const formatRBACErrorValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(formatRBACErrorValue).filter(Boolean).join(", ");
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const nestedMessage = record.message || record.error || record.detail;
    if (nestedMessage) return formatRBACErrorValue(nestedMessage);

    return Object.entries(record)
      .map(([key, nestedValue]) => {
        const message = formatRBACErrorValue(nestedValue);
        return message ? `${key}: ${message}` : "";
      })
      .filter(Boolean)
      .join(", ");
  }
  return "";
};

const getRBACErrorMessage = (error: any, fallback: string) => {
  const responseData = error?.response?.data;
  const responseErrors = responseData?.errors;
  const message = formatRBACErrorValue(
    responseData?.message ||
    responseData?.error ||
    responseErrors ||
    error?.message ||
    fallback
  );

  return message || fallback;
};

interface RBACState {
  roles: Role[];
  permissions: Permission[];
  modules: RBACModule[];

  selectedRole: Role | null;

  hasHydrated: boolean;

  isLoadingRoles: boolean;
  isLoadingPermissions: boolean;
  isLoadingModules: boolean;

  isSaving: boolean;

  rolesError: string | null;
  permissionsError: string | null;
  modulesError: string | null;

  setHasHydrated: (value: boolean) => void;

  fetchRoles: () => Promise<Role[]>;
  fetchPermissions: () => Promise<Permission[]>;
  fetchModules: () => Promise<RBACModule[]>;
  fetchRoleById: (roleId: string) => Promise<Role | null>;
  fetchAllData: () => Promise<void>;

  selectRole: (role: Role | null) => void;

  createModule: (
    data: CreateModulePayload
  ) => Promise<RBACModule | null>;

  updateModule: (
    moduleId: string,
    data: UpdateModulePayload
  ) => Promise<RBACModule | null>;

  deleteModule: (
    moduleId: string
  ) => Promise<boolean>;

  createModulePermission: (
    moduleId: string,
    data: CreateModulePermissionPayload
  ) => Promise<Permission | null>;

  deleteModulePermission: (
    moduleId: string,
    permissionId: string
  ) => Promise<boolean>;

  createRole: (
    data: CreateRolePayload
  ) => Promise<Role | null>;

  updateRole: (
    roleId: string,
    data: UpdateRolePayload
  ) => Promise<Role | null>;

  updateRolePermissions: (
    roleId: string,
    permissionIds: string[]
  ) => Promise<Role | null>;

  deleteRole: (
    roleId: string
  ) => Promise<boolean>;

  refreshData: () => Promise<void>;

  clearErrors: () => void;

  reset: () => void;
}
export const useRBACStore = create<RBACState>()(
  persist(
    (set, get) => ({
      // ============================================
      // INITIAL STATE
      // ============================================

      modules: [],

      permissions: [],

      roles: [],

      selectedRole: null,

      hasHydrated: false,

      isLoadingModules: false,

      isLoadingPermissions: false,

      isLoadingRoles: false,

      isSaving: false,

      modulesError: null,

      permissionsError: null,

      rolesError: null,

      // ============================================
      // HYDRATION
      // ============================================

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      // ============================================
      // FETCH ACTIONS
      // ============================================
      fetchModules: async () => {
        try {
          set({
            isLoadingModules: true,
            modulesError: null,
          });

          const response =
            await getModules();

          const modules =
            Array.isArray(response.data)
              ? response.data
              : [];

          const permissions =
            modules.flatMap(
              (module) =>
                module.permissions || []
            );

          set({
            modules,
            permissions,
            isLoadingModules: false,
            isLoadingPermissions: false,
            modulesError: null,
            permissionsError: null,
          });

          return modules;
        } catch (error: any) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch RBAC modules";

          set({
            modules: [],
            permissions: [],
            isLoadingModules: false,
            isLoadingPermissions: false,
            modulesError: message,
            permissionsError: message,
          });

          throw error;
        }
      },

      fetchRoles: async () => {
        try {
          set({
            isLoadingRoles: true,
            rolesError: null,
          });

          const response =
            await getRoles();

          const roles =
            Array.isArray(response.data)
              ? response.data
              : [];

          set({
            roles,
            isLoadingRoles: false,
            rolesError: null,
          });

          const selectedRole =
            get().selectedRole;

          if (
            !selectedRole &&
            roles.length > 0
          ) {
            set({
              selectedRole:
                roles[0],
            });
          }

          return roles;
        } catch (error: any) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch roles";

          set({
            roles: [],
            isLoadingRoles: false,
            rolesError: message,
          });

          throw error;
        }
      },

      fetchPermissions: async () => {
        try {
          set({ isLoadingPermissions: true, permissionsError: null });
          const response = await getPermissions();
          const permissions = Array.isArray(response.data) ? response.data : [];
          set({ permissions, isLoadingPermissions: false, permissionsError: null });
          return permissions;
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || error.message || "Failed to fetch permissions";
          set({ isLoadingPermissions: false, permissions: [], permissionsError: errorMessage });
          throw error;
        }
      },
      fetchRoleById: async (
        roleId
      ) => {
        try {
          const response =
            await getRoleById(
              roleId
            );

          const role =
            response?.data?.data;

          if (!role) {
            throw new Error(
              "Role not found"
            );
          }

          set((state) => ({
            roles:
              state.roles.map(
                (existingRole) =>
                  existingRole.id ===
                    role.id
                    ? role
                    : existingRole
              ),

            selectedRole: role,
          }));

          return role;
        } catch (error: any) {
          toast.error(getRBACErrorMessage(error, "Failed to load role"));

          return null;
        }
      },
      fetchAllData: async () => {
        try {
          set({
            isLoadingModules: true,
            isLoadingPermissions: true,
            isLoadingRoles: true,

            modulesError: null,
            permissionsError: null,
            rolesError: null,
          });

          const [
            modulesResponse,
            rolesResponse,
          ] = await Promise.all([
            getModules(),
            getRoles(),
          ]);

          const modules =
            modulesResponse.data || [];

          const roles =
            rolesResponse.data || [];

          const permissions =
            modules.flatMap(
              (module) =>
                module.permissions || []
            );

          set({
            modules,
            permissions,
            roles,

            isLoadingModules: false,
            isLoadingPermissions: false,
            isLoadingRoles: false,

            modulesError: null,
            permissionsError: null,
            rolesError: null,
          });

          const selectedRole =
            get().selectedRole;

          /*
           * If persisted selected role
           * no longer exists, select first.
           */

          const stillExists =
            selectedRole &&
            roles.some(
              (role) =>
                String(role.id) ===
                String(selectedRole.id)
            );

          if (!stillExists) {
            set({
              selectedRole:
                roles[0] || null,
            });
          }
        } catch (error: any) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to load RBAC data";

          set({
            modules: [],
            permissions: [],
            roles: [],

            isLoadingModules: false,
            isLoadingPermissions: false,
            isLoadingRoles: false,

            modulesError: message,
            permissionsError: message,
            rolesError: message,
          });

          toast.error(message);

          console.error(
            "[RBAC] fetchAllData failed:",
            error
          );
        }
      },

      // ============================================
      // MODULE OPERATIONS
      // ============================================

      createModule: async (data: CreateModulePayload) => {
        try {
          set({ isSaving: true });
          const response = await apiCreateModule(data);
          const module = response?.data?.data || response?.data;

          if (!module) {
            throw new Error("Invalid module response");
          }

          set((state) => ({
            modules: [...state.modules, module],
            isSaving: false,
          }));

          toast.success(`Module "${module.displayName}" created successfully`);
          return module;
        } catch (error: any) {
          console.error("[RBAC] Create module:", error);
          set({ isSaving: false });
          toast.error(getRBACErrorMessage(error, "Failed to create module"));
          return null;
        }
      },

      updateModule: async (moduleId: string, data: UpdateModulePayload) => {
        try {
          set({ isSaving: true });
          const response = await apiUpdateModule(moduleId, data);
          const updatedModule = response?.data?.data;

          if (!updatedModule) {
            throw new Error("Invalid module response");
          }

          set((state) => ({
            modules: state.modules.map((module) =>
              String(module.id) === String(moduleId) ? updatedModule : module
            ),
            isSaving: false,
          }));

          toast.success("Module updated successfully");
          return updatedModule;
        } catch (error: any) {
          console.error("[RBAC] Update module:", error);
          set({ isSaving: false });
          toast.error(getRBACErrorMessage(error, "Failed to update module"));
          return null;
        }
      },

      deleteModule: async (moduleId: string) => {
        try {
          set({ isSaving: true });
          await apiDeleteModule(moduleId);

          set((state) => {
            const moduleToDelete = state.modules.find(m => String(m.id) === String(moduleId));
            const permissionIdsToDelete = new Set(moduleToDelete?.permissions.map(p => p.id) || []);

            return {
              modules: state.modules.filter((module) => String(module.id) !== String(moduleId)),
              permissions: state.permissions.filter((permission) => !permissionIdsToDelete.has(permission.id)),
              isSaving: false,
            };
          });

          toast.success("Module deleted successfully");
          return true;
        } catch (error: any) {
          console.error("[RBAC] Delete module:", error);
          set({ isSaving: false });
          toast.error(getRBACErrorMessage(error, "Failed to delete module"));
          return false;
        }
      },

      createModulePermission: async (moduleId: string, data: CreateModulePermissionPayload) => {
        try {
          set({ isSaving: true });
          const response = await apiCreateModulePermission(moduleId, data);
          const permission = response?.data?.data;

          if (!permission) {
            throw new Error("Invalid permission response");
          }

          set((state) => ({
            modules: state.modules.map((module) =>
              String(module.id) === String(moduleId)
                ? { ...module, permissions: [...module.permissions, permission] }
                : module
            ),
            permissions: [...state.permissions, permission],
            isSaving: false,
          }));

          toast.success("Permission created successfully");
          return permission;
        } catch (error: any) {
          console.error("[RBAC] Create permission:", error);
          set({ isSaving: false });
          toast.error(getRBACErrorMessage(error, "Failed to create permission"));
          return null;
        }
      },

      deleteModulePermission: async (moduleId: string, permissionId: string) => {
        try {
          set({ isSaving: true });
          await apiDeleteModulePermission(moduleId, permissionId);

          set((state) => ({
            modules: state.modules.map((module) =>
              String(module.id) === String(moduleId)
                ? {
                  ...module,
                  permissions: module.permissions.filter(
                    (permission) => String(permission.id) !== String(permissionId)
                  ),
                }
                : module
            ),
            permissions: state.permissions.filter(
              (permission) => String(permission.id) !== String(permissionId)
            ),
            isSaving: false,
          }));

          toast.success("Permission deleted successfully");
          return true;
        } catch (error: any) {
          console.error("[RBAC] Delete permission:", error);
          set({ isSaving: false });
          toast.error(getRBACErrorMessage(error, "Failed to delete permission"));
          return false;
        }
      },

      // ============================================
      // ROLE SELECTION
      // ============================================

      selectRole: (role: Role | null) => {
        set({ selectedRole: role });
      },

      // ============================================
      // ROLE OPERATIONS
      // ============================================

      createRole: async (
        data
      ) => {
        try {
          set({
            isSaving: true,
          });

          const response =
            await apiCreateRole(
              data
            );

          const role =
            response?.data?.data;

          if (!role) {
            throw new Error(
              "Invalid role response"
            );
          }

          set((state) => ({
            roles: [
              ...state.roles,
              role,
            ],

            selectedRole: role,

            isSaving: false,
          }));

          toast.success(
            `Role "${role.displayName}" created successfully`
          );

          return role;
        } catch (error: any) {
          set({
            isSaving: false,
          });

          toast.error(getRBACErrorMessage(error, "Failed to create role"));

          return null;
        }
      },
      updateRole: async (
        roleId,
        data
      ) => {
        try {
          set({
            isSaving: true,
          });

          const response =
            await apiUpdateRole(
              roleId,
              data
            );

          const updatedRole =
            response?.data?.data;

          if (!updatedRole) {
            throw new Error(
              "Invalid role response"
            );
          }

          set((state) => ({
            roles:
              state.roles.map(
                (role) =>
                  String(role.id) ===
                    String(roleId)
                    ? updatedRole
                    : role
              ),

            selectedRole:
              updatedRole,

            isSaving: false,
          }));

          toast.success(
            "Role updated successfully"
          );

          return updatedRole;
        } catch (error: any) {
          set({
            isSaving: false,
          });

          toast.error(getRBACErrorMessage(error, "Failed to update role"));

          return null;
        }
      },

      deleteRole: async (
        roleId
      ) => {
        try {
          set({
            isSaving: true,
          });

          await apiDeleteRole(
            roleId
          );

          const currentRole =
            get().selectedRole;

          set((state) => ({
            roles:
              state.roles.filter(
                (role) =>
                  String(role.id) !==
                  String(roleId)
              ),

            selectedRole:
              currentRole &&
                String(
                  currentRole.id
                ) === String(roleId)
                ? null
                : currentRole,

            isSaving: false,
          }));

          toast.success(
            "Role deleted successfully"
          );

          return true;
        } catch (error: any) {
          set({
            isSaving: false,
          });

          toast.error(getRBACErrorMessage(error, "Failed to delete role"));

          return false;
        }
      },

      updateRolePermissions:
        async (
          roleId,
          permissionIds
        ) => {
          try {
            set({
              isSaving: true,
            });

            const uniquePermissionIds =
              Array.from(
                new Set(
                  permissionIds
                    .map(
                      (id) =>
                        String(id).trim()
                    )
                    .filter(Boolean)
                )
              );

            const response =
              await apiUpdateRolePermissions(
                roleId,
                {
                  permissionIds:
                    uniquePermissionIds,
                }
              );

            const updatedRole =
              response?.data?.data;

            if (updatedRole) {
              set((state) => ({
                roles:
                  state.roles.map(
                    (role) =>
                      String(role.id) ===
                        String(roleId)
                        ? updatedRole
                        : role
                  ),

                selectedRole:
                  updatedRole,

                isSaving: false,
              }));

              toast.success(
                "Permissions updated successfully"
              );

              return updatedRole;
            }

            /*
             * Some APIs may return only
             * success/message rather than
             * the complete role.
             *
             * In that case update locally.
             */

            set((state) => ({
              roles:
                state.roles.map(
                  (role) =>
                    String(role.id) ===
                      String(roleId)
                      ? {
                        ...role,
                        permissionIds:
                          uniquePermissionIds,
                      }
                      : role
                ),

              selectedRole:
                state.selectedRole &&
                  String(
                    state.selectedRole.id
                  ) === String(roleId)
                  ? {
                    ...state.selectedRole,
                    permissionIds:
                      uniquePermissionIds,
                  }
                  : state.selectedRole,

              isSaving: false,
            }));

            toast.success(
              "Permissions updated successfully"
            );

            return (
              get().roles.find(
                (role) =>
                  String(role.id) ===
                  String(roleId)
              ) || null
            );
          } catch (error: any) {
            set({
              isSaving: false,
            });

            toast.error(getRBACErrorMessage(error, "Failed to update permissions"));

            return null;
          }
        },

      // ============================================
      // UTILITY ACTIONS
      // ============================================

      refreshData: async () => {
        await get().fetchAllData();
        toast.success("Data refreshed successfully");
      },

      clearErrors: () => {
        set({
          rolesError: null,
          permissionsError: null,
          modulesError: null,
        });
      },

      reset: () => {
        set({
          roles: [],
          permissions: [],
          modules: [],
          selectedRole: null,
          isLoadingRoles: false,
          isLoadingPermissions: false,
          isLoadingModules: false,
          isSaving: false,
          rolesError: null,
          permissionsError: null,
          modulesError: null,
        });
      },
    }),
    {
      name: "rbac-store", // localStorage key
      storage: createJSONStorage(() => localStorage),

      // ✅ FIX: Add migration/versioning to handle corrupted persisted data
      version: 1,

      // ✅ FIX: Sanitize persisted state on rehydration
      migrate: (
        persistedState: any
      ) => {
        if (!persistedState) {
          return persistedState;
        }

        if (
          !Array.isArray(
            persistedState.modules
          )
        ) {
          persistedState.modules = [];
        }

        if (
          !Array.isArray(
            persistedState.permissions
          )
        ) {
          persistedState.permissions = [];
        }

        if (
          !Array.isArray(
            persistedState.roles
          )
        ) {
          persistedState.roles = [];
        }

        return persistedState;
      },

      // Only persist data fields — NOT loading/error states
      partialize: (state) => ({
        roles: state.roles,
        permissions: state.permissions,
        modules: state.modules,
        selectedRole: state.selectedRole,
      }),

      // Called once localStorage data has been rehydrated into the store
      onRehydrateStorage: () => (state) => {
        if (state) {
          // ✅ FIX: Double-check roles is array after rehydration
          if (!Array.isArray(state.roles)) {
            state.roles = [];
          }
          if (!Array.isArray(state.permissions)) {
            state.permissions = [];
          }
          if (!Array.isArray(state.modules)) {
            state.modules = [];
          }
          state.setHasHydrated(true);
        }
      },
    }
  )
);