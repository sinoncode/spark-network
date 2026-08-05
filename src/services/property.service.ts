import api from "@/api/axios";

import type {
    Property,
    PropertyListResponse,
    PropertyPayload,
    PropertyResponse,
} from "@/types/property.types";

export interface PropertyListParams {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    listing_type?: string;
    type?: string;
    city?: string;
    category?: string;
    sub_type?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string[]>;
}

export const PropertyService = {
    /**
     * Get all properties with optional pagination and filters.
     *
     * GET /v1/admin/properties
     *
     * Returns { data: Property[], links: PropertyLinks, meta: PropertyMeta }
     */
    getAll: (params?: PropertyListParams) => {
        return api.get<PropertyListResponse>("/admin/properties", {
            params,
        });
    },

    /**
     * Get one property by ID.
     *
     * GET /v1/admin/properties/:id
     *
     * Returns { data: Property }
     */
    getById: (id: number | string) => {
        return api.get<PropertyResponse>(
            `/admin/properties/${id}`
        );
    },

    /**
     * Create a new property.
     *
     * POST /v1/admin/properties
     */
    create: (payload: PropertyPayload) => {
        return api.post<PropertyResponse>(
            "/admin/properties",
            payload
        );
    },

    /**
     * Update an existing property.
     *
     * PUT /v1/admin/properties/:id
     */
    update: (
        id: number | string,
        payload: PropertyPayload
    ) => {
        return api.put<PropertyResponse>(
            `/admin/properties/${id}`,
            payload
        );
    },

    /**
     * Delete a property.
     *
     * DELETE /v1/admin/properties/:id
     */
    delete: (id: number | string) => {
        return api.delete<ApiResponse<null>>(
            `/admin/properties/${id}`
        );
    },
};