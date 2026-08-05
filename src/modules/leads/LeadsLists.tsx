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
import { MoreVertical, Search, Eye, Pencil, Trash2, Plus, Globe, Users2, Phone, TrendingUp, UserCircle2 } from "lucide-react"

interface Lead {
  id: string; contact: string; phone: string
  type: "Buy" | "Sell" | "Rent"; city: string; budget: string
  source: "Website" | "Referral" | "Walk-in" | "Phone" | "Social Media"
  agent: string; date: string
  status: "New" | "Contacted" | "Qualified" | "Negotiating" | "Closed" | "Lost"
}

const leads: Lead[] = [
  { id: "LD-001", contact: "Rahul Sharma", phone: "+91 98100 12345", type: "Buy", city: "Noida", budget: "₹85 Lakh", source: "Website", agent: "Aarav Sharma", date: "24 Jun 2026", status: "Qualified" },
  { id: "LD-002", contact: "Priya Verma", phone: "+91 91234 56789", type: "Rent", city: "Delhi", budget: "₹35,000/mo", source: "Referral", agent: "Neha Kapoor", date: "22 Jun 2026", status: "Contacted" },
  { id: "LD-003", contact: "Amit Singh", phone: "+91 99887 65432", type: "Sell", city: "Gurugram", budget: "₹1.4 Cr", source: "Walk-in", agent: "Rohit Mehra", date: "20 Jun 2026", status: "Negotiating" },
  { id: "LD-004", contact: "Sneha Gupta", phone: "+91 87654 32100", type: "Buy", city: "Greater Noida", budget: "₹65 Lakh", source: "Social Media", agent: "Vikram Singh", date: "18 Jun 2026", status: "Lost" },
  { id: "LD-005", contact: "Mohit Jain", phone: "+91 78900 12345", type: "Rent", city: "Noida Extension", budget: "₹25,000/mo", source: "Phone", agent: "Aditya Jain", date: "15 Jun 2026", status: "New" },
  { id: "LD-006", contact: "Kavita Patel", phone: "+91 98765 43210", type: "Buy", city: "Faridabad", budget: "₹1.1 Cr", source: "Referral", agent: "Aarav Sharma", date: "12 Jun 2026", status: "Closed" },
  { id: "LD-007", contact: "Ravi Kumar", phone: "+91 93456 78901", type: "Sell", city: "Ghaziabad", budget: "₹72 Lakh", source: "Website", agent: "Neha Kapoor", date: "10 Jun 2026", status: "Qualified" },
]

const statusCls: Record<string, string> = {
  New: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
  Contacted: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  Qualified: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300",
  Negotiating: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
  Closed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  Lost: "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300",
}
const typeCls: Record<string, string> = {
  Buy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Sell: "bg-rose-50 text-rose-700 border-rose-200",
  Rent: "bg-sky-50 text-sky-700 border-sky-200",
}
const srcIcon: Record<string, React.ReactNode> = {
  Website: <Globe className="h-3 w-3" />, Referral: <Users2 className="h-3 w-3" />,
  "Walk-in": <UserCircle2 className="h-3 w-3" />, Phone: <Phone className="h-3 w-3" />,
  "Social Media": <TrendingUp className="h-3 w-3" />,
}

const PAGE_SIZE = 7

export default function LeadsListing() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Lead[]>(leads)

  const filtered = useMemo(() => data.filter(l => {
    const q = `${l.contact} ${l.city} ${l.agent} ${l.phone}`.toLowerCase()
    return q.includes(search.toLowerCase())
      && (typeFilter === "all" || l.type === typeFilter)
      && (statusFilter === "all" || l.status === statusFilter)
  }), [search, typeFilter, statusFilter, data])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const curPage = Math.min(page, totalPages)
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE)

  return (
    <div className="space-y-5">
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.row-in{animation:fadeUp .25s ease both}`}</style>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track and manage all incoming property leads.</p>
        </div>
        <Link to="/leads/create">
          <Button size="sm" className="gap-1.5 rounded-lg px-4 h-9"><Plus className="h-4 w-4" />Add Lead</Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b py-3 px-4">
          <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[130px] h-9 text-sm"><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Buy">Buy</SelectItem>
              <SelectItem value="Sell">Sell</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[145px] h-9 text-sm"><SelectValue placeholder="All Statuses" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Negotiating">Negotiating</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, city, agent…" className="pl-8 h-9 text-sm"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{filtered.length} lead{filtered.length !== 1 ? "s" : ""}</div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[980px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  {["Lead ID", "Contact", "Type", "City", "Budget", "Source", "Assigned Agent", "Date Added", "Status", "Action"].map((h, i) => (
                    <TableHead key={h} className={`text-xs font-semibold uppercase tracking-wide ${i === 0 ? "pl-4" : ""} ${i === 9 ? "text-right pr-4" : ""}`}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow><TableCell colSpan={10} className="py-16 text-center text-muted-foreground text-sm">No leads match your filters.</TableCell></TableRow>
                ) : paginated.map((l, i) => (
                  <TableRow key={l.id} className="row-in border-b border-border/50 hover:bg-muted/30 transition-colors" style={{ animationDelay: `${i * 35}ms` }}>
                    <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{l.id}</TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{l.contact}</div>
                      <div className="text-xs text-muted-foreground">{l.phone}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 font-medium ${typeCls[l.type]}`}>{l.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{l.city}</TableCell>
                    <TableCell className="text-sm font-medium">{l.budget}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">{srcIcon[l.source]}{l.source}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                          {l.agent.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm">{l.agent}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{l.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2.5 py-1 font-medium ${statusCls[l.status]}`}>{l.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Eye className="h-3.5 w-3.5" />View Lead</DropdownMenuItem>
                          <Link to="/leads/edit-leads">
                            <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Pencil className="h-3.5 w-3.5" />Edit Lead</DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-sm gap-2 text-red-600 cursor-pointer focus:text-red-600"
                            onClick={() => setData(prev => prev.filter(r => r.id !== l.id))}>
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