import api from "@/api/axios";

import type {
  CreateRolePayload,
} from "@/types/rbac";

export const getRoles = async () => {
  const response = await api.get("/admin/rbac/roles");

  return response.data;
};

export const getRoleById = async (
  id: string
) => {
  const response = await api.get(
    `/admin/rbac/roles/${id}`
  );

  return response.data;
};

export const createRole = async (
  data: CreateRolePayload
) => {
  const response = await api.post(
    "/admin/rbac/roles",
    data
  );

  return response.data;
};

export const updateRole = async (
  id: string,
  data: CreateRolePayload
) => {
  const response = await api.put(
    `/admin/rbac/roles/${id}`,
    data
  );

  return response.data;
};

export const deleteRole = async (
  id: string
) => {
  const response = await api.delete(
    `/admin/rbac/roles/${id}`
  );

  return response.data;
};