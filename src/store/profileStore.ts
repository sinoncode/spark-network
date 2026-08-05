import { create } from "zustand"
import { ProfileService } from "@/services/profile.service"
import { toast } from "@/lib/toast"

import type {
    ProfileUser,
    ProfileUpdatePayload,
} from "@/types/profile.types"

interface ProfileStore {
    profile: ProfileUser | null
    loading: boolean
    saving: boolean
    error: string | null

    fetchProfile: () => Promise<void>
    updateProfile: (
    data: ProfileUpdatePayload
) => Promise<boolean>
    clearProfile: () => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: null,
    loading: false,
    saving: false,
    error: null,

    fetchProfile: async () => {
        set({ loading: true, error: null })

        try {
            const response = await ProfileService.getProfile()

            set({
                profile: response.data.data,
            })
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                "Unable to load profile."

            set({ error: message })
            toast.error(message)
        } finally {
            set({ loading: false })
        }
    },

    updateProfile: async (data) => {
        set({ saving: true, error: null })

        try {
            const response = await ProfileService.updateProfile(data)

            set({
                profile: response.data.data,
            })

            toast.success(
                response.data.message || "Profile updated successfully."
            )

            return true
        } catch (error: any) {
            const validationErrors = error.response?.data?.errors

            const message =
                validationErrors?.name?.[0] ||
                validationErrors?.phone?.[0] ||
                validationErrors?.avatar?.[0] ||
                error.response?.data?.message ||
                "Unable to update profile."

            set({ error: message })
            toast.error(message)

            return false
        } finally {
            set({ saving: false })
        }
    },

    clearProfile: () => {
        set({
            profile: null,
            error: null,
        })
    },
}))