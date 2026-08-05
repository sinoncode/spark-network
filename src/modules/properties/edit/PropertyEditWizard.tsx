import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { usePropertyCreationStore } from "../create/store/propertyCreationStore"
import { usePropertyStore } from "@/store/propertyStore"

import PropertyEditWizardHeader from "./PropertyEditWizardHeader"
import PropertyWizardNavigation from "../create/PropertyWizardNavigation"

import GeneralStep from "../create/steps/GeneralStep"
import CharacteristicsStep from "../create/steps/CharacteristicsStep"
import PricingStep from "../create/steps/PricingStep"
import DescriptionStep from "../create/steps/DescriptionStep"
import MediaStep from "../create/steps/MediaStep"
import PublicationStep from "../create/steps/PublicationStep"
import MatchingStep from "../create/steps/MatchingStep"
import ProposedStep from "../create/steps/ProposedStep"

const WIZARD_STEPS = [
  "General Information",
  "Characteristics",
  "Pricing & Strategy",
  "Description",
  "Media & Documents",
  "Publication",
  "AI Matching",
  "Proposed Buyers",
]

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 30 : -30,
    opacity: 0,
    scale: 0.98,
  }),
}

export default function PropertyEditWizard() {
  const { id } = useParams<{ id: string }>()
  const propertyId = Number(id)

  const { fetchPropertyById, selectedProperty, detailsLoading } = usePropertyStore()
  const { loadFromProperty, reset } = usePropertyCreationStore()

  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  // 1. Fetch property details on mount
  useEffect(() => {
    if (propertyId) {
      fetchPropertyById(propertyId)
    }
    // Cleanup on unmount
    return () => {
      reset()
    }
  }, [propertyId, fetchPropertyById, reset])

  // 2. Hydrate the creation store once the property is loaded
  useEffect(() => {
    if (selectedProperty && selectedProperty.id === propertyId) {
      loadFromProperty(selectedProperty as any)
      setIsHydrated(true)
    }
  }, [selectedProperty, propertyId, loadFromProperty])

  // Navigation handlers
  const handleStepChange = (newStep: number) => {
    setDirection(newStep > currentStep ? 1 : -1)
    setCurrentStep(newStep)
  }

  // Render current step component
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GeneralStep />
      case 1:
        return <CharacteristicsStep />
      case 2:
        return <PricingStep />
      case 3:
        return <DescriptionStep />
      case 4:
        return <MediaStep />
      case 5:
        return <PublicationStep />
      case 6:
        return <MatchingStep />
      case 7:
        return <ProposedStep />
      default:
        return null
    }
  }

  // Loading state
  if (detailsLoading || !isHydrated) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-muted-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm font-medium">Loading property details...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-full space-y-8 pb-12">
      <PropertyEditWizardHeader propertyId={propertyId} />

      <PropertyWizardNavigation
        steps={WIZARD_STEPS}
        currentStep={currentStep}
        onStepChange={handleStepChange}
      />

      <div className="relative mt-8 min-h-[600px] overflow-visible">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
