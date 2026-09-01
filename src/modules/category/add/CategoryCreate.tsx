import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Sparkles, Save } from "lucide-react";

import { useCategoryStore } from "@/store/Category/category.store";

const DEFAULT_CATEGORY = {
  key: "",
  label: "",
  description: "",
  icon: "⚠️",

  color: "#4ECDC4",
  backgroundColor: "#1A2E2E",
  textColor: "#FFFFFF",
  borderColor: "#4ECDC4",
  iconColor: "#4ECDC4",
  iconBackgroundColor: "#2A3E3E",

  sortOrder: 1,
};

const isImageValue = (value?: string) => {
  if (!value) return false;

  return (
    value.startsWith("data:image/") ||
    value.startsWith("/") ||
    /^https?:\/\//i.test(value)
  );
};

export default function CategoryCreate() {
  const navigate = useNavigate();

  const {
    createCategory: createCategoryApi,
    isLoading,
    error,
    clearError,
  } = useCategoryStore();

  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryIcon, setCategoryIcon] = useState<string>("");

  const [validationError, setValidationError] = useState("");

  // --------------------------------------------------
  // CATEGORY CHANGE
  // --------------------------------------------------

  const updateCategory = (
    field: keyof typeof DEFAULT_CATEGORY,
    value: string | number
  ) => {
    setCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // --------------------------------------------------
  // CATEGORY ICON
  // --------------------------------------------------

  const handleCategoryIcon = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const value = reader.result as string;
      setCategoryIcon(value);
      updateCategory("icon", value);
    };

    reader.readAsDataURL(file);
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  const handleSave = async () => {
    clearError();
    setValidationError("");

    // -----------------------------
    // CATEGORY VALIDATION
    // -----------------------------

    if (!category.key.trim()) {
      setValidationError("Category key is required.");
      return;
    }

    if (!category.label.trim()) {
      setValidationError("Category label is required.");
      return;
    }

    if (!category.description.trim()) {
      setValidationError("Category description is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const normalizedCategoryIcon =
        category.icon?.trim() || DEFAULT_CATEGORY.icon;

      const categoryResponse = await createCategoryApi({
        key: category.key.trim().toUpperCase(),
        label: category.label.trim(),
        description: category.description.trim(),

        icon: normalizedCategoryIcon,

        color: category.color,
        backgroundColor: category.backgroundColor,
        textColor: category.textColor,
        borderColor: category.borderColor,
        iconColor: category.iconColor,
        iconBackgroundColor: category.iconBackgroundColor,

        sortOrder: Number(category.sortOrder),
      });

      if (!categoryResponse?.success) {
        throw new Error(
          categoryResponse?.message ||
            "Failed to create category."
        );
      }

      navigate("/category/list", {
        replace: true,
      });
    } catch (err) {
      console.error("Category creation failed:", err);

      setValidationError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating the category."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------
  // COLOR FIELD
  // --------------------------------------------------

  const ColorField = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <div>
        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
          {label}
        </label>

        <div className="flex items-center gap-2 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 px-2.5 py-2">
          <input
            type="color"
            value={value || "#FFFFFF"}
            onChange={(e) => onChange(e.target.value)}
            className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent p-0"
          />

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-w-0 bg-transparent text-xs font-mono text-gray-700 dark:text-gray-300 outline-none uppercase"
          />
        </div>
      </div>
    );
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-white transition-colors duration-300">

      {/* BACKGROUND ACCENTS */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-[#FC8D0E]/10 dark:bg-[#FC8D0E]/5" />

        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[100px] bg-blue-400/10 dark:bg-blue-500/5" />
      </div>

      <div className="relative max-w-full mx-auto p-4 md:p-8 lg:p-12">

        {/* ==========================================
            HEADER
        ========================================== */}

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FC8D0E] to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
              <Sparkles
                className="text-white"
                size={24}
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Create Category
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create a category with a clean, dynamic icon and styling setup
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            {/* <button
              type="button"
              onClick={() => navigate("/category")}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <X size={17} />
              Cancel
            </button> */}

            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting || isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FC8D0E] to-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm disabled:opacity-60 disabled:pointer-events-none"
            >
              <Save size={18} />

              {isSubmitting
                ? "Creating..."
                : "Create Category"}
            </button>

          </div>

        </header>

        {/* ==========================================
            ERROR
        ========================================== */}

        {(validationError || error) && (
          <div className="mb-6 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {validationError || error}
          </div>
        )}

        {/* ==========================================
            GENERAL INFORMATION
        ========================================== */}

        <section className="mb-8">

          <div className="backdrop-blur-xl bg-white/70 dark:bg-[#151518]/60 border border-white/40 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">

            <div className="flex items-center gap-2 mb-6">

              <div className="h-8 w-1 rounded-full bg-[#FC8D0E]" />

              <h2 className="text-lg font-semibold">
                General Information
              </h2>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">

              {/* ==================================
                  ICON
              ================================== */}

              <div className="flex flex-col items-center lg:items-start">

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 w-full">
                  Category Icon
                </label>

                <label
                  htmlFor="category-icon"
                  className="group relative w-full aspect-square max-w-[220px] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-[#1c1c1e]/50 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#FC8D0E] flex items-center justify-center"
                >

                  {categoryIcon || isImageValue(category.icon) ? (
                    <img
                      src={categoryIcon || category.icon}
                      alt="Category icon preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500 group-hover:text-[#FC8D0E]">

                      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                        <Upload size={24} />
                      </div>

                      <span className="text-sm font-medium">
                        Upload Icon
                      </span>

                    </div>
                  )}

                </label>

                <input
                  id="category-icon"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCategoryIcon}
                />

                <p className="mt-2 text-[11px] text-gray-400">
                  Upload an image or enter an emoji/URL. The selected value is sent through the API.
                </p>

              </div>

              {/* ==================================
                  FORM
              ================================== */}

              <div className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* KEY */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key
                    </label>

                    <input
                      value={category.key}
                      onChange={(e) =>
                        updateCategory(
                          "key",
                          e.target.value
                            .toUpperCase()
                            .replace(/\s+/g, "_")
                        )
                      }
                      placeholder="e.g. CLOSE_CALL"
                      className="w-full h-12 px-4 rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 transition-all"
                    />
                  </div>

                  {/* LABEL */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Label
                    </label>

                    <input
                      value={category.label}
                      onChange={(e) =>
                        updateCategory(
                          "label",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Close Call"
                      className="w-full h-12 px-4 rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 transition-all"
                    />
                  </div>

                </div>

                {/* DESCRIPTION */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>

                  <textarea
                    value={category.description}
                    onChange={(e) =>
                      updateCategory(
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Describe the purpose of this category..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50 transition-all resize-none"
                  />

                </div>

                {/* ICON */}

                <div className="max-w-[180px]">

                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon Value
                  </label>

                  <input
                    value={category.icon}
                    onChange={(e) =>
                      updateCategory(
                        "icon",
                        e.target.value
                      )
                    }
                    maxLength={4}
                    placeholder="⚠️"
                    className="w-full h-12 px-4 text-xl rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50"
                  />

                </div>

              </div>

            </div>

            {/* ==================================
                CATEGORY COLORS
            ================================== */}

            <div className="mt-8">

              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Category Styling & Colors
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

                <ColorField
                  label="Main Color"
                  value={category.color}
                  onChange={(value) =>
                    updateCategory("color", value)
                  }
                />

                <ColorField
                  label="Bg Color"
                  value={category.backgroundColor}
                  onChange={(value) =>
                    updateCategory(
                      "backgroundColor",
                      value
                    )
                  }
                />

                <ColorField
                  label="Text Color"
                  value={category.textColor}
                  onChange={(value) =>
                    updateCategory(
                      "textColor",
                      value
                    )
                  }
                />

                <ColorField
                  label="Border Color"
                  value={category.borderColor}
                  onChange={(value) =>
                    updateCategory(
                      "borderColor",
                      value
                    )
                  }
                />

                <ColorField
                  label="Icon Color"
                  value={category.iconColor}
                  onChange={(value) =>
                    updateCategory(
                      "iconColor",
                      value
                    )
                  }
                />

                <ColorField
                  label="Icon Bg"
                  value={category.iconBackgroundColor}
                  onChange={(value) =>
                    updateCategory(
                      "iconBackgroundColor",
                      value
                    )
                  }
                />

              </div>

            </div>

            {/* SORT ORDER */}

            <div className="mt-5 max-w-[180px]">

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort Order
              </label>

              <input
                type="number"
                min={1}
                value={category.sortOrder}
                onChange={(e) =>
                  updateCategory(
                    "sortOrder",
                    Number(e.target.value)
                  )
                }
                className="w-full h-11 px-4 rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50"
              />

            </div>

          </div>

        </section>

        <div className="h-20" />

      </div>

    </div>
  );
}