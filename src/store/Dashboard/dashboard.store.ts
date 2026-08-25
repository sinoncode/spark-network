import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { DashboardStats } from '@/types/Dashboard/dashboard';
import { fetchDashboardStats } from '@/services/Dashboard/dashboardService';

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;

  fetchStats: () => Promise<void>;
  refreshStats: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const initialState: Pick<
  DashboardState,
  'stats' | 'isLoading' | 'error' | 'lastUpdated'
> = {
  stats: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        fetchStats: async () => {
          // Prevent duplicate requests
          if (get().isLoading) return;

          set(
            {
              isLoading: true,
              error: null,
            },
            false,
            'dashboard/fetchStart'
          );

          try {
            const response = await fetchDashboardStats();

            if (response.success) {
              set(
                {
                  stats: response.data,
                  isLoading: false,
                  error: null,
                  lastUpdated: new Date().toISOString(),
                },
                false,
                'dashboard/fetchSuccess'
              );
            } else {
              set(
                {
                  isLoading: false,
                  error:
                    response.message ||
                    'Failed to load dashboard data',
                },
                false,
                'dashboard/fetchError'
              );
            }
          } catch (error) {
            set(
              {
                isLoading: false,
                error:
                  error instanceof Error
                    ? error.message
                    : 'An unknown error occurred',
              },
              false,
              'dashboard/fetchException'
            );
          }
        },

        refreshStats: async () => {
          set(
            {
              isLoading: true,
              error: null,
            },
            false,
            'dashboard/refreshStart'
          );

          try {
            const response = await fetchDashboardStats();

            if (response.success) {
              set(
                {
                  stats: response.data,
                  isLoading: false,
                  error: null,
                  lastUpdated: new Date().toISOString(),
                },
                false,
                'dashboard/refreshSuccess'
              );
            } else {
              set(
                {
                  isLoading: false,
                  error:
                    response.message ||
                    'Failed to refresh dashboard data',
                },
                false,
                'dashboard/refreshError'
              );
            }
          } catch (error) {
            set(
              {
                isLoading: false,
                error:
                  error instanceof Error
                    ? error.message
                    : 'An unknown error occurred',
              },
              false,
              'dashboard/refreshException'
            );
          }
        },

        clearError: () => {
          set(
            { error: null },
            false,
            'dashboard/clearError'
          );
        },

        reset: () => {
          set(
            initialState,
            false,
            'dashboard/reset'
          );
        },
      }),

      {
        name: 'dashboard-storage',

        // Only persist actual dashboard data
        partialize: (state) => ({
          stats: state.stats,
          lastUpdated: state.lastUpdated,
        }),
      }
    ),

    {
      name: 'DashboardStore',
    }
  )
);