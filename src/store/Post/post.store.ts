import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { postService } from "./../../services/Post/post.service"
import type { Post, PostsFilter } from "@/types/Post/post"

interface PostsState {
  posts: Post[]
  total: number
  totalPages: number
  isLoading: boolean
  isFetching: boolean
  error: string | null
  filters: Required<Pick<PostsFilter, "page" | "limit" | "sortBy" | "sortOrder">> &
    Omit<PostsFilter, "page" | "limit" | "sortBy" | "sortOrder">
  setFilters: (filters: Partial<PostsFilter>) => void
  fetchPosts: () => Promise<void>
  deletePost: (id: string) => Promise<void>
  approvePost: (id: string) => Promise<void>
  rejectPost: (id: string) => Promise<void>
  resetFilters: () => void
  refresh: () => Promise<void>
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20
const DEFAULT_SORT_BY = "createdAt" as const
const DEFAULT_SORT_ORDER = "desc" as const

export const usePostsStore = create<PostsState>()(
  devtools(
    (set, get) => ({
      posts: [],
      total: 0,
      totalPages: 0,
      isLoading: false,
      isFetching: false,
      error: null,
      filters: {
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
        sortBy: DEFAULT_SORT_BY,
        sortOrder: DEFAULT_SORT_ORDER,
        status: undefined,
        category: undefined,
        search: undefined,
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters, page: newFilters.page ?? 1 },
        }))
        get().fetchPosts()
      },

      fetchPosts: async () => {
        const { filters } = get()
        const isInitialLoad = get().posts.length === 0

        set({ isLoading: isInitialLoad, isFetching: !isInitialLoad, error: null })

        try {
          const result = await postService.getPosts(filters)
          const total = result.meta.total ?? result.data.length
          const totalPages = result.meta.totalPages ?? Math.max(1, Math.ceil(total / filters.limit))

          set({ posts: result.data, total, totalPages, isLoading: false, isFetching: false })
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Failed to fetch posts"

          set({ error: message, isLoading: false, isFetching: false })
        }
      },

      deletePost: async (id: string) => {
        try {
          await postService.deletePost(id)
          set((state) => ({
            posts: state.posts.filter((p) => p.id !== id),
            total: state.total - 1,
          }))
        } catch (err: unknown) {
          set({ error: err instanceof Error ? err.message : "Failed to delete post" })
          throw err
        }
      },

      approvePost: async (id: string) => {
        try {
          const updated = await postService.approvePost(id)
          set((state) => ({
            posts: state.posts.map((p) => (p.id === id ? updated.data : p)),
          }))
        } catch (err: unknown) {
          set({ error: err instanceof Error ? err.message : "Failed to approve post" })
          throw err
        }
      },

      rejectPost: async (id: string) => {
        try {
          const updated = await postService.rejectPost(id)
          set((state) => ({
            posts: state.posts.map((p) => (p.id === id ? updated.data : p)),
          }))
        } catch (err: unknown) {
          set({ error: err instanceof Error ? err.message : "Failed to reject post" })
          throw err
        }
      },

      resetFilters: () => {
        set({
          filters: {
            page: DEFAULT_PAGE,
            limit: DEFAULT_LIMIT,
            sortBy: DEFAULT_SORT_BY,
            sortOrder: DEFAULT_SORT_ORDER,
            status: undefined,
            category: undefined,
            search: undefined,
          },
        })
        get().fetchPosts()
      },

      refresh: async () => {
        await get().fetchPosts()
      },
    }),
    { name: "PostsStore" }
  )
)