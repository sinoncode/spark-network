"use client"

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVertical, Search, Eye, Pencil, Trash2, Plus, Mail, Reply, Forward, AlertCircle } from "lucide-react"

interface Email {
  id: string; subject: string; from: string; fromEmail: string
  to: string; toEmail: string
  category: "Inquiry" | "Follow-up" | "Offer" | "Support" | "Newsletter"
  folder: "Inbox" | "Sent" | "Drafts" | "Spam"
  date: string; time: string; hasAttachment: boolean
  status: "Unread" | "Read" | "Replied" | "Forwarded" | "Starred"
}

const emails: Email[] = [
  { id: "EM-001", subject: "Property Inquiry – 3BHK in Noida Sector 50", from: "Rahul Sharma", fromEmail: "rahul.s@gmail.com", to: "Agent Aarav", toEmail: "aarav@2morrow.com", category: "Inquiry", folder: "Inbox", date: "24 Jun 2026", time: "10:32 AM", hasAttachment: false, status: "Unread" },
  { id: "EM-002", subject: "Re: Site Visit Confirmation for Gurugram Villa", from: "Priya Verma", fromEmail: "priya.v@outlook.com", to: "Agent Neha", toEmail: "neha@2morrow.com", category: "Follow-up", folder: "Inbox", date: "23 Jun 2026", time: "3:15 PM", hasAttachment: true, status: "Replied" },
  { id: "EM-003", subject: "Offer Letter – Commercial Space Faridabad", from: "Agent Rohit", fromEmail: "rohit@2morrow.com", to: "Amit Singh", toEmail: "amit.singh@corp.in", category: "Offer", folder: "Sent", date: "22 Jun 2026", time: "9:00 AM", hasAttachment: true, status: "Read" },
  { id: "EM-004", subject: "Support: Document Verification Delay", from: "Sneha Gupta", fromEmail: "sneha.g@yahoo.com", to: "Support Team", toEmail: "support@2morrow.com", category: "Support", folder: "Inbox", date: "21 Jun 2026", time: "11:45 AM", hasAttachment: false, status: "Unread" },
  { id: "EM-005", subject: "June Newsletter – New Listings & Market Updates", from: "Marketing", fromEmail: "marketing@2morrow.com", to: "All Clients", toEmail: "clients@2morrow.com", category: "Newsletter", folder: "Sent", date: "20 Jun 2026", time: "8:00 AM", hasAttachment: false, status: "Read" },
  { id: "EM-006", subject: "Fwd: Lease Agreement for Plot in Greater Noida", from: "Agent Vikram", fromEmail: "vikram@2morrow.com", to: "Mohit Jain", toEmail: "mohit.j@gmail.com", category: "Follow-up", folder: "Sent", date: "18 Jun 2026", time: "4:20 PM", hasAttachment: true, status: "Forwarded" },
  { id: "EM-007", subject: "Draft: Welcome Email – New Client Onboarding", from: "Agent Aarav", fromEmail: "aarav@2morrow.com", to: "Kavita Patel", toEmail: "kavita.p@gmail.com", category: "Inquiry", folder: "Drafts", date: "16 Jun 2026", time: "2:00 PM", hasAttachment: false, status: "Unread" },
]

const statusCls: Record<string, string> = {
  Unread: "bg-blue-50 text-blue-700 border-blue-200 font-semibold dark:bg-blue-900/30 dark:text-blue-300",
  Read: "bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800/30 dark:text-gray-400",
  Replied: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  Forwarded: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
  Starred: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
}
const catCls: Record<string, string> = {
  Inquiry: "bg-sky-50 text-sky-700 border-sky-200",
  "Follow-up": "bg-violet-50 text-violet-700 border-violet-200",
  Offer: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Support: "bg-rose-50 text-rose-600 border-rose-200",
  Newsletter: "bg-orange-50 text-orange-600 border-orange-200",
}
const statusIcon: Record<string, React.ReactNode> = {
  Replied: <Reply className="h-3 w-3" />,
  Forwarded: <Forward className="h-3 w-3" />,
  Unread: <AlertCircle className="h-3 w-3" />,
}
const folderCls: Record<string, string> = {
  Inbox: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Sent: "bg-teal-50 text-teal-700 border-teal-200",
  Drafts: "bg-gray-100 text-gray-600 border-gray-200",
  Spam: "bg-red-50 text-red-600 border-red-200",
}

const PAGE_SIZE = 7

export default function EmailListing() {
  const [search, setSearch] = useState("")
  const [catFilter, setCatFilter] = useState("all")
  const [folderFilter, setFolderFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Email[]>(emails)

  const filtered = useMemo(() => data.filter(e => {
    const q = `${e.subject} ${e.from} ${e.to} ${e.fromEmail}`.toLowerCase()
    return q.includes(search.toLowerCase())
      && (catFilter === "all" || e.category === catFilter)
      && (folderFilter === "all" || e.folder === folderFilter)
      && (statusFilter === "all" || e.status === statusFilter)
  }), [search, catFilter, folderFilter, statusFilter, data])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const curPage = Math.min(page, totalPages)
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE)

  return (
    <div className="space-y-5">
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.row-in{animation:fadeUp .25s ease both}`}</style>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Emails</h1>
          <p className="text-sm text-muted-foreground mt-0.5">All client and team communications in one place.</p>
        </div>
        <Link to="/emails/compose">
          <Button size="sm" className="gap-1.5 rounded-lg px-4 h-9"><Plus className="h-4 w-4" />Compose</Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b py-3 px-4">
          <Select value={folderFilter} onValueChange={v => { setFolderFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[120px] h-9 text-sm"><SelectValue placeholder="Folder" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              <SelectItem value="Inbox">Inbox</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Drafts">Drafts</SelectItem>
              <SelectItem value="Spam">Spam</SelectItem>
            </SelectContent>
          </Select>

          <Select value={catFilter} onValueChange={v => { setCatFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[135px] h-9 text-sm"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Inquiry">Inquiry</SelectItem>
              <SelectItem value="Follow-up">Follow-up</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Newsletter">Newsletter</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[130px] h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Unread">Unread</SelectItem>
              <SelectItem value="Read">Read</SelectItem>
              <SelectItem value="Replied">Replied</SelectItem>
              <SelectItem value="Forwarded">Forwarded</SelectItem>
              <SelectItem value="Starred">Starred</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search subject, sender…" className="pl-8 h-9 text-sm"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{filtered.length} email{filtered.length !== 1 ? "s" : ""}</div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1080px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  {["Email ID", "Subject", "From", "To", "Category", "Folder", "Date & Time", "Attachment", "Status", "Action"].map((h, i) => (
                    <TableHead key={h} className={`text-xs font-semibold uppercase tracking-wide ${i === 0 ? "pl-4" : ""} ${i === 9 ? "text-right pr-4" : ""}`}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow><TableCell colSpan={10} className="py-16 text-center text-muted-foreground text-sm">No emails match your filters.</TableCell></TableRow>
                ) : paginated.map((e, i) => (
                  <TableRow key={e.id} className={`row-in border-b border-border/50 hover:bg-muted/30 transition-colors ${e.status === "Unread" ? "font-medium" : ""}`} style={{ animationDelay: `${i * 35}ms` }}>
                    <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{e.id}</TableCell>
                    <TableCell className="max-w-[220px]">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className={`text-sm truncate ${e.status === "Unread" ? "font-semibold" : ""}`}>{e.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{e.from}</div>
                      <div className="text-xs text-muted-foreground">{e.fromEmail}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{e.to}</div>
                      <div className="text-xs text-muted-foreground">{e.toEmail}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 font-medium ${catCls[e.category]}`}>{e.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 font-medium ${folderCls[e.folder]}`}>{e.folder}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">{e.date}</div>
                      <div className="text-xs text-muted-foreground">{e.time}</div>
                    </TableCell>
                    <TableCell>
                      {e.hasAttachment
                        ? <span className="text-xs text-primary font-medium">📎 Yes</span>
                        : <span className="text-xs text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 font-medium ${statusCls[e.status]}`}>
                        {statusIcon[e.status]}{e.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Eye className="h-3.5 w-3.5" />View Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Reply className="h-3.5 w-3.5" />Reply</DropdownMenuItem>
                          <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Forward className="h-3.5 w-3.5" />Forward</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-sm gap-2 text-red-600 cursor-pointer focus:text-red-600"
                            onClick={() => setData(prev => prev.filter(x => x.id !== e.id))}>
                            <Trash2 className="h-3.5 w-3.5" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {filtered.length === 0 ? "No results" : `Showing ${(curPage - 1) * PAGE_SIZE + 1}–${Math.min(curPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </p>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={curPage === 1}>Previous</Button>
              <span className="text-xs text-muted-foreground px-1">{curPage} / {totalPages}</span>
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={curPage === totalPages}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}