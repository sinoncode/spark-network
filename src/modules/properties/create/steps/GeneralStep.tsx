import {
  Card,
  CardContent,CardHeader, CardTitle, 
} from "@/components/ui/card"

import { useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { MapPin, User, Building2, Globe, Landmark } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Textarea } from "@/components/ui/textarea"

import { usePropertyCreationStore } from "../store/propertyCreationStore"
import {
  PROPERTY_CATEGORY_OPTIONS,
  PROPERTY_SUB_TYPE_OPTIONS,
  LISTING_TYPE_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
    MAP_DISPLAY_OPTIONS,
  CONFIDENTIALITY_OPTIONS,
  COMMISSION_PAYER_OPTIONS,
  SOURCE_OPTIONS,
} from "@/types/property.types"
import type { PropertyStatus } from "@/types/property.types"

import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api"

const statusMetadata: Record<string, { title: string; desc: string }> = {
  draft: { title: "Draft", desc: "Visible only to you" },
  active: { title: "Active", desc: "Publicly listed" },
  sold: { title: "Sold", desc: "Archive from market" },
  inactive: { title: "Inactive", desc: "Temporarily hidden" },
  archived: { title: "Archived", desc: "Permanently archived" },
}

export default function GeneralStep() {
  const { form, updateForm } = usePropertyCreationStore()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
  })

  const latitude = form.location?.coordinates?.latitude
  const longitude = form.location?.coordinates?.longitude
  const hasValidCoordinates =
    typeof latitude === "number" &&
    typeof longitude === "number"

  const mapCenter = useMemo<google.maps.LatLngLiteral>(
    () => ({
      lat: hasValidCoordinates ? latitude! : 46.2044,
      lng: hasValidCoordinates ? longitude! : 6.1432,
    }),
    [hasValidCoordinates, latitude, longitude]
  )

  


  return (
    <div className="">

 {/* Address + Coordinates */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left Side */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Property Location
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Street Address */}
            <div className="space-y-2">
              <Label>Address Line 1</Label>

              <Input
                placeholder="Enter property address"
                value={form.location?.address_line_1 ?? ""}
                onChange={(e) =>
                  updateForm({
                    location: {
                      ...form.location,
                      address_line_1: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Address Line 2</Label>

              <Input
                placeholder="Apartment, suite, unit, etc."
                value={form.location?.address_line_2 ?? ""}
                onChange={(e) =>
                  updateForm({
                    location: {
                      ...form.location,
                      address_line_2: e.target.value,
                    },
                  })
                }
              />
            </div>

            {/* Country / State */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Country</Label>

                <Input
                  placeholder="Switzerland"
                  value={form.location?.country ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        country: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>State / Province</Label>

                <Input
                  placeholder="Geneva"
                  value={form.location?.state ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        state: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* City / District / Zip */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>City</Label>

                <Input
                  placeholder="Geneva"
                  value={form.location?.city ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>District</Label>

                <Input
                  placeholder="Eaux-Vives"
                  value={form.location?.district ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        district: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Zip Code</Label>

                <Input
                  placeholder="1200"
                  value={form.location?.zip_code ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        zip_code: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Latitude</Label>

                <Input
                  placeholder="46.2044"
                  value={form.location?.coordinates?.latitude ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        coordinates: {
                          ...form.location?.coordinates,
                          latitude: e.target.value ? Number(e.target.value) : null,
                          longitude: form.location?.coordinates?.longitude ?? null,
                        },
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Longitude</Label>

                <Input
                  placeholder="6.1432"
                  value={form.location?.coordinates?.longitude ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        coordinates: {
                          ...form.location?.coordinates,
                          latitude: form.location?.coordinates?.latitude ?? null,
                          longitude: e.target.value ? Number(e.target.value) : null,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Map Display & Confidentiality */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Map Display</Label>

                <Select
                  value={form.location?.map_display ?? "exact_address"}
                  onValueChange={(value) =>
                    updateForm({
                      location: {
                        ...form.location,
                        map_display: value as any,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select display" />
                  </SelectTrigger>

                  <SelectContent>
                    {MAP_DISPLAY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Confidentiality</Label>

                <Select
                  value={form.location?.confidentiality_level ?? "public"}
                  onValueChange={(value) =>
                    updateForm({
                      location: {
                        ...form.location,
                        confidentiality_level: value as any,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>

                  <SelectContent>
                    {CONFIDENTIALITY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <User className="h-5 w-5 text-primary" />
      Agents
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-6 px-0">

    {/* Agent IDs */}
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Assigned Agent ID</Label>

        <Input
          type="number"
          placeholder="Enter assigned agent ID"
          value={form.agents?.assigned_agent_id ?? ""}
          onChange={(e) =>
            updateForm({
              agents: {
                ...form.agents,
                assigned_agent_id: e.target.value
                  ? Number(e.target.value)
                  : null,
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Referral Agent ID</Label>

        <Input
          type="number"
          placeholder="Enter referral agent ID"
          value={form.agents?.referral_agent_id ?? ""}
          onChange={(e) =>
            updateForm({
              agents: {
                ...form.agents,
                referral_agent_id: e.target.value
                  ? Number(e.target.value)
                  : null,
              },
            })
          }
        />
      </div>
    </div>

    {/* Commission */}
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Commission Rate (%)</Label>

        <Input
          type="number"
          placeholder="Enter commission rate"
          value={form.agents?.commission_rate ?? ""}
          onChange={(e) =>
            updateForm({
              agents: {
                ...form.agents,
                commission_rate: e.target.value
                  ? Number(e.target.value)
                  : null,
              },
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Commission Payer</Label>

        <Select
          value={form.agents?.commission_payer ?? ""}
          onValueChange={(value) =>
            updateForm({
              agents: {
                ...form.agents,
                commission_payer: value,
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select commission payer" />
          </SelectTrigger>

          <SelectContent>
            {COMMISSION_PAYER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value ?? ""}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Source */}
    <div className="space-y-2">
      <Label>Source</Label>

      <Select
        value={form.agents?.source ?? ""}
        onValueChange={(value) =>
          updateForm({
            agents: {
              ...form.agents,
              source: value,
            },
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select source" />
        </SelectTrigger>

        <SelectContent>
          {SOURCE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value ?? ""}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

  </CardContent>

            <div className="space-y-2">
              <Label>Neighborhood Description</Label>

              <Textarea
                rows={5}
                placeholder="Describe the surrounding area, accessibility, transportation, schools, hospitals, shopping centers and other important information."
                value={form.location?.neighborhood_description ?? ""}
                onChange={(e) =>
                  updateForm({
                    location: {
                      ...form.location,
                      neighborhood_description: e.target.value,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Map Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Map Preview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#1A1A1A]">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "820px" }}
                  center={mapCenter}
                  zoom={hasValidCoordinates ? 15 : 6}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                  }}
                >
                  {hasValidCoordinates && (
                    <MarkerF
                      position={{
                        lat: latitude!,
                        lng: longitude!,
                      }}
                    />
                  )}
                </GoogleMap>
              ) : (
                <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed bg-muted/30">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-3 h-10 w-10 text-primary" />

                    <h3 className="font-medium">Map Integration</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Google Maps will appear here once the API is loaded.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <Card className="lg:col-span-2">
        <CardContent className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm">
              Property Title
            </label>

            <Input
              value={form.title}
              onChange={(e) =>
                updateForm({ title: e.target.value })
              }
              placeholder="The Obsidian Penthouse"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm">
                Category
              </label>

              <Select
                value={form.classification?.category ?? ""}
                onValueChange={(value) =>
                  updateForm({
                    classification: {
                      ...form.classification,
                      category: value as any,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {PROPERTY_CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Property Type
              </label>

              <Select
                value={form.classification?.sub_type ?? ""}
                onValueChange={(value) =>
                  updateForm({
                    classification: {
                      ...form.classification,
                      sub_type: value as any,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  {PROPERTY_SUB_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Listing Type
              </label>

              <Select
                value={form.classification?.transaction_type ?? ""}
                onValueChange={(value) =>
                  updateForm({
                    classification: {
                      ...form.classification,
                      transaction_type: value as any,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select listing" />
                </SelectTrigger>

                <SelectContent>
                  {LISTING_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Detailed Description
            </label>

            <Textarea
              rows={8}
              value={form.description ?? ""}
              onChange={(e) =>
                updateForm({
                  description: e.target.value,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5 p-6">
          <h3 className="font-medium">
            Publication Status
          </h3>

          <RadioGroup
            value={form.classification?.listing_status ?? "draft"}
            onValueChange={(value) =>
              updateForm({
                classification: {
                  ...form.classification,
                  listing_status: value as PropertyStatus,
                },
              })
            }
            className="grid gap-3"
          >
            {(["draft", "active", "sold", "inactive", "archived"] as PropertyStatus[]).map((status) => {
              const meta = statusMetadata[status]

              return (
                <RadioGroupItem key={status} value={status}>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                    {meta.title}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {meta.desc}
                  </span>
                </RadioGroupItem>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card> */}
    </div>
  )
}