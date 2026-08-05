import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

import workInProgressGif from "@/assets/gifs/work-in-progress.gif" // <-- Change to your gif path

export default function Documentation() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight">
          Work in Progress
        </h1>

        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          We're building something amazing for you.
          This page is currently under development and will be available soon.
        </p>

        {/* GIF */}
        <div className="my-10">
          <img
            src={workInProgressGif}
            alt="Work in Progress"
            className="mx-auto w-full max-w-md object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          🚧 Stay tuned! New features are coming soon.
        </p>

      </div>
    </div>
  )
}