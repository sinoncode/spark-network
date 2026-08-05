"use client"

import React, { Suspense, lazy } from "react"
// import Breadcrumb from "@/layouts/Breadcrumb"

// Clean default-based lazy imports
const ActiveRequestsCard = lazy(() =>
  import("./components/ActiveRequestsCard")
)

const ActivePropertiesCard = lazy(() =>
  import("./components/ActivePropertiesCard")
)

const CompletedActivitiesCard = lazy(() =>
  import("./components/CompletedActivitiesCard")
)

const ContactsCard = lazy(() =>
  import("./components/ContactsCard")
)

const PropertyTransactionsChart = lazy(() =>
  import("./components/PropertyTransactionsChart")
)

const NewVsReturningLeads = lazy(() =>
  import("./components/NewVsReturningLeads")
)

const ActivityCompletionRadial = lazy(() =>
  import("./components/ActivityCompletionRadial")
)

const LeadSourcesCard = lazy(() =>
  import("./components/LeadSourcesCard")
)

const RecentActivityTable = lazy(() =>
  import("./components/RecentActivityTable")
)

// Skeleton
function CardSkeleton({ height = 250 }: { height?: number }) {
  return (
    <div
      className="w-full rounded-xl bg-gray-100 dark:bg-neutral-800 animate-pulse"
      style={{ height }}
    />
  )
}

export default function RealEstateDashboard() {
  return (
    <>
      {/* <Breadcrumb title="Dashboard" text="Real Estate Management Overview" /> */}

      <div className="space-y-6 crm-dashboard-wrapper mt-6">

        {/* Top Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Suspense fallback={<CardSkeleton height={160} />}>
            <ActiveRequestsCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton height={160} />}>
            <ActivePropertiesCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton height={160} />}>
            <CompletedActivitiesCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton height={160} />}>
            <ContactsCard />
          </Suspense>
        </div>

        {/* Large Chart — Property Transactions */}
        <Suspense fallback={<CardSkeleton height={400} />}>
          <PropertyTransactionsChart />
        </Suspense>

        {/* Mid Section — 3 columns */}
        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <Suspense fallback={<CardSkeleton height={280} />}>
              <NewVsReturningLeads />
            </Suspense>
          </div>

          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <Suspense fallback={<CardSkeleton height={280} />}>
              <ActivityCompletionRadial />
            </Suspense>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <Suspense fallback={<CardSkeleton height={280} />}>
              <LeadSourcesCard />
            </Suspense>
          </div>

        </div>

        {/* Bottom Section — Recent Activity Table */}
        <Suspense fallback={<CardSkeleton height={400} />}>
          <RecentActivityTable />
        </Suspense>

      </div>
    </>
  )
}
