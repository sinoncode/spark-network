"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

import { toast } from "@/lib/toast"
import { useProfileStore } from "@/store/profileStore"
import type { ProfileUpdatePayload } from "@/types/profile.types"

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "U"

export default function EditProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    profile,
    loading,
    saving,
    fetchProfile,
    updateProfile,
  } = useProfileStore()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState("")

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // useEffect(() => {
  //   fetchProfile()
  // }, [fetchProfile])

  useEffect(() => {
    if (!profile) return

    setForm({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
    })

    setAvatarPreview(profile.avatar || "")
  }, [profile])

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, or WEBP image.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.")
      return
    }

    if (avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview)
    }

    const previewUrl = URL.createObjectURL(file)

    setSelectedFile(file)
    setAvatarPreview(previewUrl)
  }

  const handleProfileSave = async () => {
    if (!form.name.trim()) {
      toast.error("Full name is required.")
      return
    }

    const payload: ProfileUpdatePayload = {
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      avatar: selectedFile || undefined,
    }

    const success = await updateProfile(payload)

    if (success) {
      setSelectedFile(null)

      // Refresh latest backend data after update
      await fetchProfile()
    }
  }

  if (loading && !profile) {
    return (
      <Card className="rounded-[24px] border border-slate-200/80 glass-card shadow-sm dark:border-white/10">
        <CardContent className="flex min-h-[420px] items-center justify-center p-6">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#2780C3]" />
            Loading profile settings...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden rounded-[24px] border border-slate-200/80 glass-card shadow-sm dark:border-white/10 ">
      <CardContent className="p-0">
        <div className="border-b border-slate-100 px-5 py-6 sm:px-7 dark:border-white/10">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
              <UserRound className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Profile settings
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update your personal information and account preferences.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <div className="px-5 pt-5 sm:px-7">
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-white/[0.06]">
              <TabsTrigger
                value="profile"
                className="rounded-lg py-2.5 text-sm font-semibold text-slate-500 transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-primary dark:data-[state=active]:text-white"
              >
                <UserRound className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>

              <TabsTrigger
                value="security"
                className="rounded-lg py-2.5 text-sm font-semibold text-slate-500 transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-primary dark:data-[state=active]:text-white"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="m-0 p-5 sm:p-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-7"
            >
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/[0.03]">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-slate-200 shadow-md dark:border-[#15191F] dark:bg-slate-800">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt={form.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center gradient-sunset text-xl font-bold text-white">
                      {getInitials(form.name)}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Profile photo
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Use a clear photo to help your team identify you.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={saving}
                      className="h-10 rounded-xl border-slate-200 bg-white px-4 text-black hover:border-[#2780C3]/40 hover:bg-primary/5 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-primary/15 dark:hover:text-white"
                    >
                      <Camera className="h-4 w-4" />
                      Upload image
                    </Button>

                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      JPG, PNG or WEBP · Maximum 5MB
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="profile-name"
                    className="font-medium text-slate-700 dark:text-slate-200"
                  >
                    Full name
                  </Label>

                  <Input
                    id="profile-name"
                    value={form.name}
                    disabled={saving}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="profile-email"
                    className="font-medium text-slate-700 dark:text-slate-200"
                  >
                    Email address
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="profile-email"
                      value={form.email}
                      disabled
                      className="cursor-not-allowed pl-11 primary opacity-70"
                    />
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Email changes require administrator approval.
                  </p>
                </div>
              </div>

              <Separator className="bg-slate-100 dark:bg-white/10" />

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Your changes will be visible across the dashboard.
                </p>

                <Button
                  type="button"
                  onClick={handleProfileSave}
                  disabled={saving}
                  className="h-11 rounded-xl bg-primary px-5 font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl disabled:translate-y-0"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save profile
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="m-0 p-5 sm:p-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />

                  <div>
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                      Security API required
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-700/80 dark:text-amber-300/70">
                      Your backend currently supports profile updates only.
                      Password and two-factor controls will work after their API
                      endpoints are added.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-200">
                    Current password
                  </Label>

                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      disabled
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-11 pr-11"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword((previous) => !previous)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#2780C3]"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-200">
                    New password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      disabled
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-11 pr-11"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword((previous) => !previous)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#2780C3]"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-black dark:bg-primary/20 dark:text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      Two-factor authentication
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Add another layer of protection to your account.
                    </p>
                  </div>
                </div>

                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                  disabled
                />
              </div>

              <Button
                type="button"
                disabled
                className="h-11 rounded-xl bg-primary px-5 text-white opacity-60"
              >
                Update security
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}