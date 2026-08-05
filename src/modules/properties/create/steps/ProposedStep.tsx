import {
  CalendarDays,
  Users,
  HandCoins,
  FileText,
  DollarSign,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const proposedBuyers = [
  {
    id: 1,
    name: "John Anderson",
    offer: "$1,250,000",
    status: "Negotiating",
    score: 95,
  },
  {
    id: 2,
    name: "Sarah Williams",
    offer: "$1,220,000",
    status: "Offer Submitted",
    score: 89,
  },
  {
    id: 3,
    name: "Michael Chen",
    offer: "$1,180,000",
    status: "Interested",
    score: 82,
  },
]

const scheduledViewings = [
  {
    date: "12 Jun 2026",
    time: "10:00 AM",
    client: "John Anderson",
  },
  {
    date: "14 Jun 2026",
    time: "04:30 PM",
    client: "Sarah Williams",
  },
]

const dealTimeline = [
  {
    title: "Property Created",
    completed: true,
  },
  {
    title: "Listing Published",
    completed: true,
  },
  {
    title: "Lead Assigned",
    completed: true,
  },
  {
    title: "Viewing Scheduled",
    completed: true,
  },
  {
    title: "Offer Submitted",
    completed: true,
  },
  {
    title: "Negotiation",
    completed: false,
  },
  {
    title: "Closing",
    completed: false,
  },
]

export default function ProposedStep() {
  return (
    <div className="space-y-6">
      {/* Deal Overview */}

      <Card>
        <CardHeader>
          <CardTitle>
            Deal Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Total Interested Buyers
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                12
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Active Offers
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                3
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Highest Offer
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                $1.25M
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Deal Probability
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">
                87%
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposed Buyers */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Proposed Buyers
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {proposedBuyers.map((buyer) => (
            <div
              key={buyer.id}
              className="
                rounded-xl
                border
                p-5
                transition-all
                hover:shadow-md
              "
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-semibold">
                    {buyer.name}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    Compatibility Score
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge>
                    {buyer.offer}
                  </Badge>

                  <Badge variant="secondary">
                    {buyer.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-4">
                <Progress value={buyer.score} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Viewing Schedule */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Scheduled Viewings
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {scheduledViewings.map((item, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-4
              "
            >
              <div>
                <h4 className="font-medium">
                  {item.client}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {item.date} • {item.time}
                </p>
              </div>

              <Clock3 className="h-5 w-5 text-primary" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Negotiation Status */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandCoins className="h-5 w-5 text-primary" />
            Negotiation Status
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between">
                <span>Negotiation Progress</span>
                <span>75%</span>
              </div>

              <Progress value={75} />
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Latest Update
              </p>

              <p className="mt-2">
                Buyer requested minor adjustments in
                final pricing. Negotiation expected
                to close within 3-5 business days.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commission Calculator */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Commission Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Property Value
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                $1,250,000
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Commission %
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                2%
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Estimated Earnings
              </p>

              <h3 className="mt-2 text-2xl font-bold text-green-600">
                $25,000
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Timeline */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Deal Progress
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {dealTimeline.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <CheckCircle2
                className={`h-5 w-5 ${
                  step.completed
                    ? "text-green-500"
                    : "text-muted-foreground"
                }`}
              />

              <span
                className={
                  step.completed
                    ? ""
                    : "text-muted-foreground"
                }
              >
                {step.title}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Internal Notes */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Internal Notes
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>
              Notes For Team / Managers
            </Label>

            <Textarea
              rows={6}
              placeholder="Add negotiation updates, buyer feedback, concerns, approvals, next actions..."
            />
          </div>

          <Button>
            Save Notes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}