import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CreateModulePayload, CreateModulePermissionPayload, RBACModule } from "@/types/rbac";

interface ModuleManagementProps {
  modules: RBACModule[];
  canCreate: boolean;
  isSaving: boolean;
  onCreateModule: (data: CreateModulePayload) => Promise<RBACModule | null>;
  onCreatePermission: (moduleId: string, data: CreateModulePermissionPayload) => Promise<unknown>;
}

export const ModuleManagement = ({
  modules,
  canCreate,
  isSaving,
  onCreateModule,
  onCreatePermission,
}: ModuleManagementProps) => {
  const [moduleName, setModuleName] = useState("");
  const [moduleDisplayName, setModuleDisplayName] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [permissionAction, setPermissionAction] = useState("");
  const [permissionDisplayName, setPermissionDisplayName] = useState("");

  const handleCreateModule = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created = await onCreateModule({ name: moduleName, displayName: moduleDisplayName });

    if (created) {
      setModuleName("");
      setModuleDisplayName("");
      setSelectedModuleId(created.id);
    }
  };

  const handleCreatePermission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedModuleId) return;

    const created = await onCreatePermission(selectedModuleId, {
      action: permissionAction,
      displayName: permissionDisplayName,
    });

    if (created) {
      setPermissionAction("");
      setPermissionDisplayName("");
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Modules & Permission Definitions</CardTitle>
        <CardDescription>
          Create the modules and permission definitions that appear in the role editor.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={handleCreateModule} className="space-y-3 rounded-xl border p-4">
            <h3 className="font-semibold">Create module</h3>
            <Input value={moduleName} onChange={(event) => setModuleName(event.target.value)} placeholder="Module key, e.g. reports" required disabled={!canCreate || isSaving} />
            <Input value={moduleDisplayName} onChange={(event) => setModuleDisplayName(event.target.value)} placeholder="Display name, e.g. Reports" required disabled={!canCreate || isSaving} />
            <Button type="submit" disabled={!canCreate || isSaving}>
              <Plus className="mr-2 h-4 w-4" /> Create Module
            </Button>
          </form>

          <form onSubmit={handleCreatePermission} className="space-y-3 rounded-xl border p-4">
            <h3 className="font-semibold">Create permission</h3>
            <select value={selectedModuleId} onChange={(event) => setSelectedModuleId(event.target.value)} disabled={!canCreate || isSaving || modules.length === 0} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Select a module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.displayName || module.name}
                </option>
              ))}
            </select>
            <Input value={permissionAction} onChange={(event) => setPermissionAction(event.target.value)} placeholder="Action, e.g. reports.view" required disabled={!canCreate || isSaving || modules.length === 0} />
            <Input value={permissionDisplayName} onChange={(event) => setPermissionDisplayName(event.target.value)} placeholder="Display name, e.g. View reports" required disabled={!canCreate || isSaving || modules.length === 0} />
            <Button type="submit" disabled={!canCreate || isSaving || modules.length === 0}>
              <Plus className="mr-2 h-4 w-4" /> Create Permission
            </Button>
          </form>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Available modules</h3>
          {modules.length === 0 ? (
            <p className="text-sm text-muted-foreground">No modules returned by the API.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <div key={module.id} className="rounded-xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{module.displayName || module.name}</p>
                      <p className="text-xs text-muted-foreground">{module.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{module.permissions.length} permissions</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {module.permissions.map((permission) => (
                      <span key={permission.id || permission.name} className="rounded-md bg-muted px-2 py-1 text-xs">
                        {permission.displayName || permission.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};