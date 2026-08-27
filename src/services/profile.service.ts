import api from "@/api/axios"

export interface ProfileData {
    id: number
    name: string
    email: string
    phone: string | null
    avatar: string | null
}

export interface UpdateProfilePayload {
    name: string
    phone?: string | null
    avatar?: File | null
}

export interface ProfileResponse {
    success: boolean
    message?: string
    data: ProfileData
}

export const ProfileService = {
    getProfile: () => {
        return api.get<ProfileResponse>("/admin/profile")
    },

    updateProfile: (data: UpdateProfilePayload) => {
        const formData = new FormData()

        formData.append("name", data.name)

        if (data.phone) {
            formData.append("phone", data.phone)
        }

        if (data.avatar instanceof File) {
            formData.append("avatar", data.avatar)
        }

        return api.patch<ProfileResponse>("/admin/profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    },
}