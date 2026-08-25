export type PostStatus = "APPROVED" | "PENDING" | "REJECTED" | "REMOVED" | "FLAGGED"
export type PostCategory = "CLOSE_CALL" | "HAZARD" | "NEAR_MISS" | "INCIDENT" | "TIP"
export type PostVisibility = "PUBLIC" | "PRIVATE" | "COMMUNITY_ONLY"
export type ExperienceType = "FELT_RUSHED" | "DISTRACTED" | "FATIGUED" | "UNFAMILIAR_ROAD" | "WEATHER_ISSUE" | "OTHER"

export interface PostUser {
  id: string
  username: string
  displayName: string
  email: string
  role: "DRIVER" | "ADMIN" | "MODERATOR"
  level?: number
}

export interface PostMedia {
  id: string
  postId: string
  url: string
  mimeType: string
  sortOrder: number
  createdAt: string
}

export interface PostComment {
  id: string
  postId: string
  userId: string
  parentCommentId: string | null
  body: string
  isAnonymous: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
  user: PostUser
  replies: PostComment[]
  _count: { replies: number }
}

export interface CommentsResponse {
  data: PostComment[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
export interface Post {
  id: string
  userId: string
  category: PostCategory
  title: string
  body: string
  experience: ExperienceType[]
  additionalDetails: string | null
  happenedAt: string
  image?: string[]
  media: PostMedia[]
  latitude: number | null
  longitude: number | null
  locationLabel: string
  visibility: PostVisibility
  isAnonymous: boolean
  helpfulCount: number
  commentCount: number
  severityScore: number
  trendingScore: number
  status: PostStatus
  communityId: string | null
  aiModerationFlag: boolean
  aiModerationReason: string | null
  createdAt: string
  updatedAt: string
  repostOfPostId: string | null
  shareCount: number
  repostCount: number
  user: PostUser
  reports: unknown[]
  _count: {
    comments: number
    helpfulMarks: number
    reports: number
  }
}

export interface PostsPage {
  posts: Post[]
  total?: number
  totalPages?: number
}

export type PostsApiResponse = Post[] | {
  data: Post[] | {
    posts?: Post[]
    data?: Post[]
    total?: number
    totalPages?: number
    meta?: {
      total?: number
      totalPages?: number
    }
  }
  posts?: Post[]
  total?: number
  totalPages?: number
  meta?: {
    total?: number
    totalPages?: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface PostsListResponse {
  data: Post[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface PostsFilter {
  page?: number
  limit?: number
  status?: PostStatus
  category?: PostCategory
  search?: string
  sortBy?: "createdAt" | "severityScore" | "trendingScore" | "helpfulCount"
  sortOrder?: "asc" | "desc"
}

export interface UpdatePostPayload {
  title?: string
  body?: string
  category?: PostCategory
  status?: PostStatus
  visibility?: PostVisibility
  severityScore?: number
  additionalDetails?: string
}