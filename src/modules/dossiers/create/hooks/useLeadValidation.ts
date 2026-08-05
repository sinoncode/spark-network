interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

interface ValidationRules {
  [key: string]: ValidationRule
}

export function useLeadValidation() {
  const rules: ValidationRules = {
    name: { required: true, minLength: 3, maxLength: 100 },
    type: { required: true },
    listingType: { required: true },
    address: { required: true, minLength: 5 },
    city: { required: true },
    price: { required: true },
    description: { required: true, minLength: 10 },
    builtUpArea: {
      custom: (value) => {
        if (!value) return true
        const num = Number(value)
        return num > 0 || "Built-up area must be greater than 0"
      },
    },
    bedrooms: {
      custom: (value) => {
        if (!value) return true
        const num = Number(value)
        return num >= 0 || "Bedrooms cannot be negative"
      },
    },
    bathrooms: {
      custom: (value) => {
        if (!value) return true
        const num = Number(value)
        return num >= 0 || "Bathrooms cannot be negative"
      },
    },
  }

  const validate = (field: string, value: any): string | null => {
    const rule = rules[field]

    if (!rule) return null

    // Check required
    if (rule.required && (!value || value.toString().trim() === "")) {
      return `${field} is required`
    }

    if (!value) return null

    const strValue = value.toString()

    // Check minLength
    if (rule.minLength && strValue.length < rule.minLength) {
      return `${field} must be at least ${rule.minLength} characters`
    }

    // Check maxLength
    if (rule.maxLength && strValue.length > rule.maxLength) {
      return `${field} must not exceed ${rule.maxLength} characters`
    }

    // Check pattern
    if (rule.pattern && !rule.pattern.test(strValue)) {
      return `${field} format is invalid`
    }

    // Check custom
    if (rule.custom) {
      const result = rule.custom(value)
      if (result !== true) {
        return typeof result === "string" ? result : `${field} is invalid`
      }
    }

    return null
  }

  const validateAll = (formData: Record<string, any>): Record<string, string> => {
    const errors: Record<string, string> = {}

    Object.keys(rules).forEach((field) => {
      const error = validate(field, formData[field])
      if (error) {
        errors[field] = error
      }
    })

    return errors
  }

  return {
    validate,
    validateAll,
    rules,
  }
}
