"use client"

import { useEffect, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"
import { userService } from "@/services/Users/user.service"
import type { UserDetails as UserDetailsType } from "@/types/Users/user"
import { format, formatDistanceToNow } from "date-fns"
import {
  ArrowLeft,
  Mail,
  Shield,
  Activity,
  Award,
  Clock,
  Copy,
  Check,
  UserCheck,
  Eye,
  EyeOff,
  Calendar,
  Fingerprint,
  UserCog,
  BarChart3,
  Zap,
  AlertTriangle,
  Gauge,
  FileText,
  ThumbsUp,
  MessageCircle,
  Flag,
  Star,
  Gift,
  TrendingUp,
  Trophy,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Ban,
  Trash2,
  Send,
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ═══════════════════════════════════════════════════════════════
// CONFIGS & HELPERS
// ═══════════════════════════════════════════════════════════════
const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "text-emerald-400" },
  inactive: { label: "Inactive", color: "text-slate-400" },
  suspended: { label: "Suspended", color: "text-amber-400" },
  banned: { label: "Banned", color: "text-rose-400" },
}

const ROLE_GRADIENTS: Record<string, string> = {
DRIVER: "gradient-orange",
  ADMIN: "gradient-red",
  MODERATOR: "gradient-deep-orange",
  USER: "gradient-warm",
  FLEET_MANAGER: "gradient-fire",
}

const POST_STATUS: Record<string, { bg: string; text: string }> = {
  APPROVED: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  PENDING: { bg: "bg-amber-500/10", text: "text-amber-400" },
  REJECTED: { bg: "bg-red-500/10", text: "text-red-400" },
  REMOVED: { bg: "bg-slate-500/10", text: "text-slate-400" },
  FLAGGED: { bg: "bg-rose-500/10", text: "text-rose-400" },
}

export const USER_ROLES = [
  { value: "ADMIN", label: "Admin" },
  { value: "DRIVER", label: "Driver" },
  { value: "USER", label: "User" },
  { value: "FLEET_MANAGER", label: "Fleet Manager" },
  { value: "MODERATOR", label: "Moderator" },
] as const

const CATEGORY_ICON: Record<string, string> = {
  CLOSE_CALL: "⚠️",
  HAZARD: "🚨",
  NEAR_MISS: "😰",
  INCIDENT: "💥",
  TIP: "💡",
}

const XP_SOURCE: Record<string, { icon: React.ReactNode; color: string }> = {
  post_create: { icon: <Gift className="h-4 w-4" />, color: "from-emerald-500 to-green-500" },
  post_helpful: { icon: <TrendingUp className="h-4 w-4" />, color: "from-blue-500 to-indigo-500" },
  daily_login: { icon: <Trophy className="h-4 w-4" />, color: "from-amber-500 to-orange-500" },
  comment_create: { icon: <Zap className="h-4 w-4" />, color: "from-violet-500 to-purple-500" },
  default: { icon: <Star className="h-4 w-4" />, color: "from-slate-500 to-zinc-500" },
}

const BADGE_PRESETS = [
  { name: "First Post", icon: "📝" },
  { name: "Helpful", icon: "🤝" },
  { name: "Trending", icon: "🔥" },
  { name: "Veteran", icon: "⭐" },
  { name: "Reporter", icon: "🚨" },
  { name: "Moderator", icon: "🛡️" },
]

const safeFormat = (dateStr: string | null | undefined, formatStr: string, fallback = "N/A") => {
  if (!dateStr) return fallback
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? fallback : format(d, formatStr)
}

const safeFormatDistance = (dateStr: string | null | undefined, fallback = "recently") => {
  if (!dateStr) return fallback
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? fallback : formatDistanceToNow(d, { addSuffix: true })
}

// ═══════════════════════════════════════════════════════════════
// SKELETON
// ═══════════════════════════════════════════════════════════════
function ProfileSkeleton() {
  return (
    <div className="min-h-screen animate-pulse w-full">
      <div className="h-48 md:h-64 rounded-b-3xl bg-gradient-to-br from-slate-700 to-slate-800" />
      <div className="mx-4 md:mx-8 -mt-20 md:-mt-24 relative z-10">
        <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-7">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
            <Skeleton className="h-20 w-20 md:h-24 md:w-24 rounded-2xl" />
            <div className="flex-1 space-y-3 text-center md:text-left w-full">
              <Skeleton className="h-6 w-48 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
              <div className="flex gap-4 justify-center md:justify-start">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
            <Skeleton className="h-20 w-24 rounded-2xl" />
          </div>
        </div>
      </div>
      <div className="max-w-full mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PROFILE HEADER
// ═══════════════════════════════════════════════════════════════
function ProfileHeader({ user }: { user: UserDetailsType }) {
  const status = STATUS_CONFIG[user.status] || STATUS_CONFIG.active
  const gradient = ROLE_GRADIENTS[user.role] || ROLE_GRADIENTS.DRIVER
  const initials = (user.displayName || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const navigate = useNavigate()

  return (
    <div className="relative mb-24 md:mb-28">
      {/* Cover Banner */}
      <div className="relative h-48 md:h-64 rounded-b-3xl overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 dark-orange-preview" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="glass-card gap-2 text-white/90 hover:text-white hover:bg-white/10 rounded-xl backdrop-blur-xl"
            onClick={() => navigate("/users/list")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className={`text-xs font-bold ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="absolute -bottom-20 md:-bottom-24 left-4 right-4 md:left-8 md:right-8">
        <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-7">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
  className={`w-[140px] h-[140px] md:w-[140px] md:h-[140px] rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-lg ring-4 ring-background overflow-hidden`}
>
  {user.profilePictureUrl ? (
    <img
      src={user.profilePictureUrl}
      alt={user.displayName || "User profile"}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
    />
  ) : (
    initials
  )}
</div>
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-lg bg-background flex items-center justify-center border-2 border-background">
                <Shield className="h-3.5 w-3.5 text-indigo-400" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left min-w-0">
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-3 mb-3">
                <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
                  {user.displayName}
                </h1>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 font-bold text-[12px] uppercase tracking-wider px-2.5 py-0.5"
                >
                  {user.role}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                @{user.username}
              </p>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                 {user.email}
                 </p>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6 md:gap-8">
                {[
                  { label: "Posts", value: user._count?.posts ?? 0 },
                  { label: "Followers", value: user._count?.followers ?? 0 },
                  { label: "Following", value: user._count?.following ?? 0 },
                ].map((stat) => (
                  <div key={stat.label} className="text-center group cursor-default">
                    <div className="text-lg md:text-xl font-black text-foreground group-hover:scale-110 transition-transform duration-200">
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Badge */}
            <div className="flex-shrink-0 glass-card rounded-2xl p-4 md:p-5 text-center min-w-[140px] border-amber-500/20">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Award className="h-8 w-8 text-amber-400" />
                <span className="text-2xl md:text-3xl font-black text-amber-400">{user.xpTotal}</span>
              </div>
              <div className="text-[15px] font-bold text-muted-foreground uppercase tracking-widest">
                XP Total
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Level {user.level}
              </div>
            </div>
          </div>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Joined {safeFormat(user.createdAt, "MMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              Last active {safeFormat(user.behaviourProfile?.lastLoginAt, "MMM d, h:mm a")}
            </span>
            {user.anonymousPreference && (
              <span className="flex items-center gap-1.5 text-indigo-400">
                <UserCheck className="h-3.5 w-3.5" />
                Anonymous enabled
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// BEHAVIOUR CARD
// ═══════════════════════════════════════════════════════════════
function BehaviourCard({ profile }: { profile: UserDetailsType["behaviourProfile"] }) {
  const cards = [
    {
      label: "Engagement",
      value: profile?.engagementScore ?? 0,
      suffix: "",
      icon: BarChart3,
      gradient: "from-blue-500 to-indigo-500",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      max: 100,
    },
    {
      label: "Post Freq",
      value: profile?.postFrequency ?? 0,
      suffix: "/day",
      icon: Calendar,
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      max: 5,
    },
    {
      label: "XP Multiplier",
      value: profile?.xpMultiplier ?? 1,
      suffix: "x",
      icon: Zap,
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      max: 3,
    },
    {
      label: "Anomaly",
      value: profile?.anomalyFlag ? 1 : 0,
      suffix: "",
      icon: AlertTriangle,
      gradient: profile?.anomalyFlag ? "from-rose-500 to-red-500" : "from-emerald-500 to-green-500",
      bg: profile?.anomalyFlag ? "bg-rose-500/10" : "bg-emerald-500/10",
      text: profile?.anomalyFlag ? "text-rose-400" : "text-emerald-400",
      max: 1,
      isBoolean: true,
      boolLabel: profile?.anomalyFlag ? "Flagged" : "Clean",
    },
  ]

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-5 md:mb-6">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Gauge className="h-4.5 w-4.5 text-white" />
        </div>
        <h2 className="text-base md:text-lg font-black text-foreground">Behaviour Profile</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass-card rounded-xl p-3 md:p-4 hover:scale-[1.02] transition-all duration-300 cursor-default group"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`h-7 w-7 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`h-3.5 w-3.5 ${card.text}`} />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {card.label}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-xl md:text-2xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                {card.isBoolean ? card.boolLabel : card.value}
              </span>
              {!card.isBoolean && <span className="text-xs font-semibold text-muted-foreground">{card.suffix}</span>}
            </div>

            {!card.isBoolean && (
              <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${card.gradient} transition-all duration-1000 ease-out`}
                  style={{ width: `${Math.min((Number(card.value) / card.max) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// POSTS CARD
// ═══════════════════════════════════════════════════════════════
function PostsCard({ posts }: { posts: UserDetailsType["posts"] }) {
  const navigate = useNavigate()
  const postList = posts || []

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <FileText className="h-4.5 w-4.5 text-white" />
          </div>
          <h2 className="text-base md:text-lg font-black text-foreground">Posts</h2>
        </div>
        <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold text-[10px]">
          {postList.length} Post{postList.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="space-y-3">
        {postList.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No posts found for this user.</p>
        ) : (
          postList.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}/edit`)}
              className="glass-card rounded-xl p-4 flex gap-4 items-start hover:scale-[1.01] hover:border-primary/20 transition-all duration-300 group cursor-pointer"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg text-lg">
                {CATEGORY_ICON[post.category] || "📝"}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0 ${POST_STATUS[post.status]?.bg || "bg-slate-500/10"} ${POST_STATUS[post.status]?.text || "text-slate-400"} border-current`}>
                    {post.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2.5 line-clamp-1">{post.body}</p>

                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {post.helpfulCount}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post._count?.comments ?? 0}</span>
                  <span className="flex items-center gap-1"><Flag className="h-3 w-3" /> {post._count?.reports ?? 0}</span>
                  <span className="ml-auto text-[10px]">{safeFormatDistance(post.createdAt)}</span>
                </div>
              </div>

              {/* Severity Donut */}
              <div className="flex-shrink-0 text-center hidden sm:block">
                <div className="relative h-10 w-10">
                  <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/20" />
                    <circle
                      cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3"
                      strokeDasharray={`${post.severityScore * 94} 94`}
                      className={post.severityScore >= 0.7 ? "text-red-400" : post.severityScore >= 0.4 ? "text-amber-400" : "text-emerald-400"}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">
                    {(post.severityScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// XP CARD
// ═══════════════════════════════════════════════════════════════
function XpCard({ transactions }: { transactions: UserDetailsType["xpTransactions"] }) {
  const txList = transactions || []

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Star className="h-4.5 w-4.5 text-white" />
          </div>
          <h2 className="text-base md:text-lg font-black text-foreground">XP History</h2>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          {txList.length} transaction{txList.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {txList.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No XP transactions found.</p>
        ) : (
          txList.map((tx) => {
            const isPositive = tx.amount > 0
            const source = XP_SOURCE[tx.source] || XP_SOURCE.default

            return (
              <div key={tx.id} className="glass-card rounded-xl p-3.5 flex items-center gap-3.5 hover:scale-[1.01] transition-all duration-300">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${source.color} flex items-center justify-center flex-shrink-0 shadow-md text-white`}>
                  {source.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground capitalize">
                    {tx.source.replace(/_/g, " ")}
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{tx.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-base font-black ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {isPositive ? "+" : ""}{tx.amount}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {safeFormat(tx.createdAt, "MMM d, h:mm a")}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ACCOUNT CARD
// ═══════════════════════════════════════════════════════════════
function AccountCard({
  user,
  onUserUpdate,
}: {
  user: UserDetailsType
  onUserUpdate: (updated: Partial<UserDetailsType>) => void
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyId = () => {
    if (user.id) {
      navigator.clipboard.writeText(user.id)
      setCopied(true)
      toast.success("User ID copied to clipboard.")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleChangeRole = async (newRole: string) => {
    if (!user.id) return
    try {
      setIsUpdating(true)
      const updated = await userService.updateUser(user.id, { role: newRole })
      onUserUpdate(updated)
      toast.success("Role updated successfully.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to change role.")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "inactive": return "bg-slate-500/10 text-slate-400 border-slate-500/20"
      case "suspended": return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "banned": return "bg-rose-500/10 text-rose-400 border-rose-500/20"
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  const fields = [
    { label: "User ID", value: user.id, icon: Fingerprint, isId: true },
    { label: "Email", value: user.email, icon: Mail },
    { label: "Role", value: user.role, icon: Shield, isBadge: true },
    { label: "Status", value: user.status, icon: user.status === "active" ? Eye : EyeOff, isStatus: true },
    { label: "Anonymous Mode", value: user.anonymousPreference ? "Enabled" : "Disabled", icon: user.anonymousPreference ? Eye : EyeOff },
    { label: "Bio", value: user.bio || "Not set", icon: UserCog, isBio: true },
    { label: "Joined", value: safeFormat(user.createdAt, "MMM d, yyyy 'at' h:mm a"), icon: Calendar },
    { label: "Last Updated", value: safeFormat(user.updatedAt, "MMM d, yyyy 'at' h:mm a"), icon: Clock },
  ]

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
      <div className="flex items-center gap-3 mb-5 md:mb-6">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <UserCog className="h-4.5 w-4.5 text-white" />
        </div>
        <h2 className="text-base md:text-lg font-black text-foreground">Account Details</h2>
      </div>

      <div className="space-y-1">
        {fields.map((field) => (
          <div key={field.label} className="flex items-start gap-3 py-3.5 border-b border-border/20 last:border-0 group hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2">
            <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <field.icon className="h-3.5 w-3.5 text-primary/70" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                {field.label}
              </div>
              {field.isId ? (
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-foreground bg-muted/50 px-2 py-1 rounded-md truncate">
                    {field.value}
                  </code>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-primary/10" onClick={copyId}>
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                  </Button>
                </div>
              ) : field.isBadge ? (
                <div className="inline-block">
                  <Select value={user.role} onValueChange={handleChangeRole} disabled={isUpdating}>
                    <SelectTrigger className="h-7 px-2.5 bg-primary/10 text-primary border border-primary/20 font-bold text-[10px] uppercase tracking-wider rounded-md focus:ring-0">
                      <SelectValue placeholder={user.role} />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : field.isStatus ? (
                <Badge variant="outline" className={`font-bold text-[10px] uppercase ${getStatusColor(field.value)}`}>
                  {field.value}
                </Badge>
              ) : field.isBio ? (
                <p className="text-sm text-foreground italic">{field.value}</p>
              ) : (
                <span className="text-sm text-foreground font-medium">{field.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// BADGES CARD
// ═══════════════════════════════════════════════════════════════
function BadgesCard({ badges }: { badges: UserDetailsType["userBadges"] }) {
  const earnedBadges = badges || []

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-250">
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Award className="h-4.5 w-4.5 text-white" />
          </div>
          <h2 className="text-base md:text-lg font-black text-foreground">Badges</h2>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          {earnedBadges.length} earned
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {BADGE_PRESETS.map((preset) => {
          const earned = earnedBadges.find((b: Record<string, unknown>) => b.name === preset.name || b.id === preset.name)
          return (
            <div
              key={preset.name}
              className={`glass-card rounded-xl p-3 text-center transition-all duration-500 cursor-default ${
                earned ? "hover:scale-105" : "opacity-40 grayscale hover:opacity-70 hover:grayscale-0"
              }`}
            >
              <div className="text-2xl mb-1.5">{preset.icon}</div>
              <div className="text-[10px] font-bold text-foreground">{preset.name}</div>
              {!earned && <Lock className="h-3 w-3 mx-auto mt-1 text-muted-foreground" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// QUICK ACTIONS
// ═══════════════════════════════════════════════════════════════
function QuickActions({
  user,
  onUserUpdate,
}: {
  user: UserDetailsType
  onUserUpdate: (updated: Partial<UserDetailsType>) => void
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const navigate = useNavigate()

  const handleStatusChange = async (newStatus: "active" | "suspended" | "banned") => {
    try {
      setIsUpdating(true)
      const updated = await userService.updateUser(user.id, { status: newStatus })
      onUserUpdate(updated)
      toast.success(`User ${newStatus} successfully.`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Failed to update user status to ${newStatus}.`)
    } finally {
      setIsUpdating(false)
    }
  }

const handleDelete = async () => {
  if (!showDeleteConfirm) {
    setShowDeleteConfirm(true);
    return;
  }

  try {
    setIsDeleting(true);

    await userService.deleteUser(user.id);

    toast.success(
      "User deleted successfully."
    );

    navigate("/users/list");
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to delete user."
    );

    setIsDeleting(false);
  }
};

  const actions = [
    {
      label: "Activate",
      status: "active" as const,
      icon: UserCheck,
      color: "text-emerald-400",
      bg: "hover:bg-emerald-500/10 hover:border-emerald-500/30",
      show: user.status !== "active",
    },
    {
      label: "Suspend",
      status: "suspended" as const,
      icon: ShieldAlert,
      color: "text-amber-400",
      bg: "hover:bg-amber-500/10 hover:border-amber-500/30",
      show: user.status !== "suspended",
    },
    {
      label: "Ban",
      status: "banned" as const,
      icon: Ban,
      color: "text-rose-400",
      bg: "hover:bg-rose-500/10 hover:border-rose-500/30",
      show: user.status !== "banned",
    },
  ]

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
      <div className="flex items-center gap-3 mb-5 md:mb-6">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <ShieldCheck className="h-4.5 w-4.5 text-white" />
        </div>
        <h2 className="text-base md:text-lg font-black text-foreground">Quick Actions</h2>
      </div>

      <div className="space-y-2.5">
        {actions.map(
          (action) =>
            action.show && (
              <Button
                key={action.label}
                variant="outline"
                disabled={isUpdating}
                onClick={() => handleStatusChange(action.status)}
                className={`w-full h-11 rounded-xl border-border/50 ${action.bg} ${action.color} gap-2.5 justify-start font-semibold text-sm transition-all duration-300`}
              >
                <action.icon className="h-4 w-4" />
                {action.label} User
              </Button>
            )
        )}
        {/* <Button
          variant="outline"
          className="w-full h-11 rounded-xl border-border/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 text-indigo-400 gap-2.5 justify-start font-semibold text-sm transition-all duration-300"
          onClick={() => (window.location.href = `mailto:${user.email}`)}
        >
          <Send className="h-4 w-4" />
          Send Email
        </Button> */}
      </div>

      <div className="mt-6 pt-5 border-t border-rose-500/20">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-rose-400" />
          <span className="text-sm font-black text-rose-400">Danger Zone</span>
        </div>

        {showDeleteConfirm ? (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs text-rose-300/80">
              This will permanently delete the user and all associated data.
            </p>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="flex-1 h-9 rounded-xl text-xs font-bold"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </Button>
              <Button
                variant="ghost"
                className="h-9 rounded-xl text-xs"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full h-10 rounded-xl border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 gap-2 justify-start font-semibold text-sm transition-all duration-300"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function UserProfilePage() {
  const { id: userId } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserDetailsType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = useCallback(async () => {
    if (!userId) {
      setError("User ID is missing.")
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const data = await userService.getUser(userId)
      setUser(data)
    } catch (err) {
      console.error("Failed to load user:", err)
      setError(err instanceof Error ? err.message : "Failed to load user.")
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const handleUserUpdate = (updatedData: Partial<UserDetailsType>) => {
    setUser((current) => (current ? { ...current, ...updatedData } : null))
  }

  if (isLoading) return <ProfileSkeleton />

  if (error || !user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-destructive" />
          <h2 className="text-lg font-semibold">Unable to load user</h2>
          <p className="mt-1 text-sm text-muted-foreground">{error || "User not found."}</p>
          <Button className="mt-4" onClick={loadUser}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-12">
      <ProfileHeader user={user} />

      <div className="max-w-full mx-auto px-4 md:px-8 bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {/* Left Column */}
          <div className="space-y-5 md:space-y-6">
            <BehaviourCard profile={user.behaviourProfile} />
            <XpCard transactions={user.xpTransactions} />
            <PostsCard posts={user.posts} />
          </div>

          {/* Right Column */}
          <div className="space-y-5 md:space-y-6">
            <AccountCard user={user} onUserUpdate={handleUserUpdate} />
            <BadgesCard badges={user.userBadges} />
            <QuickActions user={user} onUserUpdate={handleUserUpdate} />
          </div>
        </div>
      </div>
    </div>
  )
}