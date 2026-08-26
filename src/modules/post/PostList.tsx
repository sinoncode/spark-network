"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { usePostsStore } from "@/store/Post/post.store"
import { PostsTableSkeleton } from "@/components/Post/PostSkeleton"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MoreVertical,
  Search,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Clock,
  XCircle,
  Flag,
  Image as ImageIcon,
  FileVideo,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  FilterX,
} from "lucide-react"
import type { PostStatus, PostCategory, PostsFilter } from "@/types/Post/post"

// ─── Status Config ─────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  APPROVED: {
    label: "Approved",
    icon: <ShieldCheck className="h-3 w-3" />,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  PENDING: {
    label: "Pending",
    icon: <Clock className="h-3 w-3" />,
    cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
  },
  REJECTED: {
    label: "Rejected",
    icon: <XCircle className="h-3 w-3" />,
    cls: "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  },
  REMOVED: {
    label: "Removed",
    icon: <Trash2 className="h-3 w-3" />,
    cls: "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400",
  },
  FLAGGED: {
    label: "Flagged",
    icon: <Flag className="h-3 w-3" />,
    cls: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300",
  },
}

const CATEGORY_CONFIG: Record<string, string> = {
  CLOSE_CALL: "bg-orange-50 text-orange-700 border-orange-200",
  HAZARD: "bg-red-50 text-red-700 border-red-200",
  NEAR_MISS: "bg-yellow-50 text-yellow-700 border-yellow-200",
  INCIDENT: "bg-purple-50 text-purple-700 border-purple-200",
  TIP: "bg-blue-50 text-blue-700 border-blue-200",
}

// ─── Component ─────────────────────────────────────────────────
export default function PostsListing() {
  const {
    posts,
    total,
    totalPages,
    isLoading,
    isFetching,
    error,
    filters,
    setFilters,
    fetchPosts,
    resetFilters,
    deletePost,
    approvePost,
    rejectPost,
  } = usePostsStore()

  const [searchInput, setSearchInput] = useState(filters.search || "")
  const page = filters.page

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (filters.search || "")) {
        setFilters({ search: searchInput })
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [filters.search, searchInput, setFilters])

  // Initial fetch
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleRefresh = () => fetchPosts()

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this post permanently?")) await deletePost(id)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters({ page: newPage })
    }
  }

  // Media preview helper
  const getMediaPreview = (images: string[]) => {
    if (!images.length) return null
    const isVideo = images[0].endsWith(".mp4") || images[0].endsWith(".mov")
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        {isVideo ? <FileVideo className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
        {images.length > 1 ? `${images.length} files` : "1 file"}
      </span>
    )
  }

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and moderate community posts and reports.
          </p>
        </div>
     
      </div>

      {/* Filters Card */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b py-3 px-4">
          {/* Status Filter */}
          <Select
            value={filters.status || "all"}
            onValueChange={(v) =>
              setFilters({ status: v === "all" ? undefined : (v as PostStatus) })
            }
          >
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="REMOVED">Removed</SelectItem>
              <SelectItem value="FLAGGED">Flagged</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            value={filters.category || "all"}
            onValueChange={(v) =>
              setFilters({ category: v === "all" ? undefined : (v as PostCategory) })
            }
          >
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="CLOSE_CALL">Close Call</SelectItem>
              <SelectItem value="HAZARD">Hazard</SelectItem>
              <SelectItem value="NEAR_MISS">Near Miss</SelectItem>
              <SelectItem value="INCIDENT">Incident</SelectItem>
              <SelectItem value="TIP">Tip</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={(v) => {
              const [sortBy, sortOrder] = v.split("-") as [PostsFilter["sortBy"], "asc" | "desc"]
              setFilters({ sortBy, sortOrder })
            }}
          >
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="severityScore-desc">Highest Severity</SelectItem>
              <SelectItem value="severityScore-asc">Lowest Severity</SelectItem>
              <SelectItem value="trendingScore-desc">Most Trending</SelectItem>
              <SelectItem value="helpfulCount-desc">Most Helpful</SelectItem>
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative w-[260px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search title, user, content..."
              className="pl-9 h-9 text-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Reset + Count */}
          <div className="ml-auto flex items-center gap-3">
            {(filters.status || filters.category || filters.search) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-muted-foreground"
                onClick={resetFilters}
              >
                <FilterX className="h-3.5 w-3.5" />
                Clear
              </Button>
            )}
            <span className="text-xs text-muted-foreground">
              {isLoading ? "Loading..." : `${total} post${total !== 1 ? "s" : ""}`}
            </span>
          </div>
        </CardHeader>

        {/* Error Banner */}
        {error && (
          <div className="px-4 py-3 bg-red-50 border-b border-red-100 flex items-center gap-2 text-sm text-red-700">
            <AlertTriangle className="h-4 w-4" />
            {error}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 ml-auto text-red-700 hover:text-red-800 hover:bg-red-100"
              onClick={handleRefresh}
            >
              Retry
            </Button>
          </div>
        )}

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1100px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  {[
                    "Post ID",
                    "Content",
                    "Category",
                    "Author",
                    "Media",
                    "Severity",
                    "Status",
                    "Date",
                    "Actions",
                  ].map((h, i) => (
                    <TableHead
                      key={h}
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        i === 0 ? "pl-4" : ""
                      } ${i === 8 ? "text-right pr-4" : ""}`}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <PostsTableSkeleton rows={filters.limit} />
                ) : posts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="py-20 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 opacity-30" />
                        <p className="text-sm">No posts match your filters.</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1"
                          onClick={resetFilters}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post, i) => (
                    <TableRow
                      key={post.id}
                      className="group border-b border-border/50 hover:bg-muted/30 transition-colors animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${i * 30}ms`, animationDuration: "250ms" }}
                    >
                      {/* ID */}
                      <TableCell className="pl-4 font-mono text-xs text-muted-foreground">
                        {post.id.slice(-8).toUpperCase()}
                      </TableCell>

                      {/* Content */}
                      <TableCell>
                        <div className="max-w-[280px]">
                          <div className="font-medium text-sm truncate">
                            {post.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {post.body}
                          </div>
                          {post.aiModerationFlag && (
                            <Badge
                              variant="outline"
                              className="mt-1.5 text-[10px] h-5 border-orange-200 text-orange-600 bg-orange-50"
                            >
                              <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                              AI Flagged
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0.5 font-medium ${
                            CATEGORY_CONFIG[post.category] || ""
                          }`}
                        >
                          {post.category.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      {/* Author */}
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                            {(post.user?.displayName || "Unknown")
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {post.user?.displayName || "Unknown"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              @{post.user?.username || "unknown"}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Media */}
                      <TableCell>{getMediaPreview(post.image || [])}</TableCell>

                      {/* Severity */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${post.severityScore * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-8">
                            {(post.severityScore * 100).toFixed(0)}%
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs px-2.5 py-1 font-medium gap-1.5 ${
                            STATUS_CONFIG[post.status]?.cls || ""
                          }`}
                        >
                          {STATUS_CONFIG[post.status]?.icon}
                          {STATUS_CONFIG[post.status]?.label || post.status}
                        </Badge>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                        <div className="text-[10px] opacity-60">
                          {format(new Date(post.createdAt), "h:mm a")}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right pr-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            {/* <DropdownMenuItem className="text-sm gap-2 cursor-pointer" asChild>
                              <Link to={`/post/${post.id}`}>
                                <Eye className="h-3.5 w-3.5" />
                                View Details
                              </Link>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem className="text-sm gap-2 cursor-pointer" asChild>
                              <Link to={`/post/${post.id}/edit`}>
                                <Pencil className="h-3.5 w-3.5" />
                                View & Edit Post
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {post.status !== "APPROVED" && (
                              <DropdownMenuItem className="text-sm gap-2 cursor-pointer text-emerald-600 focus:text-emerald-600" onSelect={() => approvePost(post.id)}>
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {post.status !== "REMOVED" && (
                              <DropdownMenuItem className="text-sm gap-2 cursor-pointer text-amber-600 focus:text-amber-600" onSelect={() => rejectPost(post.id)}>
                                <XCircle className="h-3.5 w-3.5" />
                                Reject
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-sm gap-2 text-red-600 cursor-pointer focus:text-red-600" onSelect={() => handleDelete(post.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete Permanently
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!isLoading && posts.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Showing {(page - 1) * filters.limit + 1}–
                {Math.min(page * filters.limit, total)} of {total}
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Smart page window
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "ghost"}
                        size="sm"
                        className="h-8 w-8 text-xs p-0"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}