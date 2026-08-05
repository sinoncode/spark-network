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
  Building,
  Calculator,
  Briefcase,
  Lock,
  Wrench,
  Link as LinkIcon,
} from "lucide-react";
import { useLeadCreationStore } from "../store/contactCreationStore";

export default function PropertyForSaleRentStep() {
  const { form, updateField } = useLeadCreationStore();

  return (
    <div className="space-y-6 text-foreground">
      {/* 1. OWNERSHIP & PROPERTY LINKING */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Ownership & Linked Properties
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Is Owner / Vendor */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Is Owner / Vendor?</Label>
              <RadioGroup
                value={form.isOwnerVendor ? "yes" : "no"}
                onValueChange={(val) => updateField("isOwnerVendor", val === "yes")}
                className="flex gap-4"
              >
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="yes" />
                  <span className="text-sm">Yes (Property Owner)</span>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="no" />
                  <span className="text-sm">No (Representative / Agent)</span>
                </label>
              </RadioGroup>
            </div>

            {/* Linked Property in CRM */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Property to Sell/Rent (Linked CRM Records)
              </Label>
              <div className="relative">
                <Input
                  placeholder="Search & link property record..."
                  value={form.linkedPropertyIds?.join(", ") || ""}
                  onChange={(e) =>
                    updateField(
                      "linkedPropertyIds",
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

      {/* 2. VALUATIONS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Property Valuation
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {/* Owner's Estimation */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Owner's Estimated Value (CHF/EUR)
              </Label>
              <Input
                type="number"
                placeholder="e.g. 1,500,000"
                value={form.estimatedValueProperty || ""}
                onChange={(e) => updateField("estimatedValueProperty", e.target.valueAsNumber || undefined)}
              />
            </div>

            {/* Agency Valuation */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Agency Valuation (Tool / Expert)
              </Label>
              <Input
                type="number"
                placeholder="e.g. 1,420,000"
                value={form.agencyValuation || ""}
                onChange={(e) => updateField("agencyValuation", e.target.valueAsNumber || undefined)}
              />
            </div>

            {/* Valuation Date */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Valuation Date</Label>
              <Input
                type="date"
                value={form.valuationDate || ""}
                onChange={(e) => updateField("valuationDate", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. MANDATE & SALE STRATEGY */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Mandate Type & Motivation
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {/* Mandate Type Sought */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Mandate Type Sought</Label>
              <Select
                value={form.mandateTypeSought || "exclusive"}
                onValueChange={(val) => updateField("mandateTypeSought", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mandate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exclusive">Exclusive Mandate</SelectItem>
                  <SelectItem value="open">Open Mandate</SelectItem>
                  <SelectItem value="co_mandate">Co-mandate</SelectItem>
                  <SelectItem value="undecided">Undecided</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reason for Selling/Renting */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Reason for Sale / Rent</Label>
              <Select
                value={form.reasonForSellingRenting || "relocation"}
                onValueChange={(val) => updateField("reasonForSellingRenting", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downsizing">Downsizing</SelectItem>
                  <SelectItem value="upsizing">Upsizing</SelectItem>
                  <SelectItem value="relocation">Relocation</SelectItem>
                  <SelectItem value="divorce">Divorce</SelectItem>
                  <SelectItem value="inheritance">Inheritance</SelectItem>
                  <SelectItem value="investment">Investment Strategy</SelectItem>
                  <SelectItem value="financial">Financial Needs</SelectItem>
                  <SelectItem value="death">Death / Estate Settlement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Urgency */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Urgency to Sell / Rent</Label>
              <Select
                value={form.urgencyToSellRent || "normal"}
                onValueChange={(val) => updateField("urgencyToSellRent", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (&lt; 3 months)</SelectItem>
                  <SelectItem value="normal">Normal (3–6 months)</SelectItem>
                  <SelectItem value="long_term">Long-term (6–12 months)</SelectItem>
                  <SelectItem value="no_urgency">No urgency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Competing Agencies */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Competing Agencies / Listings</Label>
              <Select
                value={form.competingAgencies || "none"}
                onValueChange={(val) => updateField("competingAgencies", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="homegate_newhome">Homegate / Newhome listing</SelectItem>
                  <SelectItem value="other_agency">Other agency</SelectItem>
                  <SelectItem value="multiple_agencies">Multiple agencies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {form.reasonForSellingRenting === "other" && (
            <div className="mt-4">
              <Label className="mb-1 block text-xs">Specify Other Reason</Label>
              <Input
                placeholder="Enter details regarding reason for sale..."
                value={form.reasonOtherDetails || ""}
                onChange={(e) => updateField("reasonOtherDetails", e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 4. FINANCIAL & CONFIDENTIAL DATA */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Confidential Financial Details
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Outstanding Mortgage */}
            <div className="space-y-3">
              <Label className="block text-sm font-medium">Mortgage Outstanding on Property</Label>
              <RadioGroup
                value={form.hasMortgageOutstanding ? "yes" : "no"}
                onValueChange={(val) => updateField("hasMortgageOutstanding", val === "yes")}
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

              {form.hasMortgageOutstanding && (
                <div className="pt-1">
                  <Label className="mb-1 block text-xs">Outstanding Mortgage Amount (CHF/EUR)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 650,000"
                    value={form.mortgageOutstandingAmount || ""}
                    onChange={(e) =>
                      updateField("mortgageOutstandingAmount", e.target.valueAsNumber || undefined)
                    }
                  />
                </div>
              )}
            </div>

            {/* Internal Minimum Price */}
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Minimum Net Price <span className="text-xs text-muted-foreground">(Confidential / Internal)</span>
              </Label>
              <Input
                type="number"
                placeholder="e.g. 1,350,000"
                value={form.minimumNetPriceConfidential || ""}
                onChange={(e) =>
                  updateField("minimumNetPriceConfidential", e.target.valueAsNumber || undefined)
                }
              />
              <p className="mt-1 text-xs text-muted-foreground">
                This figure is strictly hidden from public marketing materials and external agents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. PRE-SALE RENOVATIONS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Pre-Sale Renovations & Improvements
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">Renovation Planned Before Sale?</Label>
              <RadioGroup
                value={form.renovationPlannedBeforeSale ? "yes" : "no"}
                onValueChange={(val) => updateField("renovationPlannedBeforeSale", val === "yes")}
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

            {form.renovationPlannedBeforeSale && (
              <div>
                <Label className="mb-2 block text-sm font-medium">
                  Renovation Budget (CHF/EUR)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 50,000"
                  value={form.renovationBudget || ""}
                  onChange={(e) =>
                    updateField("renovationBudget", e.target.valueAsNumber || undefined)
                  }
                />
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}