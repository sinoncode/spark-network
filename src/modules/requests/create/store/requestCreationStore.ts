import { create } from "zustand";

export interface RequestFormData {
  first_name: string;
  last_name: string;

  phones: string;
  emails: string;
  language: string;

  memo: string;
  notes: string;

  status: string;

  transaction: string;
  category: string;

  budget_min: number | string;
  budget_max: number | string;
  currency: string;

  zip: string;
  city: string;
  country: string;
  radius: number;

  rooms_min: number | string;
  rooms_max: number | string;

  livable_space_min: number | string;
  livable_space_max: number | string;

  surface_land_min: number | string;
  surface_land_max: number | string;

  minimumPrice: number | string;
  maximumPrice: number | string;
  minimumBalconies: number | string;
  maximumBalconies: number | string;
  minimumBuiltYear: number | string;
  maximumBuiltYear: number | string;
}

interface RequestStore {
  form: RequestFormData;

  updateField: (
    key: keyof RequestFormData,
    value: RequestFormData[keyof RequestFormData]
  ) => void;

  setForm: (form: Partial<RequestFormData>) => void;

  reset: () => void;
}

const initialState: RequestFormData = {
  first_name: "",
  last_name: "",

  phones: "",
  emails: "",
  language: "",

  memo: "",
  notes: "",

  status: "NEW",

  transaction: "BUY",
  category: "",

  budget_min: 0,
  budget_max: 0,
  currency: "CHF",

  zip: "",
  city: "",
  country: "",
  radius: 0,

  rooms_min: 0,
  rooms_max: 0,

  livable_space_min: 0,
  livable_space_max: 0,

  surface_land_min: 0,
  surface_land_max: 0,

  minimumPrice: "",
  maximumPrice: "",
  minimumBalconies: "",
  maximumBalconies: "",
  minimumBuiltYear: "",
  maximumBuiltYear: "",
};

export const useRequestCreationStore =
  create<RequestStore>((set) => ({
    form: initialState,

    updateField: (key, value) =>
      set((state) => ({
        form: {
          ...state.form,
          [key]: value,
        },
      })),

    setForm: (form) =>
      set({
        form: {
          ...initialState,
          ...form,
        },
      }),

    reset: () =>
      set({
        form: initialState,
      }),
  }));