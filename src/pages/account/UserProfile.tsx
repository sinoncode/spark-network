import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
    Building2,
    Camera,
    CheckCircle2,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
    UsersRound,
} from "lucide-react"

import backgroundImage from "@/assets/banners/2morrow-background.png"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import EditProfile from "@/pages/account/EditProfile"
import { useProfileStore } from "@/store/profileStore"

const getInitials = (name?: string) => {
    if (!name) return "U"

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((item) => item[0])
        .join("")
        .toUpperCase()
}

const getRoleLabel = (permissions?: string[]) => {
    if (!permissions?.length) return "Team Member"

    const normalizedPermissions = permissions.map((item) => item.toLowerCase())

    if (normalizedPermissions.some((item) => item.includes("admin"))) {
        return "Administrator"
    }

    if (normalizedPermissions.some((item) => item.includes("agency"))) {
        return "Agency Manager"
    }

    if (normalizedPermissions.some((item) => item.includes("agent"))) {
        return "Real Estate Agent"
    }

    return "Team Member"
}

export default function UserProfile() {
    const { profile, loading, fetchProfile } = useProfileStore()

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const role = useMemo(() => {
        return "Administrator"
    }, [])

    if (loading && !profile) {
        return (
            <div className="space-y-6 p-4 md:p-6">
                <Skeleton className="h-[280px] w-full rounded-[28px]" />

                <div className="grid gap-6 xl:grid-cols-3">
                    <Skeleton className="h-[360px] rounded-[28px]" />
                    <Skeleton className="h-[360px] rounded-[28px] xl:col-span-2" />
                </div>
            </div>
        )
    }

    const userName = profile?.name || "User"
    const userEmail = profile?.email || "No email available"
    const userPhone = profile?.phone || "Not added yet"
    const userAvatar = profile?.avatar


    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-full space-y-6 p-4 md:p-6"
        >
            {/* Profile Header */}
            <Card className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm dark:border-white/10 glass-card">
              <div className="relative h-full overflow-hidden sm:h-96">
    {/* Background Image: Ensure it's the first child, spans the area, covers, and is fully visible */}
    <img 
        src={backgroundImage} 
        alt="Real Estate Background"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-100 transition-opacity duration-500"
    />

    {/* Light effects overlays (Keep these above the image, below content) */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.12),transparent_30%)]" />

    {/* Content badge (Keep on top) */}
    <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
Spark Network    </div>
</div>

                <CardContent className="absolute px-5 pb-6 pt-0 top-[78%] w-full sm:px-8 glass-card">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                            <div className="-mt-14 relative h-28 w-28 shrink-0 rounded-[28px] border-4 border-white bg-slate-100 shadow-xl dark:border-[#15191F] dark:bg-slate-800">
                                {userAvatar ? (
                                    <img
                                        src={userAvatar}
                                        alt={userName}
                                        className="h-full w-full rounded-[22px] object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-[22px] gradient-sunset text-2xl font-bold text-white">
                                        {getInitials(userName)}
                                    </div>
                                )}

                                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white dark:border-[#15191F]">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="pb-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {userName}
                                    </h1>

                                    <Badge className="rounded-full border-0 bg-primary/10 px-3 py-1 text-xs font-semibold text-black hover:bg-primary/15 dark:bg-primary/20 dark:text-white">
                                        {role}
                                    </Badge>
                                </div>

                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Manage your account, contact information and platform access.
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() =>
                                document
                                    .getElementById("edit-profile-section")
                                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                            }
                            className="h-11 rounded-xl bg-primary px-5 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5  hover:shadow-xl hover:shadow-primary/2pr5"
                        >
                            <Camera className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-3">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Account Details */}
                    <Card className="rounded-[24px] border border-slate-200/80 glass-card shadow-sm dark:border-white/10 ">
                        <CardContent className="p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                                    <UserRound className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-slate-900 dark:text-white">
                                        Account details
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Your profile information
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <ProfileInfoRow
                                    icon={<UserRound className="h-4 w-4" />}
                                    label="Full name"
                                    value={userName}
                                />

                                <ProfileInfoRow
                                    icon={<Mail className="h-4 w-4" />}
                                    label="Email address"
                                    value={userEmail}
                                />

                                <ProfileInfoRow
                                    icon={<Building2 className="h-4 w-4" />}
                                    label="Account role"
                                    value={role}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Platform Access */}
                    <Card className="rounded-[24px] border border-slate-200/80 glass-card shadow-sm dark:border-white/10">
                        <CardContent className="p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-slate-900 dark:text-white">
                                        Account status
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Platform access overview
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-500/15 dark:bg-emerald-500/10">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />

                                    <div>
                                        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                            Account active
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-emerald-700/80 dark:text-emerald-300/70">
                                            You have access to the real-estate management dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6 xl:col-span-2">
                    {/* Real Estate Workspace */}
                    {/* <Card className="rounded-[24px] border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#15191F]">
                        <CardContent className="p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
                                        <Building2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-slate-900 dark:text-white">
                                            Real estate workspace
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Your account’s working environment
                                        </p>
                                    </div>
                                </div>

                                <Badge
                                    variant="outline"
                                    className="w-fit rounded-full border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                                >
                                    Active workspace
                                </Badge>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <WorkspaceCard
                                    icon={<Building2 className="h-5 w-5" />}
                                    title="Properties"
                                    description="Manage listings and property details."
                                />

                                <WorkspaceCard
                                    icon={<UsersRound className="h-5 w-5" />}
                                    title="Clients"
                                    description="Manage buyers, sellers and leads."
                                />

                                <WorkspaceCard
                                    icon={<MapPin className="h-5 w-5" />}
                                    title="Locations"
                                    description="Track property locations and areas."
                                />
                            </div>
                        </CardContent>
                    </Card> */}

                    {/* Permissions */}
                    {/* <Card className="rounded-[24px] border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#15191F]">
                        <CardContent className="p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-slate-900 dark:text-white">
                                        Access permissions
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Permissions assigned to this account
                                    </p>
                                </div>
                            </div>

                            {user?.permissions?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.permissions.map((permission) => (
                                        <Badge
                                            key={permission}
                                            className="rounded-lg border border-primary/15 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/12 dark:border-primary/25 dark:bg-primary/15 dark:text-[#8BC9F4]"
                                        >
                                            {permission.replaceAll("_", " ")}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-400">
                                    No specific permissions are available for this account.
                                </p>
                            )}
                        </CardContent>
                    </Card> */}

                    {/* Existing edit component */}
                    <div id="edit-profile-section" className="scroll-mt-6">
                        <EditProfile />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function ProfileInfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-slate-400 dark:text-slate-500">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {value}
                </p>
            </div>
        </div>
    )
}

function WorkspaceCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-primary/35 dark:hover:bg-primary/10">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-white/10 dark:text-[#8BC9F4]">
                {icon}
            </div>

            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {description}
            </p>
        </div>
    )
}