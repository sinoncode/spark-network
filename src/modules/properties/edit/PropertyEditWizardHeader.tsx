import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePropertyCreationStore } from "../create/store/propertyCreationStore"
import { usePropertyStore } from "@/store/propertyStore"
import { toast } from "@/lib/toast"
import type { PropertyPayload } from "@/types/property.types"

interface Props {
  propertyId: number
}

export default function PropertyEditWizardHeader({ propertyId }: Props) {
  const navigate = useNavigate()
  const { form, reset } = usePropertyCreationStore()
  const { updateProperty, saving } = usePropertyStore()
  const [isSavingDraft, setIsSavingDraft] = useState(false)

  // ─── Build payload from wizard store ────────────────────────────────────────
  const buildPayload = (overrideStatus?: string): any => {
    return {
      ...form,
      classification: {
        ...form.classification,
        listing_status: overrideStatus ?? form.classification?.listing_status ?? "draft",
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
  }

  // ─── Save as draft ───────────────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true)
      const payload = buildPayload("draft")
      const success = await updateProperty(propertyId, payload)
      if (success) {
        reset()
        navigate("/properties/list")
      }
    } catch {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsSavingDraft(false)
    }
  }

  // ─── Save & publish ──────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    try {
      const payload = buildPayload()
      const success = await updateProperty(propertyId, payload)
      if (success) {
        reset()
        navigate("/properties/list")
      }
    } catch {
      toast.error("An unexpected error occurred.")
    }
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      {/* ── Left: Breadcrumb + title ─────────────────────────────────────────── */}
      <div className="space-y-1">
        {/* Back link */}
        <button
          onClick={() => {
            reset()
            navigate("/properties/list")
          }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Properties
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Edit Property</h1>
          <Badge variant="outline" className="text-xs font-normal">
            ID #{propertyId}
          </Badge>
        </div>

        <p className="text-muted-foreground">
          Update the property listing details and save your changes.
        </p>
      </div>

      {/* ── Right: Actions ───────────────────────────────────────────────────── */}
      <div className="flex shrink-0 gap-2">
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          disabled={isSavingDraft || saving}
        >
          <Save className="mr-1.5 h-4 w-4" />
          {isSavingDraft ? "Saving…" : "Save Draft"}
        </Button>

        <Button
          onClick={handleUpdate}
          disabled={saving || isSavingDraft}
        >
          <Send className="mr-1.5 h-4 w-4" />
          {saving ? "Updating…" : "Update Property"}
        </Button>
      </div>
    </div>
  )
}
