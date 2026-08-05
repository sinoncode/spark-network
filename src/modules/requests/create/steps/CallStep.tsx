import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Clock, User, Calendar, ChevronDown, ChevronUp, Headphones, Mic, PhoneOff, PhoneIncoming, PhoneOutgoing, Voicemail, MessageSquare, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { useRequestCreationStore } from "../store/requestCreationStore"

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface CallRecord {
  id: string
  date: string        // ISO date string
  time: string        // HH:mm format
  duration: string    // e.g., "4:32"
  durationSeconds: number
  agent: {
    name: string
    avatar?: string
    role: string
  }
  type: "incoming" | "outgoing" | "missed" | "voicemail"
  status: "completed" | "missed" | "failed" | "scheduled"
  notes?: string
  outcome?: "interested" | "not_interested" | "callback" | "no_answer" | "appointment_set"
  phoneNumber: string
}

interface ContactStepProps {
  onSave: () => void
  isSubmitting: boolean
  onCancel: () => void
  onNext: () => void
}

// ─────────────────────────────────────────────────────────────
// SAMPLE DATA (Replace with your actual data source)
// ─────────────────────────────────────────────────────────────
const sampleCallHistory: CallRecord[] = [
  {
    id: "1",
    date: "2026-07-20",
    time: "09:45",
    duration: "4:32",
    durationSeconds: 272,
    agent: { name: "Sarah Mitchell", role: "Senior Agent" },
    type: "outgoing",
    status: "completed",
    notes: "Client expressed interest in the downtown property. Scheduled follow-up for next week.",
    outcome: "interested",
    phoneNumber: "+91 8459 9845 87"
  },
  {
    id: "2",
    date: "2026-07-19",
    time: "14:22",
    duration: "2:15",
    durationSeconds: 135,
    agent: { name: "James Rodriguez", role: "Property Consultant" },
    type: "incoming",
    status: "completed",
    notes: "Inquiry about pricing and availability. Sent brochure via email.",
    outcome: "appointment_set",
    phoneNumber: "+91 9855 8565 23"
  },
  {
    id: "3",
    date: "2026-07-18",
    time: "11:08",
    duration: "0:45",
    durationSeconds: 45,
    agent: { name: "Emily Chen", role: "Lead Agent" },
    type: "outgoing",
    status: "completed",
    notes: "Quick check-in. Client busy, requested callback tomorrow.",
    outcome: "callback",
    phoneNumber: "+91 8459 9845 87"
  },
  {
    id: "4",
    date: "2026-07-17",
    time: "16:30",
    duration: "0:00",
    durationSeconds: 0,
    agent: { name: "Sarah Mitchell", role: "Senior Agent" },
    type: "outgoing",
    status: "missed",
    notes: "No answer. Left voicemail with contact details.",
    outcome: "no_answer",
    phoneNumber: "+91 9855 8565 23"
  },
  {
    id: "5",
    date: "2026-07-15",
    time: "10:15",
    duration: "8:20",
    durationSeconds: 500,
    agent: { name: "James Rodriguez", role: "Property Consultant" },
    type: "incoming",
    status: "completed",
    notes: "Detailed discussion about financing options. Client pre-approved for loan.",
    outcome: "interested",
    phoneNumber: "+91 8459 9845 87"
  },
  {
    id: "6",
    date: "2026-07-14",
    time: "13:45",
    duration: "1:30",
    durationSeconds: 90,
    agent: { name: "Emily Chen", role: "Lead Agent" },
    type: "voicemail",
    status: "completed",
    notes: "Client left message requesting info on 3-bedroom units.",
    outcome: "callback",
    phoneNumber: "+91 9855 8565 23"
  }
]

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (dateStr === today.toISOString().split('T')[0]) return "Today"
  if (dateStr === yesterday.toISOString().split('T')[0]) return "Yesterday"

  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}

const getTypeIcon = (type: CallRecord["type"]) => {
  switch (type) {
    case "incoming": return <PhoneIncoming className="h-4 w-4" />
    case "outgoing": return <PhoneOutgoing className="h-4 w-4" />
    case "missed": return <PhoneOff className="h-4 w-4" />
    case "voicemail": return <Voicemail className="h-4 w-4" />
  }
}

const getTypeColor = (type: CallRecord["type"]) => {
  switch (type) {
    case "incoming": return "bg-emerald-500/10 text-emerald-600 border-emerald-200"
    case "outgoing": return "bg-blue-500/10 text-blue-600 border-blue-200"
    case "missed": return "bg-red-500/10 text-red-600 border-red-200"
    case "voicemail": return "bg-amber-500/10 text-amber-600 border-amber-200"
  }
}

const getStatusIcon = (status: CallRecord["status"]) => {
  switch (status) {
    case "completed": return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
    case "missed": return <XCircle className="h-3.5 w-3.5 text-red-500" />
    case "failed": return <AlertCircle className="h-3.5 w-3.5 text-orange-500" />
    case "scheduled": return <Clock className="h-3.5 w-3.5 text-blue-500" />
  }
}

const getOutcomeBadge = (outcome?: CallRecord["outcome"]) => {
  if (!outcome) return null

  const styles = {
    interested: "bg-emerald-100 text-emerald-700",
    not_interested: "bg-slate-100 text-slate-700",
    callback: "bg-amber-100 text-amber-700",
    no_answer: "bg-red-100 text-red-700",
    appointment_set: "bg-blue-100 text-blue-700"
  }

  const labels = {
    interested: "Interested",
    not_interested: "Not Interested",
    callback: "Callback",
    no_answer: "No Answer",
    appointment_set: "Appointment Set"
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[outcome]}`}>
      {labels[outcome]}
    </span>
  )
}

const getDurationColor = (seconds: number) => {
  if (seconds === 0) return "text-red-500"
  if (seconds < 60) return "text-amber-500"
  if (seconds < 180) return "text-blue-500"
  return "text-emerald-500"
}

// ─────────────────────────────────────────────────────────────
// CALL TIMELINE ITEM COMPONENT
// ─────────────────────────────────────────────────────────────
function CallTimelineItem({ call, isLast }: { call: CallRecord; isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative flex gap-4 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[40px] w-[2px] h-[calc(100%-20px)] bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />
      )}

      {/* Timeline Node */}
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 
            transition-all duration-300 cursor-pointer
            ${isHovered || isExpanded ? 'scale-110 shadow-lg' : ''}
            ${getTypeColor(call.type)}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {getTypeIcon(call.type)}
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-6">
        <Card 
          className={`
            border-0 shadow-sm transition-all duration-300 overflow-hidden
            ${isHovered ? 'shadow-md ring-1 ring-blue-100' : ''}
            ${isExpanded ? 'ring-1 ring-blue-200 shadow-lg' : ''}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="p-0">
            {/* Main Row - Always Visible */}
            <div 
              className="p-4 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/60"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Top Row: Date & Time */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {formatDate(call.date)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
                      <Clock className="h-3 w-3" />
                      {call.time}
                    </span>
                    {getStatusIcon(call.status)}
                  </div>

                  {/* Middle Row: Agent & Duration */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-xs font-bold text-white shadow-md">
                        {call.agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{call.agent.name}</p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">{call.agent.role}</p>
                      </div>
                    </div>

                    <div className="mx-1 h-8 w-px bg-slate-200 dark:bg-zinc-700" />

                    <div className="flex items-center gap-1.5">
                      <Mic className={`h-3.5 w-3.5 ${getDurationColor(call.durationSeconds)}`} />
                      <span className={`text-sm font-mono font-semibold ${getDurationColor(call.durationSeconds)}`}>
                        {call.duration}
                      </span>
                      <span className="text-xs text-slate-400">min</span>
                    </div>

                    {getOutcomeBadge(call.outcome)}
                  </div>
                </div>

                {/* Expand/Collapse Icon */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 rounded-full p-0 hover:bg-slate-100 dark:hover:bg-zinc-800"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
                  )}
                </Button>
              </div>
            </div>

            {/* Expanded Details - Hover/Click Reveal */}
            <div 
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="border-t border-slate-200 bg-slate-50/70 px-4 pb-4 pt-0 dark:border-zinc-700 dark:bg-zinc-900/60">
                <div className="grid gap-4 md:grid-cols-2 pt-4">
                  {/* Agent Details */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                      <Headphones className="h-3.5 w-3.5" />
                      Agent Details
                    </h4>
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                          {call.agent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{call.agent.name}</p>
                          <p className="text-xs text-slate-500 dark:text-zinc-400">{call.agent.role}</p>
                          <p className="mt-0.5 text-xs text-slate-400 dark:text-zinc-500">ID: AG-{call.id.padStart(4, '0')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call Details */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                      <Phone className="h-3.5 w-3.5" />
                      Call Details
                    </h4>
                    <div className="bg-transparent rounded-lg p-3 border border-slate-100 shadow-sm space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 dark:text-zinc-400">Phone Number</span>
                        <span className="text-sm font-mono font-medium text-slate-900 dark:text-white">{call.phoneNumber}</span>
                      </div>
                      <div className="h-px bg-slate-200 dark:bg-zinc-700" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 dark:text-zinc-400">Call Type</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium capitalize ${getTypeColor(call.type)}`}>
                          {getTypeIcon(call.type)}
                          {call.type}
                        </span>
                      </div>
                      <div className="h-px bg-slate-200 dark:bg-zinc-700" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 dark:text-zinc-400">Duration</span>
                        <span className={`text-sm font-mono font-semibold ${getDurationColor(call.durationSeconds)}`}>
                          {call.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN CALL TIMELINE COMPONENT
// ─────────────────────────────────────────────────────────────
function CallTimeline({ calls }: { calls: CallRecord[] }) {
  // Sort by date descending (newest first)
  const sortedCalls = [...calls].sort((a, b) => 
    new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime()
  )

  // Group by date
  const groupedByDate = sortedCalls.reduce((acc, call) => {
    const date = call.date
    if (!acc[date]) acc[date] = []
    acc[date].push(call)
    return acc
  }, {} as Record<string, CallRecord[]>)

  return (
    <div className="space-y-8">
      {/* Timeline Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Call History</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {calls.length} calls recorded • {calls.filter(c => c.status === "completed").length} completed
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            {calls.filter(c => c.type === "incoming").length} Incoming
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            {calls.filter(c => c.type === "outgoing").length} Outgoing
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {Object.entries(groupedByDate).map(([date, dateCalls]) => (
          <div key={date} className="mb-8 last:mb-0">
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold">
                {formatDate(date)}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              <span className="text-xs text-slate-400 font-medium">
                {dateCalls.length} call{dateCalls.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Calls for this date */}
            <div className="space-y-4">
              {dateCalls.map((call, index) => (
                <CallTimelineItem 
                  key={call.id} 
                  call={call} 
                  isLast={index === dateCalls.length - 1 && date === Object.keys(groupedByDate)[Object.keys(groupedByDate).length - 1]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Footer */}
      <div className="flex items-center justify-center pt-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-slate-100 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] dark:border-zinc-700 dark:bg-zinc-800">
          <Clock className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Total Duration: {Math.floor(calls.reduce((acc, c) => acc + c.durationSeconds, 0) / 60)}m {calls.reduce((acc, c) => acc + c.durationSeconds, 0) % 60}s
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN CONTACT STEP (Updated with Timeline)
// ─────────────────────────────────────────────────────────────
export default function ContactStep({ onSave, isSubmitting, onCancel, onNext }: ContactStepProps) {
  const { form, updateField } = useRequestCreationStore()

  // In real app, fetch this from your API/store
  const callHistory = sampleCallHistory

  return (
    <div className="space-y-6">
      {/* DIAL NUMBER SECTION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Dial Number
          </h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-end">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Select Number
              </label>
              <Select
                value={form.category || ""}
                onValueChange={(value) => updateField("category", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select Number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91 8459 9845 87">+91 8459 9845 87</SelectItem>
                  <SelectItem value="+91 9855 8565 23">+91 9855 8565 23</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button className="h-11 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full md:w-auto">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CALL HISTORY TIMELINE SECTION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          {/* THE TIMELINE COMPONENT */}
          <CallTimeline calls={callHistory} />
        </CardContent>
      </Card>

    </div>
  )
}
