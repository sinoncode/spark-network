import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { usePropertyCreationStore } from "./store/propertyCreationStore"
import { usePropertyStore } from "@/store/propertyStore"
import { toast } from "@/lib/toast"
import type { PropertyPayload } from "@/types/property.types"

export default function PropertyWizardHeader() {
  const navigate = useNavigate()
  const { form, reset } = usePropertyCreationStore()
  const { createProperty } = usePropertyStore()
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async (statusOverride?: "draft" | "active") => {
    try {
      setIsPublishing(true)
      
      const payload: any = {
        ...form,
        classification: {
          ...form.classification,
          listing_status: statusOverride ?? form.classification?.listing_status ?? "draft",
        },
        // Top-level duplicates expected by backend validation
        category: form.classification?.category,
        sub_type: form.classification?.sub_type,
        transaction_type: form.classification?.transaction_type,
        price: form.pricing?.price,
        currency: form.pricing?.currency,
        // Surface commonly-required dimension fields at top-level
        living_area: form.dimensions?.living_area ?? null,
        bedrooms: form.dimensions?.bedrooms ?? null,
        bathrooms: form.dimensions?.bathrooms ?? null,
        rooms: form.dimensions?.rooms ?? null,
        gross_floor_area: form.dimensions?.gross_floor_area ?? null,
        plot_area: form.dimensions?.plot_area ?? null,
      }

      const success = await createProperty(payload)
      if (success) {
        reset()
        navigate("/properties/list")
      }
    } catch (error) {
      // Toast is already handled in the store, but we can have a fallback here
      toast.error("An unexpected error occurred while saving.")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Create Property
        </h1>

        <p className="text-muted-foreground">
          Add a new property listing to the CRM
        </p>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => handlePublish("draft")} 
          disabled={isPublishing}
        >
          Save Draft
        </Button>

        <Button 
          onClick={() => handlePublish("active")} 
          disabled={isPublishing}
        >
          {isPublishing ? "Publishing..." : "Publish Property"}
        </Button>
      </div>
    </div>
  )
}