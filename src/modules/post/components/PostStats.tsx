"use client"

import { ThumbsUp, MessageCircle, Flag, Share2, Repeat, Eye } from "lucide-react"
import type { Post } from "@/types/Post/post"

interface PostStatsProps {
  post: Post
}

export function PostStats({ post }: PostStatsProps) {
  const stats = [
    { label: "Helpful", value: post.helpfulCount, icon: ThumbsUp, color: "text-emerald-600 bg-emerald-50" },
    { label: "Comments", value: post.commentCount, icon: MessageCircle, color: "text-blue-600 bg-blue-50" },
    { label: "Reports", value: post._count.reports, icon: Flag, color: "text-rose-600 bg-rose-50" },
    { label: "Shares", value: post.shareCount, icon: Share2, color: "text-indigo-600 bg-indigo-50" },
    { label: "Reposts", value: post.repostCount, icon: Repeat, color: "text-violet-600 bg-violet-50" },
    { label: "Trending Score", value: post.trendingScore, icon: Eye, color: "text-amber-600 bg-amber-50" },
  ]

  return (
    <div className="glass-card rounded-2xl p-5 shadow-sm border border-slate-100">
      <h3 className="text-sm font-semibold mb-4">Engagement</h3>
      <div className="grid grid-cols-6 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-3 rounded-xl glass-card hover:bg-glass-card transition-colors"
          >
            <div className={`inline-flex items-center glass-card justify-center p-2 rounded-lg ${stat.color} mb-2`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-lg font-bold ">{stat.value}</div>
            <div className="text-[11px] text-grey font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Severity */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Severity Score</span>
          <span className="text-sm font-bold ">{(post.severityScore * 100).toFixed(0)}%</span>
        </div>
        <div className="h-2.5 w-full glass-card rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${post.severityScore * 100}%`,
              background: post.severityScore >= 0.7
                ? "linear-gradient(90deg, #ef4444, #dc2626)"
                : post.severityScore >= 0.4
                  ? "linear-gradient(90deg, #f59e0b, #ea580c)"
                  : "linear-gradient(90deg, #22c55e, #16a34a)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
