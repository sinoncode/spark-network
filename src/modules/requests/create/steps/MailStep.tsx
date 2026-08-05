import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Mail, Send, X, Clock, Calendar, User, ChevronDown, ChevronUp, 
  Paperclip, Eye, Reply, Forward, Trash2, Star, StarOff,
  MailOpen, MailWarning, MailCheck, PenSquare, Loader2,
  FileText, ArrowRight, AlertCircle, Inbox
} from "lucide-react"

import EmailComposePage from "@/modules/emails/pages/Emailcompose"

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════
interface EmailRecord {
  id: string
  date: string
  time: string
  sender: {
    name: string
    email: string
    avatar?: string
    role: string
  }
  recipient: {
    name: string
    email: string
  }
  subject: string
  body: string
  status: "sent" | "draft" | "scheduled" | "failed" | "read" | "unread"
  priority: "low" | "normal" | "high" | "urgent"
  hasAttachments: boolean
  attachmentCount?: number
  tags?: string[]
  isStarred?: boolean
}

interface EmailTimelineProps {
  emails: EmailRecord[]
  onEmailClick?: (email: EmailRecord) => void
  onReply?: (email: EmailRecord) => void
  onForward?: (email: EmailRecord) => void
  onDelete?: (emailId: string) => void
  onStar?: (emailId: string, starred: boolean) => void
}



// ═══════════════════════════════════════════════════════════════
// SAMPLE DATA
// ═══════════════════════════════════════════════════════════════
const sampleEmails: EmailRecord[] = [
  {
    id: "em-001",
    date: "2026-07-20",
    time: "10:30",
    sender: { name: "Sarah Mitchell", email: "sarah.m@agency.com", role: "Senior Agent" },
    recipient: { name: "John Doe", email: "john.doe@email.com" },
    subject: "Property Viewing Confirmation - Downtown Apartment",
    body: "Dear John,\n\nI hope this email finds you well. I am writing to confirm our property viewing appointment scheduled for tomorrow at 2:00 PM. The downtown apartment you expressed interest in is located at 45 Rue du Commerce, Geneva.\n\nPlease let me know if you need any directions or have any questions before the viewing. I have attached the property brochure and floor plan for your reference.\n\nLooking forward to seeing you tomorrow.\n\nBest regards,\nSarah Mitchell\nSenior Property Agent",
    status: "sent",
    priority: "high",
    hasAttachments: true,
    attachmentCount: 2,
    tags: ["viewing", "follow-up"],
    isStarred: true
  },
  {
    id: "em-002",
    date: "2026-07-20",
    time: "09:15",
    sender: { name: "James Rodriguez", email: "james.r@agency.com", role: "Property Consultant" },
    recipient: { name: "John Doe", email: "john.doe@email.com" },
    subject: "Re: Financing Options Discussion",
    body: "Hi John,\n\nThank you for your email regarding the financing options. I have spoken with our mortgage partner and they have confirmed the following rates for your situation:\n\n• Fixed Rate: 3.2% for 10 years\n• Variable Rate: 2.8% (current)\n• Mixed Rate: 3.0% with flexibility\n\nBased on your pre-approval amount of CHF 850,000, your monthly payments would range between CHF 3,200 - 3,800 depending on the option you choose.\n\nWould you like to schedule a call to discuss these options in detail?\n\nRegards,\nJames",
    status: "read",
    priority: "normal",
    hasAttachments: false,
    tags: ["financing", "follow-up"]
  },
  {
    id: "em-003",
    date: "2026-07-19",
    time: "16:45",
    sender: { name: "Emily Chen", email: "emily.c@agency.com", role: "Lead Agent" },
    recipient: { name: "John Doe", email: "john.doe@email.com" },
    subject: "New Listings Matching Your Criteria",
    body: "Hello John,\n\nI wanted to reach out as we have 3 new properties that match your search criteria:\n\n1. Lakeside Villa - 4 bed, 3 bath, CHF 1,200,000\n2. Garden Apartment - 2 bed, 2 bath, CHF 680,000\n3. Penthouse Suite - 3 bed, 2 bath, CHF 950,000\n\nAll three properties are in your preferred neighborhoods and within your budget range. I have attached detailed information for each.\n\nPlease let me know which ones you'd like to view and I can arrange appointments.\n\nBest,\nEmily",
    status: "unread",
    priority: "normal",
    hasAttachments: true,
    attachmentCount: 3,
    tags: ["new-listing", "matching"]
  },
  {
    id: "em-004",
    date: "2026-07-19",
    time: "11:20",
    sender: { name: "Sarah Mitchell", email: "sarah.m@agency.com", role: "Senior Agent" },
    recipient: { name: "John Doe", email: "john.doe@email.com" },
    subject: "Follow-up: Property Inspection Results",
    body: "Dear John,\n\nThe property inspection for the Riverside property has been completed. Here are the key findings:\n\n✓ Structural integrity: Excellent\n✓ Electrical systems: Up to code\n⚠ Plumbing: Minor leak in guest bathroom (estimated fix: CHF 800)\n✓ Heating system: Recently serviced\n\nThe seller has agreed to address the plumbing issue before closing. I recommend we proceed with the offer.\n\nPlease review the full inspection report attached and let me know your thoughts.\n\nSarah",
    status: "read",
    priority: "urgent",
    hasAttachments: true,
    attachmentCount: 1,
    tags: ["inspection", "urgent"],
    isStarred: true
  },
  {
    id: "em-005",
    date: "2026-07-18",
    time: "14:00",
    sender: { name: "James Rodriguez", email: "james.r@agency.com", role: "Property Consultant" },
    recipient: { name: "John Doe", email: "john.doe@email.com" },
    subject: "Meeting Notes - July 18th Consultation",
    body: "Hi John,\n\nThank you for meeting with me today. As discussed, here is a summary of our conversation:\n\n• Budget confirmed: CHF 800,000 - 1,200,000\n• Preferred areas: Downtown, Lakeside, Old Town\n• Must-haves: 2+ bedrooms, parking, balcony\n• Timeline: Looking to move within 3 months\n\nI will send you a curated list of properties by end of week. In the meantime, please complete the attached buyer questionnaire so I can refine my search.\n\nJames",
    status: "sent",
    priority: "normal",
    hasAttachments: true,
    attachmentCount: 1,
    tags: ["meeting-notes", "buyer-profile"]
  },
  {
    id: "em-006",
    date: "2026-07-17",
    time: "08:30",
    sender: { name: "Emily Chen", email: "emily.c@agency.com", role: "Lead Agent" },
    recipient: { name: "John Doe", email: "john.doe@email.com" },
    subject: "Welcome to Our Agency - Getting Started",
    body: "Dear John,\n\nWelcome! We're thrilled to help you find your perfect home.\n\nTo get started, I've prepared a welcome packet with:\n\n• Our agency services overview\n• Buyer guide and checklist\n• Market report for your target areas\n• List of recommended mortgage brokers\n\nPlease take a moment to review these materials. Your dedicated agent will contact you within 24 hours to schedule an initial consultation.\n\nWelcome aboard!\n\nEmily Chen\nLead Agent",
    status: "read",
    priority: "low",
    hasAttachments: true,
    attachmentCount: 4,
    tags: ["welcome", "onboarding"]
  }
]



// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (dateStr === today.toISOString().split('T')[0]) return "Today"
  if (dateStr === yesterday.toISOString().split('T')[0]) return "Yesterday"

  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const getStatusConfig = (status: EmailRecord["status"]) => {
  const configs = {
    sent: { 
      icon: Send, 
      color: "text-blue-500 dark:text-blue-400", 
      bg: "bg-blue-50 dark:bg-blue-500/15", 
      border: "border-blue-200 dark:border-blue-500/30", 
      label: "Sent" 
    },
    draft: { 
      icon: PenSquare, 
      color: "text-amber-500 dark:text-amber-400", 
      bg: "bg-amber-50 dark:bg-amber-500/15", 
      border: "border-amber-200 dark:border-amber-500/30", 
      label: "Draft" 
    },
    scheduled: { 
      icon: Clock, 
      color: "text-purple-500 dark:text-purple-400", 
      bg: "bg-purple-50 dark:bg-purple-500/15", 
      border: "border-purple-200 dark:border-purple-500/30", 
      label: "Scheduled" 
    },
    failed: { 
      icon: AlertCircle, 
      color: "text-red-500 dark:text-red-400", 
      bg: "bg-red-50 dark:bg-red-500/15", 
      border: "border-red-200 dark:border-red-500/30", 
      label: "Failed" 
    },
    read: { 
      icon: MailOpen, 
      color: "text-emerald-500 dark:text-emerald-400", 
      bg: "bg-emerald-50 dark:bg-emerald-500/15", 
      border: "border-emerald-200 dark:border-emerald-500/30", 
      label: "Read" 
    },
    unread: { 
      icon: Mail, 
      color: "text-slate-500 dark:text-slate-400", 
      bg: "bg-slate-50 dark:bg-slate-500/15", 
      border: "border-slate-200 dark:border-slate-500/30", 
      label: "Unread" 
    }
  }
  return configs[status]
}

const getPriorityColor = (priority: EmailRecord["priority"]) => {
  const colors = {
    low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    normal: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    high: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    urgent: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
  }
  return colors[priority]
}

const getPriorityIcon = (priority: EmailRecord["priority"]) => {
  if (priority === "urgent") return <MailWarning className="h-3.5 w-3.5" />
  if (priority === "high") return <AlertCircle className="h-3.5 w-3.5" />
  return null
}

const truncateBody = (body: string, maxLength: number = 120) => {
  const cleanBody = body.replace(/\n/g, ' ').trim()
  if (cleanBody.length <= maxLength) return cleanBody
  return cleanBody.substring(0, maxLength) + "..."
}

// ═══════════════════════════════════════════════════════════════
// EMAIL COMPOSE POPUP (Dark Mode Compatible)
// ═══════════════════════════════════════════════════════════════
// function EmailComposePopup({ 
//   isOpen, 
//   onClose, 
//   onSend,
//   replyTo 
// }: { 
//   isOpen: boolean
//   onClose: () => void
//   onSend: (email: Partial<EmailRecord>) => void
//   replyTo?: EmailRecord
// }) {
//   const [to, setTo] = useState(replyTo?.sender.email || "")
//   const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : "")
//   const [body, setBody] = useState("")
//   const [isSending, setIsSending] = useState(false)
//   const textareaRef = useRef<HTMLTextAreaElement>(null)

//   useEffect(() => {
//     if (isOpen && textareaRef.current) {
//       textareaRef.current.focus()
//     }
//   }, [isOpen])

//   const handleSend = async () => {
//     if (!to || !subject || !body) return
//     setIsSending(true)
//     await new Promise(r => setTimeout(r, 800))

//     onSend({
//       sender: { name: "You", email: "you@agency.com", role: "Agent" },
//       recipient: { name: to.split('@')[0], email: to },
//       subject,
//       body,
//       status: "sent",
//       priority: "normal",
//       hasAttachments: false,
//       date: new Date().toISOString().split('T')[0],
//       time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
//     })

//     setIsSending(false)
//     setTo("")
//     setSubject("")
//     setBody("")
//     onClose()
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-black/50 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-slate-200 dark:border-slate-700">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
//               <PenSquare className="h-5 w-5 text-white" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
//                 {replyTo ? "Reply to Email" : "Compose Email"}
//               </h3>
//               <p className="text-xs text-slate-500 dark:text-slate-400">
//                 {replyTo ? `Re: ${replyTo.subject}` : "Create a new email"}
//               </p>
//             </div>
//           </div>
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//             onClick={onClose}
//           >
//             <X className="h-5 w-5 text-slate-400 dark:text-slate-500" />
//           </Button>
//         </div>

//         {/* Form */}
//         <div className="p-6 space-y-4">
//           <div className="space-y-1.5">
//             <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">To</Label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
//               <Input 
//                 value={to}
//                 onChange={(e) => setTo(e.target.value)}
//                 placeholder="recipient@email.com"
//                 className="pl-10 h-11 rounded-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-400 focus:ring-blue-400/20 placeholder:text-slate-400 dark:placeholder:text-slate-500"
//               />
//             </div>
//           </div>

//           <div className="space-y-1.5">
//             <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject</Label>
//             <Input 
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Enter subject..."
//               className="h-11 rounded-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-400 focus:ring-blue-400/20 placeholder:text-slate-400 dark:placeholder:text-slate-500"
//             />
//           </div>

//           <div className="space-y-1.5">
//             <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</Label>
//             <Textarea
//               ref={textareaRef}
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               placeholder="Write your message here..."
//               rows={8}
//               className="rounded-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-400 focus:ring-blue-400/20 resize-none text-sm leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500"
//             />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
//               <Paperclip className="h-4 w-4 mr-1.5" />
//               Attach
//             </Button>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" onClick={onClose} className="rounded-xl border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
//               Discard
//             </Button>
//             <Button 
//               onClick={handleSend}
//               disabled={!to || !subject || !body || isSending}
//               className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50"
//             >
//               {isSending ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   <Send className="h-4 w-4 mr-2" />
//                   Send Email
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// ═══════════════════════════════════════════════════════════════
// EMAIL TIMELINE ITEM (Dark Mode Compatible)
// ═══════════════════════════════════════════════════════════════


function EmailTimelineItem({ 
  email, 
  isLast,
  onEmailClick,
  onReply,
  onForward,
  onDelete,
  onStar
}: { 
  email: EmailRecord
  isLast: boolean
  onEmailClick?: (email: EmailRecord) => void
  onReply?: (email: EmailRecord) => void
  onForward?: (email: EmailRecord) => void
  onDelete?: (emailId: string) => void
  onStar?: (emailId: string, starred: boolean) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const statusConfig = getStatusConfig(email.status)
  const StatusIcon = statusConfig.icon


  
  return (
    <div className="relative flex gap-4 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[44px] w-[2px] h-[calc(100%-24px)] bg-gradient-to-b from-slate-200 dark:from-slate-700 via-slate-200/60 dark:via-slate-700/60 to-transparent" />
      )}

      {/* Timeline Node */}
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 
            transition-all duration-300 cursor-pointer
            ${isHovered || isExpanded ? 'scale-110 shadow-lg dark:shadow-black/30' : ''}
            ${email.status === 'unread' ? 'ring-2 ring-blue-400/30 dark:ring-blue-400/20 ring-offset-2 dark:ring-offset-slate-900' : ''}
            ${statusConfig.bg} ${statusConfig.border}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-6">
        <Card 
          className={`
            border-0 shadow-sm dark:shadow-black/20 transition-all duration-300 overflow-hidden
            bg-white dark:bg-slate-800
            ${isHovered ? 'shadow-md dark:shadow-black/30 ring-1 ring-blue-100/50 dark:ring-blue-500/20' : ''}
            ${isExpanded ? 'ring-1 ring-blue-200 dark:ring-blue-500/30 shadow-lg dark:shadow-black/40' : ''}
            ${email.status === 'unread' ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''}
          `}
          onMouseEnter={() => { setIsHovered(true); setShowActions(true) }}
          onMouseLeave={() => { setIsHovered(false); setShowActions(false) }}
        >
          <CardContent className="p-0">
            {/* Main Row */}
            <div 
              className="p-4 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Top Row: Meta */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-700/50 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-600">
                      <Calendar className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      {formatDate(email.date)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3" />
                      {email.time}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </span>
                    {email.priority !== "normal" && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getPriorityColor(email.priority)}`}>
                        {getPriorityIcon(email.priority)}
                        {email.priority}
                      </span>
                    )}
                    {email.isStarred && (
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    )}
                  </div>

                  {/* Sender Info */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {email.sender.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {email.sender.name}
                        <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">&lt;{email.sender.email}&gt;</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{email.sender.role}</p>
                    </div>
                  </div>

                  {/* Subject */}
                  <h4 className={`text-sm mb-1.5 ${email.status === 'unread' ? 'font-bold text-slate-900 dark:text-slate-100' : 'font-semibold text-slate-800 dark:text-slate-200'}`}>
                    {email.subject}
                  </h4>

                  {/* Body Preview */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {truncateBody(email.body)}
                  </p>

                  {/* Tags & Attachments */}
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    {email.hasAttachments && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300">
                        <Paperclip className="h-3 w-3" />
                        {email.attachmentCount} attachment{email.attachmentCount !== 1 ? 's' : ''}
                      </span>
                    )}
                    {email.tags?.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/15 text-[10px] font-medium text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Actions + Expand */}
                <div className="flex flex-col items-end gap-2">
                  {/* Quick Actions (show on hover) */}
                  <div className={`
                    flex items-center gap-1 transition-all duration-200
                    ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}
                  `}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-amber-50 dark:hover:bg-amber-500/15 hover:text-amber-500"
                      onClick={(e) => { e.stopPropagation(); onStar?.(email.id, !email.isStarred) }}
                    >
                      {email.isStarred ? 
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> : 
                        <StarOff className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                      }
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/15 hover:text-blue-500"
                      onClick={(e) => { e.stopPropagation(); onReply?.(email) }}
                    >
                      <Reply className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300"
                      onClick={(e) => { e.stopPropagation(); onForward?.(email) }}
                    >
                      <Forward className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-red-50 dark:hover:bg-red-500/15 hover:text-red-500"
                      onClick={(e) => { e.stopPropagation(); onDelete?.(email.id) }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Expanded Full Content */}
            <div 
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-700">
                {/* Full Email Body */}
                <div className="bg-slate-50/50 dark:bg-slate-700/20 rounded-xl p-4 mt-3 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      Email Content
                    </h5>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/15"
                      onClick={() => onEmailClick?.(email)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {email.body}
                    </p>
                  </div>
                </div>
                {/* Action Bar */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                  
                  <Button 
                    size="sm"
                    onClick={() => onEmailClick?.(email)}
                  >
                    Open Full Email
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN EMAIL TIMELINE COMPONENT (Dark Mode Compatible)
// ═══════════════════════════════════════════════════════════════
const myEmails = [
  {
    id: "1",
    date: "2026-07-20",
    time: "10:30",
    sender: { name: "Agent Name", email: "agent@agency.com", role: "Senior Agent" },
    recipient: { name: "Client Name", email: "client@email.com" },
    subject: "Your Subject",
    body: "Email body content...",
    status: "sent",
    priority: "normal",
    hasAttachments: false
  }
]


export default function EmailTimeline({ 
  emails = sampleEmails,
  onEmailClick,
  onReply,
  onForward,
  onDelete,
  onStar
}: EmailTimelineProps) {
  const [composeOpen, setComposeOpen] = useState(false)
  const [replyToEmail, setReplyToEmail] = useState<EmailRecord | undefined>()
  const [emailList, setEmailList] = useState<EmailRecord[]>(emails)

  const sortedEmails = [...emailList].sort((a, b) => 
    new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime()
  )

  const groupedByDate = sortedEmails.reduce((acc, email) => {
    if (!acc[email.date]) acc[email.date] = []
    acc[email.date].push(email)
    return acc
  }, {} as Record<string, EmailRecord[]>)

  const handleSend = (newEmail: Partial<EmailRecord>) => {
    const email: EmailRecord = {
      id: `em-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      sender: newEmail.sender || { name: "You", email: "you@agency.com", role: "Agent" },
      recipient: newEmail.recipient || { name: "", email: "" },
      subject: newEmail.subject || "",
      body: newEmail.body || "",
      status: "sent",
      priority: "normal",
      hasAttachments: false,
      ...newEmail
    } as EmailRecord

    setEmailList(prev => [email, ...prev])
  }

  const handleReply = (email: EmailRecord) => {
    setReplyToEmail(email)
    setComposeOpen(true)
  }

  const handleCloseCompose = () => {
    setComposeOpen(false)
    setReplyToEmail(undefined)
  }

  const handleStar = (emailId: string, starred: boolean) => {
    setEmailList(prev => prev.map(e => e.id === emailId ? { ...e, isStarred: starred } : e))
  }

  const handleDelete = (emailId: string) => {
    setEmailList(prev => prev.filter(e => e.id !== emailId))
  }

  const unreadCount = emailList.filter(e => e.status === 'unread').length
  const totalCount = emailList.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Email History</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {totalCount} emails • {unreadCount} unread
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-medium">
            <Mail className="h-3.5 w-3.5" />
            {emailList.filter(e => e.status === 'sent').length} Sent
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
            <MailCheck className="h-3.5 w-3.5" />
            {emailList.filter(e => e.status === 'read').length} Read
          </div>
          <Button 
            onClick={() => setComposeOpen(true)}
          >
            <PenSquare className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {Object.entries(groupedByDate).map(([date, dateEmails]) => (
          <div key={date} className="mb-8 last:mb-0">
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-sm">
                {formatDate(date)}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent" />
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {dateEmails.length} email{dateEmails.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Emails for this date */}
            <div className="space-y-4">
              {dateEmails.map((email, index) => (
                <EmailTimelineItem 
                  key={email.id} 
                  email={email} 
                  isLast={index === dateEmails.length - 1 && date === Object.keys(groupedByDate)[Object.keys(groupedByDate).length - 1]}
                  onEmailClick={onEmailClick}
                  onReply={handleReply}
                  onForward={onForward}
                  onDelete={handleDelete}
                  onStar={handleStar}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Compose Popup */}
    {/* <Card className="border-0 shadow-sm rounded-2xl">
  <CardContent className="p-6">
    <EmailComposePage />
  </CardContent>
</Card> */}
    </div>
  )
}
