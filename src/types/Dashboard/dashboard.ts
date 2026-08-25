export interface DashboardStats {
  totalUsers: number;
  dau: number;
  totalPosts: number;
  pendingModeration: number;
  flaggedPosts: number;
  totalCommunities: number;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardStats;
  message?: string;
}

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface DashboardCardConfig {
  id: string;
  title: string;
  dataKey: keyof DashboardStats;
  chartType: 'area' | 'bar';
  colorScheme: 'purple' | 'green' | 'orange' | 'pink';
  prefix?: string;
  suffix?: string;
  showPercentage?: boolean;
}