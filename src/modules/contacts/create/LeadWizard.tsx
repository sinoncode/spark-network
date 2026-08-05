import { useState } from "react"

import ClientClassification from "./steps/ClientClassificationStep"
import FinancialProfile from "./steps/FinancialProfileStep"
import PropertySearchCriteria from "./steps/PropertySearchCriteriaStep"
import PropertyForSaleRent from "./steps/PropertyForSaleRentStep"
import CommunicationActivity from "./steps/CommunicationActivityStep"
import RelationshipsLinkedRecords from "./steps/RelationshipsLinkedRecordsStep"

import LeadWizardHeader from "./LeadWizardHeader"
import LeadWizardNavigation from "./LeadWizardNavigation"

// Updated to match the exact text from the screenshot
const steps = [
  "Client Classification",
  "Financial Profile",
  "Property Search Criteria",
  "Property for Sale / Rent",
  "Communication & Activity History",
  "Relationships & Linked Records",


]

export default function LeadWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <ClientClassification />
      case 1: return <FinancialProfile />
      case 2: return <PropertySearchCriteria />
      case 3: return <PropertyForSaleRent />
      case 4: return <CommunicationActivity />
      case 5: return <RelationshipsLinkedRecords />
      default: return <ClientClassification />
    }
  }

  return (
    <div className="space-y-6">
      <LeadWizardHeader />

      <LeadWizardNavigation
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      {/* Wrapping the step content in a card/container for better separation */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {renderStep()}
      </div>
    </div>
  )
}