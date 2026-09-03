import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Plus,
  Trash2,
  Upload,
  Sparkles,
  Save,
  GripVertical,
  X,
} from "lucide-react";

import { useCategoryStore } from "@/store/Category/category.store";

type ExperienceForm = {
  tempId: string;
  id?: string;
  key: string;
  label: string;
  description: string;
  icon: string;

  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  iconBackgroundColor: string;

  sortOrder: number;
  isActive: boolean;
};

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
  isActive: true,
};

const buildExperienceForm = (sortOrder: number): ExperienceForm => ({
  tempId: `${Date.now()}-${Math.random()}`,

  key: "",
  label: "",
  description: "",
  icon: "✨",

  color: "#C97A2A",
  backgroundColor: "#3A2A1A",
  textColor: "#FFFFFF",
  borderColor: "#C97A2A",
  iconColor: "#FFFFFF",
  iconBackgroundColor: "#A85A1A",

  sortOrder,
  isActive: true,
});

const isImageValue = (value?: string) => {
  if (!value) return false;

  return (
    value.startsWith("data:image/") ||
    value.startsWith("/") ||
    /^https?:\/\//i.test(value)
  );
};

export default function CategoryUpdate() {
  const navigate = useNavigate();
  const { id: categoryId } = useParams<{ id: string }>();

  const {
    createExperience: createExperienceApi,
    updateCategory: updateCategoryApi,
    updateExperience: updateExperienceApi,
    deactivateCategory: deactivateCategoryApi,
    deactivateExperience: deactivateExperienceApi,
    categories,
    fetchCategories,
    isLoading,
    error,
    clearError,
  } = useCategoryStore();

  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const [experiences, setExperiences] = useState<ExperienceForm[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryIcon, setCategoryIcon] = useState<string>("");

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!categoryId) return;

    const loadCategory = async () => {
      await fetchCategories();
    };

    loadCategory();
  }, [categoryId, fetchCategories]);

  useEffect(() => {
    if (!categoryId) return;

    const existingCategory = categories.find(
      (item) => item.id === categoryId
    );

    if (!existingCategory) return;

    setCategory({
      key: existingCategory.key,
      label: existingCategory.label,
      description: existingCategory.description || "",
      icon: existingCategory.icon || DEFAULT_CATEGORY.icon,
      color: existingCategory.color,
      backgroundColor: existingCategory.backgroundColor,
      textColor: existingCategory.textColor,
      borderColor: existingCategory.borderColor,
      iconColor: existingCategory.iconColor,
      iconBackgroundColor: existingCategory.iconBackgroundColor,
      sortOrder: existingCategory.sortOrder,
      isActive: existingCategory.isActive,
    });
    setCategoryIcon(isImageValue(existingCategory.icon) ? existingCategory.icon : "");
    setExperiences(
      (existingCategory.experiences || []).map((experience) => ({
        tempId: experience.id,
        id: experience.id,
        key: experience.key,
        label: experience.label,
        description: experience.description || "",
        icon: experience.icon || "✨",
        color: experience.color,
        backgroundColor: experience.backgroundColor,
        textColor: experience.textColor,
        borderColor: experience.borderColor,
        iconColor: experience.iconColor,
        iconBackgroundColor: experience.iconBackgroundColor,
        sortOrder: experience.sortOrder,
        isActive: experience.isActive,
      }))
    );
  }, [categoryId, categories]);

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
  // EXPERIENCE
  // --------------------------------------------------

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      buildExperienceForm(prev.length + 1),
    ]);
  };

  const removeExperience = (tempId: string) => {
    setExperiences((prev) =>
      prev
        .filter((experience) => experience.tempId !== tempId)
        .map((experience, index) => ({
          ...experience,
          sortOrder: index + 1,
        }))
    );
  };

  const updateExperience = (
    tempId: string,
    field: keyof ExperienceForm,
    value: string | number
  ) => {
    setExperiences((prev) =>
      prev.map((experience) =>
        experience.tempId === tempId
          ? {
              ...experience,
              [field]: value,
            }
          : experience
      )
    );
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

  const handleExperienceIconUpload = (
    tempId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const value = reader.result as string;

      setExperiences((prev) =>
        prev.map((experience) =>
          experience.tempId === tempId
            ? {
                ...experience,
                icon: value,
              }
            : experience
        )
      );
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

    // -----------------------------
    // EXPERIENCE VALIDATION
    // -----------------------------

    for (let i = 0; i < experiences.length; i++) {
      const experience = experiences[i];

      if (!experience.key.trim()) {
        setValidationError(
          `Experience ${i + 1}: Key is required.`
        );
        return;
      }

      if (!experience.label.trim()) {
        setValidationError(
          `Experience ${i + 1}: Label is required.`
        );
        return;
      }
    }

    try {
      setIsSubmitting(true);

      if (!categoryId) {
        throw new Error("Category ID is missing from the page URL.");
      }

      const normalizedCategoryIcon =
        category.icon?.trim() || DEFAULT_CATEGORY.icon;

      const categoryResponse = await updateCategoryApi(categoryId, {
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
        isActive: category.isActive,
      });

      if (!categoryResponse?.success) {
        throw new Error(
          categoryResponse?.message ||
            "Failed to update category."
        );
      }

      for (const experience of experiences) {
        const normalizedExperienceIcon =
          experience.icon?.trim() || "✨";

        const payload = {
          key: experience.key.trim().toUpperCase(),
          label: experience.label.trim(),
          description: experience.description.trim() || null,
          icon: normalizedExperienceIcon,
          color: experience.color,
          backgroundColor: experience.backgroundColor,
          textColor: experience.textColor,
          borderColor: experience.borderColor,
          iconColor: experience.iconColor,
          iconBackgroundColor: experience.iconBackgroundColor,
          sortOrder: Number(experience.sortOrder),
          isActive: experience.isActive,
        };

        const experienceResponse = experience.id
          ? await updateExperienceApi(categoryId, experience.id, payload)
          : await createExperienceApi(categoryId, payload);

        if (!experienceResponse?.success) {
          throw new Error(
            experienceResponse?.message ||
              `Failed to save experience "${experience.label}".`
          );
        }
      }

      toast.success("Category and experiences saved successfully.");

      navigate("/category", {
        replace: true,
      });
    } catch (err) {
      console.error("Category update failed:", err);

      setValidationError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating the category."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivateCategory = async () => {
    if (!categoryId || !category.isActive) return;

    const response = await deactivateCategoryApi(categoryId);
    if (response?.success) {
      setCategory((previous) => ({ ...previous, isActive: false }));
      toast.success("Category deactivated successfully.");
    } else {
      toast.error("Failed to deactivate category.");
    }
  };

  const handleDeactivateExperience = async (experienceId: string) => {
    if (!categoryId) return;

    const response = await deactivateExperienceApi(categoryId, experienceId);
    if (response?.success) {
      setExperiences((previous) =>
        previous.map((experience) =>
          experience.id === experienceId
            ? { ...experience, isActive: false }
            : experience
        )
      );
      toast.success("Experience deactivated successfully.");
    } else {
      toast.error("Failed to deactivate experience.");
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
                Edit Category
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create a category and manage its associated experiences
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={handleDeactivateCategory}
              disabled={isSubmitting || isLoading || !category.isActive}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition-all disabled:opacity-50"
            >
              Deactivate Category
            </button>

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
                ? "Saving..."
                : "Save Changes"}
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
                      className="w-40 h-40 object-contain"
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

        {/* ==========================================
            EXPERIENCES
        ========================================== */}

        <section>

          <div className="backdrop-blur-xl bg-white/60 dark:bg-[#151518]/40 border border-white/30 dark:border-white/5 rounded-3xl shadow-lg overflow-hidden">

            <div className="p-6 md:p-8">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

                <div>

                  <h3 className="text-lg font-semibold flex items-center gap-2">

                    <GripVertical
                      size={18}
                      className="text-gray-400"
                    />

                    Experiences

                    <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-[10px] font-bold">
                      {experiences.length}
                    </span>

                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    Add experiences that belong to this category.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#FC8D0E]/10 text-[#FC8D0E] hover:bg-[#FC8D0E] hover:text-white transition-all text-xs font-bold"
                >
                  <Plus size={14} />
                  Add Experience
                </button>

              </div>

              {/* ==================================
                  EXPERIENCE LIST
              ================================== */}

              <div className="space-y-4">

                {experiences.map(
                  (experience, index) => (
                    <div
                      key={experience.tempId}
                      className="p-4 md:p-5 rounded-2xl bg-white/80 dark:bg-[#1c1c1e]/60 border border-gray-100 dark:border-white/5 hover:border-[#FC8D0E]/30 transition-all"
                    >

                      <div className="flex flex-col gap-5">

                        {/* TOP */}

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <GripVertical
                              size={18}
                              className="text-gray-300 dark:text-gray-600"
                            />

                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                              Experience #{index + 1}
                            </span>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeExperience(
                                experience.tempId
                              )
                            }
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                            title="Remove Experience"
                          >
                            <Trash2 size={16} />
                          </button>

                          {experience.id && experience.isActive && (
                            <button
                              type="button"
                              onClick={() =>
                                handleDeactivateExperience(experience.id as string)
                              }
                              className="rounded-lg px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                              Deactivate
                            </button>
                          )}

                        </div>

                        {/* MAIN */}

                        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4">

                          {/* ICON */}

                          <div>

                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                              Icon
                            </label>

                            <div className="flex items-center gap-2">
                              <label
                                htmlFor={`experience-icon-${experience.tempId}`}
                                className="relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5"
                              >
                                {isImageValue(experience.icon) ? (
                                  <img
                                    src={experience.icon}
                                    alt="Experience icon preview"
                                    className="h-8 w-8 object-contain"
                                  />
                                ) : (
                                  <span className="text-2xl">
                                    {experience.icon || "✨"}
                                  </span>
                                )}

                                <input
                                  id={`experience-icon-${experience.tempId}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(event) =>
                                    handleExperienceIconUpload(
                                      experience.tempId,
                                      event
                                    )
                                  }
                                />
                              </label>

                              <input
                                value={experience.icon}
                                onChange={(e) =>
                                  updateExperience(
                                    experience.tempId,
                                    "icon",
                                    e.target.value
                                  )
                                }
                                maxLength={300}
                                placeholder="✨ or image URL"
                                className="w-full h-14 px-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50"
                              />
                            </div>

                          </div>

                          {/* KEY */}

                          <div>

                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                              Key
                            </label>

                            <input
                              value={experience.key}
                              onChange={(e) =>
                                updateExperience(
                                  experience.tempId,
                                  "key",
                                  e.target.value
                                    .toUpperCase()
                                    .replace(
                                      /\s+/g,
                                      "_"
                                    )
                                )
                              }
                              placeholder="FELT_RUSHED"
                              className="w-full h-11 px-3 rounded-lg bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/10 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50"
                            />

                          </div>

                          {/* LABEL */}

                          <div>

                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                              Label
                            </label>

                            <input
                              value={experience.label}
                              onChange={(e) =>
                                updateExperience(
                                  experience.tempId,
                                  "label",
                                  e.target.value
                                )
                              }
                              placeholder="Felt Rushed"
                              className="w-full h-11 px-3 rounded-lg bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50"
                            />

                          </div>

                        </div>

                        {/* DESCRIPTION */}

                        <div>

                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                            Description
                          </label>

                          <textarea
                            value={
                              experience.description
                            }
                            onChange={(e) =>
                              updateExperience(
                                experience.tempId,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe this experience..."
                            rows={2}
                            className="w-full px-3 py-2.5 rounded-lg bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#FC8D0E]/50"
                          />

                        </div>

                        {/* COLORS */}

                        <div>

                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-3">
                            Experience Styling & Colors
                          </label>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

                            <ColorField
                              label="Color"
                              value={
                                experience.color
                              }
                              onChange={(value) =>
                                updateExperience(
                                  experience.tempId,
                                  "color",
                                  value
                                )
                              }
                            />

                            <ColorField
                              label="Bg Color"
                              value={
                                experience.backgroundColor
                              }
                              onChange={(value) =>
                                updateExperience(
                                  experience.tempId,
                                  "backgroundColor",
                                  value
                                )
                              }
                            />

                            <ColorField
                              label="Text Color"
                              value={
                                experience.textColor
                              }
                              onChange={(value) =>
                                updateExperience(
                                  experience.tempId,
                                  "textColor",
                                  value
                                )
                              }
                            />

                            <ColorField
                              label="Border Color"
                              value={
                                experience.borderColor
                              }
                              onChange={(value) =>
                                updateExperience(
                                  experience.tempId,
                                  "borderColor",
                                  value
                                )
                              }
                            />

                            <ColorField
                              label="Icon Color"
                              value={
                                experience.iconColor
                              }
                              onChange={(value) =>
                                updateExperience(
                                  experience.tempId,
                                  "iconColor",
                                  value
                                )
                              }
                            />

                            <ColorField
                              label="Icon Bg"
                              value={
                                experience.iconBackgroundColor
                              }
                              onChange={(value) =>
                                updateExperience(
                                  experience.tempId,
                                  "iconBackgroundColor",
                                  value
                                )
                              }
                            />

                          </div>

                        </div>

                      </div>

                    </div>
                  )
                )}

                {/* EMPTY */}

                {experiences.length === 0 && (
                  <div className="text-center py-12 text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl">

                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                      <Sparkles size={20} />
                    </div>

                    <p className="text-sm font-medium">
                      No experiences added yet
                    </p>

                    <p className="text-xs mt-1">
                      Click "Add Experience" to create one.
                    </p>

                  </div>
                )}

              </div>

            </div>

          </div>

        </section>

        <div className="h-20" />

      </div>

    </div>
  );
}