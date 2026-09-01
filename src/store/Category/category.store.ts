import { create } from "zustand";
import { devtools } from "zustand/middleware";

import categoryService from "@/services/Category/category.service";

import {
  Category,
  CategoryResponse,
  CreateCategoryPayload,
  CreateExperiencePayload,
  DeleteResponse,
  ExperienceResponse,
  UpdateCategoryPayload,
  UpdateExperiencePayload,
} from "@/types/Category/category";

interface CategoryState {
  // Data
  categories: Category[];

  // Loading states
  isLoading: boolean;
  isSaving: boolean;

  // Error
  error: string | null;

  // Actions
  fetchCategories: () => Promise<void>;

  createCategory: (
    payload: CreateCategoryPayload
  ) => Promise<CategoryResponse | null>;

  createExperience: (
    categoryId: string,
    payload: CreateExperiencePayload
  ) => Promise<ExperienceResponse | null>;

  updateCategory: (
    categoryId: string,
    payload: UpdateCategoryPayload
  ) => Promise<CategoryResponse | null>;

  updateExperience: (
    categoryId: string,
    experienceId: string,
    payload: UpdateExperiencePayload
  ) => Promise<ExperienceResponse | null>;

  deactivateCategory: (
    categoryId: string
  ) => Promise<CategoryResponse | null>;

  deactivateExperience: (
    categoryId: string,
    experienceId: string
  ) => Promise<ExperienceResponse | null>;

  deleteCategory: (
    categoryId: string
  ) => Promise<DeleteResponse | null>;

  deleteExperience: (
    categoryId: string,
    experienceId: string
  ) => Promise<DeleteResponse | null>;

  clearError: () => void;

  reset: () => void;
}

const initialState = {
  categories: [],
  isLoading: false,
  isSaving: false,
  error: null,
};

export const useCategoryStore = create<CategoryState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // ============================================================
      // GET CATEGORIES
      // ============================================================

      fetchCategories: async () => {
        if (get().isLoading) return;

        set({
          isLoading: true,
          error: null,
        });

        try {
          const response =
            await categoryService.getCategories(false);

          if (!response.success) {
            set({
              error:
                response.message ||
                "Failed to load categories.",
              isLoading: false,
            });

            return;
          }

          set({
            categories: response.data || [],
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error:
              error?.response?.data?.message ||
              error?.message ||
              "Failed to load categories.",
          });
        }
      },

      // ============================================================
      // CREATE CATEGORY
      // ============================================================

      createCategory: async (payload) => {
        set({
          isSaving: true,
          error: null,
        });

        try {
          const response =
            await categoryService.createCategory(payload);

          if (!response.success) {
            set({
              isSaving: false,
              error:
                response.message ||
                "Failed to create category.",
            });

            return null;
          }

          // Refresh category list
          await get().fetchCategories();

          set({
            isSaving: false,
            error: null,
          });

          return response;
        } catch (error: any) {
          set({
            isSaving: false,
            error:
              error?.response?.data?.message ||
              error?.message ||
              "Failed to create category.",
          });

          return null;
        }
      },

      // ============================================================
      // CREATE EXPERIENCE
      // ============================================================

      createExperience: async (
        categoryId,
        payload
      ) => {
        if (!categoryId) {
          set({
            error: "Category ID is required.",
          });

          return null;
        }

        set({
          isSaving: true,
          error: null,
        });

        try {
          const response =
            await categoryService.createExperience(
              categoryId,
              payload
            );

          if (!response.success) {
            set({
              isSaving: false,
              error:
                response.message ||
                "Failed to create experience.",
            });

            return null;
          }

          // Refresh categories so the new
          // experience immediately appears
          await get().fetchCategories();

          set({
            isSaving: false,
            error: null,
          });

          return response;
        } catch (error: any) {
          set({
            isSaving: false,
            error:
              error?.response?.data?.message ||
              error?.message ||
              "Failed to create experience.",
          });

          return null;
        }
      },

      // ============================================================
      // UPDATE CATEGORY
      // ============================================================

      updateCategory: async (categoryId, payload) => {
        set({ isSaving: true, error: null });

        try {
          const response = await categoryService.updateCategory(categoryId, payload);
          if (!response.success) {
            set({ isSaving: false, error: response.message || "Failed to update category." });
            return null;
          }
          await get().fetchCategories();
          set({ isSaving: false, error: null });
          return response;
        } catch (error: any) {
          set({
            isSaving: false,
            error: error?.response?.data?.message || error?.message || "Failed to update category.",
          });
          return null;
        }
      },

      // ============================================================
      // UPDATE EXPERIENCE
      // ============================================================

      updateExperience: async (categoryId, experienceId, payload) => {
        set({ isSaving: true, error: null });

        try {
          const response = await categoryService.updateExperience(categoryId, experienceId, payload);
          if (!response.success) {
            set({ isSaving: false, error: response.message || "Failed to update experience." });
            return null;
          }
          await get().fetchCategories();
          set({ isSaving: false, error: null });
          return response;
        } catch (error: any) {
          set({
            isSaving: false,
            error: error?.response?.data?.message || error?.message || "Failed to update experience.",
          });
          return null;
        }
      },

      // ============================================================
      // DEACTIVATE CATEGORY
      // ============================================================

      deactivateCategory: async (categoryId) => {
        set({ isSaving: true, error: null });
        try {
          const response = await categoryService.deactivateCategory(categoryId);
          await get().fetchCategories();
          set({ isSaving: false, error: response.success ? null : response.message || "Failed to deactivate category." });
          return response.success ? response : null;
        } catch (error: any) {
          set({ isSaving: false, error: error?.response?.data?.message || error?.message || "Failed to deactivate category." });
          return null;
        }
      },

      // ============================================================
      // DEACTIVATE EXPERIENCE
      // ============================================================

      deactivateExperience: async (categoryId, experienceId) => {
        set({ isSaving: true, error: null });
        try {
          const response = await categoryService.deactivateExperience(categoryId, experienceId);
          await get().fetchCategories();
          set({ isSaving: false, error: response.success ? null : response.message || "Failed to deactivate experience." });
          return response.success ? response : null;
        } catch (error: any) {
          set({ isSaving: false, error: error?.response?.data?.message || error?.message || "Failed to deactivate experience." });
          return null;
        }
      },

      // ============================================================
      // DELETE CATEGORY
      // ============================================================

      deleteCategory: async (categoryId) => {
        if (!categoryId) {
          set({
            error: "Category ID is required.",
          });

          return null;
        }

        set({
          isSaving: true,
          error: null,
        });

        try {
          const response =
            await categoryService.deleteCategory(categoryId);

          if (!response.success) {
            set({
              isSaving: false,
              error:
                response.message ||
                "Failed to delete category.",
            });

            return null;
          }

          await get().fetchCategories();

          set({
            isSaving: false,
            error: null,
          });

          return response;
        } catch (error: any) {
          set({
            isSaving: false,
            error:
              error?.response?.data?.message ||
              error?.message ||
              "Failed to delete category.",
          });

          return null;
        }
      },

      // ============================================================
      // DELETE EXPERIENCE
      // ============================================================

      deleteExperience: async (categoryId, experienceId) => {
        if (!categoryId || !experienceId) {
          set({
            error: "Category ID and Experience ID are required.",
          });

          return null;
        }

        set({
          isSaving: true,
          error: null,
        });

        try {
          const response =
            await categoryService.deleteExperience(
              categoryId,
              experienceId
            );

          if (!response.success) {
            set({
              isSaving: false,
              error:
                response.message ||
                "Failed to delete experience.",
            });

            return null;
          }

          await get().fetchCategories();

          set({
            isSaving: false,
            error: null,
          });

          return response;
        } catch (error: any) {
          set({
            isSaving: false,
            error:
              error?.response?.data?.message ||
              error?.message ||
              "Failed to delete experience.",
          });

          return null;
        }
      },

      // ============================================================
      // CLEAR ERROR
      // ============================================================

      clearError: () => {
        set({
          error: null,
        });
      },

      // ============================================================
      // RESET
      // ============================================================

      reset: () => {
        set(initialState);
      },
    }),

    {
      name: "CategoryStore",
    }
  )
);