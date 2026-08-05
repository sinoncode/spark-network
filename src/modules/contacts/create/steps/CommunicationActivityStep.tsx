import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  Calendar,
  Eye,
  FileCheck,
  Tag,
  Mail,
  Bell,
  BarChart2,
  Plus,
  Share2,
  Upload,
} from "lucide-react";
import { useLeadCreationStore } from "../store/contactCreationStore";

export default function CommunicationActivityStep() {
  const { form, updateField } = useLeadCreationStore();

  // Local state for adding quick logs
  const [newCall, setNewCall] = useState({
    agentName: "",
    durationMinutes: 5,
    direction: "outbound",
    outcome: "connected",
    summary: "",
  });

  const handleEventAttendanceToggle = (eventVal: string) => {
    const current: string[] = form.eventsAttended || [];
    const updated = current.includes(eventVal)
      ? current.filter((e) => e !== eventVal)
      : [...current, eventVal];
    updateField("eventsAttended", updated);
  };

  return (
    <div className="space-y-6 text-foreground">
      {/* 1. AUTO-LOGGED SYSTEM COMMUNICATIONS SUMMARY */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Automated Communications & Marketing Logs
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="p-4 rounded-xl border border-border bg-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Emails Tracked</span>
                <Mail className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">{form.totalEmailsSentReceived || 24}</p>
              <span className="text-[10px] text-muted-foreground">Auto-synced with Inbox</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Matching Alerts</span>
                <Bell className="h-4 w-4 text-amber-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">{form.totalAlertsSent || 12}</p>
              <span className="text-[10px] text-muted-foreground">Properties sent automatically</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Newsletters Received</span>
                <BarChart2 className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">{form.newsletterCampaignsSent || 5}</p>
              <span className="text-[10px] text-muted-foreground">Opens: 80% | Clicks: 40%</span>
            </div>

            <div className="p-4 rounded-xl border border-border bg-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">WhatsApp / SMS Log</span>
                <Share2 className="h-4 w-4 text-green-500" />
              </div>
              <p className="mt-2 text-2xl font-bold">8 Messages</p>
              <span className="text-[10px] text-muted-foreground">Last activity 2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. CALL & MEETING LOGS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <PhoneCall className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Call & Meeting History
            </h3>
          </div>

          {/* Quick Call Log Form */}
          <div className="p-4 rounded-xl border border-border bg-accent/10 mb-6 space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Log a New Call
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <Label className="mb-1 block text-xs">Agent Name</Label>
                <Input
                  placeholder="e.g. Edyta Graf"
                  value={newCall.agentName}
                  onChange={(e) => setNewCall({ ...newCall, agentName: e.target.value })}
                />
              </div>

              <div>
                <Label className="mb-1 block text-xs">Direction</Label>
                <Select
                  value={newCall.direction}
                  onValueChange={(val) => setNewCall({ ...newCall, direction: val })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outbound">Outbound (Agent → Client)</SelectItem>
                    <SelectItem value="inbound">Inbound (Client → Agent)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-1 block text-xs">Duration (Minutes)</Label>
                <Input
                  type="number"
                  value={newCall.durationMinutes}
                  onChange={(e) => setNewCall({ ...newCall, durationMinutes: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label className="mb-1 block text-xs">Outcome</Label>
                <Select
                  value={newCall.outcome}
                  onValueChange={(val) => setNewCall({ ...newCall, outcome: val })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="connected">Connected / Discussed</SelectItem>
                    <SelectItem value="no_answer">No Answer</SelectItem>
                    <SelectItem value="left_voicemail">Left Voicemail</SelectItem>
                    <SelectItem value="follow_up_required">Follow-up Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="mb-1 block text-xs">Call Summary / Notes</Label>
              <Textarea
                rows={2}
                placeholder="Key details discussed during the call..."
                value={newCall.summary}
                onChange={(e) => setNewCall({ ...newCall, summary: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4" /> Add Call Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. VIEWINGS & FEEDBACK */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Viewings & Property Feedback
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label className="mb-2 block text-sm font-medium">Property Visited</Label>
              <Input placeholder="Search & link property record..." />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Viewing Rating</Label>
              <Select defaultValue="interested">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very_interested">Very Interested</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="not_interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Assigned Agent</Label>
              <Input placeholder="e.g. Edyta Graf" />
            </div>
          </div>

          <div className="mt-4">
            <Label className="mb-2 block text-sm font-medium">Client Viewing Feedback Notes</Label>
            <Textarea
              rows={3}
              placeholder="Client liked the terrace view but expressed concern about kitchen size..."
            />
          </div>
        </CardContent>
      </Card>

      {/* 4. OFFERS & SIGNED DOCUMENTS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Offers Made & Signed Documents
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Offer Tracking */}
            <div className="p-4 rounded-xl border border-border bg-accent/20 space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Log Property Offer
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label className="mb-1 block text-xs font-medium">Linked Property</Label>
                  <Input placeholder="Property ID / Title" />
                </div>
                <div>
                  <Label className="mb-1 block text-xs font-medium">Offer Amount (CHF/EUR)</Label>
                  <Input type="number" placeholder="e.g. 1,250,000" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label className="mb-1 block text-xs font-medium">Offer Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label className="mb-1 block text-xs font-medium">Status</Label>
                  <Select defaultValue="pending">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="refused">Refused</SelectItem>
                      <SelectItem value="countered">Countered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Signed Document Upload */}
            <div className="p-4 rounded-xl border border-border bg-accent/20 space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Attach Signed Document
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label className="mb-1 block text-xs font-medium">Document Type</Label>
                  <Select defaultValue="agency_mandate">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agency_mandate">Signed Mandate</SelectItem>
                      <SelectItem value="purchase_offer">Purchase Offer</SelectItem>
                      <SelectItem value="deed_copy">Deed Copy</SelectItem>
                      <SelectItem value="reservation_agreement">Reservation Agreement</SelectItem>
                      <SelectItem value="other">Other Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 block text-xs font-medium">Signed Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label className="mb-1 block text-xs font-medium">Upload Document File</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" className="cursor-pointer text-xs" />
                  <Button size="icon" variant="outline" type="button">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. EVENT ATTENDANCE & SOCIAL MEDIA */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Event Attendance & Social Interactions
            </h3>
          </div>

          <div className="space-y-6">
            {/* Multi-select Event Attendance */}
            <div>
              <Label className="mb-3 block text-sm font-medium">
                Event Attendance <span className="text-xs text-muted-foreground">(Select all applicable)</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { id: "property_fair", label: "Property Fair" },
                  { id: "open_house", label: "Open House" },
                  { id: "vip_evening", label: "VIP Evening" },
                  { id: "webinar", label: "Webinar" },
                  { id: "other", label: "Other Event" },
                ].map((event) => (
                  <label
                    key={event.id}
                    className="flex items-center space-x-2 rounded-lg border border-border p-2.5 hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <Checkbox
                      checked={(form.eventsAttended || []).includes(event.id)}
                      onCheckedChange={() => handleEventAttendanceToggle(event.id)}
                    />
                    <span className="text-xs font-medium">{event.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Social Media Notes */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Social Media Interactions & Notes <span className="text-xs text-muted-foreground">(Optional)</span>
              </Label>
              <Textarea
                rows={3}
                placeholder="Notes on LinkedIn engagement, Instagram inquiries, or social interactions..."
                value={form.socialMediaNotes || ""}
                onChange={(e) => updateField("socialMediaNotes", e.target.value)}
              />
            </div>
          </div>

          
        </CardContent>
      </Card>
    </div>
  );
}