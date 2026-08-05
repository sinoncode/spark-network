import { cn } from "@/lib/utils"
import {
  Building2,
  ShieldCheck,
  CircleDollarSign,
  ListTodo,
  Image as ImageIcon,
  Megaphone,
  Network,
  Handshake
} from "lucide-react"

interface Props {
  steps: string[]
  currentStep: number
  onStepChange: (step: number) => void
}

// Map icons dynamically based on the step index
const getStepIcon = (index: number) => {
  const icons = [
    Building2,        // General
    ShieldCheck,      // Characteristics
    CircleDollarSign, // Price
    ListTodo,         // Description
    ImageIcon,        // Image
    Megaphone,        // Publication
    Network,          // Matching
    Handshake,        // Proposed
  ]
  const Icon = icons[index] || Building2
  return <Icon className="h-4 w-4 shrink-0" />
}

export default function RequestWizardNavigation({
  steps,
  currentStep,
  onStepChange,
}: Props) {
  return (
    <div className="w-fit overflow-x-auto pb-2 scrollbar-hide">
      <div
        className="
          flex min-w-fit justify-start items-center gap-1
          rounded-full
          bg-[linear-gradient(90deg,_#1f6ea9_0%,_#155789_40%,_#0a2f4f_70%,_#040404_100%)]
          shadow-[rgba(18, 26, 133, 0.36)_0px_7px_29px_0px]
          p-1.5
          
          shadow-md
        "
      >
        {steps.map((step, index) => {
          const isActive = currentStep === index;

          return (
            <button
              key={step}
              onClick={() => onStepChange(index)}
              className={cn(
                `
    group
    relative
    flex
    items-center
    gap-2
    rounded-full
    px-5
    py-2.5
    font-medium
    transition-all
    duration-500
    ease-out
    text-base
    whitespace-nowrap
    `,
                index !== 0 &&
                index !== steps.length - 1 &&
                "mx-2", // Apply horizontal margin only to middle buttons
                isActive
                  ? "bg-white text-slate-900 shadow-sm scale-[1.02]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <span
                className={cn(
                  "transition-colors duration-300",
                  isActive
                    ? "text-slate-900"
                    : "text-white/80 group-hover:text-white"
                )}
              >
                {getStepIcon(index)}
              </span>

              <span>{step}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}