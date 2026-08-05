import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, UserPlus, Building2, ShieldCheck, FileText } from "lucide-react";
import { useLeadCreationStore } from "../store/contactCreationStore";

export default function ClientClassificationStep() {
  const { form, updateField } = useLeadCreationStore();

  // Helper for multi-select checkboxes
  const handleRoleToggle = (roleValue: string) => {
    const currentRoles: string[] = form.clientRoles || [];
    const updatedRoles = currentRoles.includes(roleValue)
      ? currentRoles.filter((r) => r !== roleValue)
      : [...currentRoles, roleValue];
    updateField("clientRoles", updatedRoles);
  };

  return (
    <div className="space-y-6 text-foreground">
      {/* 1. CLASSIFICATION & PROFILE */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Client Profile & Classification
            </h3>
          </div>

          {/* Client Roles (Multi-Select) */}
          <div className="mb-6">
            <Label className="mb-3 block text-sm font-medium">
              Client Role(s) <span className="text-xs text-muted-foreground">(Select all that apply)</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { id: "buyer", label: "Buyer" },
                { id: "seller", label: "Seller" },
                { id: "tenant", label: "Tenant" },
                { id: "landlord", label: "Landlord" },
                { id: "investor", label: "Investor" },
                { id: "owner_occupier", label: "Owner-Occupier" },
                { id: "co_owner", label: "Co-owner" },
                { id: "heir_estate", label: "Heir / Estate" },
                { id: "power_of_attorney", label: "Power of Attorney holder" },
                { id: "other", label: "Other" },
              ].map((role) => (
                <label
                  key={role.id}
                  className="flex items-center space-x-2 rounded-lg border border-border p-2.5 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <Checkbox
                    checked={(form.clientRoles || []).includes(role.id)}
                    onCheckedChange={() => handleRoleToggle(role.id)}
                  />
                  <span className="text-xs font-medium">{role.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Select Dropdowns Grid */}
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {/* Client Sub-type */}
            <div>
              <Label className="mb-2 block text-sm">Client Sub-type</Label>
              <Select
                value={form.clientSubtype || "private_individual"}
                onValueChange={(val) => updateField("clientSubtype", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub-type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private_individual">Private Individual</SelectItem>
                  <SelectItem value="company_corporate">Company / Corporate</SelectItem>
                  <SelectItem value="trust_foundation">Trust / Foundation</SelectItem>
                  <SelectItem value="fund_institutional">Fund / Institutional</SelectItem>
                  <SelectItem value="government_municipality">Government / Municipality</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Client Category */}
            <div>
              <Label className="mb-2 block text-sm">Client Category</Label>
              <Select
                value={form.clientCategory || "standard"}
                onValueChange={(val) => updateField("clientCategory", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="ultra_hnw">Ultra-HNW</SelectItem>
                  <SelectItem value="institutional">Institutional</SelectItem>
                  <SelectItem value="social_housing">Social Housing</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Relationship Stage */}
            <div>
              <Label className="mb-2 block text-sm">Relationship Stage</Label>
              <Select
                value={form.relationshipStage || "prospect"}
                onValueChange={(val) => updateField("relationshipStage", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="active">Active Client</SelectItem>
                  <SelectItem value="recurring">Recurring Client</SelectItem>
                  <SelectItem value="former">Former Client</SelectItem>
                  <SelectItem value="dormant">Dormant</SelectItem>
                  <SelectItem value="referrer_only">Referrer only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Level */}
            <div>
              <Label className="mb-2 block text-sm">Priority Level</Label>
              <Select
                value={form.priorityLevel || "normal"}
                onValueChange={(val) => updateField("priorityLevel", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Referred Client Option */}
          <div className="mt-6 pt-4 border-t border-border grid gap-4 md:grid-cols-2 items-end">
            <div>
              <Label className="mb-2 block text-sm font-medium">Referred Client?</Label>
              <RadioGroup
                value={form.isReferred ? "yes" : "no"}
                onValueChange={(val) => updateField("isReferred", val === "yes")}
                className="flex gap-4"
              >
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="no" />
                  <span className="text-sm">No</span>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="yes" />
                  <span className="text-sm">Yes</span>
                </label>
              </RadioGroup>
            </div>

            {form.isReferred && (
              <div>
                <Label className="mb-2 block text-sm">Referred By (Link Contact)</Label>
                <Input
                  placeholder="Search contact name..."
                  value={form.referredByContactId || ""}
                  onChange={(e) => updateField("referredByContactId", e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 2. LEGAL ENTITY / COMPANY DETAILS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Company & Legal Entity Information
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label className="mb-2 block text-sm">Company / Legal Entity Name</Label>
              <Input
                placeholder="e.g. Acme Corp AG"
                value={form.companyName || ""}
                onChange={(e) => updateField("companyName", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Company Registration No.</Label>
              <Input
                placeholder="e.g. CHE-123.456.789"
                value={form.companyRegistrationNo || ""}
                onChange={(e) => updateField("companyRegistrationNo", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">VAT / UID Number</Label>
              <Input
                placeholder="e.g. CHE-123.456.789 MWST"
                value={form.vatUidNumber || ""}
                onChange={(e) => updateField("vatUidNumber", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Legal Representative</Label>
              <Input
                placeholder="Name or Contact Link"
                value={form.legalRepresentativeName || ""}
                onChange={(e) => updateField("legalRepresentativeName", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. DOMICILE & SWISS RESIDENCE PERMIT */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Fiscal Domicile & Legal Restrictions
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Country */}
            <div>
              <Label className="mb-2 block text-sm">Fiscal Domicile Country</Label>
              <Select
                value={form.fiscalDomicileCountry || "switzerland"}
                onValueChange={(val) => updateField("fiscalDomicileCountry", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="switzerland">Switzerland</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="italy">Italy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resident in Switzerland */}
            <div>
              <Label className="mb-2 block text-sm">Resident in Switzerland</Label>
              <RadioGroup
                value={form.isResidentInSwitzerland ? "yes" : "no"}
                onValueChange={(val) => updateField("isResidentInSwitzerland", val === "yes")}
                className="flex gap-4"
              >
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="yes" />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="no" />
                  <span className="text-sm">No</span>
                </label>
              </RadioGroup>
            </div>

            {/* Residence Permit Type */}
            <div>
              <Label className="mb-2 block text-sm">Swiss Residence Permit Type</Label>
              <Select
                value={form.swissResidencePermitType || "none"}
                onValueChange={(val) => updateField("swissResidencePermitType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select permit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Swiss Citizen)</SelectItem>
                  <SelectItem value="B">B (Temporary)</SelectItem>
                  <SelectItem value="C">C (Settlement)</SelectItem>
                  <SelectItem value="G">G (Frontier)</SelectItem>
                  <SelectItem value="L">L (Short-term)</SelectItem>
                  <SelectItem value="F">F (Provisional)</SelectItem>
                  <SelectItem value="S">S (Protection)</SelectItem>
                  <SelectItem value="N">N (Asylum Seeker)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lex Koller Restriction */}
          <div className="mt-6 pt-4 border-t border-border">
            <Label className="mb-2 block text-sm font-medium">Lex Koller (LFAIE) Restriction</Label>
            <RadioGroup
              value={form.lexKollerRestriction ? "yes" : "no"}
              onValueChange={(val) => updateField("lexKollerRestriction", val === "yes")}
              className="flex gap-4"
            >
              <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                <RadioGroupItem value="yes" />
                <span className="text-sm">Yes — Non-resident restricted buyer</span>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                <RadioGroupItem value="no" />
                <span className="text-sm">No restriction</span>
              </label>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* 4. AGREEMENTS & POWER OF ATTORNEY */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Agreements & Power of Attorney
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Exclusivity & Signed Agreement */}
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block text-sm">Exclusivity with Agency</Label>
                <RadioGroup
                  value={form.exclusivityWithAgency ? "yes" : "no"}
                  onValueChange={(val) => updateField("exclusivityWithAgency", val === "yes")}
                  className="flex gap-4"
                >
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="yes" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="no" />
                    <span className="text-sm">No</span>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-2 block text-sm">Signed Agency Agreement</Label>
                <RadioGroup
                  value={form.signedAgencyAgreement ? "yes" : "no"}
                  onValueChange={(val) => updateField("signedAgencyAgreement", val === "yes")}
                  className="flex gap-4"
                >
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="yes" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="no" />
                    <span className="text-sm">No</span>
                  </label>
                </RadioGroup>
              </div>

              {form.signedAgencyAgreement && (
                <div className="p-4 rounded-xl border border-border bg-accent/20 space-y-3">
                  <div>
                    <Label className="mb-1 block text-xs">Agreement Date</Label>
                    <Input
                      type="date"
                      value={form.agencyAgreementDate || ""}
                      onChange={(e) => updateField("agencyAgreementDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs">Upload Agreement Document</Label>
                    <div className="flex items-center gap-2">
                      <Input type="file" className="cursor-pointer text-xs" />
                      <Button size="icon" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Power of Attorney */}
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block text-sm">Power of Attorney</Label>
                <RadioGroup
                  value={form.hasPowerOfAttorney ? "yes" : "no"}
                  onValueChange={(val) => updateField("hasPowerOfAttorney", val === "yes")}
                  className="flex gap-4"
                >
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="yes" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="no" />
                    <span className="text-sm">No</span>
                  </label>
                </RadioGroup>
              </div>

              {form.hasPowerOfAttorney && (
                <div className="p-4 rounded-xl border border-border bg-accent/20 space-y-3">
                  <div>
                    <Label className="mb-1 block text-xs">Holder Name</Label>
                    <Input
                      placeholder="e.g. John Doe"
                      value={form.poaHolderName || ""}
                      onChange={(e) => updateField("poaHolderName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs">Upload POA Document</Label>
                    <div className="flex items-center gap-2">
                      <Input type="file" className="cursor-pointer text-xs" />
                      <Button size="icon" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          
        </CardContent>
      </Card>
    </div>
  );
}