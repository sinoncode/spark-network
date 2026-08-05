import { create } from "zustand";

import { PropertyService } from "@/services/property.service";
import { toast } from "@/lib/toast";


import type {
  PropertyListParams,
} from "@/services/property.service";

import type {
  Property,
  PropertyMeta,
  PropertyPayload,
} from "@/types/property.types";

interface PropertyStore {
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  detailsLoading: boolean;

  properties: Property[];
  selectedProperty: Property | null;

  meta: PropertyMeta;

  filters: PropertyListParams;

  fetchProperties: (
    params?: PropertyListParams
  ) => Promise<void>;

  fetchPropertyById: (
    id: number | string
  ) => Promise<Property | null>;

  createProperty: (
    payload: PropertyPayload
  ) => Promise<boolean>;

  updateProperty: (
    id: number | string,
    payload: PropertyPayload
  ) => Promise<boolean>;

  deleteProperty: (
    id: number | string
  ) => Promise<boolean>;

  setSelectedProperty: (
    property: Property | null
  ) => void;

  setFilters: (
    filters: Partial<PropertyListParams>
  ) => void;

  resetFilters: () => void;

  clearSelectedProperty: () => void;
}

const defaultMeta: PropertyMeta = {
  current_page: 1,
  from: 1,
  last_page: 1,
  links: [],
  path: "",
  per_page: 10,
  to: 1,
  total: 0,
};

const defaultFilters: PropertyListParams = {
  page: 1,
  per_page: 10,
  search: "",
  status: "",
  listing_type: "",
  type: "",
  city: "",
};

export const usePropertyStore = create<PropertyStore>(
  (set, get) => ({
    loading: false,
    saving: false,
    deleting: false,
    detailsLoading: false,

    properties: [],
    selectedProperty: null,

    meta: defaultMeta,

    filters: defaultFilters,

    setSelectedProperty: (property) => {
      set({
        selectedProperty: property,
      });
    },

    clearSelectedProperty: () => {
      set({
        selectedProperty: null,
      });
    },

    setFilters: (newFilters) => {
      set((state) => ({
        filters: {
          ...state.filters,
          ...newFilters,
        },
      }));
    },

    resetFilters: () => {
      set({
        filters: defaultFilters,
      });
    },

    /**
     * Fetch properties list.
     *
     * API returns: { data: Property[], links: PropertyLinks, meta: PropertyMeta }
     * The axios response wraps this in response.data, so:
     *   response.data.data = Property[]
     *   response.data.meta = PropertyMeta
     */
    fetchProperties: async (params) => {
      set({
        loading: true,
      });

      try {
        const currentFilters = get().filters;

        const requestParams = {
          ...currentFilters,
          ...params,
        };

        const response =
          await PropertyService.getAll(
            requestParams
          );

        // PropertyListResponse = { data: Property[], links, meta }
        const apiData = response.data;

        set({
          properties: apiData.data ?? [],
          meta: apiData.meta ?? defaultMeta,
          filters: requestParams,
        });
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "Unable to fetch properties.";

        toast.error(message);

        set({
          properties: [],
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    /**
     * Fetch single property by ID.
     *
     * API returns: { success, message, data: Property }
     */
    fetchPropertyById: async (id) => {
      set({
        detailsLoading: true,
      });

      try {
        const response =
          await PropertyService.getById(id);

        if (response.data.success) {
          const property = response.data.data;

          set({
            selectedProperty: property,
          });

          return property;
        }

        toast.error(
          response.data.message ||
          "Unable to fetch property details."
        );

        return null;
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "Unable to fetch property details.";

        toast.error(message);

        set({
          selectedProperty: null,
        });

        return null;
      } finally {
        set({
          detailsLoading: false,
        });
      }
    },

    createProperty: async (payload) => {
      set({
        saving: true,
      });

      try {
        const response =
          await PropertyService.create(payload);

        if (response.data.success) {
          const createdProperty =
            response.data.data;

          set((state) => ({
            properties: [
              createdProperty,
              ...state.properties,
            ],
            meta: {
              ...state.meta,
              total: state.meta.total + 1,
            },
          }));

          toast.success(
            response.data.message ||
            "Property created successfully."
          );

          return true;
        }

        const validationErrors = (response.data as any).errors;
        const message = response.data.message || "Unable to create property.";

        if (validationErrors && typeof validationErrors === 'object') {
          const firstError = Object.values(validationErrors).flat().filter(Boolean).at(0);
          toast.error(String(firstError || message));
        } else {
          toast.error(String(message));
        }

        return false;
      } catch (error: any) {
        const validationErrors =
          error.response?.data?.errors;

        const message =
          error.response?.data?.message ||
          "Unable to create property.";

        if (validationErrors && typeof validationErrors === 'object') {
          const firstError = Object.values(validationErrors).flat().filter(Boolean).at(0);
          toast.error(String(firstError || message));
        } else {
          toast.error(String(message));
        }

        return false;
      } finally {
        set({
          saving: false,
        });
      }
    },

    updateProperty: async (id, payload) => {
      set({
        saving: true,
      });

      try {
        const response =
          await PropertyService.update(
            id,
            payload
          );

        if (response.data.success) {
          const updatedProperty =
            response.data.data;

          set((state) => ({
            properties: state.properties.map(
              (property) =>
                property.id === Number(id)
                  ? updatedProperty
                  : property
            ),
            selectedProperty:
              state.selectedProperty?.id ===
                Number(id)
                ? updatedProperty
                : state.selectedProperty,
          }));

          toast.success(
            response.data.message ||
            "Property updated successfully."
          );

          return true;
        }

        const validationErrors = (response.data as any).errors;
        const message = response.data.message || "Unable to update property.";

        if (validationErrors && typeof validationErrors === 'object') {
          const firstError = Object.values(validationErrors).flat().filter(Boolean).at(0);
          toast.error(String(firstError || message));
        } else {
          toast.error(String(message));
        }

        return false;
      } catch (error: any) {
        const validationErrors =
          error.response?.data?.errors;

        const message =
          error.response?.data?.message ||
          "Unable to update property.";

        if (validationErrors && typeof validationErrors === 'object') {
          const firstError = Object.values(validationErrors).flat().filter(Boolean).at(0);
          toast.error(String(firstError || message));
        } else {
          toast.error(String(message));
        }

        return false;
      } finally {
        set({
          saving: false,
        });
      }
    },

    deleteProperty: async (id) => {
      set({
        deleting: true,
      });

      try {
        const response =
          await PropertyService.delete(id);

        if (response.data.success !== false) {
          set((state) => ({
            properties: state.properties.filter(
              (property) =>
                property.id !== Number(id)
            ),
            selectedProperty:
              state.selectedProperty?.id ===
                Number(id)
                ? null
                : state.selectedProperty,
            meta: {
              ...state.meta,
              total: Math.max(
                0,
                state.meta.total - 1
              ),
            },
          }));

          toast.success(
            response.data.message ||
            "Property deleted successfully."
          );

          return true;
        }

        toast.error(
          response.data.message ||
          "Unable to delete property."
        );

        return false;
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "Unable to delete property.";

        toast.error(message);

        return false;
      } finally {
        set({
          deleting: false,
        });
      }
    },
  })
);