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
import {
  Search,
  MapPin,
  Home,
  Sparkles,
  Zap,
  Bell,
  Sliders,
} from "lucide-react";
import { useLeadCreationStore } from "../store/contactCreationStore";

export default function PropertySearchCriteriaStep() {
  const { form, updateField } = useLeadCreationStore();

  // Multi-select helper functions
  const handleCategoryToggle = (categoryVal: string) => {
    const current: string[] = form.propertyCategories || [];
    const updated = current.includes(categoryVal)
      ? current.filter((c) => c !== categoryVal)
      : [...current, categoryVal];
    updateField("propertyCategories", updated);
  };

  const handleDeliveryChannelToggle = (channelVal: string) => {
    const current: string[] = form.alertDeliveryChannels || [];
    const updated = current.includes(channelVal)
      ? current.filter((ch) => ch !== channelVal)
      : [...current, channelVal];
    updateField("alertDeliveryChannels", updated);
  };

  return (
    <div className="space-y-6 text-foreground">
      {/* 1. TRANSACTION TYPE & CATEGORIES */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Transaction & Property Types
            </h3>
          </div>

          <div className="space-y-6">
            {/* Transaction Type */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Transaction Type Sought</Label>
              <Select
                value={form.transactionTypeSought || "purchase"}
                onValueChange={(val) => updateField("transactionTypeSought", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="short_term_rent">Short-term Rent</SelectItem>
                  <SelectItem value="lease_option">Lease with option</SelectItem>
                  <SelectItem value="investment_acquisition">Investment Acquisition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Categories (Multi-select) */}
            <div>
              <Label className="mb-3 block text-sm font-medium">
                Property Category <span className="text-xs text-muted-foreground">(Select multiple)</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {[
                  { id: "villa_house", label: "Villa / House" },
                  { id: "apartment", label: "Apartment" },
                  { id: "building", label: "Building" },
                  { id: "commercial", label: "Commercial" },
                  { id: "land", label: "Land" },
                  { id: "parking", label: "Parking" },
                  { id: "special", label: "Special" },
                ].map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center space-x-2 rounded-lg border border-border p-2.5 hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <Checkbox
                      checked={(form.propertyCategories || []).includes(cat.id)}
                      onCheckedChange={() => handleCategoryToggle(cat.id)}
                    />
                    <span className="text-xs font-medium">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sub-types */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Property Sub-type(s)</Label>
              <Input
                placeholder="e.g. Penthouse, Duplex, Chalet, Loft (Comma separated)"
                value={form.propertySubTypes?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "propertySubTypes",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. LOCATION & GEOGRAPHIC CRITERIA */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Location & Radius Criteria
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label className="mb-2 block text-sm font-medium">Preferred Country / Countries</Label>
              <Input
                placeholder="e.g. Switzerland, France"
                value={form.preferredCountries?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "preferredCountries",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Preferred Canton(s)</Label>
              <Input
                placeholder="e.g. Geneva, Vaud, Valais"
                value={form.preferredCantons?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "preferredCantons",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Preferred City / Cities</Label>
              <Input
                placeholder="e.g. Lausanne, Montreux"
                value={form.preferredCities?.join(", ") || ""}
                onChange={(e) =>
                  updateField(
                    "preferredCities",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Preferred Neighbourhood(s)</Label>
              <Input
                placeholder="e.g. Ouchy, Centre-ville"
                value={form.preferredNeighbourhoods || ""}
                onChange={(e) => updateField("preferredNeighbourhoods", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Reference Location</Label>
              <Input
                placeholder="e.g. Train Station, School Address"
                value={form.referenceLocation || ""}
                onChange={(e) => updateField("referenceLocation", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Radius from Reference (km)</Label>
              <Input
                type="number"
                placeholder="e.g. 15"
                value={form.radiusKm || ""}
                onChange={(e) => updateField("radiusKm", e.target.valueAsNumber || undefined)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. SIZE & ROOM CONFIGURATION */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Dimensions & Room Layout
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label className="mb-2 block text-sm font-medium">Min Living Area (m²)</Label>
              <Input
                type="number"
                placeholder="e.g. 120"
                value={form.minLivingArea || ""}
                onChange={(e) => updateField("minLivingArea", e.target.valueAsNumber || undefined)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Max Living Area (m²)</Label>
              <Input
                type="number"
                placeholder="e.g. 250"
                value={form.maxLivingArea || ""}
                onChange={(e) => updateField("maxLivingArea", e.target.valueAsNumber || undefined)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Min Land Area (m²)</Label>
              <Input
                type="number"
                placeholder="e.g. 500"
                value={form.minLandArea || ""}
                onChange={(e) => updateField("minLandArea", e.target.valueAsNumber || undefined)}
              />
            </div>

            {/* Min Rooms */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Min Number of Rooms</Label>
              <Select
                value={form.minRooms || "3"}
                onValueChange={(val) => updateField("minRooms", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select min rooms" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "7+"].map((r) => (
                    <SelectItem key={r} value={r}>
                      {r} Rooms
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Bedrooms */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Min Bedrooms</Label>
              <Select
                value={form.minBedrooms || "2"}
                onValueChange={(val) => updateField("minBedrooms", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select min bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5+"].map((b) => (
                    <SelectItem key={b} value={b}>
                      {b} Bedrooms
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Bathrooms */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Min Bathrooms</Label>
              <Select
                value={form.minBathrooms || "1"}
                onValueChange={(val) => updateField("minBathrooms", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select min bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3+"].map((ba) => (
                    <SelectItem key={ba} value={ba}>
                      {ba} Bathrooms
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. AMENITIES, VIEWS & EXPOSURE */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Amenities, Views & Exposure
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Garage / Parking */}
            <div className="space-y-3">
              <Label className="block text-sm font-medium">Garage / Parking Required</Label>
              <RadioGroup
                value={form.parkingRequirement || "preferred"}
                onValueChange={(val) => updateField("parkingRequirement", val)}
                className="flex gap-2 flex-wrap"
              >
                {[
                  { id: "mandatory", label: "Mandatory" },
                  { id: "preferred", label: "Preferred" },
                  { id: "not_required", label: "Not required" },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value={opt.id} />
                    {opt.label}
                  </label>
                ))}
              </RadioGroup>
              {form.parkingRequirement !== "not_required" && (
                <div className="pt-1">
                  <Label className="mb-1 block text-xs">Minimum Parking Spaces</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 2"
                    value={form.minParkingSpaces || ""}
                    onChange={(e) => updateField("minParkingSpaces", e.target.valueAsNumber || undefined)}
                  />
                </div>
              )}
            </div>

            {/* Garden */}
            <div className="space-y-3">
              <Label className="block text-sm font-medium">Garden Required</Label>
              <RadioGroup
                value={form.gardenRequirement || "preferred"}
                onValueChange={(val) => updateField("gardenRequirement", val)}
                className="flex gap-2 flex-wrap"
              >
                {[
                  { id: "mandatory", label: "Mandatory" },
                  { id: "preferred", label: "Preferred" },
                  { id: "not_required", label: "Not required" },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value={opt.id} />
                    {opt.label}
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Terrace / Balcony */}
            <div className="space-y-3">
              <Label className="block text-sm font-medium">Terrace / Balcony</Label>
              <RadioGroup
                value={form.terraceBalconyRequirement || "preferred"}
                onValueChange={(val) => updateField("terraceBalconyRequirement", val)}
                className="flex gap-2 flex-wrap"
              >
                {[
                  { id: "mandatory", label: "Mandatory" },
                  { id: "preferred", label: "Preferred" },
                  { id: "not_required", label: "Not required" },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs cursor-pointer hover:bg-accent/50">
                    <RadioGroupItem value={opt.id} />
                    {opt.label}
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {/* View Preference */}
            <div>
              <Label className="mb-2 block text-sm font-medium">View Preference</Label>
              <Select
                value={form.viewPreference || "no_preference"}
                onValueChange={(val) => updateField("viewPreference", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mountain">Mountain</SelectItem>
                  <SelectItem value="lake">Lake</SelectItem>
                  <SelectItem value="sea">Sea</SelectItem>
                  <SelectItem value="garden">Garden</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="park">Park</SelectItem>
                  <SelectItem value="countryside">Countryside</SelectItem>
                  <SelectItem value="no_preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Orientation */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Orientation Preference</Label>
              <Select
                value={form.orientationPreference || "no_preference"}
                onValueChange={(val) => updateField("orientationPreference", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="south_west">South-West</SelectItem>
                  <SelectItem value="south_east">South-East</SelectItem>
                  <SelectItem value="any_sunny">Any sunny</SelectItem>
                  <SelectItem value="no_preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Floor Preference */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Floor Preference</Label>
              <Select
                value={form.floorPreference || "indifferent"}
                onValueChange={(val) => updateField("floorPreference", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ground">Ground</SelectItem>
                  <SelectItem value="low">Low (1–3)</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="indifferent">Indifferent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Furnished */}
            <div>
              <Label className="mb-2 block text-sm font-medium">Furnished Status</Label>
              <Select
                value={form.furnished || "indifferent"}
                onValueChange={(val) => updateField("furnished", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  <SelectItem value="furnished">Furnished</SelectItem>
                  <SelectItem value="indifferent">Indifferent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. TECHNICAL, ENERGY & CONVENIENCE */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Technical, Energy & Infrastructure
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">Min Construction Year</Label>
              <Input
                type="number"
                placeholder="e.g. 2010"
                value={form.minYearBuilt || ""}
                onChange={(e) => updateField("minYearBuilt", e.target.valueAsNumber || undefined)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Max Construction Year</Label>
              <Input
                type="number"
                placeholder="e.g. 2026"
                value={form.maxYearBuilt || ""}
                onChange={(e) => updateField("maxYearBuilt", e.target.valueAsNumber || undefined)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Max Renovation Accepted</Label>
              <Select
                value={form.maxRenovationNeeded || "turnkey_only"}
                onValueChange={(val) => updateField("maxRenovationNeeded", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="turnkey_only">Turnkey only</SelectItem>
                  <SelectItem value="minor_works_ok">Minor works OK</SelectItem>
                  <SelectItem value="major_renovation_accepted">Major renovation accepted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Minimum Energy Class</Label>
              <Select
                value={form.minEnergyClass || "no_preference"}
                onValueChange={(val) => updateField("minEnergyClass", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select energy class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="no_preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">Heating System</Label>
              <Select
                value={form.heatingSystemPreference || "no_preference"}
                onValueChange={(val) => updateField("heatingSystemPreference", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select heating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heat_pump">Heat Pump</SelectItem>
                  <SelectItem value="gas">Gas</SelectItem>
                  <SelectItem value="oil">Oil</SelectItem>
                  <SelectItem value="district">District</SelectItem>
                  <SelectItem value="no_preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">EV Charging Required</Label>
              <Select
                value={form.evChargingRequired || "indifferent"}
                onValueChange={(val) => updateField("evChargingRequired", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="indifferent">Indifferent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Home Office Required</Label>
              <Select
                value={form.homeOfficeRequired || "indifferent"}
                onValueChange={(val) => updateField("homeOfficeRequired", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="indifferent">Indifferent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Elevator Required</Label>
              <Select
                value={form.elevatorRequired || "indifferent"}
                onValueChange={(val) => updateField("elevatorRequired", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="indifferent">Indifferent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. TIMELINE & AUTOMATED ALERTS */}
      <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
              Timeline & Automated Matching Alerts
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label className="mb-2 block text-sm font-medium">Max Monthly Charges (CHF/EUR)</Label>
              <Input
                type="number"
                placeholder="e.g. 600"
                value={form.maxMonthlyCharges || ""}
                onChange={(e) => updateField("maxMonthlyCharges", e.target.valueAsNumber || undefined)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Desired Move-in / Acquisition</Label>
              <Select
                value={form.desiredMoveInDate || "1_to_3_months"}
                onValueChange={(val) => updateField("desiredMoveInDate", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="under_1_month">&lt; 1 month</SelectItem>
                  <SelectItem value="1_to_3_months">1–3 months</SelectItem>
                  <SelectItem value="3_to_6_months">3–6 months</SelectItem>
                  <SelectItem value="6_to_12_months">6–12 months</SelectItem>
                  <SelectItem value="12_plus_months">12+ months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Matching Alert Active</Label>
              <RadioGroup
                value={form.matchingAlertActive ? "yes" : "no"}
                onValueChange={(val) => updateField("matchingAlertActive", val === "yes")}
                className="flex gap-4 pt-1"
              >
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="yes" />
                  <span className="text-sm">Active</span>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-accent/50">
                  <RadioGroupItem value="no" />
                  <span className="text-sm">Disabled</span>
                </label>
              </RadioGroup>
            </div>
          </div>

          {form.matchingAlertActive && (
            <div className="mt-5 pt-4 border-t border-border grid gap-5 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block text-sm font-medium">Alert Frequency</Label>
                <Select
                  value={form.alertFrequency || "daily"}
                  onValueChange={(val) => updateField("alertFrequency", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium">
                  Alert Delivery Channel(s)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "email", label: "Email" },
                    { id: "sms", label: "SMS" },
                    { id: "whatsapp", label: "WhatsApp" },
                    { id: "app", label: "App notification" },
                  ].map((ch) => (
                    <label
                      key={ch.id}
                      className="flex items-center space-x-2 rounded-lg border border-border p-2 hover:bg-accent/50 cursor-pointer"
                    >
                      <Checkbox
                        checked={(form.alertDeliveryChannels || []).includes(ch.id)}
                        onCheckedChange={() => handleDeliveryChannelToggle(ch.id)}
                      />
                      <span className="text-xs font-medium">{ch.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}