"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageCircle, Trash2, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import type { PostComment } from "@/types/Post/post"

interface CommentsSectionProps {
  comments: PostComment[]
  total: number
  isLoading: boolean
  hasNextPage: boolean
  onLoadMore: () => void
  onDelete: (commentId: string) => void
}

function CommentItem({ comment, onDelete }: { comment: PostComment; onDelete: (id: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const initials = comment.user.displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="group flex gap-3 p-4 rounded-xl glass-card transition-colors">
      <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
        <AvatarFallback className="gradient-sunset text-white text-xs font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold">{comment.user.displayName}</span>
          <span className="text-xs">@{comment.user.username}</span>
          <span className="text-xs">·</span>
          <span className="text-xs">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{comment.body}</p>

        {comment.replies.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-medium text-primary mt-2 ml-10 transition-colors"
          >
            <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            {comment.replies.length} repl{comment.replies.length === 1 ? "y" : "ies"}
          </button>
        )}

        {isExpanded && comment.replies.length > 0 && (
          <div className="mt-3 pl-4 ml-12 border-l-2 border-slate-200 space-y-3">
            {comment.replies.map((reply: PostComment) => (
              <div key={reply.id} className="flex gap-2.5">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="gradient-sunset text-[10px] font-bold">
                    {reply.user.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{reply.user.displayName}</span>
                    <span className="text-[10px]">
                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-xs">{reply.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50"
        onClick={() => onDelete(comment.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

export function CommentsSection({
  comments,
  total,
  isLoading,
  hasNextPage,
  onLoadMore,
  onDelete,
}: CommentsSectionProps) {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold  flex items-center gap-2">
          <MessageCircle className="h-4 w-4 " />
          Comments
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {total}
          </span>
        </h3>
      </div>

      {isLoading && comments.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle className="h-10 w-10 text-slate-200 mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-medium">No comments yet</p>
        </div>
      ) : (
        <div className="space-y-1">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <Button
          variant="ghost"
          className="w-full mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more comments"}
        </Button>
      )}
    </div>
  )
}
