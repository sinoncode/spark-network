// ============================================================
// USER TYPES
// ============================================================

/**
 * User roles returned by the API.
 *
 * Keep `string` support because the backend may introduce
 * additional roles in the future.
 */
export type UserRole =
  | "ADMIN"
  | "DRIVER"
  | "USER"
  | "MODERATOR"
  | "FLEET_MANAGER"
  | string;

/**
 * User account status.
 */
export type UserStatus =
  | "active"
  | "suspended"
  | "banned"
  | "inactive"
  | string;

// ============================================================
// COMMON API TYPES
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// ============================================================
// USER LISTING
// GET /admin/users
// ============================================================

/**
 * User returned by:
 *
 * GET /admin/users?page=1&limit=20
 *
 * This is intentionally smaller than UserDetails.
 * 
 * 
 */

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: UserRole;
  xpTotal: number;
  level: number;
  status: UserStatus;
  createdAt: string;

  _count: {
    posts: number;
    postReports: number;
  };
}

export interface UsersMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}




export interface UserListItem {
  id: string;

  username: string;

  displayName: string;

  email: string;

  role: UserRole;

  xpTotal: number;

  level: number;

  status: UserStatus;

  createdAt: string;

  _count: {
    posts: number;

    postReports: number;
  };
}

/**
 * Pagination information returned by the users listing API.
 */
export interface UserListMeta {
  total: number;

  page: number;

  limit: number;

  totalPages?: number;

  [key: string]: unknown;
}

/**
 * Actual data returned inside:
 *
 * response.data.data
 */
export interface UserListData {
  data: UserListItem[];

  meta: UserListMeta;
}

/**
 * Complete response for:
 *
 * GET /admin/users
 */
export type UserListResponse =
  ApiResponse<UserListData>;

// ============================================================
// USER LIST FILTERS
// ============================================================

export interface UserListFilters {
  page?: number;

  limit?: number;

  search?: string;

  role?: UserRole;
}

// ============================================================
// USER POST
// ============================================================

export interface UserPostCount {
  reports: number;

  comments: number;
}

export interface UserPost {
  id: string;

  category: string;

  title: string;

  body: string;

  status: string;

  severityScore: number;

  helpfulCount: number;

  createdAt: string;

  _count: UserPostCount;
}

// ============================================================
// USER XP TRANSACTION
// ============================================================

export interface XpTransaction {
  id: string;

  amount: number;

  source: string;

  description: string;

  createdAt: string;
}

// ============================================================
// USER BADGES
// ============================================================

/**
 * Your current API response shows userBadges as an array,
 * but the exact badge object structure was not included
 * in the response you provided.
 *
 * Therefore, these fields are kept flexible.
 */
export interface UserBadge {
  id: string;

  [key: string]: unknown;
}

// ============================================================
// USER BEHAVIOUR PROFILE
// ============================================================

export interface BehaviourProfile {
  engagementScore: number;

  postFrequency: number;

  anomalyFlag: boolean;

  xpMultiplier: number;

  lastLoginAt: string | null;
}

// ============================================================
// USER DETAILS
// GET /admin/users/:targetUserId
// ============================================================

export interface UserDetailsCount {
  posts: number;

  postReports: number;

  followers: number;

  following: number;
}

export interface UserDetails {
  id: string;

  username: string;

  displayName: string;

  email: string;

  role: UserRole;

  xpTotal: number;

  level: number;

  status: UserStatus;

  anonymousPreference: boolean;

  bio: string | null;

  profilePictureUrl: string | null;

  createdAt: string;

  updatedAt: string;

  posts: UserPost[];

  postReports: unknown[];

  xpTransactions: XpTransaction[];

  userBadges: UserBadge[];

  behaviourProfile: BehaviourProfile;

  _count: UserDetailsCount;
}

/**
 * Complete response for:
 *
 * GET /admin/users/:targetUserId
 */
export type UserDetailsResponse =
  ApiResponse<UserDetails>;

// ============================================================
// USER UPDATE
// PATCH /admin/users/:targetUserId
// ============================================================

/**
 * We should NOT invent the PATCH request body yet because
 * you have provided the PATCH responses but not the exact
 * request bodies used by your backend.
 *
 * These types can be made stricter once you provide the
 * actual Postman request bodies.
 */

export interface SuspendUserPayload {
  [key: string]: unknown;
}

export interface BanUserPayload {
  [key: string]: unknown;
}

export interface ReactivateUserPayload {
  [key: string]: unknown;
}

export interface ChangeUserRolePayload {
  role: UserRole;
}

export interface SetUserXpPayload {
  xpTotal: number;
}

/**
 * Generic update response.
 *
 * The backend PATCH response only returns a partial user:
 *
 * id
 * username
 * displayName
 * email
 * role
 * status
 * xpTotal
 * level
 */
export interface UserUpdateData {
  id: string;

  username: string;

  displayName: string;

  email: string;

  role: UserRole;

  status: UserStatus;

  xpTotal: number;

  level: number;
}

export type UserUpdateResponse =
  ApiResponse<UserUpdateData>;