import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import {
  Home,
  Trees,
  Building2,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"

const indoorAmenities = [
  "Air Conditioning",
  "Fireplace",
  "Walk-In Closet",
  "Study Room",
  "Maid Room",
  "Storage Room",
  "Laundry Room",
  "Private Office",
  "Home Theater",
  "Wine Cellar",
]

const outdoorAmenities = [
  "Private Pool",
  "Garden",
  "Terrace",
  "Balcony",
  "BBQ Area",
  "Outdoor Kitchen",
  "Kids Play Area",
  "Private Gym",
  "Jogging Track",
]

const wellnessAmenities = [
  "Gym",
  "Spa",
  "Sauna",
  "Steam Room",
  "Yoga Studio",
]

const securityAmenities = [
  "Concierge",
  "24/7 Security",
  "CCTV",
  "Lobby",
  "Intercom",
  "Alarm System",
  "Biometric Access",
]

const smartFeatures = [
  "Smart Lighting",
  "Smart Locks",
  "Smart Thermostat",
  "Biometric Access",
  "EV Charging",
  "Solar Panels",
  "Smart Security",
  "Remote Access",
]

type EquipmentKey = 'interior_amenities' | 'exterior_amenities' | 'wellness_amenities' | 'security_amenities' | 'smart_home_features'

function AmenitySection({
  title,
  icon,
  amenities,
  fieldKey,
}: {
  title: string
  icon: React.ReactNode
  amenities: string[]
  fieldKey: EquipmentKey
}) {
  const { form, updateForm } = usePropertyCreationStore()
  
  const currentAmenities = form.equipment?.[fieldKey] || []

  const toggleAmenity = (amenity: string) => {
    const exists = currentAmenities.includes(amenity)

    if (exists) {
      updateForm({
        equipment: {
          ...form.equipment,
          [fieldKey]: currentAmenities.filter((a) => a !== amenity),
        },
      })
    } else {
      updateForm({
        equipment: {
          ...form.equipment,
          [fieldKey]: [...currentAmenities, amenity],
        },
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity) => {
            const selected = currentAmenities.includes(amenity)

            return (
              <Badge
                key={amenity}
                onClick={() =>
                  toggleAmenity(amenity)
                }
                variant={
                  selected ? "default" : "outline"
                }
                className={`
                  cursor-pointer
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  transition-all
                  duration-200
                  hover:scale-105
                `}
              >
                {amenity}
              </Badge>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DescriptionStep() {
  return (
    <div className="space-y-6">
      {/* Amenities */}

      <div className="grid gap-6 xl:grid-cols-2">
        <AmenitySection
          title="Indoor Amenities"
          icon={
            <Home className="h-5 w-5 text-primary" />
          }
          amenities={indoorAmenities}
          fieldKey="interior_amenities"
        />

        <AmenitySection
          title="Outdoor Amenities"
          icon={
            <Trees className="h-5 w-5 text-primary" />
          }
          amenities={outdoorAmenities}
          fieldKey="exterior_amenities"
        />

        <AmenitySection
          title="Security Amenities"
          icon={
            <ShieldCheck className="h-5 w-5 text-primary" />
          }
          amenities={securityAmenities}
          fieldKey="security_amenities"
        />
        
        <AmenitySection
          title="Wellness Amenities"
          icon={
            <Sparkles className="h-5 w-5 text-primary" />
          }
          amenities={wellnessAmenities}
          fieldKey="wellness_amenities"
        />

        <AmenitySection
          title="Smart Features"
          icon={
            <Sparkles className="h-5 w-5 text-primary" />
          }
          amenities={smartFeatures}
          fieldKey="smart_home_features"
        />
      </div>
    </div>
  )
}