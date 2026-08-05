import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts"

import { Settings } from "lucide-react"

const sessionsData = [
  { value: 30 },
  { value: 45 },
  { value: 20 },
  { value: 60 },
  { value: 40 },
  { value: 70 },
  { value: 50 },
]

export default function TotalSessionsCard() {
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
    <Settings
      className="
        h-5 w-5
        drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]
        dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]
      "
    />
  </div>

  <span className="font-medium text-foreground">
    Finished Activities
  </span>
</div>  
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold mb-2">4.5K</h2>
          <p className="text-md text-emerald-600">
            +8.2% from last week
          </p>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sessionsData}>
              <Line
                type="linear"
                dataKey="value"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
