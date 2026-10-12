import { useEffect } from "react";
import { RefreshCw, Blocks, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useAuthStore } from "@/store/auth.store";
import { useRBACStore } from "@/store/rbacStore";

import { ModuleManagement } from "@/modules/permission/components/rbac/ModuleManagement";

const Modules = () => {
  // ============================================
  // GLOBAL STATE (ZUSTAND)
  // ============================================

  const {
    modules,
    isLoadingModules,
    isSaving,
    fetchAllData,
    createModule,
    createModulePermission,
    refreshData,
  } = useRBACStore();

  // ============================================
  // AUTHENTICATION & PERMISSIONS
  // ============================================

  const user = useAuthStore((state: any) => state.user);

  const permissionSources = [
    ...(Array.isArray(user?.permissions) ? user.permissions : []),
    ...(Array.isArray(user?.role?.permissions)
      ? user.role.permissions
      : []),
    ...(Array.isArray(user?.roles)
      ? user.roles.flatMap((role: any) => role?.permissions || [])
      : []),
  ];

  const userPermissions = permissionSources
    .map((permission: any) =>
      typeof permission === "string"
        ? permission
        : permission?.name || permission?.action || ""
    )
    .filter(Boolean);

  const roleNames = [
    typeof user?.role === "string"
      ? user.role
      : user?.role?.name || "",
    user?.roleName,
    user?.role_name,
    ...(Array.isArray(user?.roles)
      ? user.roles.map((role: any) => role?.name)
      : []),
  ]
    .filter(Boolean)
    .map((role) => String(role).toLowerCase());

  const isSuperAdmin = Boolean(
    user?.isSuperAdmin ||
      user?.is_super_admin ||
      user?.isAdmin ||
      user?.is_admin ||
      roleNames.some((role) =>
        ["admin", "administrator", "super_admin", "superadmin"].includes(
          role
        )
      ) ||
      userPermissions.includes("*")
  );

  const canCreate =
    isSuperAdmin ||
    userPermissions.includes("permissions.create") ||
    userPermissions.includes("modules.create");

  // ============================================
  // FETCH DATA
  // ============================================

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="mt-16 space-y-6 p-4 md:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Blocks className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Modules & Permissions
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create modules, define permissions, and manage application
              access definitions.
            </p>
          </div>
        </div>

        {/* REFRESH BUTTON */}
        <Button
          type="button"
          variant="outline"
          onClick={refreshData}
          disabled={isLoadingModules || isSaving}
          className="w-full sm:w-auto"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${
              isLoadingModules ? "animate-spin" : ""
            }`}
          />
          Refresh
        </Button>
      </div>

      <Separator />

      {/* MODULE MANAGEMENT SECTION */}
      {isLoadingModules ? (
        <div className="space-y-6">
          {/* FORM SKELETONS */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="space-y-4 rounded-xl border p-5"
              >
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-9 w-32" />
              </div>
            ))}
          </div>

          {/* MODULE CARD SKELETONS */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-40" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-xl border p-5"
                >
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-3 w-24" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ModuleManagement
          modules={modules}
          canCreate={canCreate}
          isSaving={isSaving}
          onCreateModule={createModule}
          onCreatePermission={createModulePermission}
        />
      )}

      {/* INFORMATION SECTION */}
      <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <h3 className="text-sm font-semibold">
            Module and permission definitions
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Permissions defined here can be assigned to roles from the Roles
            & Permissions section. Changes depend on your configured access
            permissions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modules;