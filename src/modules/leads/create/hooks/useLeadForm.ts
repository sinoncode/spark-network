import { useState } from "react"

interface LeadFormData {
  name?: string
  type?: string
  listingType?: string
  address?: string
  city?: string
  builtUpArea?: string
  carpetArea?: string
  bedrooms?: string
  bathrooms?: string
  parking?: string
  floorNumber?: string
  amenities?: string
  price?: string
  currency?: string
  priceType?: string
  monthlyRent?: string
  securityDeposit?: string
  maintenance?: string
  description?: string
  highlights?: string
  rules?: string
  images?: string[]
  published?: boolean
  status?: string
  featured?: boolean
  enquiries?: boolean
  targetBuyer?: string
  preferredTenant?: string
  investmentType?: string
  futurePlans?: string
  expectedROI?: string
  completionDate?: string
  additionalNotes?: string
}

export function useLeadForm(initialData?: LeadFormData) {
  const [formData, setFormData] = useState<LeadFormData>(
    initialData || {}
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = "Lead name is required"
    if (!formData.type) newErrors.type = "Lead type is required"
    if (!formData.listingType)
      newErrors.listingType = "Listing type is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.price) newErrors.price = "Price is required"
    if (!formData.description)
      newErrors.description = "Description is required"

    setErrors(newErrors)
    return newErrors
  }

  const reset = () => {
    setFormData({})
    setErrors({})
  }

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    validate,
    reset,
  }
}
