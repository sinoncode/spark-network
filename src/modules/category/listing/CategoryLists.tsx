import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  CircleAlert,
  FolderOpen,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";



import { Eye, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCategoryStore } from "@/store/Category/category.store";
import type {
  Category,
  Experience,
} from "@/types/Category/category";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


// ============================================================
// TYPES
// ============================================================

type StatusFilter = "all" | "active" | "inactive";

type SortOption =
  | "sortOrder"
  | "nameAsc"
  | "nameDesc"
  | "newest"
  | "oldest";


// ============================================================
// HELPERS
// ============================================================

const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

function formatDate(date: string) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function getInitials(value: string) {
  if (!value) return "?";

  return value
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function isImageValue(value?: string) {
  if (!value) return false;

  return (
    value.startsWith("data:image/") ||
    value.startsWith("/") ||
    /^https?:\/\//i.test(value)
  );
}

function matchesSearch(
  category: Category,
  query: string
) {
  if (!query.trim()) return true;

  const search = query.trim().toLowerCase();

  const categoryMatch =
    category.label?.toLowerCase().includes(search) ||
    category.key?.toLowerCase().includes(search) ||
    category.description
      ?.toLowerCase()
      .includes(search);

  const experienceMatch =
    category.experiences?.some(
      (experience) =>
        experience.label
          ?.toLowerCase()
          .includes(search) ||
        experience.key
          ?.toLowerCase()
          .includes(search) ||
        experience.description
          ?.toLowerCase()
          .includes(search)
    );

  return Boolean(
    categoryMatch || experienceMatch
  );
}

function getFilteredExperiences(
  category: Category,
  query: string
): Experience[] {
  if (!query.trim()) {
    return category.experiences ?? [];
  }

  const search = query.trim().toLowerCase();

  const categoryMatches =
    category.label?.toLowerCase().includes(search) ||
    category.key?.toLowerCase().includes(search) ||
    category.description
      ?.toLowerCase()
      .includes(search);

  if (categoryMatches) {
    return category.experiences ?? [];
  }

  return (category.experiences ?? []).filter(
    (experience) =>
      experience.label
        ?.toLowerCase()
        .includes(search) ||
      experience.key
        ?.toLowerCase()
        .includes(search) ||
      experience.description
        ?.toLowerCase()
        .includes(search)
  );
}


// ============================================================
// SKELETON
// ============================================================

function CategorySkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-5 pb-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-xl shrink-0" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3.5 w-64 max-w-full" />
          </div>

          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-36 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}


// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({
  hasFilters,
  onClear,
  onAdd,
}: {
  hasFilters: boolean;
  onClear: () => void;
  onAdd?: () => void;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          {hasFilters ? (
            <Search className="h-7 w-7 text-muted-foreground" />
          ) : (
            <FolderOpen className="h-7 w-7 text-muted-foreground" />
          )}
        </div>

        <h3 className="text-lg font-semibold tracking-tight">
          {hasFilters
            ? "No categories found"
            : "No categories yet"}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {hasFilters
            ? "Try changing your search or filters to find the category you're looking for."
            : "Create your first category to start organizing experiences."}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {hasFilters && (
            <Button
              variant="outline"
              onClick={onClear}
            >
              <X className="mr-2 h-4 w-4" />
              Clear filters
            </Button>
          )}

          {!hasFilters && onAdd && (
            <Button onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


// ============================================================
// EXPERIENCE ITEM
// ============================================================

function ExperienceItem({
  experience,
  categoryId,
  onDelete,
}: {
  experience: Experience;
  categoryId: string;
  onDelete: (categoryId: string, experienceId: string) => void;
}) {
  return (
    <div
      className="
        group flex min-w-0 items-center gap-3
        rounded-xl border
        bg-background/70
        px-3 py-2.5
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-sm
      "
      style={{
        borderColor:
          experience.borderColor || undefined,
      }}
    >
      {/* Icon */}
      <div
        className="
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-lg text-base
        "
        style={{
          backgroundColor:
            experience.iconBackgroundColor ||
            experience.backgroundColor ||
            undefined,

          color:
            experience.iconColor ||
            experience.textColor ||
            undefined,
        }}
      >
        {experience.icon || "•"}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <p
            className="truncate text-sm font-medium"
            style={{
              color:
                experience.textColor ||
                undefined,
            }}
          >
            {experience.label}
          </p>

          {!experience.isActive && (
            <Badge
              variant="secondary"
              className="shrink-0 px-1.5 py-0 text-[10px]"
            >
              Inactive
            </Badge>
          )}
        </div>

        {experience.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {experience.description}
          </p>
        )}
      </div>

      {/* Sort */}
      <span className="hidden shrink-0 text-[11px] text-muted-foreground sm:block">
        #{experience.sortOrder}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        onClick={() => onDelete(categoryId, experience.id)}
        aria-label={`Delete experience ${experience.label}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}


// ============================================================
// CATEGORY CARD
// ============================================================

function CategoryCard({
  category,
  search,
  expanded,
  onToggle,
  onDeleteCategory,
  onDeleteExperience,
}: {
  category: Category;
  search: string;
  expanded: boolean;
  onToggle: () => void;
  onDeleteCategory: (categoryId: string) => void;
  onDeleteExperience: (categoryId: string, experienceId: string) => void;
}) {
  const experiences = getFilteredExperiences(
    category,
    search
  );

  const navigate = useNavigate();

const handleViewEdit = (categoryId: string) => {
  navigate(`/category/edit/${categoryId}`);
};

  const activeExperiences =
    category.experiences?.filter(
      (experience) => experience.isActive
    ).length ?? 0;

  return (
    <Card
      className="
        group overflow-hidden
        border-border/70
        bg-card
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* Category Header */}
      <CardHeader className="p-5 pb-4">
        <div className="flex min-w-0 items-start gap-3">
          {/* Category Icon */}
          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              border
              text-xl
              shadow-sm
            "
            style={{
              backgroundColor:
                category.iconBackgroundColor ||
                category.backgroundColor ||
                undefined,

              color:
                category.iconColor ||
                category.textColor ||
                undefined,

              borderColor:
                category.borderColor ||
                undefined,
            }}
          >
            {isImageValue(category.icon) ? (
              <img
                src={category.icon}
                alt={`${category.label} icon`}
                className="h-8 w-8 object-contain"
              />
            ) : category.icon ? (
              category.icon
            ) : (
              <span className="text-sm font-bold">
                {getInitials(category.label)}
              </span>
            )}
          </div>

          {/* Category Information */}
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold">
                {category.label}
              </h3>

              <Badge
                variant={
                  category.isActive
                    ? "default"
                    : "secondary"
                }
                className={
                  category.isActive
                    ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
                    : ""
                }
              >
                <span
                  className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                    category.isActive
                      ? "bg-emerald-500"
                      : "bg-muted-foreground"
                  }`}
                />

                {category.isActive
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {category.key}
            </p>
          </div>

          {/* Expand */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="
                    h-8 w-8 shrink-0
                    text-muted-foreground
                    hover:text-foreground
                  "
                  onClick={onToggle}
                  aria-label={
                    expanded
                      ? "Collapse category"
                      : "Expand category"
                  }
                >
                  {expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                {expanded
                  ? "Hide experiences"
                  : "Show experiences"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Description */}
        {category.description && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {category.description}
          </p>
        )}

        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {category.experiences?.length ?? 0}{" "}
              {(
                category.experiences?.length ?? 0
              ) === 1
                ? "Experience"
                : "Experiences"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>
              {activeExperiences} active
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <span>Order:</span>
            <span className="font-medium text-foreground">
              {category.sortOrder}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <span>Created:</span>
            <span className="font-medium text-foreground">
              {formatDate(category.createdAt)}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
  <Button
    type="button"
    variant="outline"
    size="sm"
    className="
      h-8
      gap-1.5
      rounded-lg
      border-primary/30
      bg-primary/5
      px-3
      text-xs
      font-medium
      text-primary
      transition-all
      hover:bg-primary
      hover:text-white
    "
    onClick={() => handleViewEdit(category.id)}
  >
    <Pencil className="h-3.5 w-3.5" />
    Edit Category & Add Experiences
  </Button>

  <Button
    type="button"
    variant="outline"
    size="sm"
    className="
      h-8
      gap-1.5
      rounded-lg
      border-destructive/30
      bg-destructive/5
      px-3
      text-xs
      font-medium
      text-destructive
      transition-all
      hover:bg-destructive
      hover:text-white
    "
    onClick={() => onDeleteCategory(category.id)}
  >
    <Trash2 className="h-3.5 w-3.5" />
  </Button>
</div>
        </div>

       
      </CardHeader>

      {/* Experiences */}
      {expanded && (
        <CardContent className="border-t bg-muted/20 px-5 py-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">
                Experiences
              </p>

              <p className="text-xs text-muted-foreground">
                {experiences.length} shown
              </p>
            </div>
          </div>

          {experiences.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {experiences.map((experience) => (
                <ExperienceItem
                  key={experience.id}
                  experience={experience}
                  categoryId={category.id}
                  onDelete={onDeleteExperience}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed px-4 py-8 text-center">
              <Sparkles className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />

              <p className="text-sm font-medium">
                No experiences
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                This category doesn't have any experiences yet.
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}


// ============================================================
// MAIN PAGE
// ============================================================

export default function CategoriesList() {

  const navigate = useNavigate();

  const handleView = (categoryId: string) => {
  navigate(`/category/view/${categoryId}`);
};

const handleEdit = (categoryId: string) => {
  navigate(`/category/edit/${categoryId}`);
};

const handleDelete = async (categoryId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmed) return;

  try {
    // Replace this with your delete API/store function
    console.log("Deleting category:", categoryId);

    // Example:
    // await deleteCategory(categoryId);
    // await fetchCategories();
  } catch (error) {
    console.error("Failed to delete category:", error);
  }
};


  const {
    categories,
    isLoading,
    error,
    fetchCategories,
    deleteCategory,
    deleteExperience,
  } = useCategoryStore();

  // ----------------------------------------------------------
  // Local UI State
  // ----------------------------------------------------------

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<StatusFilter>("all");

  const [sortBy, setSortBy] =
    useState<SortOption>("sortOrder");

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] =
    useState(12);

  const [expandedCategories, setExpandedCategories] =
    useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "category" | "experience";
    categoryId: string;
    experienceId?: string;
    label: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ----------------------------------------------------------
  // Initial Fetch
  // ----------------------------------------------------------

  const loadCategories = useCallback(
    async () => {
      await fetchCategories();
    },
    [fetchCategories]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // ----------------------------------------------------------
  // Filter + Sort
  // ----------------------------------------------------------

  const filteredCategories = useMemo(() => {
    const result = categories.filter(
      (category) => {
        const searchMatch = matchesSearch(
          category,
          search
        );

        const statusMatch =
          status === "all" ||
          (status === "active" &&
            category.isActive) ||
          (status === "inactive" &&
            !category.isActive);

        return (
          searchMatch && statusMatch
        );
      }
    );

    return [...result].sort(
      (a, b) => {
        switch (sortBy) {
          case "nameAsc":
            return a.label.localeCompare(
              b.label
            );

          case "nameDesc":
            return b.label.localeCompare(
              a.label
            );

          case "newest":
            return (
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
            );

          case "oldest":
            return (
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
            );

          case "sortOrder":
          default:
            return (
              a.sortOrder - b.sortOrder
            );
        }
      }
    );
  }, [
    categories,
    search,
    status,
    sortBy,
  ]);

  // ----------------------------------------------------------
  // Pagination
  // ----------------------------------------------------------

  const totalItems =
    filteredCategories.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const safePage = Math.min(
    page,
    totalPages
  );

  const startIndex =
    (safePage - 1) * pageSize;

  const endIndex = Math.min(
    startIndex + pageSize,
    totalItems
  );

  const paginatedCategories =
    filteredCategories.slice(
      startIndex,
      endIndex
    );

  // ----------------------------------------------------------
  // Reset Page When Filter Changes
  // ----------------------------------------------------------

  useEffect(() => {
    setPage(1);
  }, [
    search,
    status,
    sortBy,
    pageSize,
  ]);

  // ----------------------------------------------------------
  // Expand / Collapse
  // ----------------------------------------------------------

  const toggleCategory = (
    categoryId: string
  ) => {
    setExpandedCategories(
      (previous) => {
        const next = new Set(
          previous
        );

        if (next.has(categoryId)) {
          next.delete(categoryId);
        } else {
          next.add(categoryId);
        }

        return next;
      }
    );
  };

  const expandAll = () => {
    setExpandedCategories(
      new Set(
        paginatedCategories.map(
          (category) => category.id
        )
      )
    );
  };

  const collapseAll = () => {
    setExpandedCategories(
      new Set()
    );
  };

  // ----------------------------------------------------------
  // Clear Filters
  // ----------------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setSortBy("sortOrder");
    setPage(1);
  };

  const hasFilters =
    search.trim().length > 0 ||
    status !== "all" ||
    sortBy !== "sortOrder";

  const handleDeleteCategoryRequest = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId);

    setDeleteTarget({
      type: "category",
      categoryId,
      label: category?.label || "this category",
    });
  };

  const handleDeleteExperienceRequest = (
    categoryId: string,
    experienceId: string
  ) => {
    const category = categories.find((item) => item.id === categoryId);
    const experience = category?.experiences?.find(
      (item) => item.id === experienceId
    );

    setDeleteTarget({
      type: "experience",
      categoryId,
      experienceId,
      label: experience?.label || "this experience",
    });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);

    try {
      if (deleteTarget.type === "category") {
        const result = await deleteCategory(deleteTarget.categoryId);

        if (result?.success) {
          toast.success("Category deleted successfully.");
        } else {
          toast.error(
            "Failed to delete category. Please try again."
          );
        }
      } else if (deleteTarget.experienceId) {
        const result = await deleteExperience(
          deleteTarget.categoryId,
          deleteTarget.experienceId
        );

        if (result?.success) {
          toast.success("Experience deleted successfully.");
        } else {
          toast.error(
            "Failed to delete experience. Please try again."
          );
        }
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Unable to delete the selected item."
      );
    } finally {
      setDeleteTarget(null);
      setIsDeleting(false);
    }
  };

  // ----------------------------------------------------------
  // Page Numbers
  // ----------------------------------------------------------

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    if (safePage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (safePage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      safePage - 2,
      safePage - 1,
      safePage,
      safePage + 1,
      safePage + 2,
    ];
  }, [safePage, totalPages]);

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------

  return (
    <div className="min-h-full w-full glass-card">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">

        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <FolderOpen className="h-4.5 w-4.5 text-primary" />
              </div>

              <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                Categories
              </h1>
            </div>

            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              Manage categories and their associated
              experiences from one place.
            </p>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            {/* <Button
              variant="outline"
              onClick={loadCategories}
              disabled={isLoading}
              className="flex-1 sm:flex-none"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  isLoading
                    ? "animate-spin"
                    : ""
                }`}
              />

              <span className="hidden xs:inline">
                Refresh
              </span>

              <span className="xs:hidden">
                Refresh
              </span>
            </Button> */}

            <Button
              className="flex-1 sm:flex-none"
              onClick={() => {
                // Connect this to your route.
                navigate("/category/create")
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <Alert
            variant="destructive"
            className="mb-5"
          >
            <CircleAlert className="h-4 w-4" />

            <AlertTitle>
              Unable to load categories
            </AlertTitle>

            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{error}</span>

              <Button
                variant="outline"
                size="sm"
                onClick={loadCategories}
                className="w-fit"
              >
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* ====================================================
            TOOLBAR
        ==================================================== */}

        <Card className="mb-5 glass-card">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col gap-3">

              {/* Search */}
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search categories or experiences..."
                  className="h-10 pl-9 pr-9"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2
                      text-muted-foreground
                      transition-colors
                      hover:text-foreground
                    "
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">

                {/* Status */}
                <Select
                  value={status}
                  onValueChange={(value) =>
                    setStatus(
                      value as StatusFilter
                    )
                  }
                >
                  <SelectTrigger className="h-10 w-full sm:w-[150px]">
                    <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />

                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All statuses
                    </SelectItem>

                    <SelectItem value="active">
                      Active
                    </SelectItem>

                    <SelectItem value="inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(
                      value as SortOption
                    )
                  }
                >
                  <SelectTrigger className="h-10 w-full sm:w-[170px]">
                    <ChevronsUpDown className="mr-2 h-4 w-4 text-muted-foreground" />

                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="sortOrder">
                      Sort order
                    </SelectItem>

                    <SelectItem value="nameAsc">
                      Name A-Z
                    </SelectItem>

                    <SelectItem value="nameDesc">
                      Name Z-A
                    </SelectItem>

                    <SelectItem value="newest">
                      Newest
                    </SelectItem>

                    <SelectItem value="oldest">
                      Oldest
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Expand Controls */}
                <div className="hidden h-6 w-px bg-border sm:block" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={expandAll}
                  className="justify-start sm:justify-center"
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Expand all
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={collapseAll}
                  className="justify-start sm:justify-center"
                >
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Collapse all
                </Button>

                {/* Clear */}
                {hasFilters && (
                  <>
                    <div className="hidden h-6 w-px bg-border sm:block" />

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="justify-start text-muted-foreground hover:text-foreground"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear filters
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ====================================================
            RESULTS INFO
        ==================================================== */}

        {!isLoading &&
          categories.length > 0 && (
            <div className="mb-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="text-muted-foreground">
                {totalItems === 0 ? (
                  "No results"
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {startIndex + 1}
                    </span>
                    –
                    <span className="font-medium text-foreground">
                      {endIndex}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                      {totalItems}
                    </span>{" "}
                    categories
                  </>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                {categories.length} total categories
              </div>
            </div>
          )}

        {/* ====================================================
            LOADING
        ==================================================== */}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <CategorySkeleton
                key={index}
              />
            ))}
          </div>
        ) : paginatedCategories.length >
          0 ? (
          /* ==================================================
             CATEGORY GRID
          ================================================== */

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {paginatedCategories.map(
              (category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  search={search}
                  expanded={expandedCategories.has(
                    category.id
                  )}
                  onToggle={() =>
                    toggleCategory(
                      category.id
                    )
                  }
                  onDeleteCategory={handleDeleteCategoryRequest}
                  onDeleteExperience={handleDeleteExperienceRequest}
                />
              )
            )}
          </div>
        ) : (
          /* ==================================================
             EMPTY
          ================================================== */

          <EmptyState
            hasFilters={hasFilters}
            onClear={clearFilters}
            onAdd={() => {
              // navigate("/categories/add")
            }}
          />
        )}

        {/* ====================================================
            PAGINATION
        ==================================================== */}

        {!isLoading &&
          totalItems > 0 &&
          totalPages > 1 && (
            <div className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">

              {/* Page Size */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="whitespace-nowrap">
                  Rows per page
                </span>

                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    setPageSize(
                      Number(value)
                    );
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-9 w-[75px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map(
                      (size) => (
                        <SelectItem
                          key={size}
                          value={String(
                            size
                          )}
                        >
                          {size}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between gap-2 sm:justify-end">

                {/* Previous */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={safePage === 1}
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.max(
                          1,
                          current - 1
                        )
                    )
                  }
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                <div className="hidden items-center gap-1 sm:flex">
                  {pageNumbers.map(
                    (pageNumber) => (
                      <Button
                        key={pageNumber}
                        variant={
                          pageNumber ===
                          safePage
                            ? "default"
                            : "ghost"
                        }
                        size="sm"
                        className="h-9 min-w-9 px-2"
                        onClick={() =>
                          setPage(
                            pageNumber
                          )
                        }
                      >
                        {pageNumber}
                      </Button>
                    )
                  )}
                </div>

                {/* Mobile Page Indicator */}
                <div className="flex min-w-[90px] items-center justify-center text-sm sm:hidden">
                  <span className="font-medium text-foreground">
                    {safePage}
                  </span>

                  <span className="mx-1 text-muted-foreground">
                    /
                  </span>

                  <span className="text-muted-foreground">
                    {totalPages}
                  </span>
                </div>

                {/* Next */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={
                    safePage === totalPages
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.min(
                          totalPages,
                          current + 1
                        )
                    )
                  }
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

        <Dialog
          open={!!deleteTarget}
          onOpenChange={(open) => {
            if (!open) setDeleteTarget(null);
          }}
          
        >
          <DialogContent className="max-w-md rounded-3xl border-0 shadow-2xl glass-card p-0 overflow-hidden glass-card">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 text-white rounded-xl">
            <DialogHeader  className="flex items-center gap-4">
              <div className="flex items-center gap-4 w-full ">
              <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-sm">
              <Trash2 className="h-7 w-7" />
            </div>
            <div>
              <DialogTitle>Confirm delete</DialogTitle>
              <p>This action cannot be undone.</p>
              </div>
              </div>
            </DialogHeader>
</div>
 <div className="flex items-center gap-3 rounded-2xl border border-red-100 glass-card p-4 m-3">
            <div className="mt-0.5">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <div>
<DialogDescription >
                {deleteTarget?.type === "category"
                  ? `Are you sure you want to delete "${deleteTarget.label}"? This action will remove the category and its related data.`
                  : `Are you sure you want to delete "${deleteTarget?.label}"? This action cannot be undone.`}
              </DialogDescription>
               </div>
          </div>
            <DialogFooter className="flex justify-between sm:justify-end m-3 gap-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="
                h-11
                px-6
                rounded-xl
                border
                font-medium
                transition-all
                duration-300
              "
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
                disabled={isDeleting}
                 className="
                h-11
                px-6
                rounded-xl
                bg-gradient-to-r
                from-red-600
                to-rose-600
                hover:from-red-700
                hover:to-rose-700
                text-white
                font-semibold
                shadow-lg
                hover:shadow-2xl
                hover:scale-[1.02]
                transition-all
                duration-300
                disabled:opacity-50
                disabled:hover:scale-100
              "
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}