import { ContactFormData } from "@/types/contact.types"

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any, formData?: Partial<ContactFormData>) => boolean | string
}

interface ValidationRules {
  [key: string]: ValidationRule
}

export function useContactValidation() {
  const rules: ValidationRules = {
    firstName: { required: true },
    lastName: { required: true },
    email: {
      required: true,
      pattern: /^\S+@\S+\.\S+$/,
      custom: (value) =>
        value && /^\S+@\S+\.\S+$/.test(value)
          ? true
          : "Please enter a valid email address",
    },
    clientRoles: {
      custom: (value) =>
        (Array.isArray(value) && value.length > 0) ||
        "At least one client role is required",
    },
    clientSubtype: { required: true },
    clientCategory: { required: true },
    relationshipStage: { required: true },
    fiscalDomicileCountry: { required: true },
    companyName: {
      custom: (value, formData) => {
        if (formData?.clientSubtype === "company_corporate" && !value) {
          return "Company name is required for corporate clients"
        }
        return true
      },
    },
    budgetMin: {
      custom: (value) => {
        if (value === undefined || value === null || value === "") return true
        const num = Number(value)
        return num >= 0 || "Minimum budget cannot be negative"
      },
    },
    budgetMax: {
      custom: (value, formData) => {
        if (value === undefined || value === null || value === "") return true
        const max = Number(value)
        const min = Number(formData?.budgetMin || 0)
        if (max < 0) return "Maximum budget cannot be negative"
        if (min > 0 && max < min)
          return "Maximum budget must be greater than minimum budget"
        return true
      },
    },
    minLivingArea: {
      custom: (value) => {
        if (value === undefined || value === null || value === "") return true
        return Number(value) > 0 || "Living area must be greater than 0"
      },
    },
    estimatedValueProperty: {
      custom: (value) => {
        if (value === undefined || value === null || value === "") return true
        return Number(value) >= 0 || "Property value cannot be negative"
      },
    },
    pepDetails: {
      custom: (value, formData) => {
        if (formData?.isPepDeclared && (!value || value.trim() === "")) {
          return "PEP details are required when PEP is declared"
        }
        return true
      },
    },
  }

  const validateField = (
    field: string,
    value: any,
    formData?: Partial<ContactFormData>
  ): string | null => {
    const rule = rules[field]
    if (!rule) return null

    if (rule.required && (!value || value.toString().trim() === "")) {
      return `${field} is required`
    }

    if (!value) return null
    const strValue = value.toString()

    if (rule.minLength && strValue.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`
    }

    if (rule.maxLength && strValue.length > rule.maxLength) {
      return `Must not exceed ${rule.maxLength} characters`
    }

    if (rule.pattern && !rule.pattern.test(strValue)) {
      return `Invalid format`
    }

    if (rule.custom) {
      const result = rule.custom(value, formData)
      if (result !== true) {
        return typeof result === "string" ? result : `Invalid field value`
      }
    }

    return null
  }

  const validateAll = (
    formData: Partial<ContactFormData>
  ): Record<string, string> => {
    const errors: Record<string, string> = {}

    Object.keys(rules).forEach((field) => {
      const error = validateField(field, (formData as any)[field], formData)
      if (error) {
        errors[field] = error
      }
    })

    return errors
  }

  return {
    validateField,
    validateAll,
    rules,
  }
}
