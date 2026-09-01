import apiClient from '@/api/axios';
import { DashboardResponse } from '@/types/Dashboard/dashboard';

export async function fetchDashboardStats(): Promise<DashboardResponse> {
  const response = await apiClient.get<DashboardResponse>('/admin/dashboard');

  return response.data;
}

export default apiClient;