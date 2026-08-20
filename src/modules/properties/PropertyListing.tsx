"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/modules/permission/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  MoreVertical,
  Plus,
  ShoppingBag,
  Wallet,
  Users,
  Building2,
  Search,
  Loader2,
  Trash2,
  Pencil,
  Eye,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
} from "lucide-react"

import { usePropertyStore } from "@/store/propertyStore"
import type { Property, PropertyStatus, ListingType } from "@/types/property.types"
import {
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_SUB_TYPE_OPTIONS,
  LISTING_TYPE_OPTIONS,
} from "@/types/property.types"

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: PropertyStatus }) {
  const configs: Record<PropertyStatus, { bg: string; text: string; dot: string }> = {
    active: { bg: "bg-emerald-50 dark:bg-emerald-500/15", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
    draft: { bg: "bg-amber-50 dark:bg-amber-500/15", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
    sold: { bg: "bg-purple-50 dark:bg-purple-500/15", text: "text-purple-700 dark:text-purple-400", dot: "bg-purple-500" },
    inactive: { bg: "bg-slate-50 dark:bg-slate-500/15", text: "text-slate-600 dark:text-slate-400", dot: "bg-slate-400" },
    archived: { bg: "bg-red-50 dark:bg-red-500/15", text: "text-red-600 dark:text-red-400", dot: "bg-red-500" },
  }
  const cfg = configs[status] ?? configs.inactive
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${cfg.bg} ${cfg.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  )
}

// ─── Listing type badge ───────────────────────────────────────────────────────
function ListingBadge({ type }: { type: ListingType }) {
  if (!type) return <span className="text-muted-foreground text-sm">—</span>
  const isSale = type === "sale"
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide uppercase ${isSale
      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
      : "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400"
      }`}>
      {isSale ? "For Sale" : "For Rent"}
    </span>
  )
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <TableRow className="animate-pulse">
      {Array.from({ length: 7 }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 rounded-md bg-muted" style={{ width: `${60 + Math.random() * 30}%` }} />
        </TableCell>
      ))}
    </TableRow>
  )
}

// ─── KPI stat card ────────────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  icon,
  colorClass,
  loading,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  colorClass: string
  loading?: boolean
}) {
  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          {loading ? (
            <div className="h-7 w-20 animate-pulse rounded-md bg-muted" />
          ) : (
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          )}
        </div>
        <div className={`rounded-xl p-3 ${colorClass} text-white`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Format label helper ──────────────────────────────────────────────────────
function formatSubType(subType: string | undefined): string {
  if (!subType) return "—"
  const found = PROPERTY_SUB_TYPE_OPTIONS.find((o) => o.value === subType)
  return found?.label ?? subType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PropertyListing() {
  const { properties, fetchProperties, deleteProperty, loading, deleting, meta } = usePropertyStore()

  const [search, setSearch] = useState("")
  const [pageState, setPageState] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [listingFilter, setListingFilter] = useState("all")
  const [pendingDelete, setPendingDelete] = useState<Property | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // debounce search by 400 ms
  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(t)
  }, [search])

  const load = useCallback(async () => {
    await fetchProperties({
      page: pageState,
      per_page: 10,
      search: debouncedSearch || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
      sub_type: typeFilter !== "all" ? typeFilter : undefined,
      listing_type: listingFilter !== "all" ? listingFilter : undefined,
    })
  }, [pageState, debouncedSearch, statusFilter, typeFilter, listingFilter, fetchProperties])

  useEffect(() => { load() }, [load])

  const handleDelete = async () => {
    if (!pendingDelete) return

    setDeletingId(pendingDelete.id)

    try {
      const ok = await deleteProperty(pendingDelete.id)
      if (ok) {
        if (currentPage > 1 && properties.length <= 1) {
          setPageState((prev) => Math.max(1, prev - 1))
        } else {
          await load()
        }
        setPendingDelete(null)
      }
    } finally {
      setDeletingId(null)
    }
  }

  const totalProps = meta.total
  const totalPages = Math.max(1, meta.last_page)
  const currentPage = meta.current_page
  const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || listingFilter !== "all" || debouncedSearch.trim().length > 0

  const listingCounts = useMemo(() => {
    const sale = properties.filter((p) => p.classification?.transaction_type === "sale").length
    const rent = properties.filter((p) => p.classification?.transaction_type === "rent").length
    const sold = properties.filter((p) => p.classification?.listing_status === "sold").length

    return {
      total: totalProps,
      sale,
      rent,
      sold,
    }
  }, [properties, totalProps])

  const kpiCards = [
    { title: "Total Properties", value: listingCounts.total, icon: <Building2 className="h-5 w-5" />, colorClass: "bg-slate-600" },
    { title: "For Sale", value: listingCounts.sale, icon: <ShoppingBag className="h-5 w-5" />, colorClass: "bg-blue-500" },
    { title: "For Rent", value: listingCounts.rent, icon: <Users className="h-5 w-5" />, colorClass: "bg-emerald-500" },
    { title: "Sold", value: listingCounts.sold, icon: <Wallet className="h-5 w-5" />, colorClass: "bg-purple-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="mt-1 text-muted-foreground">Manage and monitor all property listings.</p>
        </div>
        <Link to="/properties/add-property">
  <Button
  asChild
  size="sm"
  className="
    gap-2
    rounded-2xl
    px-5

    !bg-[#FC8D0E]
    !text-white

    transition-all
    duration-300

    hover:!bg-[#E8780A]
    hover:!text-white

    hover:shadow-[0_0_20px_rgba(252,141,14,0.30)]

    focus-visible:!ring-[#FC8D0E]/30
  "
>
  <Link to="/properties/add-property">
    <Plus className="h-4 w-4" />
    Add Property
  </Link>
</Button>
</Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpi) => (
          <StatCard key={kpi.title} {...kpi} loading={loading} />
        ))}
      </div>

      {/* Main Table Card */}
      <Card>
        {/* Toolbar */}
        <CardHeader className="border-b py-3 px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Status */}
              <Select
                value={statusFilter}
                onValueChange={(v) => { setStatusFilter(v); setPageState(1) }}
              >
                <SelectTrigger className="h-9 w-[140px] text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {PROPERTY_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Property Sub-Type */}
              <Select
                value={typeFilter}
                onValueChange={(v) => { setTypeFilter(v); setPageState(1) }}
              >
                <SelectTrigger className="h-9 w-[150px] text-sm">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {PROPERTY_SUB_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Listing Type */}
              <Select
                value={listingFilter}
                onValueChange={(v) => { setListingFilter(v); setPageState(1) }}
              >
                <SelectTrigger className="h-9 w-[140px] text-sm">
                  <SelectValue placeholder="Listing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  {LISTING_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Search */}
              <div className="relative w-[240px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  className="h-9 pl-9 text-sm"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPageState(1) }}
                />
              </div>
            </div>

            {/* Refresh */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => load()}
              disabled={loading}
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative w-full overflow-x-auto">
            <Table className="min-w-[860px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5">Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                ) : properties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Building2 className="h-8 w-8 opacity-30" />
                        <p className="text-sm">No properties found.</p>
                        {hasActiveFilters && (
                          <Button
                            variant="link"
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              setSearch("")
                              setStatusFilter("all")
                              setTypeFilter("all")
                              setListingFilter("all")
                              setPageState(1)
                            }}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  properties.map((property) => (
                    <TableRow
                      key={property.id}
                      className={`group transition-all duration-200 hover:bg-muted/40 ${deletingId === property.id ? "bg-muted/40 opacity-70" : ""}`}
                    >
                      {/* Title */}
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium leading-tight line-clamp-1 max-w-[200px]">{property.title}</p>
                            {property.internal_reference && (
                              <p className="text-xs text-muted-foreground">Ref: {property.internal_reference}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Type */}
                      <TableCell>
                        <span className="text-sm">{formatSubType(property.classification?.sub_type)}</span>
                      </TableCell>

                      {/* Listing */}
                      <TableCell>
                        <ListingBadge type={property.classification?.transaction_type} />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={property.classification?.listing_status ?? "draft"} />
                      </TableCell>

                      {/* Price */}
                      <TableCell>
                        <span className="text-sm font-medium">
                          {property.pricing?.price
                            ? `${property.pricing.currency ?? "CHF"} ${Number(property.pricing.price).toLocaleString()}`
                            : "—"}
                        </span>
                      </TableCell>

                      {/* Location */}
                      <TableCell>
                        <p
                          className="max-w-[180px] truncate text-sm text-muted-foreground"
                          title={[property.location?.city, property.location?.state].filter(Boolean).join(", ") || property.location?.address_line_1 || "—"}
                        >
                          {[property.location?.city, property.location?.state].filter(Boolean).join(", ") || property.location?.address_line_1 || "—"}
                        </p>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="pr-5 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                              disabled={deletingId === property.id}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem asChild>
                              <Link to={`/properties/view/${property.id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link to={`/properties/edit/${property.id}`} className="flex items-center">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Property
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-500/10"
                              onClick={() => setPendingDelete(property)}
                              disabled={deletingId === property.id}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {deletingId === property.id ? "Deleting..." : "Delete Property"}
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
          <div className="flex items-center justify-between border-t px-5 py-3">
            <p className="text-sm text-muted-foreground">
              {totalProps === 0
                ? "No results"
                : `Showing ${(currentPage - 1) * meta.per_page + 1}–${Math.min(currentPage * meta.per_page, totalProps)} of ${totalProps} properties`}
            </p>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setPageState((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1 || loading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = i + 1
                return (
                  <Button
                    key={pg}
                    variant={pg === currentPage ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8 rounded-full text-xs"
                    onClick={() => setPageState(pg)}
                    disabled={loading}
                  >
                    {pg}
                  </Button>
                )
              })}
              {totalPages > 5 && (
                <span className="px-1 text-muted-foreground text-sm">…</span>
              )}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setPageState((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages || loading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setPendingDelete(null)
          }
        }}
      >
        <AlertDialogContent className="max-w-md overflow-hidden rounded-5xl border border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-[#111827]">
          <AnimatePresence mode="wait">
            {!!pendingDelete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
              >
                {/* Top decorative background */}
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 px-6 pb-8 pt-7 dark:from-red-950/30 dark:via-rose-950/20 dark:to-orange-950/20">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-red-200/40 blur-2xl dark:bg-red-900/30" />
                  <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-orange-200/40 blur-2xl dark:bg-orange-900/20" />

                  <div className="relative flex items-start justify-between">
                    <motion.div
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        delay: 0.08,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/30"
                    >
                      <AlertTriangle className="h-7 w-7" />
                    </motion.div>

                    <AlertDialogCancel
                      disabled={deleting}
                      className="h-9 w-9 rounded-xl border-0 bg-white/70 p-0 text-slate-500 shadow-sm transition-all hover:bg-white hover:text-slate-900 dark:bg-slate-900/70 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </AlertDialogCancel>
                  </div>

                  <AlertDialogHeader className="relative mt-6 space-y-2 text-left">
                    <AlertDialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Delete Property?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                      This property will be permanently removed from your dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>

                {/* Property information */}
                <div className="px-6 py-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm dark:bg-slate-800">
                        <Building2 className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          Property selected
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {pendingDelete.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Once deleted, property details, documents, media, and related
                    records cannot be restored.
                  </p>
                </div>

                {/* Actions */}
                <AlertDialogFooter className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-900/40">
                  <AlertDialogCancel
                    disabled={deleting}
                    className="h-11 rounded-xl border-slate-200 px-5 font-medium text-slate-700 transition-all hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    Keep Property
                  </AlertDialogCancel>

                  <AlertDialogAction
                    disabled={deleting}
                    onClick={handleDelete}
                    className="h-11 rounded-xl bg-red-600 px-5 font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-500/30 focus-visible:ring-red-500"
                  >
                    {deleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting Property...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Property
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
