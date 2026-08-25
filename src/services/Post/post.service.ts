import api from "@/api/axios"
import type {
  Post, PostsFilter, PostsApiResponse, PostsPage, PostsListResponse,
  ApiResponse,
  UpdatePostPayload,
  CommentsResponse,
} from "@/types/Post/post"

/**
 * Posts Service Layer
 * Handles all API communication for posts
 */
export const postService = {
  // ─── LIST ─────────────────────────────────────
  async getPosts(filters: PostsFilter): Promise<PostsListResponse> {
    const params = new URLSearchParams()
    if (filters.page) params.append("page", String(filters.page))
    if (filters.limit) params.append("limit", String(filters.limit))
    if (filters.status) params.append("status", filters.status)
    if (filters.category) params.append("category", filters.category)
    if (filters.search?.trim()) params.append("search", filters.search.trim())
    if (filters.sortBy) {
      params.append("sortBy", filters.sortBy)
      params.append("sortOrder", filters.sortOrder || "desc")
    }

    const { data } = await api.get<ApiResponse<PostsListResponse>>(`/admin/posts?${params.toString()}`)
    return data.data
  },

  // ─── DETAIL ───────────────────────────────────
  async getPostById(id: string): Promise<ApiResponse<Post>> {
    const { data } = await api.get<ApiResponse<Post>>(`/admin/posts/${id}`)
    return data
  },

  // ─── UPDATE ───────────────────────────────────
  async updatePost(id: string, payload: UpdatePostPayload): Promise<ApiResponse<Post>> {
    const { data } = await api.patch<ApiResponse<Post>>(`/admin/posts/${id}`, payload)
    return data
  },

  // ─── DELETE ───────────────────────────────────
  async deletePost(id: string, reason?: string): Promise<ApiResponse<{ deleted: boolean; postId: string }>> {
    const url = reason ? `/admin/posts/${id}?reason=${encodeURIComponent(reason)}` : `/admin/posts/${id}`
    const { data } = await api.delete<ApiResponse<{ deleted: boolean; postId: string }>>(url)
    return data
  },

  // ─── STATUS ACTIONS ───────────────────────────
  async approvePost(id: string): Promise<ApiResponse<Post>> {
    const { data } = await api.patch<ApiResponse<Post>>(`/admin/posts/${id}/approve`)
    return data
  },

  async rejectPost(id: string): Promise<ApiResponse<Post>> {
    const { data } = await api.patch<ApiResponse<Post>>(`/admin/posts/${id}/reject`)
    return data
  },

  // ─── COMMENTS ─────────────────────────────────
  async getComments(postId: string, page = 1, limit = 20): Promise<CommentsResponse> {
    const { data } = await api.get<ApiResponse<CommentsResponse>>(
      `/admin/posts/${postId}/comments?page=${page}&limit=${limit}`
    )
    return data.data
  },

  async deleteComment(commentId: string): Promise<void> {
    await api.delete(`/admin/comments/${commentId}`)
  },
}