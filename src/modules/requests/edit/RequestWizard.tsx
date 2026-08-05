import { useState } from "react"

// ── FIX 1: Correct import paths (adjust based on your actual folder structure) ──
// If RequestWizard is in: src/app/requests/edit/RequestWizard.tsx
// Then steps are likely in: src/app/requests/create/steps/ or src/components/requests/steps/
import  ContactStep  from "../../requests/create/steps/ContactStep"
import RequestsStep from "../../requests/create/steps/RequestsStep"
import CallsStep from "../../requests/create/steps/CallStep"
import MailStep from "../../requests/create/steps/MailStep"

// ── FIX 2: If the above doesn't work, try these common alternatives ──
// import { ContactStep } from "@/components/requests/steps/ContactStep"
// import { ContactStep } from "../steps/ContactStep"

import RequestWizardHeader from "./RequestWizardHeader"
import RequestWizardNavigation from "./RequestWizardNavigation" // ← FIX 3: Same folder

const steps = ["Contacts", "Requests & Search", "Calls", "Mails"]

// ── FIX 4: Shared form state so data persists across steps ──
interface WizardData {
  contacts?: any
  requests?: any
  calls?: any
  mails?: any
}

export default function RequestWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<WizardData>({})

  const updateStepData = (stepKey: keyof WizardData, data: any) => {
    setWizardData(prev => ({ ...prev, [stepKey]: data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ContactStep
            data={wizardData.contacts}
            onChange={(data) => updateStepData("contacts", data)}
          />
        )
      case 1:
        return (
          <RequestsStep
            data={wizardData.requests}
            onChange={(data) => updateStepData("requests", data)}
          />
        )
      case 2:
        return (
          <CallsStep
            data={wizardData.calls}
            onChange={(data) => updateStepData("calls", data)}
          />
        )
      case 3:
        return (
          <MailStep
            data={wizardData.mails}
            onChange={(data) => updateStepData("mails", data)}
          />
        )
      default:
        return <ContactStep data={wizardData.contacts} onChange={(data) => updateStepData("contacts", data)} />
    }
  }

  // ── FIX 5: Error fallback so you know WHICH step crashes ──
  const [error, setError] = useState<string | null>(null)

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-red-600 font-bold">Error in Step {currentStep + 1}</h2>
        <p className="text-muted-foreground">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
          onClick={() => setError(null)}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RequestWizardHeader />

      <RequestWizardNavigation
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {/* ── FIX 6: Wrap in error boundary to catch step crashes ── */}
        <StepErrorBoundary onError={(err) => setError(err.message)}>
          {renderStep()}
        </StepErrorBoundary>
      </div>
    </div>
  )
}

// ── FIX 7: Simple error boundary to catch step-level crashes ──
import { Component, ReactNode } from "react"

class StepErrorBoundary extends Component<
  { children: ReactNode; onError: (err: Error) => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    this.props.onError(error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}