"use client"

import { useEffect } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { AlertTriangle, ArrowLeft, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePostDetailStore } from "@/store/Post/post-detail.store"
import { MediaCarousel } from "./components/MediaCarousel"
import { PostHeader } from "./components/PostHeader"
import { PostStats } from "./components/PostStats"
import { AIModerationCard } from "./components/AIModerationCard"
import { CommentsSection } from "./components/CommentsSection"
import { PostDetailSkeleton } from "./components/PostDetailSkeleton"

export default function PostPage() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const {
		post,
		comments,
		commentsMeta,
		isLoading,
		commentsLoading,
		error,
		fetchPost,
		fetchComments,
		deleteComment,
	} = usePostDetailStore()

	useEffect(() => {
		if (id) {
			fetchPost(id)
			fetchComments(id)
		}
	}, [fetchComments, fetchPost, id])

	if (!id) return <Navigate to="/post/list" replace />

	const handleDeleteComment = async (commentId: string) => {
		if (window.confirm("Delete this comment?")) await deleteComment(commentId)
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
					<AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-3" />
					<h2 className="text-lg font-bold text-slate-900 mb-2">Failed to load post</h2>
					<p className="text-sm text-slate-500 mb-6">{error || "Post not found"}</p>
					<Button onClick={() => navigate("/post/list")} className="rounded-xl gap-2">
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
				<div className="flex items-center justify-between mb-6">
					<Button
						variant="ghost"
						className="gap-2 text-primary hover:text-primary-300 -ml-2 rounded-xl"
						onClick={() => navigate("/post/list")}
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Posts
					</Button>
					<Button onClick={() => navigate(`/post/${id}/edit`)} className="gap-2 rounded-xl">
						<Pencil className="h-4 w-4" />
						Edit Post
					</Button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<div className="lg:col-span-8 space-y-5">
						<MediaCarousel media={post.media} />
						<PostHeader post={post} />
						<PostStats post={post} />
						<AIModerationCard post={post} />
						<CommentsSection
							comments={comments}
							total={commentsMeta.total}
							isLoading={commentsLoading}
							hasNextPage={commentsMeta.hasNextPage}
							onLoadMore={() => fetchComments(id, commentsMeta.page + 1)}
							onDelete={handleDeleteComment}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
