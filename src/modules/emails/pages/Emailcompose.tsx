import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send, Save, Eye, Paperclip, X, Search, Bold, Italic, Underline,
  Strikethrough, Heading, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image as ImageIcon, AlignLeft, Undo, Redo,
  UploadCloud, Check, Calendar, Clock, ChevronDown, LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// --- SCHEMA ---
const emailSchema = z.object({
  recipients: z.array(z.string()).min(1, "At least one recipient is required"),
  template: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Email body cannot be empty"),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  replyTo: z.string().optional(),
  priority: z.enum(["Normal", "High", "Low"]).default("Normal"),
  requestReadReceipt: z.boolean().default(false),
  trackOpens: z.boolean().default(false),
  trackClicks: z.boolean().default(false),
  saveAsTemplate: z.boolean().default(false),
  scheduleEmail: z.boolean().default(false),
  scheduleDate: z.string().optional(),
  scheduleTime: z.string().optional(),
});
type EmailFormValues = z.infer<typeof emailSchema>;

// --- MOCK DATA ---
const RECIPIENT_SOURCES = ["Users", "Agents", "Agencies", "Leads", "Newsletter Subscribers"];
const TEMPLATES = ["Welcome Email", "Property Update", "Meeting Reminder", "Invoice", "Promotion", "Newsletter"];
const VARIABLES = ["{{FirstName}}", "{{LastName}}", "{{AgencyName}}", "{{Property}}", "{{Date}}"];
const MOCK_CONTACTS = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Charlie Davis", email: "charlie@example.com", avatar: "https://i.pravatar.cc/150?u=3" },
];

// Minimal fade — fast, no stagger delay
const fade = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.15 } } };
const chipAnim = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.1 } },
};

export default function EmailCompose() {
  const [isPreview, setIsPreview] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<typeof MOCK_CONTACTS>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { recipients: [], priority: "Normal" },
  });

  const bodyValue = watch("body");
  const subjectValue = watch("subject");
  const isScheduled = watch("scheduleEmail");

  const onSubmit = (data: EmailFormValues) => console.log("Submitted:", data);

  const handleAddContact = (contact: typeof MOCK_CONTACTS[0]) => {
    if (!selectedContacts.find((c) => c.id === contact.id)) {
      const updated = [...selectedContacts, contact];
      setSelectedContacts(updated);
      setValue("recipients", updated.map((c) => c.id));
    }
    setRecipientSearch("");
  };

  const handleRemoveContact = (id: string) => {
    const updated = selectedContacts.filter((c) => c.id !== id);
    setSelectedContacts(updated);
    setValue("recipients", updated.map((c) => c.id));
  };

  const insertVariable = (v: string) => setValue("body", (bodyValue || "") + v);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    Array.from(e.dataTransfer.files).forEach((file) =>
      setUploadedFiles((prev) => [...prev, { name: file.name, size: (file.size / 1024).toFixed(1) + " KB" }])
    );
  };

  const wordCount = bodyValue ? bodyValue.split(/\s+/).filter((w) => w.length > 0).length : 0;

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Compose Email</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and send professional emails to your contacts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1.5" /> Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="h-4 w-4 mr-1.5" /> {isPreview ? "Edit" : "Preview"}
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)}>
            <Send className="h-4 w-4 mr-1.5" /> Send Email
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── LEFT / MAIN COLUMN ── */}
        <div className="lg:col-span-9 space-y-5">

          {/* Recipients */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Recipients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Source select */}
              <div className="relative">
                <select className="w-full appearance-none bg-background border border-input rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                  <option value="" disabled>Select Recipient Source</option>
                  {RECIPIENT_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none h-4 w-4" />
              </div>

              {/* Contact Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-9"
                  value={recipientSearch}
                  onChange={(e) => setRecipientSearch(e.target.value)}
                />
                <AnimatePresence>
                  {recipientSearch && (
                    <motion.div
                      {...fade}
                      className="absolute w-full mt-1 bg-popover border border-border rounded-md shadow-md z-10 overflow-hidden"
                    >
                      {MOCK_CONTACTS.filter((c) => c.name.toLowerCase().includes(recipientSearch.toLowerCase())).map((contact) => (
                        <div
                          key={contact.id}
                          onClick={() => handleAddContact(contact)}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors"
                        >
                          <img src={contact.avatar} alt={contact.name} className="w-7 h-7 rounded-full" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">{contact.email}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected chips */}
              {selectedContacts.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <AnimatePresence>
                    {selectedContacts.map((contact) => (
                      <motion.div key={contact.id} variants={chipAnim} initial="hidden" animate="visible" exit="exit">
                        <Badge variant="secondary" className="flex items-center gap-1.5 pl-1 pr-2 py-1">
                          <img src={contact.avatar} alt={contact.name} className="w-5 h-5 rounded-full" />
                          <span className="text-xs">{contact.name}</span>
                          <button type="button" onClick={() => handleRemoveContact(contact.id)} className="ml-1 text-muted-foreground hover:text-destructive transition-colors">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
              {errors.recipients && <p className="text-xs text-destructive">{errors.recipients.message}</p>}
              <p className="text-xs text-muted-foreground">{selectedContacts.length} recipient(s) selected</p>
            </CardContent>
          </Card>
          {/* Email Settings */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Email Settings</CardTitle></CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Input {...register("cc")} placeholder="CC" />
                  <Input {...register("bcc")} placeholder="BCC" />
                  <Input {...register("replyTo")} placeholder="Reply-To" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Priority</p>
                    <div className="flex gap-4">
                      {["Normal", "High", "Low"].map((p) => (
                        <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" {...register("priority")} value={p} className="accent-primary" />
                          <span className="text-sm text-foreground">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "requestReadReceipt", label: "Request Read Receipt" },
                    { id: "trackOpens", label: "Track Opens" },
                    { id: "trackClicks", label: "Track Clicks" },
                    { id: "saveAsTemplate", label: "Save as Template" },
                    { id: "scheduleEmail", label: "Schedule Email" },
                  ].map((s) => (
                    <label key={s.id} className="flex items-center gap-2.5 cursor-pointer">
                      <div className="relative flex items-center justify-center w-4 h-4 rounded border border-input bg-background">
                        <input type="checkbox" {...register(s.id as keyof EmailFormValues)} className="absolute opacity-0 w-full h-full cursor-pointer" />
                        <Check className={`h-3 w-3 text-primary transition-opacity ${watch(s.id as keyof EmailFormValues) ? "opacity-100" : "opacity-0"}`} />
                      </div>
                      <span className="text-sm text-foreground">{s.label}</span>
                    </label>
                  ))}

                  <AnimatePresence>
                    {isScheduled && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-2 gap-3 overflow-hidden pt-1">
                        <div className="relative">
                          <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input type="date" {...register("scheduleDate")} className="pl-8 text-sm" />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input type="time" {...register("scheduleTime")} className="pl-8 text-sm" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Template & Subject */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Template</CardTitle></CardHeader>
              <CardContent>
                <div className="relative">
                  <select {...register("template")} className="w-full appearance-none bg-background border border-input rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                    <option value="">Choose Template</option>
                    {TEMPLATES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Subject</CardTitle></CardHeader>
              <CardContent>
                <Input {...register("subject")} placeholder="Enter email subject..." />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
              </CardContent>
            </Card>
          </div>

          {/* Message Body */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-sm font-semibold">Message Body</CardTitle>
                <div className="flex flex-wrap gap-1.5">
                  {VARIABLES.map((v) => (
                    <button key={v} type="button" onClick={() => insertVariable(v)}
                      className="px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors">
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Toolbar */}
              <div className="flex flex-wrap gap-0.5 p-1.5 bg-muted rounded-t-md border border-b-0 border-border">
                {[Bold, Italic, Underline, Strikethrough, Heading, List, ListOrdered, Quote, Code, LinkIcon, ImageIcon, AlignLeft, Undo, Redo].map((Icon, i) => (
                  <button key={i} type="button" className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-background rounded transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
              <textarea
                {...register("body")}
                className="w-full h-[380px] p-3 bg-background border border-border rounded-b-md resize-none focus:outline-none focus:ring-1 focus:ring-ring text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="Write your email here..."
              />
              {errors.body && <p className="text-xs text-destructive mt-1">{errors.body.message}</p>}
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Attachments</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-md p-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
              >
                <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files)
                      Array.from(e.target.files).forEach((f) =>
                        setUploadedFiles((prev) => [...prev, { name: f.name, size: (f.size / 1024).toFixed(1) + " KB" }])
                      );
                  }}
                />
                <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-foreground font-medium">Drag files here or <span className="text-primary">browse</span></p>
                <p className="text-xs text-muted-foreground mt-1">Multiple files, up to 50MB each</p>
              </div>

              <AnimatePresence>
                {uploadedFiles.map((file, i) => (
                  <motion.div key={i} {...fade} className="flex items-center justify-between px-3 py-2 border border-border rounded-md bg-muted/40">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-muted-foreground hover:text-destructive transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>


        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="lg:col-span-3">
          <div className="sticky top-6 space-y-5">

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Summary</CardTitle></CardHeader>
              <CardContent className="space-y-0">
                {[
                  { label: "Recipients", value: selectedContacts.length },
                  { label: "Attachments", value: uploadedFiles.length },
                  { label: "Word Count", value: wordCount },
                  { label: "Read Time", value: `${Math.max(1, Math.ceil(wordCount / 200))} min` },
                  { label: "Priority", value: watch("priority") },
                  { label: "Status", value: isScheduled ? "Scheduled" : "Draft" },
                ].map((item, i, arr) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-xs font-medium text-foreground">{item.value}</span>
                    </div>
                    {i < arr.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <LayoutTemplate className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Preview Mode</h4>
                    <p className="text-xs text-muted-foreground mb-3">See how your clients will view this email.</p>
                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => setIsPreview(!isPreview)}>
                      {isPreview ? "Close Preview" : "Open Preview"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button className="w-full" size="sm" onClick={handleSubmit(onSubmit)}>
                  <Send className="h-4 w-4 mr-1.5" /> Send Email
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Save className="h-4 w-4 mr-1.5" /> Save Draft
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground" size="sm">
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── PREVIEW OVERLAY ── */}
        <AnimatePresence>
          {isPreview && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            >
              <motion.div
                initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.97, opacity: 0 }} transition={{ duration: 0.15 }}
                className={`bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all ${isMobilePreview ? "w-[375px] h-[812px]" : "w-full max-w-4xl h-[85vh]"}`}
              >
                {/* Preview Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/40">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-semibold text-foreground">Email Preview</h2>
                    <div className="flex items-center bg-background border border-border rounded-full p-0.5">
                      <button type="button" onClick={() => setIsMobilePreview(false)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!isMobilePreview ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Desktop</button>
                      <button type="button" onClick={() => setIsMobilePreview(true)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${isMobilePreview ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Mobile</button>
                    </div>
                  </div>
                  <button type="button" onClick={() => setIsPreview(false)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Preview Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-background">
                  <div className="max-w-2xl mx-auto space-y-5">
                    <h1 className="text-xl font-semibold text-foreground">{subjectValue || "(No Subject)"}</h1>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                        {selectedContacts[0]?.name.charAt(0) ?? "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Admin <span className="text-muted-foreground font-normal">&lt;admin@2morrow.com&gt;</span></p>
                        <p className="text-xs text-muted-foreground mt-0.5">to {selectedContacts.length > 0 ? selectedContacts.map((c) => c.name).join(", ") : "(No Recipients)"}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                      {bodyValue || <span className="text-muted-foreground">(Empty Message)</span>}
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs font-medium text-muted-foreground mb-3">{uploadedFiles.length} Attachment(s)</p>
                        <div className="flex flex-wrap gap-3">
                          {uploadedFiles.map((file, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 border border-border rounded-md bg-muted/40">
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs font-medium text-foreground">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{file.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}