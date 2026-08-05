import { Button } from "@/components/ui/button"

interface RequestWizardHeaderProps {
  title?: string
  description?: string
  actionLabel?: string
  onSave: () => void
  isSubmitting: boolean
  onCancel: () => void
}

export default function RequestWizardHeader({
  title = "Create Request",
  description = "Add a new request listing to the CRM",
  actionLabel = "Save Request",
  onSave,
  isSubmitting,
  onCancel,
}: RequestWizardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button onClick={onSave} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : actionLabel}
        </Button>
      </div>
    </div>
  )
}