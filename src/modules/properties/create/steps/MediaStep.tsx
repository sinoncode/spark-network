import { useEffect, useRef, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Upload,
  ImageIcon,
  FileText,
  Video,
  X,
  Star,
} from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"
import type { PropertyMediaData } from "@/types/property.types"

export default function MediaStep() {
  const { form, updateForm } = usePropertyCreationStore()

  // Ensure media objects exist
  const formMedia = form.media || {
    images: [],
    videos: [],
    virtual_tours: [],
    documents: [],
  }

  const [galleryImages, setGalleryImages] = useState<PropertyMediaData[]>(
    formMedia.images || []
  )
  
  const coverImage = galleryImages.find(img => img.is_featured)?.url || ""

  const coverInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const floorPlanInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  const [documents, setDocuments] = useState<PropertyMediaData[]>(
    formMedia.documents || []
  )
  
  const [videoUrl, setVideoUrl] = useState(formMedia.videos?.[0]?.url || "")
  const [virtualTourUrl, setVirtualTourUrl] = useState(formMedia.virtual_tours?.[0]?.url || "")

  const createPreviews = (files: FileList | null) => {
    if (!files) return []

    return Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      type: "image",
      title: file.name,
      order: 0,
      is_featured: false,
    } as PropertyMediaData))
  }

  const handleCoverUpload = (files: FileList | null) => {
    if (!files?.length) return

    const preview = URL.createObjectURL(files[0])
    
    const newImage: PropertyMediaData = {
      url: preview,
      type: "image",
      title: files[0].name,
      order: 0,
      is_featured: true,
    }

    const updated = [newImage, ...galleryImages.map(img => ({ ...img, is_featured: false }))]
    setGalleryImages(updated)
    updateForm({ media: { ...formMedia, images: updated } })
  }

  const handleGalleryUpload = (files: FileList | null) => {
    if (!files) return

    const previews = createPreviews(files)

    const updated = [...galleryImages, ...previews]

    setGalleryImages(updated)

    updateForm({ media: { ...formMedia, images: updated } })
  }

  const handleDocuments = (files: FileList | null) => {
    if (!files) return

    const newDocs = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      type: "document",
      title: file.name,
    } as PropertyMediaData))
    
    const updated = [...documents, ...newDocs]
    setDocuments(updated)
    updateForm({ media: { ...formMedia, documents: updated } })
  }

  useEffect(() => {
    return () => {
      // Cleanup object URLs to avoid memory leaks
      galleryImages.forEach(img => {
        if (img.url.startsWith('blob:')) URL.revokeObjectURL(img.url)
      })
      documents.forEach(doc => {
        if (doc.url.startsWith('blob:')) URL.revokeObjectURL(doc.url)
      })
    }
  }, [])
  
  // Handlers for videos and tours
  const handleVideoUrlChange = (url: string) => {
    setVideoUrl(url)
    const videos = url ? [{ url, type: "video" as const }] : []
    updateForm({ media: { ...formMedia, videos } })
  }
  
  const handleVirtualTourUrlChange = (url: string) => {
    setVirtualTourUrl(url)
    const virtual_tours = url ? [{ url, type: "virtual_tour" as const }] : []
    updateForm({ media: { ...formMedia, virtual_tours } })
  }

  return (
    <div className="space-y-6">
      {/* Cover Image */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Cover Image
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div
            onClick={() =>
              coverInputRef.current?.click()
            }
            className="
              flex
              h-[300px]
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              border-2
              border-dashed
              bg-muted/30
              transition-all
              hover:bg-muted/50
            "
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover"
                className="
                  h-full
                  w-full
                  rounded-xl
                  object-cover
                "
              />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-3 h-8 w-8 text-primary" />

                <p className="font-medium">
                  Upload Cover Image
                </p>

                <p className="text-sm text-muted-foreground">
                  Recommended 1920 × 1080
                </p>
              </div>
            )}
          </div>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              handleCoverUpload(e.target.files)
            }
          />
        </CardContent>
      </Card>

      {/* Gallery */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Property Gallery
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            onClick={() =>
              galleryInputRef.current?.click()
            }
            className="
              cursor-pointer
              rounded-xl
              border-2
              border-dashed
              p-10
              text-center
              hover:bg-muted/30
            "
          >
            <Upload className="mx-auto mb-2 h-7 w-7" />

            <p>Upload Property Images</p>

            <p className="text-sm text-muted-foreground">
              Drag & Drop Supported
            </p>
          </div>

          <input
            ref={galleryInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              handleGalleryUpload(e.target.files)
            }
          />

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {galleryImages.filter(img => !img.is_featured).map((image, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <img
                    src={image.url}
                    alt=""
                    className="
                      aspect-square
                      w-full
                      rounded-xl
                      object-cover
                    "
                  />

                  <Button
                    size="icon"
                    variant="destructive"
                    className="
                      absolute
                      right-2
                      top-2
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                    "
                    onClick={() => {
                      const newImages = galleryImages.filter(img => img !== image);
                      setGalleryImages(newImages);
                      updateForm({ media: { ...formMedia, images: newImages } });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Property Documents
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            onClick={() =>
              documentInputRef.current?.click()
            }
          >
            Upload Documents
          </Button>

          <input
            ref={documentInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) =>
              handleDocuments(e.target.files)
            }
          />

          <div className="mt-4 space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  border
                  p-3
                "
              >
                <span>{doc.title}</span>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    const newDocs = documents.filter((_, i) => i !== index);
                    setDocuments(newDocs);
                    updateForm({ media: { ...formMedia, documents: newDocs } });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Videos */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Property Video
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Label>Video URL</Label>

          <Input
            placeholder="https://youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) =>
              handleVideoUrlChange(e.target.value)
            }
          />
        </CardContent>
      </Card>

      {/* Virtual Tour */}

      <Card>
        <CardHeader>
          <CardTitle>
            360° Virtual Tour
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Label>Virtual Tour URL</Label>

          <Input
            placeholder="https://matterport.com/..."
            value={virtualTourUrl}
            onChange={(e) =>
              handleVirtualTourUrlChange(e.target.value)
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}