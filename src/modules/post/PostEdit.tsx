"use client"

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePostDetailStore } from "@/store/Post/post-detail.store"
import { MediaCarousel } from "./components/MediaCarousel"
import { PostHeader } from "./components/PostHeader"
import { PostStats } from "./components/PostStats"
import { AIModerationCard } from "./components/AIModerationCard"
import { CommentsSection } from "./components/CommentsSection"
import { EditFormSidebar } from "./components/EditFormSidebar"
import { PostDetailSkeleton } from "./components/PostDetailSkeleton"

export default function PostEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    post,
    comments,
    commentsMeta,
    isLoading,
    isSaving,
    isDeleting,
    commentsLoading,
    error,
    saveError,
    editForm,
    hasChanges,
    fetchPost,
    fetchComments,
    updateField,
    savePost,
    deletePost,
    approvePost,
    rejectPost,
    deleteComment,
    resetForm,
  } = usePostDetailStore()

  useEffect(() => {
    if (id) {
      fetchPost(id)
      fetchComments(id)
    }
  }, [id, fetchPost, fetchComments])

  const handleLoadMoreComments = () => {
    if (id && commentsMeta.hasNextPage) {
      fetchComments(id, commentsMeta.page + 1)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Delete this comment?")) return
    await deleteComment(commentId)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <PostDetailSkeleton />
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Failed to load post</h2>
          <p className="text-sm text-slate-500 mb-6">{error || "Post not found"}</p>
          <Button onClick={() => navigate("+/posts/list")} className="rounded-xl gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen glass-card py-6">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="gap-2 text-primary hover:text-primary-300 -ml-2 rounded-xl"
            onClick={() => navigate("/post/list")}
          >
            <ArrowLeft className="h-4 w-4 " />
            Back to Posts
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Content */}
          <div className="lg:col-span-8 space-y-5">
            {/* Media Carousel */}
            <MediaCarousel media={post.media} />

            {/* Post Header */}
            <PostHeader post={post} />

            {/* Stats */}
            <PostStats post={post} />

            {/* AI Moderation */}
            <AIModerationCard post={post} />

            {/* Comments */}
            <CommentsSection
              comments={comments}
              total={commentsMeta.total}
              isLoading={commentsLoading}
              hasNextPage={commentsMeta.hasNextPage}
              onLoadMore={handleLoadMoreComments}
              onDelete={handleDeleteComment}
            />
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-4">
            <EditFormSidebar
              form={editForm}
              hasChanges={hasChanges}
              isSaving={isSaving}
              isDeleting={isDeleting}
              saveError={saveError}
              onUpdate={updateField}
              onSave={() => id && savePost(id)}
              onReset={resetForm}
              onDelete={(reason) => id && deletePost(id, reason)}
              onApprove={() => id && approvePost(id)}
              onReject={() => id && rejectPost(id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
