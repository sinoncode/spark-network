import { create } from "zustand"
import type { PropertyPayload } from "@/types/property.types"
import { DEFAULT_PROPERTY_PAYLOAD } from "@/types/property.types"

/**
 * Property creation / edit store.
 *
 * Uses the same nested PropertyPayload shape from the types file
 * so that the wizard state can be sent directly to the API without
 * manual field mapping.
 */
interface PropertyCreationStore {
  form: PropertyPayload

  /** Deep-merge partial updates into the form (top-level keys only). */
  updateForm: (partial: Partial<PropertyPayload>) => void

  /**
   * Update a single field by path.
   * Supports dot-notation for nested fields: "location.city", "dimensions.rooms", "type_specific.land.area.total_area"
   */
  updateField: (path: string, value: any) => void

  /** Shallow-update a single top-level key (legacy). */
  updateTopLevelField: <K extends keyof PropertyPayload>(
    key: K,
    value: PropertyPayload[K]
  ) => void

  /** Reset the form back to defaults. */
  reset: () => void

  /** Load an existing property into the form (for edit mode). */
  loadFromProperty: (data: Partial<PropertyPayload>) => void

  /** Get a value by dot-notation path (for form binding). */
  getField: (path: string) => any
}

export const usePropertyCreationStore =
  create<PropertyCreationStore>((set, get) => ({
    form: { ...DEFAULT_PROPERTY_PAYLOAD },

    updateForm: (partial) =>
      set((state) => ({
        form: deepMerge(state.form, partial),
      })),

    updateField: (path, value) =>
      set((state) => ({
        form: setByPath(state.form, path, value),
      })),

    updateTopLevelField: (key, value) =>
      set((state) => ({
        form: {
          ...state.form,
          [key]: value,
        },
      })),

    reset: () =>
      set({
        form: { ...DEFAULT_PROPERTY_PAYLOAD },
      }),

    loadFromProperty: (data) =>
      set({
        form: deepMerge({ ...DEFAULT_PROPERTY_PAYLOAD }, data),
      }),

    getField: (path) => getByPath(get().form, path),
  }))

// ─── Utility: deep merge ────────────────────────────────────────────────────

function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target }

  for (const key in source) {
    const sourceVal = source[key]
    const targetVal = target[key]

    if (
      sourceVal !== null &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      ;(result as any)[key] = deepMerge(
        targetVal as Record<string, any>,
        sourceVal as Record<string, any>
      )
    } else {
      ;(result as any)[key] = sourceVal
    }
  }

  return result
}

// ─── Utility: set value by dot-notation path ────────────────────────────────

function setByPath(obj: any, path: string, value: any): any {
  const keys = path.split(".")
  const result = Array.isArray(obj) ? [...obj] : { ...obj }
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]
    const isNextIndex = /^\d+$/.test(nextKey)

    if (current[key] === undefined || current[key] === null) {
      current[key] = isNextIndex ? [] : {}
    } else {
      current[key] = Array.isArray(current[key])
        ? [...current[key]]
        : { ...current[key] }
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
  return result
}

// ─── Utility: get value by dot-notation path ────────────────────────────────

function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((o, p) => (o ? o[p] : undefined), obj)
}