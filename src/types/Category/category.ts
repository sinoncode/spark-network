// src/types/Category/category.ts

export interface Experience {
  id: string;
  key: string;
  label: string;
  description: string | null;

  icon: string;

  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;

  isActive: boolean;
  sortOrder: number;

  categoryId: string;

  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  key: string;
  label: string;
  description: string;

  icon: string;

  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;

  isActive: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;

  experiences: Experience[];
}


export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  message?: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category;
  message?: string;
}

export interface ExperienceResponse {
  success: boolean;
  data: Experience;
  message?: string;
}

export interface DeleteResponse {
  success: boolean;
  data?: null | { id?: string };
  message?: string;
}

export interface CreateCategoryPayload {
  key: string;
  label: string;
  description: string;

  icon: string;

  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;

  sortOrder: number;
  isActive?: boolean;
}

export interface CreateExperiencePayload {
  key: string;
  label: string;
  description?: string | null;

  icon: string;

  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;

  sortOrder: number;
  isActive?: boolean;
}

export type UpdateCategoryPayload = CreateCategoryPayload;
export type UpdateExperiencePayload = CreateExperiencePayload;