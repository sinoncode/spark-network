import { Button } from "@/components/ui/button"

interface Props {
  onSaveDraft?: () => void
  onSaveContact?: () => void
  isSubmitting?: boolean
}

export default function ContactWizardHeader({
  onSaveDraft,
  onSaveContact,
  isSubmitting = false,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-5 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Create Contact
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Add a new client, buyer, seller, or partner structure to the CRM
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Primary Action Button */}
        <Button 
          onClick={onSaveContact}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving Contact..." : "Save Contact"}
        </Button>
      </div>
    </div>
  )
}