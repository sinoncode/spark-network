export interface ProfileUser {
    id: number | string
    name: string
    email: string
    phone: string | null
    avatar: string | null
}

export interface ProfileResponse {
    success: boolean
    message: string
    data: ProfileUser
}

/**
 * Payload used when updating the profile.
 * We use FormData because avatar can be an image file.
 */
export interface ProfileUpdatePayload {
    name: string
    phone?: string | null
    avatar?: File | null
}

/**
 * Optional: profile form values used in UI.
 */
export interface ProfileFormValues {
    name: string
    email: string
    phone: string
    avatar: string
}