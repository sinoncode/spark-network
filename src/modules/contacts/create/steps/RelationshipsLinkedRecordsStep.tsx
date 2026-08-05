import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  Scale,
  Building,
  Home,
  FileSpreadsheet,
  Receipt,
  Search,
  Link as LinkIcon,
} from "lucide-react";
import { useLeadCreationStore } from "../store/contactCreationStore";

export default function RelationshipsLinkedRecordsStep() {
  const { form, updateField } = useLeadCreationStore();

  return (
    <div className="space-y-6 text-foreground">
      {/* 1. INTERNAL AGENCY TEAM ASSIGNMENT */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Agency Assignment & Team
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">Assigned Agent</Label>
              <div className="relative">
                <Input
                  placeholder="Search agent name or ID..."
                  value={form.assignedAgentId || ""}
                  onChange={(e) => updateField("assignedAgentId", e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Secondary Agent / Co-Agent</Label>
              <div className="relative">
                <Input
                  placeholder="Search secondary agent..."
                  value={form.secondaryAgentId || ""}
                  onChange={(e) => updateField("secondaryAgentId", e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. FAMILY & PERSONAL RELATIONSHIPS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Personal Relationships & Referrals
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <Label className="mb-2 block text-sm font-medium">Referred By</Label>
              <Input
                placeholder="Link Contact / Agent / Angel..."
                value={form.referredById || ""}
                onChange={(e) => updateField("referredById", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Spouse / Partner</Label>
              <Input
                placeholder="Link Contact record..."
                value={form.spousePartnerId || ""}
                onChange={(e) => updateField("spousePartnerId", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Family Members (Linked)</Label>
              <Input
                placeholder="Comma separated Contact IDs..."
                value={form.familyMemberIds?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "familyMemberIds",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. PROFESSIONAL ADVISORS & LEGAL PARTNERS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Legal, Financial & Professional Partners
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <Label className="mb-2 block text-sm font-medium">Legal Representative / Lawyer</Label>
              <Input
                placeholder="Link Partner record..."
                value={form.legalRepresentativeId || ""}
                onChange={(e) => updateField("legalRepresentativeId", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Notary</Label>
              <Input
                placeholder="Link Partner record..."
                value={form.notaryId || ""}
                onChange={(e) => updateField("notaryId", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Mortgage Broker / Bank</Label>
              <Input
                placeholder="Link Partner record..."
                value={form.mortgageBrokerBankId || ""}
                onChange={(e) => updateField("mortgageBrokerBankId", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. LINKED PROPERTY RECORDS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Linked Property Records
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Linked Properties (as Buyer / Tenant)
              </Label>
              <div className="relative">
                <Input
                  placeholder="Link Property IDs..."
                  value={form.linkedPropertiesBuyerTenant?.join(", ") || ""}
                  onChange={(e) =>
                    updateField(
                      "linkedPropertiesBuyerTenant",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
                <LinkIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Linked Properties (as Seller / Landlord)
              </Label>
              <div className="relative">
                <Input
                  placeholder="Link Property IDs..."
                  value={form.linkedPropertiesSellerLandlord?.join(", ") || ""}
                  onChange={(e) =>
                    updateField(
                      "linkedPropertiesSellerLandlord",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
                <LinkIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. CRM DOSSIERS, OFFERS, VIEWINGS & INVOICES */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileSpreadsheet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              CRM Dossiers, Transactions & Financial Records
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">Linked Transactions / Dossiers</Label>
              <Input
                placeholder="Link Dossier records..."
                value={form.linkedTransactionsDossierIds?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "linkedTransactionsDossierIds",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Linked Offers</Label>
              <Input
                placeholder="Link Offer records..."
                value={form.linkedOfferIds?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "linkedOfferIds",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Linked Viewings</Label>
              <Input
                placeholder="Link Viewing records..."
                value={form.linkedViewingIds?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "linkedViewingIds",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Linked Invoices / Commissions</Label>
              <div className="relative">
                <Input
                  placeholder="Link Billing records..."
                  value={form.linkedInvoiceCommissionIds?.join(", ") || ""}
                  onChange={(e) =>
                    updateField(
                      "linkedInvoiceCommissionIds",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
                <Receipt className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}