import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

import { MapPin, Building2, Globe, Landmark } from "lucide-react"

import { useLeadCreationStore } from "../store/leadCreationStore"

export default function CharacteristicsStep() {
  const { form, updateField } = useLeadCreationStore()

  return (
    <div className="space-y-6">
      {/* GENERAL INFORMATION */}


      {/* LOCALIZATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-lg font-semibold text-blue-600">
            Criteria
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm">
                Agents
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Edyta Graf" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Edyta Graf">
                    Edyta Graf
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Rooms
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Home" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="2800">
                    2800 Delemont
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-7 block text-sm">

              </label>

              <Input placeholder="Max" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ADDITIONAL CRITERIA */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-8">
          <h3 className="mb-8 text-lg font-semibold text-blue-600">
            Additional Criteria
          </h3>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {/* Livable Space */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Livable Space
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="144" />

                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Bathroom(s) */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Bathroom(s)
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min" />

                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Terraces */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Terraces
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min" />

                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Parking */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Parking spots
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min" />

                  <Input placeholder="Max" />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* Land Area */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Land Area
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min" />

                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Price
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min" />

                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Balconies */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Balconies
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min" />

                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Built Year */}
              <div>
                <label className="mb-3 block text-lg font-medium">
                  Built year
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min" />

                  <Input placeholder="Max" />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 flex gap-5">
            <Button className="rounded-lg border border-primary py-5 px-8">
              Save
            </Button>

            <Button
              variant="outline"
              className="rounded-lg py-5 px-8 border-red-400 text-red-500"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}