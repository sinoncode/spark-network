"use client"

import { format } from "date-fns"
import { ShieldCheck, Clock, XCircle, Trash2, Flag, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/types/Post/post"

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  APPROVED: {
    label: "Approved",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  PENDING: {
    label: "Pending Review",
    icon: <Clock className="h-3.5 w-3.5" />,
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  REJECTED: {
    label: "Rejected",
    icon: <XCircle className="h-3.5 w-3.5" />,
    cls: "bg-red-50 text-red-600 border-red-200",
  },
  REMOVED: {
    label: "Removed",
    icon: <Trash2 className="h-3.5 w-3.5" />,
    cls: "bg-slate-50 text-slate-600 border-slate-200",
  },
  FLAGGED: {
    label: "Flagged",
    icon: <Flag className="h-3.5 w-3.5" />,
    cls: "bg-rose-50 text-rose-700 border-rose-200",
  },
}

const CATEGORY_CONFIG: Record<string, string> = {
  CLOSE_CALL: "bg-orange-50 text-orange-700 border-orange-200",
  HAZARD: "bg-red-50 text-red-700 border-red-200",
  NEAR_MISS: "bg-yellow-50 text-yellow-700 border-yellow-200",
  INCIDENT: "bg-purple-50 text-purple-700 border-purple-200",
  TIP: "bg-blue-50 text-blue-700 border-blue-200",
}

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  const status = STATUS_CONFIG[post.status]
  const initials = (post.user?.displayName || "Unknown")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-100">
      {/* Author Row */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-full gradient-sunset flex items-center justify-center font-bold text-sm shadow-md">
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-[17px]">{post.user?.displayName}</h3>
            <p className="text-xs mt-0.5">
              @{post.user?.username} · {post.user?.role} · Level {post.user?.level || 1}
            </p>
          </div>
        </div>
        <Badge variant="outline" className={`gap-1.5 px-3 py-1 text-xs glass-card font-semibold ${status?.cls || ""}`}>
          {status?.icon}
          {status?.label || post.status}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold text mb-3 leading-tight">{post.title}</h1>

      {/* Body */}
      <p className="text-sm text-grey leading-relaxed mb-4">{post.body}</p>

      {/* Additional Details */}
      {post.additionalDetails && (
        <div className="glass-card rounded-xl p-4 mb-4 border border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1.5">Additional Details</p>
          <p className="text-sm ">{post.additionalDetails}</p>
        </div>
      )}

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="outline" className={`text-xs glass-card font-medium ${CATEGORY_CONFIG[post.category] || ""}`}>
          {post.category.replace("_", " ")}
        </Badge>
        {post.experience.map((exp: string) => (
          <Badge key={exp} variant="outline" className="text-xs glass-card font-medium bg-sky-50 text-sky-700 border-sky-200">
            {exp.replace("_", " ")}
          </Badge>
        ))}
      </div>

      {/* Location & Time */}
      <div className="flex flex-wrap items-center gap-4 text-xs  pt-4 border-t border-slate-100">
        {post.locationLabel && (
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {post.locationLabel}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {format(new Date(post.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </span>
        {post.happenedAt && (
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Happened: {format(new Date(post.happenedAt), "MMM d, yyyy")}
          </span>
        )}
      </div>
    </div>
  )
}
