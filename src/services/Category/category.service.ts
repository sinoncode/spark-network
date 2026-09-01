import apiClient from "@/api/axios";

import {
  CategoriesResponse,
  CategoryResponse,
  ExperienceResponse,
  CreateCategoryPayload,
  CreateExperiencePayload,
  DeleteResponse,
  UpdateCategoryPayload,
  UpdateExperiencePayload,
} from "@/types/Category/category";

export const categoryService = {
  /**
   * Get all categories with their experiences
   */
  getCategories: async (
    activeOnly = false
  ): Promise<CategoriesResponse> => {
    const response = await apiClient.get<CategoriesResponse>(
      `/categories?activeOnly=${activeOnly}`
    );

    return response.data;
  },

  /**
   * Get categories for post creation
   * Only active categories/experiences
   */
  getCategoriesForPost: async (): Promise<CategoriesResponse> => {
    const response = await apiClient.get<CategoriesResponse>(
      "/categories/for-post"
    );

    return response.data;
  },

  /**
   * Create a new category
   */
  createCategory: async (
    payload: CreateCategoryPayload
  ): Promise<CategoryResponse> => {
    const response = await apiClient.post<CategoryResponse>(
      "/categories",
      payload
    );

    return response.data;
  },

  /**
   * Create an experience under a category
   */
  createExperience: async (
    categoryId: string,
    payload: CreateExperiencePayload
  ): Promise<ExperienceResponse> => {
    const response =
      await apiClient.post<ExperienceResponse>(
        `/categories/${categoryId}/experiences`,
        payload
      );

    return response.data;
  },

  updateCategory: async (
    categoryId: string,
    payload: UpdateCategoryPayload
  ): Promise<CategoryResponse> => {
    const response = await apiClient.patch<CategoryResponse>(
      `/categories/${categoryId}`,
      payload
    );

    return response.data;
  },

  updateExperience: async (
    categoryId: string,
    experienceId: string,
    payload: UpdateExperiencePayload
  ): Promise<ExperienceResponse> => {
    const response = await apiClient.patch<ExperienceResponse>(
      `/categories/${categoryId}/experiences/${experienceId}`,
      payload
    );

    return response.data;
  },

  deactivateCategory: async (
    categoryId: string
  ): Promise<CategoryResponse> => {
    const response = await apiClient.patch<CategoryResponse>(
      `/categories/${categoryId}`,
      { isActive: false }
    );

    return response.data;
  },

  deactivateExperience: async (
    categoryId: string,
    experienceId: string
  ): Promise<ExperienceResponse> => {
    const response = await apiClient.patch<ExperienceResponse>(
      `/categories/${categoryId}/experiences/${experienceId}`,
      { isActive: false }
    );

    return response.data;
  },

  /**
   * Delete a category
   */
  deleteCategory: async (
    categoryId: string
  ): Promise<DeleteResponse> => {
    const response = await apiClient.delete<DeleteResponse>(
      `/categories/${categoryId}`
    );

    return response.data;
  },

  /**
   * Delete an experience under a category
   */
  deleteExperience: async (
    categoryId: string,
    experienceId: string
  ): Promise<DeleteResponse> => {
    const response = await apiClient.delete<DeleteResponse>(
      `/categories/${categoryId}/experiences/${experienceId}`
    );

    return response.data;
  },
};

export default categoryService;