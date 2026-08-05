import { CalendarIcon, Globe, ShieldCheck, Star } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { usePropertyCreationStore } from "../store/propertyCreationStore"

export default function PublicationStep() {
  const { form, updateForm } = usePropertyCreationStore()

  return (
    <div className="space-y-6">
      {/* Publication Settings */}

      <Card>
        <CardHeader>
          <CardTitle>
            Publication Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Visibility</Label>

            <Select
              value={form.publication?.visibility ?? "public"}
              onValueChange={(value) =>
                updateForm({
                  publication: {
                    ...form.publication,
                    visibility: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Visibility" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="public">
                  Public
                </SelectItem>

                <SelectItem value="private">
                  Private
                </SelectItem>

                <SelectItem value="unlisted">
                  Unlisted
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Listing Priority</Label>

            <Select
              value={form.publication?.listing_priority ?? "normal"}
              onValueChange={(value) =>
                updateForm({
                  publication: {
                    ...form.publication,
                    listing_priority: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="standard">
                  Standard
                </SelectItem>

                <SelectItem value="premium">
                  Premium
                </SelectItem>

                <SelectItem value="featured">
                  Featured
                </SelectItem>

                <SelectItem value="urgent">
                  Urgent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Featured Property & Verification */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Highlight & Verification
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-left gap-5">
            <div>
              <p className="font-medium">
                Highlight this property
              </p>

              <p className="text-sm text-muted-foreground">
                Featured listings appear first in search results.
              </p>
            </div>

            <Switch
              checked={form.publication?.is_featured ?? false}
              onCheckedChange={(value) =>
                updateForm({
                  publication: {
                    ...form.publication,
                    is_featured: value,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-left gap-5">
            <Label>
              Verified Listing
            </Label>

            <Switch
              checked={form.publication?.is_verified ?? false}
              onCheckedChange={(value) =>
                updateForm({
                  publication: {
                    ...form.publication,
                    is_verified: value,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Publish Dates */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Publication Schedule
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Publish Date</Label>

            <Input
              type="date"
              value={form.publication?.publish_date ? new Date(form.publication.publish_date).toISOString().split('T')[0] : ""}
              onChange={(e) =>
                updateForm({
                  publication: {
                    ...form.publication,
                    publish_date: e.target.value || null,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Expiry Date</Label>

            <Input
              type="date"
              value={form.publication?.expiry_date ? new Date(form.publication.expiry_date).toISOString().split('T')[0] : ""}
              onChange={(e) =>
                updateForm({
                  publication: {
                    ...form.publication,
                    expiry_date: e.target.value || null,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            SEO & Search Visibility
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>SEO Title</Label>

            <Input
              value={form.seo?.title ?? ""}
              onChange={(e) =>
                updateForm({
                  seo: {
                    ...form.seo,
                    title: e.target.value,
                  },
                })
              }
              placeholder="Luxury Villa For Sale In Palm Jumeirah"
            />
          </div>

          <div className="space-y-2">
            <Label>Meta Description</Label>

            <Textarea
              rows={4}
              value={form.seo?.meta_description ?? ""}
              onChange={(e) =>
                updateForm({
                  seo: {
                    ...form.seo,
                    meta_description: e.target.value,
                  },
                })
              }
              placeholder="SEO description for search engines..."
            />
          </div>

          <div className="space-y-2">
            <Label>SEO Keywords (comma separated)</Label>

            <Input
              value={form.seo?.keywords?.join(", ") ?? ""}
              onChange={(e) =>
                updateForm({
                  seo: {
                    ...form.seo,
                    keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean),
                  },
                })
              }
              placeholder="villa, dubai, luxury property, beachfront"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}