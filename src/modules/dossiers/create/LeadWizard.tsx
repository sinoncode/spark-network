import { useState } from "react"

import GeneralStep from "./steps/GeneralStep"
import CharacteristicsStep from "./steps/CharacteristicsStep"

import LeadWizardHeader from "./LeadWizardHeader"
import LeadWizardNavigation from "./LeadWizardNavigation"

// Updated to match the exact text from the screenshot
const steps = [
  "Property Details",
  "Client Details",
]

export default function LeadWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <GeneralStep />
      case 1: return <CharacteristicsStep />
      default: return <GeneralStep />
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