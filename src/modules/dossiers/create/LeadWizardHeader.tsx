import { Button } from "@/components/ui/button"

export default function LeadWizardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Dossiers Details
        </h1>

        <p className="text-muted-foreground">
          Get all information here.
        </p>
      </div>

      <div className="flex gap-2">
        {/* <Button variant="outline">
          Save Draft
        </Button> */}

        <Button>
          Update Dossiers
        </Button>
      </div>
    </div>
  )
}