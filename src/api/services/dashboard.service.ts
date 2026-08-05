import api from "../axios";
import { ENDPOINTS } from "../endpoints";

export async function fetchDashboardStats() {
  const res = await api.get(ENDPOINTS.DASHBOARD);
  return res.data;
}
