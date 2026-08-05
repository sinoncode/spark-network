import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts"

import { PhoneCall } from "lucide-react"

const areaData = [
  { value: 30 },
  { value: 45 },
  { value: 35 },
  { value: 65 },
  { value: 40 },
  { value: 80 },
  { value: 50 },
]

export default function AreaStatsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold text-muted-foreground">
         <div className="flex items-center gap-3">
  <div
    className="
      mr-3 flex h-10 w-10 shrink-0 items-center justify-center
      rounded-full
      bg-gradient-to-br from-primary via-primary to-primary/85
      text-primary-foreground
      shadow-[0_6px_14px_rgba(0,0,0,0.16),inset_0_1px_2px_rgba(255,255,255,0.28)]
      transition-all duration-200
      hover:-translate-y-0.5
      hover:shadow-[0_10px_20px_rgba(0,0,0,0.22),inset_0_1px_2px_rgba(255,255,255,0.32)]

      dark:from-primary/90
      dark:via-primary/75
      dark:to-primary/55
      dark:text-primary-foreground/90
      dark:shadow-[0_6px_16px_rgba(0,0,0,0.45),inset_0_1px_2px_rgba(255,255,255,0.14)]
      dark:hover:shadow-[0_10px_22px_rgba(0,0,0,0.55),inset_0_1px_2px_rgba(255,255,255,0.18)]
    "
  >
    <PhoneCall
      className="
        h-5 w-5
        drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]
        dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]
      "
    />
  </div>

  <span className="font-medium text-foreground">
    Contacts
  </span>
</div> 
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold mb-2">180</h2>
          <p className="text-md text-emerald-600">
            +7.8% from last week
          </p>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
