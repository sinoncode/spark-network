import { useQuery } from "@tanstack/react-query"
import { ProfileService } from "@/services/profile.service"

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await ProfileService.getProfile()
      return response.data.data
    },

    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })
}