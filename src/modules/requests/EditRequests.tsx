import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import RequestWizard from "./create/RequestWizard"
import { getRequestById } from "@/services/request.service"
import { useRequestCreationStore, type RequestFormData } from "./create/store/requestCreationStore"
import { toast } from "@/lib/toast"

export default function EditRequestsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [initialFormData, setInitialFormData] = useState<RequestFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { reset } = useRequestCreationStore()

  useEffect(() => {
    const fetchRequest = async () => {
      if (!id) {
        toast.error("Request ID is missing")
        navigate("/requests/list")
        return
      }

      try {
        setIsLoading(true)
        const data = await getRequestById(id)

        setInitialFormData({
          first_name: data.identity?.first_name ?? "",
          last_name: data.identity?.last_name ?? "",
          phones: data.contact?.phones ?? "",
          emails: data.contact?.emails ?? "",
          language: data.contact?.language ?? "",
          memo: data.notes?.memo ?? "",
          notes: data.notes?.notes ?? "",
          status: data.status ?? "NEW",
          transaction: data.requirements?.transaction ?? "BUY",
          category: data.requirements?.category ?? "",
          budget_min: data.requirements?.budget_min ?? 0,
          budget_max: data.requirements?.budget_max ?? 0,
          currency: data.requirements?.currency ?? "CHF",
          zip: data.location?.zip ?? "",
          city: data.location?.city ?? "",
          country: data.location?.country ?? "",
          radius: data.location?.radius ?? 0,
          rooms_min: data.requirements?.rooms_min ?? 0,
          rooms_max: data.requirements?.rooms_max ?? 0,
          livable_space_min: data.requirements?.livable_space_min ?? 0,
          livable_space_max: data.requirements?.livable_space_max ?? 0,
          surface_land_min: data.requirements?.surface_land_min ?? 0,
          surface_land_max: data.requirements?.surface_land_max ?? 0,
          minimumPrice: data.requirements?.minimumPrice ?? "",
          maximumPrice: data.requirements?.maximumPrice ?? "",
          minimumBalconies: data.requirements?.minimumBalconies ?? "",
          maximumBalconies: data.requirements?.maximumBalconies ?? "",
          minimumBuiltYear: data.requirements?.minimumBuiltYear ?? "",
          maximumBuiltYear: data.requirements?.maximumBuiltYear ?? "",
        })
      } catch (error) {
        console.error(error)
        toast.error("Unable to load request data")
        navigate("/requests/list")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequest()
  }, [id, navigate])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  if (isLoading) {
    return <div className="mx-auto py-6 text-center">Loading request details…</div>
  }

  return (
    <div className="mx-auto py-6">
      <RequestWizard
        mode="edit"
        requestId={id}
        initialFormData={initialFormData ?? undefined}
      />
    </div>
  )
}
