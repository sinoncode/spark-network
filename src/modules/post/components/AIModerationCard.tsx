"use client"

import { AlertTriangle, CheckCircle2, Shield } from "lucide-react"
import type { Post } from "@/types/Post/post"

interface AIModerationCardProps {
  post: Post
}

export function AIModerationCard({ post }: AIModerationCardProps) {
  const isFlagged = post.aiModerationFlag
  const reason = post.aiModerationReason

  return (
    <div className={`rounded-2xl glass-card p-5 shadow-sm border ${isFlagged
      ? "bg-amber-50 border-amber-200"
      : "bg-emerald-50 border-emerald-200"
      }`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`h-9 w-9 rounded-full flex items-center justify-center ${isFlagged ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
          }`}>
          {isFlagged ? <AlertTriangle className="h-4.5 w-4.5" /> : <Shield className="h-4.5 w-4.5" />}
        </div>
        <div>
          <h3 className="text-sm font-semibold">AI Moderation</h3>
          <p className={`text-xs font-medium ${isFlagged ? "text-amber-700" : "text-emerald-700"}`}>
            {isFlagged ? "Content flagged for review" : "Content passed all checks"}
          </p>
        </div>
        {isFlagged ? (
          <AlertTriangle className="h-5 w-5 text-amber-500 ml-auto" />
        ) : (
          <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-auto" />
        )}
      </div>
      {reason && (
        <div className="bg-white/60 rounded-lg p-3 text-xs text-slate-700 border border-slate-200/60">
          <span className="font-semibold text-slate-500">Reason:</span> {reason}
        </div>
      )}
    </div>
  )
}
