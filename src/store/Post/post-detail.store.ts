import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { postService } from "@/services/Post/post.service"
import type { Post, PostComment, UpdatePostPayload } from "@/types/Post/post"

interface PostDetailState {
  // Data
  post: Post | null
  comments: PostComment[]
  commentsMeta: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
  }

  // UI State
  isLoading: boolean
  isSaving: boolean
  isDeleting: boolean
  commentsLoading: boolean
  error: string | null
  saveError: string | null

  // Edit form state
  editForm: {
    title: string
    body: string
    category: Post["category"]
    status: Post["status"]
    visibility: Post["visibility"]
    severityScore: number
    additionalDetails: string
  }
  hasChanges: boolean

  // Actions
  fetchPost: (id: string) => Promise<void>
  fetchComments: (postId: string, page?: number) => Promise<void>
  updateField: (field: keyof PostDetailState["editForm"], value: any) => void
  savePost: (id: string) => Promise<void>
  deletePost: (id: string, reason?: string) => Promise<void>
  approvePost: (id: string) => Promise<void>
  rejectPost: (id: string) => Promise<void>
  deleteComment: (commentId: string) => Promise<void>
  resetForm: () => void
}

export const usePostDetailStore = create<PostDetailState>()(
  devtools(
    (set, get) => ({
      post: null,
      comments: [],
      commentsMeta: { total: 0, page: 1, limit: 20, totalPages: 0, hasNextPage: false },
      isLoading: false,
      isSaving: false,
      isDeleting: false,
      commentsLoading: false,
      error: null,
      saveError: null,
      editForm: {
        title: "",
        body: "",
        category: "CLOSE_CALL",
        status: "APPROVED",
        visibility: "PUBLIC",
        severityScore: 0,
        additionalDetails: "",
      },
      hasChanges: false,

      fetchPost: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await postService.getPostById(id)
          const post = response.data
          set({
            post,
            editForm: {
              title: post.title,
              body: post.body,
              category: post.category,
              status: post.status,
              visibility: post.visibility,
              severityScore: post.severityScore,
              additionalDetails: post.additionalDetails || "",
            },
            hasChanges: false,
            isLoading: false,
          })
        } catch (err: any) {
          set({
            error: err.response?.data?.message || err.message || "Failed to load post",
            isLoading: false,
          })
        }
      },

      fetchComments: async (postId: string, page = 1) => {
        set({ commentsLoading: true })
        try {
          const response = await postService.getComments(postId, page)
          set({
            comments: page === 1 ? response.data : [...get().comments, ...response.data],
            commentsMeta: response.meta,
            commentsLoading: false,
          })
        } catch (err: any) {
          set({ commentsLoading: false })
        }
      },

      updateField: (field, value) => {
        set((state) => {
          const newForm = { ...state.editForm, [field]: value }
          const post = state.post
          const hasChanges = post
            ? newForm.title !== post.title ||
              newForm.body !== post.body ||
              newForm.category !== post.category ||
              newForm.status !== post.status ||
              newForm.visibility !== post.visibility ||
              newForm.severityScore !== post.severityScore ||
              newForm.additionalDetails !== (post.additionalDetails || "")
            : false
          return { editForm: newForm, hasChanges }
        })
      },

      savePost: async (id: string) => {
        const { editForm } = get()
        set({ isSaving: true, saveError: null })
        try {
          const payload: UpdatePostPayload = {
            title: editForm.title,
            body: editForm.body,
            category: editForm.category,
            status: editForm.status,
            visibility: editForm.visibility,
            severityScore: editForm.severityScore,
            additionalDetails: editForm.additionalDetails,
          }
          const response = await postService.updatePost(id, payload)
          set({ post: response.data, hasChanges: false, isSaving: false })
        } catch (err: any) {
          set({
            saveError: err.response?.data?.message || err.message || "Failed to save",
            isSaving: false,
          })
          throw err
        }
      },

      deletePost: async (id: string, reason?: string) => {
        set({ isDeleting: true })
        try {
          await postService.deletePost(id, reason)
          set({ isDeleting: false })
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Failed to delete post",
            isDeleting: false,
          })
          throw err
        }
      },

      approvePost: async (id: string) => {
        try {
          const response = await postService.approvePost(id)
          set({ post: response.data, editForm: { ...get().editForm, status: "APPROVED" } })
        } catch (err: any) {
          set({ error: err.response?.data?.message || "Failed to approve" })
          throw err
        }
      },

      rejectPost: async (id: string) => {
        try {
          const response = await postService.rejectPost(id)
          set({ post: response.data, editForm: { ...get().editForm, status: "REJECTED" } })
        } catch (err: any) {
          set({ error: err.response?.data?.message || "Failed to reject" })
          throw err
        }
      },

      deleteComment: async (commentId: string) => {
        try {
          await postService.deleteComment(commentId)
          set((state) => ({
            comments: state.comments.filter((c) => c.id !== commentId),
            commentsMeta: { ...state.commentsMeta, total: state.commentsMeta.total - 1 },
          }))
        } catch (err: any) {
          set({ error: err.response?.data?.message || "Failed to delete comment" })
          throw err
        }
      },

      resetForm: () => {
        const post = get().post
        if (post) {
          set({
            editForm: {
              title: post.title,
              body: post.body,
              category: post.category,
              status: post.status,
              visibility: post.visibility,
              severityScore: post.severityScore,
              additionalDetails: post.additionalDetails || "",
            },
            hasChanges: false,
            saveError: null,
          })
        }
      },
    }),
    { name: "PostDetailStore" }
  )
)
