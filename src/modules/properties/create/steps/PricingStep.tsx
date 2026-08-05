import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import {
  DollarSign,
  Home,
  BedDouble,
  Bath,
  Car,
  Building2,
} from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"
import {
  FURNISHING_STATUS_OPTIONS,
  FACING_DIRECTION_OPTIONS,
  PRICE_TYPE_OPTIONS,
  CONDITION_OPTIONS,
  CONSTRUCTION_TYPE_OPTIONS,
} from "@/types/property.types"

const bedroomOptions = [
  "Studio",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6+",
]

const bathroomOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6+",
]

export default function PricingStep() {
  const { form, updateForm } = usePropertyCreationStore()

  return (
    <div className="space-y-6">
      {/* Property Specifications */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Property Specifications
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label>Living Area (m²)</Label>

            <Input
              type="number"
              placeholder="120"
              value={form.dimensions?.living_area ?? ""}
              onChange={(e) =>
                updateForm({
                  dimensions: {
                    ...form.dimensions,
                    living_area: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Gross Floor Area (m²)</Label>

            <Input
              type="number"
              placeholder="150"
              value={form.dimensions?.gross_floor_area ?? ""}
              onChange={(e) =>
                updateForm({
                  dimensions: {
                    ...form.dimensions,
                    gross_floor_area: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Plot Area (m²)</Label>

            <Input
              type="number"
              placeholder="500"
              value={form.dimensions?.plot_area ?? ""}
              onChange={(e) =>
                updateForm({
                  dimensions: {
                    ...form.dimensions,
                    plot_area: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Year Built</Label>

            <Input
              type="number"
              placeholder="2024"
              value={form.construction?.year_built ?? ""}
              onChange={(e) =>
                updateForm({
                  construction: {
                    ...form.construction,
                    year_built: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Bedrooms Bathrooms */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-primary" />
            Rooms & Capacity
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label>Bedrooms</Label>

            <div className="mt-3 flex flex-wrap gap-2">
              {bedroomOptions.map((room) => (
                <Button
                  key={room}
                  variant={
                    `${form.dimensions?.bedrooms ?? 0}` === room
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    updateForm({
                      dimensions: {
                        ...form.dimensions,
                        bedrooms:
                          room === "Studio"
                            ? 0
                            : room === "6+"
                              ? 6
                              : Number(room),
                      },
                    })
                  }
                >
                  {room}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Bathrooms</Label>

            <div className="mt-3 flex flex-wrap gap-2">
              {bathroomOptions.map((room) => (
                <Button
                  key={room}
                  variant={
                    `${form.dimensions?.bathrooms ?? 0}` === room
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    updateForm({
                      dimensions: {
                        ...form.dimensions,
                        bathrooms:
                          room === "6+"
                            ? 6
                            : Number(room),
                      },
                    })
                  }
                >
                  {room}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Rooms (Total)</Label>

              <Input
                type="number"
                placeholder="5"
                value={form.dimensions?.rooms ?? ""}
                onChange={(e) =>
                  updateForm({
                    dimensions: {
                      ...form.dimensions,
                      rooms: e.target.value ? Number(e.target.value) : null,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Shower Rooms</Label>

              <Input
                type="number"
                placeholder="1"
                value={form.dimensions?.shower_rooms ?? ""}
                onChange={(e) =>
                  updateForm({
                    dimensions: {
                      ...form.dimensions,
                      shower_rooms: e.target.value ? Number(e.target.value) : null,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Separate WCs</Label>

              <Input
                type="number"
                placeholder="1"
                value={form.dimensions?.separate_wcs ?? ""}
                onChange={(e) =>
                  updateForm({
                    dimensions: {
                      ...form.dimensions,
                      separate_wcs: e.target.value ? Number(e.target.value) : null,
                    },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floor Information */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Floor Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label>Floor Number</Label>

            <Input
              placeholder="3"
              value={form.dimensions?.floor_number ?? ""}
              onChange={(e) =>
                updateForm({
                  dimensions: {
                    ...form.dimensions,
                    floor_number: e.target.value || null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Total Floors</Label>

            <Input
              type="number"
              placeholder="10"
              value={form.dimensions?.total_floors ?? ""}
              onChange={(e) =>
                updateForm({
                  dimensions: {
                    ...form.dimensions,
                    total_floors: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Balconies</Label>

            <Input
              type="number"
              placeholder="2"
              value={form.dimensions?.balconies ?? ""}
              onChange={(e) =>
                updateForm({
                  dimensions: {
                    ...form.dimensions,
                    balconies: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Ceiling Height (m)</Label>

            <Input
              type="number"
              step="0.1"
              placeholder="2.7"
              value={form.dimensions?.ceiling_height ?? ""}
              onChange={(e) =>
                updateForm({
                  dimensions: {
                    ...form.dimensions,
                    ceiling_height: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Furnishing & Construction */}

      <Card>
        <CardHeader>
          <CardTitle>
            Furnishing & Construction
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Furnishing Status</Label>

            <Select
              value={form.equipment?.furnishing_status ?? ""}
              onValueChange={(value) =>
                updateForm({
                  equipment: {
                    ...form.equipment,
                    furnishing_status: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select furnishing" />
              </SelectTrigger>

              <SelectContent>
                {FURNISHING_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Condition</Label>

            <Select
              value={form.construction?.condition ?? ""}
              onValueChange={(value) =>
                updateForm({
                  construction: {
                    ...form.construction,
                    condition: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>

              <SelectContent>
                {CONDITION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Facing Direction</Label>

            <Select
              value={form.orientation?.facing_direction ?? ""}
              onValueChange={(value) =>
                updateForm({
                  orientation: {
                    ...form.orientation,
                    facing_direction: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select facing" />
              </SelectTrigger>

              <SelectContent>
                {FACING_DIRECTION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Construction Type</Label>

            <Select
              value={form.construction?.construction_type ?? ""}
              onValueChange={(value) =>
                updateForm({
                  construction: {
                    ...form.construction,
                    construction_type: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Construction" />
              </SelectTrigger>

              <SelectContent>
                {CONSTRUCTION_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Parking */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            Parking
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-3">
          <div className="flex items-center justify-left gap-5">
            <Label>Covered Parking</Label>
            <Switch
              checked={form.parking?.covered_parking ?? false}
              onCheckedChange={(val) =>
                updateForm({
                  parking: {
                    ...form.parking,
                    covered_parking: val,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-left gap-5">
            <Label>Open Parking</Label>
            <Switch
              checked={form.parking?.open_parking ?? false}
              onCheckedChange={(val) =>
                updateForm({
                  parking: {
                    ...form.parking,
                    open_parking: val,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Parking Slots</Label>

            <Input
              type="number"
              placeholder="2"
              value={form.parking?.parking_slots ?? ""}
              onChange={(e) =>
                updateForm({
                  parking: {
                    ...form.parking,
                    parking_slots: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Pricing Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label>Property Price</Label>

            <Input
              type="number"
              placeholder="850000"
              value={form.pricing?.price ?? ""}
              onChange={(e) =>
                updateForm({
                  pricing: {
                    ...form.pricing,
                    price: e.target.value ? Number(e.target.value) : 0,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>

            <Input
              placeholder="CHF"
              value={form.pricing?.currency ?? "CHF"}
              onChange={(e) =>
                updateForm({
                  pricing: {
                    ...form.pricing,
                    currency: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Price Type</Label>

            <Select
              value={form.pricing?.price_type ?? ""}
              onValueChange={(value) =>
                updateForm({
                  pricing: {
                    ...form.pricing,
                    price_type: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                {PRICE_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Price Per m²</Label>

            <Input
              type="number"
              placeholder="7000"
              value={form.pricing?.price_per_sqm ?? ""}
              onChange={(e) =>
                updateForm({
                  pricing: {
                    ...form.pricing,
                    price_per_sqm: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Discount</Label>

            <Input
              type="number"
              placeholder="5000"
              value={form.pricing?.discount ?? ""}
              onChange={(e) =>
                updateForm({
                  pricing: {
                    ...form.pricing,
                    discount: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-left gap-5 col-span-1">
            <Label>VAT Applicable</Label>
            <Switch
              checked={form.pricing?.vat_applicable ?? false}
              onCheckedChange={(val) =>
                updateForm({
                  pricing: {
                    ...form.pricing,
                    vat_applicable: val,
                  },
                })
              }
            />
          </div>

          {form.pricing?.vat_applicable && (
            <div className="space-y-2">
              <Label>VAT Rate (%)</Label>

              <Input
                type="number"
                step="0.1"
                placeholder="7.7"
                value={form.pricing?.vat_rate ?? ""}
                onChange={(e) =>
                  updateForm({
                    pricing: {
                      ...form.pricing,
                      vat_rate: e.target.value ? Number(e.target.value) : null,
                    },
                  })
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Financial Details */}

      <Card>
        <CardHeader>
          <CardTitle>
            Financial Details
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Annual Property Tax</Label>

            <Input
              type="number"
              placeholder="5000"
              value={form.financials?.annual_property_tax ?? ""}
              onChange={(e) =>
                updateForm({
                  financials: {
                    ...form.financials,
                    annual_property_tax: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Maintenance Charges</Label>

            <Input
              type="number"
              placeholder="500"
              value={form.financials?.maintenance_charges ?? ""}
              onChange={(e) =>
                updateForm({
                  financials: {
                    ...form.financials,
                    maintenance_charges: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Monthly HOA Charges</Label>

            <Input
              type="number"
              placeholder="300"
              value={form.financials?.monthly_hoa_charges ?? ""}
              onChange={(e) =>
                updateForm({
                  financials: {
                    ...form.financials,
                    monthly_hoa_charges: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}