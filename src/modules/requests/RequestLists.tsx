"use client"

import { useMemo, useState } from "react"
import { useEffect } from "react";
import {
    getRequests,
    deleteRequest
} from "@/services/request.service";
import type { RequestItem } from "@/types/request.types";
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVertical, Search, Eye, Pencil, Trash2, Plus, Home, Building2, Landmark } from "lucide-react"



// const requests: Request[] = [
//   { id: "RQ-001", client: "Rahul Sharma", phone: "+91 98100 12345", propertyType: "Apartment", transactionType: "Buy", city: "Noida", budget: "₹85 Lakh", bedrooms: "3 BHK", agent: "Aarav Sharma", receivedDate: "24 Jun 2026", status: "Matched" },
//   { id: "RQ-002", client: "Priya Verma", phone: "+91 91234 56789", propertyType: "Apartment", transactionType: "Rent", city: "Delhi", budget: "₹35,000/mo", bedrooms: "2 BHK", agent: "Neha Kapoor", receivedDate: "22 Jun 2026", status: "Offer Sent" },
//   { id: "RQ-003", client: "Amit Singh", phone: "+91 99887 65432", propertyType: "Villa", transactionType: "Sell", city: "Gurugram", budget: "₹1.4 Cr", bedrooms: "4 BHK", agent: "Rohit Mehra", receivedDate: "20 Jun 2026", status: "In Review" },
//   { id: "RQ-004", client: "Sneha Gupta", phone: "+91 87654 32100", propertyType: "Plot", transactionType: "Buy", city: "Greater Noida", budget: "₹65 Lakh", bedrooms: "N/A", agent: "Vikram Singh", receivedDate: "18 Jun 2026", status: "Cancelled" },
//   { id: "RQ-005", client: "Mohit Jain", phone: "+91 78900 12345", propertyType: "Office", transactionType: "Rent", city: "Noida Extension", budget: "₹55,000/mo", bedrooms: "N/A", agent: "Aditya Jain", receivedDate: "15 Jun 2026", status: "Open" },
//   { id: "RQ-006", client: "Kavita Patel", phone: "+91 98765 43210", propertyType: "Commercial", transactionType: "Buy", city: "Faridabad", budget: "₹2.3 Cr", bedrooms: "N/A", agent: "Aarav Sharma", receivedDate: "12 Jun 2026", status: "Closed" },
//   { id: "RQ-007", client: "Ravi Kumar", phone: "+91 93456 78901", propertyType: "Apartment", transactionType: "Sell", city: "Ghaziabad", budget: "₹72 Lakh", bedrooms: "2 BHK", agent: "Neha Kapoor", receivedDate: "10 Jun 2026", status: "Matched" },
// ]

const statusCls: Record<string, string> = {
  NEW: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
  CONTACTED: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  MATCHED: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300",
  CLOSED: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  CANCELLED: "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300",
}
const txCls: Record<string, string> = {
  BUY: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SELL: "bg-rose-50 text-rose-700 border-rose-200",
  RENT: "bg-sky-50 text-sky-700 border-sky-200",
}
const propIcon: Record<string, React.ReactNode> = {
    HOUSE: <Home className="h-3 w-3"/>,
    BUILDING: <Building2 className="h-3 w-3"/>,
    APARTMENT: <Building2 className="h-3 w-3"/>,
    LAND: <Landmark className="h-3 w-3"/>,
};

const PAGE_SIZE = 7

export default function RequestListing() {
  const [search, setSearch] = useState("")
  const [txFilter, setTxFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  // const [data, setData] = useState<Request[]>(requests)

  const [data, setData] = useState<RequestItem[]>([]);
const [loading, setLoading] = useState(true);

  const filtered = useMemo(() => {

    return data.filter((r) => {

        const q = `
            ${r.identity.first_name}
            ${r.identity.last_name}
            ${r.location.city}
            ${r.contact.phones}
        `.toLowerCase();

        return (
            q.includes(search.toLowerCase()) &&
            (txFilter === "all" ||
                r.requirements.transaction === txFilter.toUpperCase()) &&
            (statusFilter === "all" ||
                r.status === statusFilter.toUpperCase())
        );

    });

}, [data, search, txFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const curPage = Math.min(page, totalPages)
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE)

  useEffect(() => {
    fetchRequests();
}, []);

const fetchRequests = async () => {
    try {
        setLoading(true);

        const response = await getRequests();

        setData(response.data);

    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};
if (loading) {
    return (
        <div className="flex justify-center py-10">
            Loading Requests...
        </div>
    );
}
  return (
    <div className="space-y-5">
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.row-in{animation:fadeUp .25s ease both}`}</style>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Requests</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage all client property search requests.</p>
        </div>
        <Link to="/requests/create">
          <Button size="sm" className="gap-1.5 rounded-lg px-4 h-9"><Plus className="h-4 w-4" />New Request</Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b py-3 px-4">
          <Select value={txFilter} onValueChange={v => { setTxFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[130px] h-9 text-sm"><SelectValue placeholder="Transaction" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="BUY">Buy</SelectItem>
              <SelectItem value="SELL">Sell</SelectItem>
              <SelectItem value="RENT">Rent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[145px] h-9 text-sm"><SelectValue placeholder="All Statuses" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="CONTACTED">Contacted</SelectItem>
              <SelectItem value="MATCHED">Matched</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search client, city, agent…" className="pl-8 h-9 text-sm"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{filtered.length} request{filtered.length !== 1 ? "s" : ""}</div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1040px]">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  {["Req. ID", "Client",  "Transaction", "City", "Budget", "Received", "Status", "Action"].map((h, i) => (
                    <TableHead key={h} className={`text-xs font-semibold uppercase tracking-wide ${i === 0 ? "pl-4" : ""} ${i === 10 ? "text-right pr-4" : ""}`}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow><TableCell colSpan={11} className="py-16 text-center text-muted-foreground text-sm">No requests match your filters.</TableCell></TableRow>
                ) : paginated.map((r, i) => (
                  <TableRow key={r.id} className="row-in border-b border-border/50 hover:bg-muted/30 transition-colors" style={{ animationDelay: `${i * 35}ms` }}>
                    <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{r.reference}</TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{r.identity.first_name} {r.identity.last_name}</div>
                      <div className="text-xs text-muted-foreground">{r.contact.phones}</div>
                    </TableCell>
                    {/* <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">{propIcon[r.requirements.category] ?? <Home className="h-3 w-3" />}</span>
                    </TableCell> */}
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 font-medium ${txCls[r.requirements.transaction]}`}>{r.requirements.transaction}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{r.location.city}</TableCell>
                    <TableCell className="text-sm font-medium">{r.requirements.currency}
{" "}
{Number(r.requirements.budget_min).toLocaleString()}
-
{" "}
{Number(r.requirements.budget_max).toLocaleString()}</TableCell>
                    {/* <TableCell className="text-xs text-muted-foreground">{r.relations.assigned_agent_id ?? "Not Assigned"}</TableCell> */}
                    {/* <TableCell>
    {r.relations.assigned_agent_id ?? "Not Assigned"}
</TableCell> */}
                    <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs px-2.5 py-1 font-medium ${statusCls[r.status]}`}>{r.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <Link to={`/requests/edit/${r.id}`}>
                            <DropdownMenuItem className="text-sm gap-2 cursor-pointer"><Pencil className="h-3.5 w-3.5" />View & Edit</DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-sm gap-2 text-red-600 cursor-pointer focus:text-red-600"
                           onClick={async () => {
    await deleteRequest(r.id);
    fetchRequests();
}}>
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