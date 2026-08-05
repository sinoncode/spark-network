import { create } from "zustand"

export interface LeadFormData {
  title: string
  leadType: string
  listingType: string

  description: string

  address: string
  city: string
  state: string
  zipCode: string
  latitude: string
  longitude: string

  area: string
  bedrooms: number
  bathrooms: number
  balconies: number

  floor: string
  totalFloors: string
  yearBuilt: string

  furnishing: string
  facing: string

  coveredParking: boolean
  openParking: boolean
  parkingSlots: string

  amenities: string[]

  images: string[]

  publicationStatus: "draft" | "active" | "sold"

  keywords: string[]

//   Characteristics Steps

country: ""
community: ""
subCommunity: ""
buildingName: ""

locationDescription: ""

//   Pricing Step

builtUpArea: ""
plotArea: ""
leadAge: ""

floorNumber: ""
elevators: ""
ownershipType: ""

visitorParking: ""

price: ""
pricePerSqft: ""

maintenanceFee: ""
securityDeposit: ""

roi: ""
rentalYield: ""
marketValue: ""


// Publication Step

visibility: string

isFeatured: boolean

priority: string

assignedAgent: string

publishDate: string
expiryDate: string

isVerified: boolean
requiresApproval: boolean

seoTitle: string
metaDescription: string
seoKeywords: string
}

interface LeadStore {
  form: LeadFormData

  updateField: (
    key: keyof LeadFormData,
    value: any
  ) => void

  reset: () => void
}

const initialState: LeadFormData = {
  title: "",
  leadType: "",
  listingType: "",

  description: "",

  address: "",
  city: "",
  state: "",
  zipCode: "",
  latitude: "",
  longitude: "",

  area: "",
  bedrooms: 0,
  bathrooms: 0,
  balconies: 0,

  floor: "",
  totalFloors: "",
  yearBuilt: "",

  furnishing: "",

  facing: "",

  coveredParking: false,
  openParking: false,
  parkingSlots: "",

  amenities: [],

  images: [],

  publicationStatus: "draft",

  keywords: [],

//   Characteristics Step
country: "",
community: "",
subCommunity: "",
buildingName: "",

locationDescription: "",

//   Pricing Step

builtUpArea: "",
plotArea: "",
leadAge: "",

floorNumber: "",
elevators: "",
ownershipType: "",

visitorParking: "",

price: "",
pricePerSqft: "",

maintenanceFee: "",
securityDeposit: "",

roi: "",
rentalYield: "",
marketValue: "",

// Publication Step

visibility: "public",

isFeatured: false,

priority: "normal",

assignedAgent: "",

publishDate: "",
expiryDate: "",

isVerified: false,
requiresApproval: false,

seoTitle: "",
metaDescription: "",
seoKeywords: "",
}

export const useLeadCreationStore =
  create<LeadStore>((set) => ({
    form: initialState,

    updateField: (key, value) =>
      set((state) => ({
        form: {
          ...state.form,
          [key]: value,
        },
      })),

    reset: () =>
      set({
        form: initialState,
      }),
  }))