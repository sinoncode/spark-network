import { Button } from "@/components/ui/button"

export default function LeadWizardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Create Lead
        </h1>

        <p className="text-muted-foreground">
          Add a new lead listing to the CRM
        </p>
      </div>

      <div className="flex gap-2">
        {/* <Button variant="outline">
          Save Draft
        </Button> */}

        <Button>
          Update Lead
        </Button>
      </div>
    </div>
  )
}