import { useState } from "react"
import {
  Plus,
  Upload,
  Image as ImageIcon,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Category = {
  id: number
  title: string
  icon: File | null
  iconPreview: string
}

export default function ProfileEditor() {
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState("")

  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")

  const [categories, setCategories] = useState<Category[]>([
    {
      id: Date.now(),
      title: "",
      icon: null,
      iconPreview: "",
    },
  ])

  // -----------------------------
  // Profile Photo
  // -----------------------------

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  // -----------------------------
  // Category
  // -----------------------------

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        icon: null,
        iconPreview: "",
      },
    ])
  }

  const removeCategory = (id: number) => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== id)
    )
  }

  const updateCategoryTitle = (
    id: number,
    value: string
  ) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? { ...category, title: value }
          : category
      )
    )
  }

  const handleCategoryIcon = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    const preview = URL.createObjectURL(file)

    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
            ...category,
            icon: file,
            iconPreview: preview,
          }
          : category
      )
    )
  }

  // -----------------------------
  // Save
  // -----------------------------

  const handleSave = () => {
    const data = {
      photo,
      title,
      subTitle,
      description,
      categories,
    }

    console.log("Form Data:", data)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-6 text-gray-900 transition-colors duration-200 dark:bg-[#0b0b0b] dark:text-white">

      <div className="mx-auto max-w-full">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Category Editor
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add your category information and icons.
            </p>
          </div>

          <div className="flex gap-3">

            {/* Cancel */}
            <Button
              type="button"
              variant="outline"
              className="
                rounded-lg
                border-gray-300
                bg-white
                px-5
                text-gray-700
                hover:bg-gray-100

                dark:border-gray-700
                dark:bg-[#181818]
                dark:text-gray-200
                dark:hover:bg-[#222222]
              "
            >
              Cancel
            </Button>

            {/* Save */}
            <Button
              type="button"
              onClick={handleSave}
              className="
                rounded-lg
                bg-[#FC8D0E]
                px-6
                text-white
                shadow-sm
                hover:bg-[#e77d05]
              "
            >
              Save
            </Button>

          </div>
        </div>

        {/* -------------------------------- */}
        {/* Profile Information */}
        {/* -------------------------------- */}

        <div
          className="
            rounded-2xl
            border
            border-gray-300
            bg-white
            p-6
            shadow-sm
            transition-colors

            dark:border-[#383838]
            dark:bg-[#151515]
          "
        >

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)]">

            {/* Upload Photo */}
            <div>

              <Label className="mb-3 block text-gray-700 dark:text-gray-300">
                Icon
              </Label>

              <label
                htmlFor="profile-photo"
                className="
                  group
                  flex
                  h-[180px]
                  w-[180px]
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border-2
                  border-dashed
                  border-gray-300
                  bg-gray-50
                  transition

                  hover:border-[#FC8D0E]
                  hover:bg-orange-50

                  sm:h-[200px]
                  sm:w-[200px]

                  md:h-[220px]
                  md:w-[220px]

                  dark:border-gray-600
                  dark:bg-[#1b1b1b]
                  dark:hover:border-[#FC8D0E]
                  dark:hover:bg-[#21180f]
                "
              >

                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">

                    <Upload
                      size={28}
                      className="
                        transition-colors
                        group-hover:text-[#FC8D0E]
                      "
                    />

                    <span className="text-xs">
                      Upload Icon
                    </span>

                  </div>
                )}

              </label>

              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />

            </div>

            {/* Title + Subtitle */}
            {/* Title + Subtitle */}
            <div className="flex flex-col justify-center space-y-5">

              {/* Title */}
              <div>
                <Label
                  htmlFor="title"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Title
                </Label>

                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="
                    mt-2
                    h-11
                    rounded-lg
                    border-gray-300
                    bg-white
                    text-gray-900
                    placeholder:text-gray-400
                    focus-visible:ring-[#FC8D0E]
                    dark:border-gray-700
                    dark:bg-[#1c1c1c]
                    dark:text-white
                    dark:placeholder:text-gray-500
                    dark:focus-visible:ring-[#FC8D0E]
                  "
                />
              </div>

              {/* Subtitle */}
              <div>
                <Label
                  htmlFor="subtitle"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Label
                </Label>

                <Input
                  id="subtitle"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="Enter sub-title"
                  className="
                    mt-2
                    h-11
                    rounded-lg
                    border-gray-300
                    bg-white
                    text-gray-900
                    placeholder:text-gray-400
                    focus-visible:ring-[#FC8D0E]
                    dark:border-gray-700
                    dark:bg-[#1c1c1c]
                    dark:text-white
                    dark:placeholder:text-gray-500
                    dark:focus-visible:ring-[#FC8D0E]
                  "
                />
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="mt-6">

            <Label
              htmlFor="description"
              className="text-gray-700 dark:text-gray-300"
            >
              Description
            </Label>

            <Textarea
              id="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Write a description..."
              className="
                mt-2
                min-h-[130px]
                resize-none
                rounded-lg

                border-gray-300
                bg-white
                text-gray-900

                placeholder:text-gray-400

                focus-visible:ring-[#FC8D0E]

                dark:border-gray-700
                dark:bg-[#1c1c1c]
                dark:text-white
                dark:placeholder:text-gray-500
                dark:focus-visible:ring-[#FC8D0E]
              "
            />

          </div>

        </div>

        {/* -------------------------------- */}
        {/* Categories */}
        {/* -------------------------------- */}

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-gray-300
            bg-white
            p-6
            shadow-sm
            transition-colors

            dark:border-[#383838]
            dark:bg-[#151515]
          "
        >

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sub Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add the categories related to this profile.
            </p>

          </div>

          <div className="space-y-3">

            {categories.map((category, index) => (

              <div
                key={category.id}
                className="
                  rounded-xl
                  border
                  border-gray-300
                  bg-gray-50
                  p-4
                  transition-colors

                  dark:border-[#3a3a3a]
                  dark:bg-[#1b1b1b]
                "
              >

                <div className="flex items-center gap-5">

                  {/* Category Icon */}
                  <label
                    htmlFor={`category-icon-${category.id}`}
                    className="
                      flex
                      h-20
                      w-20
                      shrink-0
                      cursor-pointer
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-xl

                      border
                      border-dashed
                      border-gray-300

                      bg-white

                      transition-all
                      hover:border-[#FC8D0E]
                      hover:bg-orange-50

                      dark:border-gray-600
                      dark:bg-[#222222]
                      dark:hover:border-[#FC8D0E]
                      dark:hover:bg-[#21180f]
                    "
                  >
                    {category.iconPreview ? (
                      <img
                        src={category.iconPreview}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon
                        size={28}
                        className="text-gray-400 dark:text-gray-500"
                      />
                    )}
                  </label>

                  <input
                    id={`category-icon-${category.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleCategoryIcon(
                        category.id,
                        e
                      )
                    }
                  />

                  {/* Category Title */}
                  <div className="flex-1">

                    <Input
                      value={category.title}
                      onChange={(e) =>
                        updateCategoryTitle(
                          category.id,
                          e.target.value
                        )
                      }
                      placeholder="Category title"
                      className="
                        h-11
                        rounded-lg

                        border-gray-300
                        bg-white
                        text-gray-900

                        placeholder:text-gray-400

                        focus-visible:ring-[#FC8D0E]

                        dark:border-gray-700
                        dark:bg-[#222222]
                        dark:text-white
                        dark:placeholder:text-gray-500
                      "
                    />

                  </div>

                  {/* Remove */}
                  {categories.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        removeCategory(category.id)
                      }
                      className="
                        h-10
                        w-10
                        shrink-0
                        rounded-lg

                        border-gray-300
                        text-red-500

                        hover:bg-red-50
                        hover:text-red-600

                        dark:border-gray-700
                        dark:bg-[#1c1c1c]
                        dark:text-red-400
                        dark:hover:bg-red-950/30
                      "
                    >
                      <Trash2 size={17} />
                    </Button>
                  )}

                  {/* Add */}
                  {index === categories.length - 1 && (
                    <Button
                      type="button"
                      onClick={addCategory}
                      size="icon"
                      className="
                        h-10
                        w-10
                        shrink-0
                        rounded-lg
                        bg-[#FC8D0E]
                        text-white

                        shadow-sm
                        hover:bg-[#e77d05]
                      "
                    >
                      <Plus size={20} />
                    </Button>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  )
}