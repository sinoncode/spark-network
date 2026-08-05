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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Landmark,
  ShieldAlert,
  FileCheck2,
  Upload,
  Percent,
} from "lucide-react";
import { useLeadCreationStore } from "../store/contactCreationStore";

export default function FinancialProfileStep() {
  const { form, updateField } = useLeadCreationStore();

  return (
    <div className="space-y-6 text-foreground">
      {/* 1. BUDGET & INVESTMENT REQUIREMENTS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Budget & Financial Parameters
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {/* Currency */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Currency</Label>
              <Select
                value={form.budgetCurrency || "CHF"}
                onValueChange={(val) => updateField("budgetCurrency", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                  <SelectItem value="AED">AED (UAE Dirham)</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Minimum Budget */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Budget — Minimum
              </Label>
              <Input
                type="number"
                placeholder="e.g. 500,000"
                value={form.budgetMin || ""}
                onChange={(e) => updateField("budgetMin", e.target.valueAsNumber || undefined)}
              />
            </div>

            {/* Maximum Budget */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Budget — Maximum
              </Label>
              <Input
                type="number"
                placeholder="e.g. 1,200,000"
                value={form.budgetMax || ""}
                onChange={(e) => updateField("budgetMax", e.target.valueAsNumber || undefined)}
              />
            </div>

            {/* Budget Flexibility */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Budget Flexibility
              </Label>
              <Select
                value={form.budgetFlexibility || "firm"}
                onValueChange={(val) => updateField("budgetFlexibility", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select flexibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="firm">Firm maximum</SelectItem>
                  <SelectItem value="flexible_10">Slightly flexible (±10%)</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditional Rental & Investment fields */}
          <div className="mt-5 pt-4 border-t border-border grid gap-5 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Monthly Rental Budget <span className="text-xs text-muted-foreground">(For Tenants)</span>
              </Label>
              <Input
                type="number"
                placeholder="e.g. 3,500"
                value={form.monthlyRentalBudget || ""}
                onChange={(e) => updateField("monthlyRentalBudget", e.target.valueAsNumber || undefined)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Investment Return Target % <span className="text-xs text-muted-foreground">(Yield for Investors)</span>
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 5.5"
                  value={form.investmentReturnTarget || ""}
                  onChange={(e) => updateField("investmentReturnTarget", e.target.valueAsNumber || undefined)}
                />
                <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. FINANCING STRUCTURE & MORTGAGE */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Financing & Equity Details
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {/* Financing Method */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Financing Method</Label>
              <Select
                value={form.financingMethod || "cash"}
                onValueChange={(val) => updateField("financingMethod", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash / Own Funds</SelectItem>
                  <SelectItem value="mortgage_bank">Mortgage (Bank)</SelectItem>
                  <SelectItem value="mortgage_insurance">Mortgage (Insurance)</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="pension_fund">Pension Fund (2nd Pillar)</SelectItem>
                  <SelectItem value="family_loan">Family Loan</SelectItem>
                  <SelectItem value="investor_funds">Investor Funds</SelectItem>
                  <SelectItem value="tbd">To be determined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Equity Available */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Equity Available
              </Label>
              <Input
                type="number"
                placeholder="e.g. 300,000"
                value={form.equityAvailable || ""}
                onChange={(e) => updateField("equityAvailable", e.target.valueAsNumber || undefined)}
              />
            </div>

            {/* Mortgage Amount Required */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Mortgage Amount Required
              </Label>
              <Input
                type="number"
                placeholder="e.g. 700,000"
                value={form.mortgageAmountRequired || ""}
                onChange={(e) => updateField("mortgageAmountRequired", e.target.valueAsNumber || undefined)}
              />
            </div>
          </div>

          {/* Pre-approval Section */}
          <div className="mt-6 pt-4 border-t border-border space-y-4">
            <div className="grid gap-4 md:grid-cols-2 items-end">
              <div>
                <Label className="mb-2 block text-sm font-medium">Pre-approved for Mortgage?</Label>
                <RadioGroup
                  value={form.mortgagePreApprovalStatus || "no"}
                  onValueChange={(val) => updateField("mortgagePreApprovalStatus", val)}
                  className="flex gap-3 flex-wrap"
                >
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="yes" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="in_progress" />
                    <span className="text-sm">In Progress</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value="no" />
                    <span className="text-sm">No</span>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium">Mortgage Advisor / Bank Contact</Label>
                <Input
                  placeholder="Bank name or search contact link..."
                  value={form.mortgageAdvisorContactId || ""}
                  onChange={(e) => updateField("mortgageAdvisorContactId", e.target.value)}
                />
              </div>
            </div>

            {/* Expanded Pre-Approval Fields */}
            {form.mortgagePreApprovalStatus === "yes" && (
              <div className="p-4 rounded-xl border border-border bg-accent/20 grid gap-4 sm:grid-cols-3">
                <div>
                  <Label className="mb-1 block text-xs font-medium">Approving Bank / Institution</Label>
                  <Input
                    placeholder="e.g. UBS / Credit Suisse"
                    value={form.preApprovalBank || ""}
                    onChange={(e) => updateField("preApprovalBank", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs font-medium">Approved Amount</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 800,000"
                    value={form.preApprovalAmount || ""}
                    onChange={(e) => updateField("preApprovalAmount", e.target.valueAsNumber || undefined)}
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs font-medium">Pre-approval Expiry Date</Label>
                  <Input
                    type="date"
                    value={form.preApprovalExpiryDate || ""}
                    onChange={(e) => updateField("preApprovalExpiryDate", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. AML / KYC COMPLIANCE & WEALTH ORIGIN */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              AML / KYC Compliance & Wealth Origin
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {/* Net Worth */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Net Worth Indication</Label>
              <Select
                value={form.netWorthIndication || "undisclosed"}
                onValueChange={(val) => updateField("netWorthIndication", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select net worth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_1m">&lt; 1M</SelectItem>
                  <SelectItem value="1m_5m">1 – 5M</SelectItem>
                  <SelectItem value="5m_20m">5 – 20M</SelectItem>
                  <SelectItem value="20m_100m">20 – 100M</SelectItem>
                  <SelectItem value="over_100m">100M+</SelectItem>
                  <SelectItem value="undisclosed">Undisclosed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source of Funds */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Source of Funds <span className="text-xs text-muted-foreground">(Required for AML)</span>
              </Label>
              <Select
                value={form.sourceOfFunds || "salary_business"}
                onValueChange={(val) => updateField("sourceOfFunds", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary_business">Salary / Business</SelectItem>
                  <SelectItem value="sale_of_property">Sale of Property</SelectItem>
                  <SelectItem value="inheritance">Inheritance</SelectItem>
                  <SelectItem value="investment_returns">Investment Returns</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AML/KYC Status */}
            <div>
              <Label className="mb-2 block text-sm font-medium">AML / KYC Verified</Label>
              <Select
                value={form.amlKycStatus || "pending"}
                onValueChange={(val) => updateField("amlKycStatus", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="not_required">Not required</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AML Risk Rating */}
            <div>
              <Label className="mb-2 block text-sm font-medium">AML Risk Rating</Label>
              <Select
                value={form.amlRiskRating || "low"}
                onValueChange={(val) => updateField("amlRiskRating", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="pep">PEP (Politically Exposed Person)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditional AML Verification Details */}
          {form.amlKycStatus === "verified" && (
            <div className="mt-4 p-4 rounded-xl border border-border bg-accent/20 grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1 block text-xs font-medium">Verification Date</Label>
                <Input
                  type="date"
                  value={form.amlVerificationDate || ""}
                  onChange={(e) => updateField("amlVerificationDate", e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-1 block text-xs font-medium">Verification Method</Label>
                <Input
                  placeholder="e.g. Video ID / Passport Copy / Notary"
                  value={form.amlVerificationMethod || ""}
                  onChange={(e) => updateField("amlVerificationMethod", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* PEP Declaration */}
          <div className="mt-5 pt-4 border-t border-border">
            <Label className="mb-2 block text-sm font-medium">PEP Declaration (Politically Exposed Person)</Label>
            <RadioGroup
              value={form.isPepDeclared ? "yes" : "no"}
              onValueChange={(val) => updateField("isPepDeclared", val === "yes")}
              className="flex gap-4"
            >
              <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                <RadioGroupItem value="no" />
                <span className="text-sm">No</span>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                <RadioGroupItem value="yes" />
                <span className="text-sm">Yes (Provide details below)</span>
              </label>
            </RadioGroup>

            {form.isPepDeclared && (
              <div className="mt-3">
                <Input
                  placeholder="Provide details regarding political exposure position/role..."
                  value={form.pepDetails || ""}
                  onChange={(e) => updateField("pepDetails", e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 4. ID DOCUMENTATION */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileCheck2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Identity Verification Document
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4 items-end">
            {/* Document Type */}
            <div>
              <Label className="mb-2 block text-sm font-medium">ID Document Type</Label>
              <Select
                value={form.idDocumentType || "passport"}
                onValueChange={(val) => updateField("idDocumentType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="national_id">National ID Card</SelectItem>
                  <SelectItem value="residence_permit">Residence Permit</SelectItem>
                  <SelectItem value="drivers_licence">Driver's Licence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Document Number */}
            <div>
              <Label className="mb-2 block text-sm font-medium">ID Document Number</Label>
              <Input
                placeholder="Enter document number"
                value={form.idDocumentNumber || ""}
                onChange={(e) => updateField("idDocumentNumber", e.target.value)}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <Label className="mb-2 block text-sm font-medium">ID Expiry Date</Label>
              <Input
                type="date"
                value={form.idExpiryDate || ""}
                onChange={(e) => updateField("idExpiryDate", e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Upload ID Document</Label>
              <div className="flex items-center gap-2">
                <Input type="file" className="cursor-pointer text-xs" />
                <Button size="icon" variant="outline" type="button">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}