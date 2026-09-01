"use client"

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Save, RotateCcw, AlertTriangle, Trash2, ShieldCheck, XCircle, CheckCircle2, Mail, UserRound, Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { PostStatus, PostCategory, PostVisibility, PostUser } from "@/types/Post/post"

interface EditFormProps {
  form: {
    title: string
    body: string
    category: PostCategory
    status: PostStatus
    visibility: PostVisibility
    severityScore: number
    additionalDetails: string
  }
  user: PostUser
  hasChanges: boolean
  isSaving: boolean
  isDeleting: boolean
  saveError: string | null
  onUpdate: (field: keyof EditFormProps["form"], value: any) => void
  onSave: () => void
  onReset: () => void
  onDelete: (reason?: string) => void
  onApprove: () => void
  onReject: () => void
}

export function EditFormSidebar({
  form,
  user,
  hasChanges,
  isSaving,
  isDeleting,
  saveError,
  onUpdate,
  onSave,
  onReset,
  onDelete,
  onApprove,
  onReject,
}: EditFormProps) {
  const navigate = useNavigate()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteReason, setDeleteReason] = useState("")
  const [severityValue, setSeverityValue] = useState([form.severityScore * 100])
  const [hasAvatarError, setHasAvatarError] = useState(false)

  const handleSeverityChange = (value: number[]) => {
    setSeverityValue(value)
    onUpdate("severityScore", value[0] / 100)
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }
    await onDelete(deleteReason)
    navigate("/admin/posts")
  }

  const userInitials = (user.displayName || user.username || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const avatarUrl = useMemo(
    () => user.profilePictureUrl || user.avatar || user.avatarUrl || user.profileImage || user.profilePhoto,
    [user.profilePictureUrl, user.avatar, user.avatarUrl, user.profileImage, user.profilePhoto]
  )

  return (
    <div className="space-y-5 lg:sticky lg:top-6">
      {/* Edit Form Card */}
      {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center">
            <Save className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Edit Post</h2>
            <p className="text-xs text-slate-500">Modify post details</p>
          </div>
          {hasChanges && (
            <span className="ml-auto bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-200">
              Unsaved
            </span>
          )}
        </div>

        {saveError && (
          <Alert variant="destructive" className="mb-4 rounded-xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">{saveError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</Label>
            <Input
              value={form.title}
              onChange={(e) => onUpdate("title", e.target.value)}
              className="h-10 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
              placeholder="Post title"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</Label>
            <Textarea
              value={form.body}
              onChange={(e) => onUpdate("body", e.target.value)}
              className="min-h-[100px] rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
              placeholder="Post description"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</Label>
            <Select value={form.status} onValueChange={(v) => onUpdate("status", v)}>
              <SelectTrigger className="h-10 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APPROVED">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Approved
                  </span>
                </SelectItem>
                <SelectItem value="PENDING">
                  <span className="flex items-center gap-2">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-amber-500" />
                    Pending
                  </span>
                </SelectItem>
                <SelectItem value="REJECTED">
                  <span className="flex items-center gap-2">
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                    Rejected
                  </span>
                </SelectItem>
                <SelectItem value="REMOVED">
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-3.5 w-3.5 text-slate-500" />
                    Removed
                  </span>
                </SelectItem>
                <SelectItem value="FLAGGED">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                    Flagged
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</Label>
            <Select value={form.category} onValueChange={(v) => onUpdate("category", v)}>
              <SelectTrigger className="h-10 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLOSE_CALL">Close Call</SelectItem>
                <SelectItem value="HAZARD">Hazard</SelectItem>
                <SelectItem value="NEAR_MISS">Near Miss</SelectItem>
                <SelectItem value="INCIDENT">Incident</SelectItem>
                <SelectItem value="TIP">Tip</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Visibility</Label>
            <Select value={form.visibility} onValueChange={(v) => onUpdate("visibility", v)}>
              <SelectTrigger className="h-10 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
                <SelectItem value="COMMUNITY_ONLY">Community Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity Score</Label>
              <span className="text-sm font-bold text-slate-900">{severityValue[0]}%</span>
            </div>
            <Slider
              value={severityValue}
              onValueChange={handleSeverityChange}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
              <span>Critical</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Additional Details</Label>
            <Textarea
              value={form.additionalDetails}
              onChange={(e) => onUpdate("additionalDetails", e.target.value)}
              className="min-h-[80px] rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
              placeholder="Additional context..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            className="flex-1 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold gap-2"
            onClick={onSave}
            disabled={!hasChanges || isSaving}
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
            onClick={onReset}
            disabled={!hasChanges}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div> */}

      {/* Post Author */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-center items-center gap-3 mb-5">
          <div className="flex flex-col items-center justify-center text-center">          
            <div className="h-32 w-32 overflow-hidden rounded-full gradient-sunset flex items-center justify-center text-2xl font-bold text-white shadow-md border border-white mb-3">
              {avatarUrl && !hasAvatarError ? (
                <img
                  src={avatarUrl}
                  alt={`${user.displayName || user.username || "User"} profile`}
                  className="h-full w-full object-cover"
                  onError={() => setHasAvatarError(true)}
                />
              ) : (
                userInitials
              )}
            </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white truncate">
              {user.displayName || "Unknown user"}
            </h3>
            <p className="text-sm text-white truncate">
              @{user.username || "unknown"}
            </p>
          </div>
          </div>

        </div>

        <div className="space-y-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <Mail className="h-6 w-6 shrink-0 text-primary" />
            <span className="truncate text-white text-sm" title={user.email}>{user.email || "Email unavailable"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <UserRound className="h-6 w-6 shrink-0 text-primary" />
            <span className="text-white text-sm">Role: <strong className="text-white">{user.role || "User"}</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="h-6 w-6 shrink-0 text-amber-500" />
            <span className="text-white text-sm">Level: <strong className="text-white">{user.level ?? 1}</strong>{user.xpTotal !== undefined ? ` · ${user.xpTotal.toLocaleString()} XP` : ""}</span>
          </div>
          {user.status && (
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 ml-1" />
              <span className="text-white">Status: <strong className="capitalize text-white">{user.status}</strong></span>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full h-10 bg-primary rounded-xl border-primary text-white hover:bg-primary gap-2 mt-5"
          onClick={() => navigate(`/users/edit-user/${user.id}`)}
        >
          <ExternalLink className="h-4 w-4" />
          View Profile
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold mb-4 text-primary">Quick Actions</h3>
        <div className="space-y-2.5">
          {form.status !== "APPROVED" && (
            <Button
              variant="outline"
              className="w-full h-10 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 gap-2 justify-start"
              onClick={onApprove}
            >
              <ShieldCheck className="h-4 w-4" />
              Approve Post
            </Button>
          )}
          {form.status !== "REJECTED" && form.status !== "REMOVED" && (
            <Button
              variant="outline"
              className="w-full h-10 rounded-xl border-amber-200 text-amber-700 glass-card gap-2 justify-start"
              onClick={onReject}
            >
              <XCircle className="h-4 w-4" />
              Reject Post
            </Button>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card rounded-2xl p-6 border border-red-100">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <h3 className="text-sm font-semibold text-red-800">Danger Zone</h3>
        </div>

        {showDeleteConfirm ? (
          <div className="space-y-3">
            <p className="text-xs text-red-700">Are you sure? This action cannot be undone.</p>
            <Input
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Reason for deletion (optional)"
              className="h-9 text-xs rounded-xl border-red-200 focus:border-red-500 focus:ring-red-500/20 bg-white text-red-900 placeholder:text-red-300"
            />
            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="flex-1 h-9 rounded-xl text-xs font-semibold"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </Button>
              <Button
                variant="ghost"
                className="h-9 rounded-xl text-xs"
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setDeleteReason("")
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full h-10 rounded-xl border-red-200 text-red-700 glass-card gap-2 justify-start"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete Post Permanently
          </Button>
        )}
      </div>

      
    </div>
  )
}
