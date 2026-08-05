import { useState } from "react"

import GeneralStep from "./steps/GeneralStep"
import CharacteristicsStep from "./steps/CharacteristicsStep"
import PricingStep from "./steps/PricingStep"
import DescriptionStep from "./steps/DescriptionStep"
import MediaStep from "./steps/MediaStep"
import PublicationStep from "./steps/PublicationStep"
import MatchingStep from "./steps/MatchingStep"
import ProposedStep from "./steps/ProposedStep"

import PropertyWizardHeader from "./PropertyWizardHeader"
import PropertyWizardNavigation from "./PropertyWizardNavigation"

// Updated to match the exact text from the screenshot
const steps = [
  "General",
  "Characteristics", 
  "Price",
  "Description",
  "Image",
  "Publication",
  "Additional Feilds",
  "Proposed",
]

export default function PropertyWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <GeneralStep />
      case 1: return <CharacteristicsStep />
      case 2: return <PricingStep />
      case 3: return <DescriptionStep />
      case 4: return <MediaStep />
      case 5: return <PublicationStep />
      case 6: return <MatchingStep />
      case 7: return <ProposedStep />
      default: return <GeneralStep />
    }
  }

  return (
    <div className="space-y-6">
      <PropertyWizardHeader />

      <PropertyWizardNavigation
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