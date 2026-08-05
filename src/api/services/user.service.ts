import api from "../axios";
import { ENDPOINTS } from "../endpoints";
import type { ApiResponse } from "@/types/api";

export async function listUsers() {
  const res = await api.get<ApiResponse>(ENDPOINTS.USERS);
  return res.data;
}
