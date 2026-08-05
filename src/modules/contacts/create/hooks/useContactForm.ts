import { useState } from "react"
import { ContactFormData } from "@/types/contact.types"

export function useContactForm(initialData?: Partial<ContactFormData>) {
  const [formData, setFormData] = useState<Partial<ContactFormData>>(initialData || {})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName || formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName || formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.clientRoles || formData.clientRoles.length === 0) {
      newErrors.clientRoles = "At least one client role must be selected"
    }

    if (!formData.clientSubtype) {
      newErrors.clientSubtype = "Client sub-type is required"
    }

    if (!formData.clientCategory) {
      newErrors.clientCategory = "Client category is required"
    }

    if (!formData.relationshipStage) {
      newErrors.relationshipStage = "Relationship stage is required"
    }

    if (!formData.fiscalDomicileCountry) {
      newErrors.fiscalDomicileCountry = "Fiscal domicile country is required"
    }

    if (formData.isReferred && !formData.referredByContactId) {
      newErrors.referredByContactId = "Referral contact link is required"
    }

    if (formData.hasPowerOfAttorney && !formData.poaHolderName) {
      newErrors.poaHolderName = "Power of attorney holder name is required"
    }

    if (formData.isPepDeclared && !formData.pepDetails) {
      newErrors.pepDetails = "Please provide details for the PEP declaration"
    }

    if (formData.clientSubtype === "company_corporate" && (!formData.companyName || formData.companyName.trim() === "")) {
      newErrors.companyName = "Company name is required for corporate clients"
    }

    setErrors(newErrors)
    return newErrors
  }

  const reset = () => {
    setFormData(initialData || {})
    setErrors({})
  }

  return {
    formData,
    setFormData,
    updateField,
    errors,
    setErrors,
    validate,
    reset,
  }
}
