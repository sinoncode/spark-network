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
import { MoreVertical, Search, Eye, Pencil, Trash2, Plus, MapPin, FileText, Banknote, Calendar } from "lucide-react"

interface Dossier {
  id: string; title: string; client: string; phone: string
  propertyType: "Apartment" | "Villa" | "Office" | "Plot" | "Commercial"
  transactionType: "Sale" | "Purchase" | "Rental"
  location: string; area: string; price: string
  notary: string; agent: string
  openedDate: string; closingDate: string
  stage: "Documentation" | "Due Diligence" | "Offer" | "Under Contract" | "Notarial" | "Completed" | "On Hold"
}

const dossiers: Dossier[] = [
  { id: "DS-001", title: "Sector 50 Apartment Purchase", client: "Rahul Sharma", phone: "+91 98100 12345", propertyType: "Apartment", transactionType: "Purchase", location: "Noida, Sector 50", area: "1,450 sq.ft", price: "₹85 Lakh", notary: "M. Kapoor & Co.", agent: "Aarav Sharma", openedDate: "10 Jun 2026", closingDate: "30 Jul 2026", stage: "Due Diligence" },
  { id: "DS-002", title: "DLF Phase 3 Villa Rental", client: "Priya Verma", phone: "+91 91234 56789", propertyType: "Villa", transactionType: "Rental", location: "Gurugram, DLF Ph3", area: "3,200 sq.ft", price: "₹1,10,000/mo", notary: "S. Mehta Advocates", agent: "Neha Kapoor", openedDate: "05 Jun 2026", closingDate: "25 Jun 2026", stage: "Under Contract" },
  { id: "DS-003", title: "Commercial Showroom Sale – Faridabad", client: "Amit Singh", phone: "+91 99887 65432", propertyType: "Commercial", transactionType: "Sale", location: "Faridabad, Sector 9", area: "2,800 sq.ft", price: "₹2.3 Cr", notary: "R. Sharma & Partners", agent: "Rohit Mehra", openedDate: "01 Jun 2026", closingDate: "15 Aug 2026", stage: "Notarial" },
  { id: "DS-004", title: "Plot Registration – Greater Noida", client: "Sneha Gupta", phone: "+91 87654 32100", propertyType: "Plot", transactionType: "Purchase", location: "Greater Noida, Omega", area: "500 sq.yd", price: "₹65 Lakh", notary: "V. Singh & Co.", agent: "Vikram Singh", openedDate: "28 May 2026", closingDate: "20 Jul 2026", stage: "Documentation" },
  { id: "DS-005", title: "Office Space Lease – Noida Extension", client: "Mohit Jain", phone: "+91 78900 12345", propertyType: "Office", transactionType: "Rental", location: "Noida Ext., Block B", area: "900 sq.ft", price: "₹55,000/mo", notary: "A. Jain Legal", agent: "Aditya Jain", openedDate: "20 May 2026", closingDate: "10 Jun 2026", stage: "Completed" },
  { id: "DS-006", title: "Luxury Flat Purchase – Faridabad", client: "Kavita Patel", phone: "+91 98765 43210", propertyType: "Apartment", transactionType: "Purchase", location: "Faridabad, Sector 15", area: "2,100 sq.ft", price: "₹1.1 Cr", notary: "M. Kapoor & Co.", agent: "Aarav Sharma", openedDate: "15 May 2026", closingDate: "05 Aug 2026", stage: "Offer" },
  { id: "DS-007", title: "Residential Plot Sale – Ghaziabad", client: "Ravi Kumar", phone: "+91 93456 78901", propertyType: "Plot", transactionType: "Sale", location: "Ghaziabad, Indirapuram", area: "300 sq.yd", price: "₹72 Lakh", notary: "N. Kapoor Advocates", agent: "Neha Kapoor", openedDate: "10 May 2026", closingDate: "30 Jun 2026", stage: "On Hold" },
]

const stageCls: Record<string, string> = {
  Documentation: "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800/30 dark:text-gray-400",
  "Due Diligence": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  Offer: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300",
  "Under Contract": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
  Notarial: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
  Completed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  "On Hold": "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300",
}
const txCls: Record<string, string> = {
  Purchase: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Sale: "bg-rose-50 text-rose-700 border-rose-200",
  Rental: "bg-sky-50 text-sky-700 border-sky-200",
}

const PAGE_SIZE = 7

export default function DossierListing() {
  const [search, setSearch] = useState("")
  const [txFilter, setTxFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Dossier[]>(dossiers)

  const filtered = useMemo(() => data.filter(d => {
    const q = `${d.title} ${d.client} ${d.location} ${d.agent} ${d.notary}`.toLowerCase()
    return q.includes(search.toLowerCase())
      && (txFilter === "all" || d.transactionType === txFilter)
      && (stageFilter === "all" || d.stage === stageFilter)
  }), [search, txFilter, stageFilter, data])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const curPage = Math.min(page, totalPages)
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE)

  return (
    <div className="space-y-5">
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.row-in{animation:fadeUp .25s ease both}`}</style>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dossiers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage all real estate transaction files and documentation.</p>
        </div>
        <Link to="/dossiers/create">
          <Button size="sm" className="gap-1.5 rounded-lg px-4 h-9"><Plus className="h-4 w-4" />New Dossier</Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b py-3 px-4">
          <Select value={txFilter} onValueChange={v => { setTxFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[130px] h-9 text-sm"><SelectValue placeholder="Transaction" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Purchase">Purchase</SelectItem>
              <SelectItem value="Sale">Sale</SelectItem>
              <SelectItem value="Rental">Rental</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stageFilter} onValueChange={v => { setStageFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[155px] h-9 text-sm"><SelectValue placeholder="All Stages" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="Documentation">Documentation</SelectItem>
              <SelectItem value="Due Diligence">Due Diligence</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Under Contract">Under Contract</SelectItem>
              <SelectItem value="Notarial">Notarial</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search dossier, client, agent…" className="pl-8 h-9 text-sm"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{filtered.length} dossier{filtered.length !== 1 ? "s" : ""}</div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1100px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  {["Dossier ID", "Title & Client", "Type", "Transaction", "Location", "Area", "Price", "Notary", "Agent", "Closing Date", "Stage", "Action"].map((h, i) => (
                    <TableHead key={h} className={`text-xs font-semibold uppercase tracking-wide ${i === 0 ? "pl-4" : ""} ${i === 11 ? "text-right pr-4" : ""}`}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow><TableCell colSpan={12} className="py-16 text-center text-muted-foreground text-sm">No dossiers match your filters.</TableCell></TableRow>
                ) : paginated.map((d, i) => (
                  <TableRow key={d.id} className="row-in border-b border-border/50 hover:bg-muted/30 transition-colors" style={{ animationDelay: `${i * 35}ms` }}>
                    <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{d.id}</TableCell>
                    <TableCell className="min-w-[180px]">
                      <div className="flex items-start gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-sm leading-snug">{d.title}</div>
                          <div className="text-xs text-muted-foreground">{d.client} · {d.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{d.propertyType}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 font-medium ${txCls[d.transactionType]}`}>{d.transactionType}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{d.location}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{d.area}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold"><Banknote className="h-3 w-3 text-muted-foreground" />{d.price}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{d.notary}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                          {d.agent.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm">{d.agent}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" />{d.closingDate}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2.5 py-1 font-medium ${stageCls[d.stage]}`}>{d.stage}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Eye className="h-3.5 w-3.5" />View Dossier</DropdownMenuItem>
                          <Link to="/dossiers/details">
                            <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Pencil className="h-3.5 w-3.5" />Edit Dossier</DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-sm gap-2 text-red-600 cursor-pointer focus:text-red-600"
                            onClick={() => setData(prev => prev.filter(x => x.id !== d.id))}>
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