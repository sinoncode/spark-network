import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Textarea } from "@/components/ui/textarea"

import { useLeadCreationStore } from "../store/leadCreationStore"
import { Button } from "@/components/ui/button"

const statusMetadata = {
  draft: { title: "Draft", desc: "Visible only to you" },
  active: { title: "Active", desc: "Publicly listed" },
  sold: { title: "Sold", desc: "Archive from market" },
}

export default function GeneralStep() {
  const { form, updateField } =
    useLeadCreationStore()

  return (
    <div className="space-y-6">
      {/* GENERAL INFORMATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Localisation
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Agent */}
            <div>
              <label className="mb-2 block text-sm">
                Agent
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="edyta">
                    Edyta Graf
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm">
                Category
              </label>

              <Select
                value={form.leadType}
                onValueChange={(value) =>
                  updateField("leadType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="home">
                    Home
                  </SelectItem>

                  <SelectItem value="apartment">
                    Apartment
                  </SelectItem>

                  <SelectItem value="villa">
                    Villa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm">
                Status
              </label>

              <Select
                value={form.publicationStatus}
                onValueChange={(value) =>
                  updateField(
                    "publicationStatus",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">
                    Active
                  </SelectItem>

                  <SelectItem value="draft">
                    Draft
                  </SelectItem>

                  <SelectItem value="sold">
                    Sold
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact */}
            <div>
              <label className="mb-2 block text-sm">
                Contact
              </label>

              <Input placeholder="Manuel" />
            </div>

            {/* Source */}
            <div>
              <label className="mb-2 block text-sm">
                Property Source
              </label>
              <Input placeholder="2morrow.com" />

            </div>

            {/* Proprietary Source */}
            <div>
              <label className="mb-2 block text-sm">
                Marketing source
              </label>

              <Input />
            </div>
          </div>

          {/* Transaction */}
          <div className="mt-5">
            <label className="mb-2 block text-sm">
              Transaction
            </label>

            <RadioGroup
              value={form.listingType}
              onValueChange={(value) =>
                updateField("listingType", value)
              }
              className="flex gap-3"
            >
              <label className="flex items-center gap-1 rounded-lg border px-2 py-1 cursor-pointer">
                <RadioGroupItem value="sale" />
                Sale
              </label>

              <label className="flex items-center gap-1 rounded-lg border px-2 py-1 cursor-pointer">
                <RadioGroupItem value="rent" />
                Rent
              </label>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* LOCALIZATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Localisation
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm">
                City
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Switzerland" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="switzerland">
                    Switzerland
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Radius
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="2800 Delemont" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="2800">
                    2800 Delemont
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BUDGET */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">

          <div className="mt-0">
            <label className="mb-2 block text-sm">
              Private Notes
            </label>

            <Textarea
              rows={5}
              placeholder="Bonjour, Ce bien m'intéresse..."
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="rounded-lg py-5 px-8 border border-blue-600">Save</Button>

            <button className="rounded-lg border border-red-500 px-8 py-2 text-red-500">
              Cancel
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}