import { useCallback, useEffect, useState } from "react"
import { format, isValid, parseISO } from "date-fns"
import { AlertTriangle, CalendarDays, ChevronLeft, ChevronRight, Flag, UserRound } from "lucide-react"
import type { PostReport } from "@/types/Post/post"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PostReportsProps {
  reports: PostReport[]
}

const formatLabel = (value: string) =>
  value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase())

const formatReportDate = (value?: string) => {
  if (!value) return "Date unavailable"
  const date = parseISO(value)
  return isValid(date) ? format(date, "MMM d, yyyy 'at' h:mm a") : "Date unavailable"
}

const getReporterName = (report: PostReport) =>
  report.reporter?.displayName ||
  (report.reporter?.username ? `@${report.reporter.username}` : null) ||
  "Unknown reporter"

export function PostReports({ reports }: PostReportsProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [selectedReport, setSelectedReport] = useState<PostReport | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleCarouselApi = useCallback((api: CarouselApi) => {
    setCarouselApi(api)
  }, [])

  useEffect(() => {
    if (!carouselApi) return

    const updateActiveIndex = () =>
      setActiveIndex(carouselApi.selectedScrollSnap())
    updateActiveIndex()
    carouselApi.on("select", updateActiveIndex)

    return () => {
      carouselApi.off("select", updateActiveIndex)
    }
  }, [carouselApi])

  return (
    <>
      <section className="glass-card rounded-2xl border border-rose-100 p-5 shadow-sm dark:border-rose-900/40 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
              <Flag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Post Reports</h2>
              <p className="text-xs text-muted-foreground">
                {reports.length} {reports.length === 1 ? "report" : "reports"} submitted
              </p>
            </div>
          </div>
          {reports.length > 1 && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                aria-label="Previous report"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!carouselApi?.canScrollPrev()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-12 text-center text-xs tabular-nums text-muted-foreground">
                {activeIndex + 1} / {reports.length}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                aria-label="Next report"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!carouselApi?.canScrollNext()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {reports.length === 0 ? (
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 p-5 text-sm text-muted-foreground dark:border-slate-700">
            <Flag className="h-4 w-4 shrink-0" />
            No report details are available for this post.
          </div>
        ) : (
          <Carousel
            opts={{ align: "start", loop: false }}
            setApi={handleCarouselApi}
          >
            <CarouselContent className="-ml-3">
              {reports.map((report, index) => (
                <CarouselItem
                  key={report.id || `${report.reporterId}-${index}`}
                  className={`pl-3 ${reports.length > 1 ? "md:basis-1/2" : "md:basis-full"}`}
                >
                  <article className="flex h-full flex-col rounded-xl border border-slate-200/80 bg-white/70 p-4 transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/40">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
                          <UserRound className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {getReporterName(report)}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {report.reporter?.id || report.reporterId || "Reporter ID unavailable"}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0 capitalize">
                        {formatLabel(report.status || "pending")}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Reason
                      </p>
                      <p className="flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-300">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {formatLabel(report.reason || "Not specified")}
                      </p>
                    </div>

                    <p className="mb-4 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
                      {report.description?.trim() || "No additional details provided."}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-700">
                      <span className="flex min-w-0 items-center gap-1.5 truncate text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        {formatReportDate(report.createdAt)}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0 rounded-lg"
                        onClick={() => setSelectedReport(report)}
                      >
                        View report
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </section>

      <Dialog
        open={selectedReport !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedReport(null)
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
          {selectedReport && (
            <>
              <DialogHeader className="pr-6">
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
                  <Flag className="h-5 w-5" />
                </div>
                <DialogTitle>Report details</DialogTitle>
                <DialogDescription>
                  Full information submitted for this post report.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-4 dark:border-rose-900/50 dark:bg-rose-500/5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Report reason
                    </p>
                    <Badge variant="outline" className="capitalize">
                      {formatLabel(selectedReport.status || "pending")}
                    </Badge>
                  </div>
                  <p className="text-base font-semibold text-rose-800 dark:text-rose-200">
                    {formatLabel(selectedReport.reason || "Not specified")}
                  </p>
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Reporter
                  </h3>
                  <p className="text-sm font-semibold">{getReporterName(selectedReport)}</p>
                  {selectedReport.reporter?.username && selectedReport.reporter.displayName && (
                    <p className="text-sm text-muted-foreground">
                      @{selectedReport.reporter.username}
                    </p>
                  )}
                  {selectedReport.reporter?.email && (
                    <p className="break-all text-sm text-muted-foreground">
                      {selectedReport.reporter.email}
                    </p>
                  )}
                  {selectedReport.reporter?.role && (
                    <p className="text-sm text-muted-foreground">
                      Role: {formatLabel(selectedReport.reporter.role)}
                    </p>
                  )}
                  <p className="break-all text-xs text-muted-foreground">
                    Reporter ID: {selectedReport.reporter?.id || selectedReport.reporterId || "Unavailable"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </h3>
                  <p className="whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm leading-relaxed dark:bg-slate-800/60">
                    {selectedReport.description?.trim() || "No additional details provided."}
                  </p>
                </div>

                <div className="grid gap-3 rounded-xl border border-slate-200 p-4 text-xs dark:border-slate-700 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 font-semibold uppercase tracking-wide text-muted-foreground">
                      Submitted
                    </p>
                    <p>{formatReportDate(selectedReport.createdAt)}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold uppercase tracking-wide text-muted-foreground">
                      Report ID
                    </p>
                    <p className="break-all">{selectedReport.id || "Unavailable"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="mb-1 font-semibold uppercase tracking-wide text-muted-foreground">
                      Post ID
                    </p>
                    <p className="break-all">{selectedReport.postId || "Unavailable"}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
