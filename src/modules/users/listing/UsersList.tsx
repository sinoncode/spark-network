"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import {
  Search,
  MoreVertical,
  Pencil,
  RefreshCw,
  AlertTriangle,
  UserRound,
  FilterX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useUserStore } from "@/store/User/user.store";

import { UserTableSkeleton } from "@/components/Users/UserTableSkeleton";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { UserRole } from "@/types/Users/user";

const ROLE_CONFIG: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  ADMIN: {
    label: "Admin",
    className:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
  },

  DRIVER: {
    label: "Driver",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  },

  USER: {
    label: "User",
    className:
      "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300",
  },

  MODERATOR: {
    label: "Moderator",
    className:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
  },
};

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  active: {
    label: "Active User",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
  },

    banned: {
    label: "Restricted User",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  },
  pending_verification: {
    label: "Pending Verification",
    className:
      "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  inactive: {
    label: "Inactive",
    className:
      "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400",
  },

  suspended: {
    label: "Suspended",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  },
};

export default function UsersListing() {
  const {
    users,
    total,
    totalPages,
    isLoading,
    isFetching,
    error,
    filters,
    setFilters,
    resetFilters,
    fetchUsers,
  } = useUserStore();

  const [searchInput, setSearchInput] = useState(
    filters.search || ""
  );

  const page = filters.page;

  // --------------------------------------------------
  // Debounced Search
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim();

      if (search !== (filters.search || "")) {
        setFilters({
          search,
          page: 1,
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [
    searchInput,
    filters.search,
    setFilters,
  ]);

  // --------------------------------------------------
  // Fetch users whenever filters change
  // --------------------------------------------------

  useEffect(() => {
    fetchUsers();
  }, [
    fetchUsers,
    filters.page,
    filters.limit,
    filters.search,
    filters.role,
  ]);

  // --------------------------------------------------
  // Refresh
  // --------------------------------------------------

  const handleRefresh = () => {
    fetchUsers();
  };

  // --------------------------------------------------
  // Role Filter
  // --------------------------------------------------

  const handleRoleChange = (value: string) => {
    setFilters({
      role:
        value === "all"
          ? undefined
          : (value as UserRole),

      page: 1,
    });
  };

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const handlePageChange = (newPage: number) => {
    if (
      newPage >= 1 &&
      newPage <= totalPages
    ) {
      setFilters({
        page: newPage,
      });
    }
  };

  // --------------------------------------------------
  // Initials
  // --------------------------------------------------

  const getInitials = (
    displayName?: string,
    username?: string
  ) => {
    const name =
      displayName ||
      username ||
      "User";

    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // --------------------------------------------------
  // Active filters
  // --------------------------------------------------

  const hasFilters =
    Boolean(filters.search) ||
    Boolean(filters.role);

  return (
    <div className="space-y-5 animate-in fade-in duration-300">

      {/* ============================================
          HEADER
      ============================================ */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Users
          </h1>

          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage users, roles, account status and activity.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              isFetching
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </Button>

      </div>

      {/* ============================================
          LISTING CARD
      ============================================ */}

      <Card className="shadow-sm glass-card">

        {/* FILTER BAR */}

        <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b py-3 px-4">

          {/* SEARCH */}

          <div className="relative w-[280px]">

            <Search
              className="
                absolute
                left-3
                top-1/2
                h-3.5
                w-3.5
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value
                )
              }
              placeholder="Search users..."
              className="h-9 pl-9 text-sm"
            />

          </div>

          {/* ROLE */}

          <Select
            value={
              filters.role || "all"
            }
            onValueChange={
              handleRoleChange
            }
          >

            <SelectTrigger className="h-9 w-[150px] text-sm">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Roles
              </SelectItem>

              <SelectItem value="ADMIN">
                Admin
              </SelectItem>

              <SelectItem value="DRIVER">
                Driver
              </SelectItem>

              <SelectItem value="USER">
                User
              </SelectItem>

              <SelectItem value="MODERATOR">
                Moderator
              </SelectItem>

            </SelectContent>

          </Select>

          {/* LIMIT */}

          <Select
            value={String(filters.limit)}
            onValueChange={(value) => {
              setFilters({
                limit: Number(value),
                page: 1,
              });
            }}
          >

            <SelectTrigger className="h-9 w-[130px] text-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="10">
                10 / page
              </SelectItem>

              <SelectItem value="20">
                20 / page
              </SelectItem>

              <SelectItem value="50">
                50 / page
              </SelectItem>

              <SelectItem value="100">
                100 / page
              </SelectItem>

            </SelectContent>

          </Select>

          {/* RIGHT SIDE */}

          <div className="ml-auto flex items-center gap-3">

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="
                  h-8
                  gap-1
                  text-muted-foreground
                "
                onClick={() => {
                  setSearchInput("");
                  resetFilters();
                }}
              >
                <FilterX className="h-3.5 w-3.5" />

                Clear
              </Button>
            )}

            <span className="text-xs text-muted-foreground">
              {isLoading
                ? "Loading..."
                : `${total} ${
                    total === 1
                      ? "user"
                      : "users"
                  }`}
            </span>

          </div>

        </CardHeader>

        {/* ============================================
            ERROR
        ============================================ */}

        {error && (
          <div
            className="
              flex
              items-center
              gap-2
              border-b
              border-red-100
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >

            <AlertTriangle className="h-4 w-4" />

            <span>
              {error}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className="
                ml-auto
                h-7
                text-red-700
                hover:bg-red-100
              "
              onClick={handleRefresh}
            >
              Retry
            </Button>

          </div>
        )}

        {/* ============================================
            TABLE
        ============================================ */}

        <CardContent className="p-0">

          <div className="overflow-x-auto">

            <Table className="min-w-[1100px]">

              <TableHeader>

                <TableRow className="bg-muted/40 hover:bg-muted/40">

                  <TableHead className="pl-4">
                    User
                  </TableHead>

                  <TableHead>
                    Email
                  </TableHead>

                  <TableHead>
                    Role
                  </TableHead>

                  <TableHead>
                    XP
                  </TableHead>

                  <TableHead>
                    Level
                  </TableHead>

                  <TableHead>
                    Posts
                  </TableHead>

                  <TableHead>
                    Reports
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead>
                    Joined
                  </TableHead>

                  <TableHead className="text-right pr-4">
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {/* LOADING */}

                {isLoading ? (
                  <UserTableSkeleton
                    rows={filters.limit}
                  />

                ) : users.length === 0 ? (

                  /* EMPTY */

                  <TableRow>

                    <TableCell
                      colSpan={10}
                      className="py-20 text-center"
                    >

                      <div className="flex flex-col items-center gap-2">

                        <UserRound
                          className="
                            h-8
                            w-8
                            text-muted-foreground
                            opacity-30
                          "
                        />

                        <p className="text-sm text-muted-foreground">
                          No users found.
                        </p>

                        {hasFilters && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSearchInput("");
                              resetFilters();
                            }}
                          >
                            Clear filters
                          </Button>
                        )}

                      </div>

                    </TableCell>

                  </TableRow>

                ) : (

                  /* DATA */

                  users.map((user) => {

                    const role =
                      ROLE_CONFIG[
                        user.role
                      ];

                    const status =
                      STATUS_CONFIG[
                        user.status
                      ];

                    return (
                      <TableRow
                        key={user.id}
                        className="
                          group
                          border-b
                          border-border/50
                          transition-colors
                          hover:bg-muted/30
                        "
                      >

                        {/* USER */}

                        <TableCell className="pl-4">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                                text-xs
                                font-semibold
                                text-primary
                              "
                            >
                              {getInitials(
                                user.displayName,
                                user.username
                              )}
                            </div>

                            <div className="min-w-0">

                              <div className="truncate text-sm font-medium">
                                {user.displayName}
                              </div>

                              <div className="truncate text-xs text-muted-foreground">
                                @{user.username}
                              </div>

                            </div>

                          </div>

                        </TableCell>

                        {/* EMAIL */}

                        <TableCell>

                          <span className="text-sm">
                            {user.email}
                          </span>

                        </TableCell>

                        {/* ROLE */}

                        <TableCell>

                          <Badge
                            variant="outline"
                            className={`
                              text-xs
                              font-medium
                              ${
                                role?.className ||
                                ""
                              }
                            `}
                          >
                            {role?.label ||
                              user.role}
                          </Badge>

                        </TableCell>

                        {/* XP */}

                        <TableCell>

                          <span className="font-medium text-sm">
                            {user.xpTotal}
                          </span>

                        </TableCell>

                        {/* LEVEL */}

                        <TableCell>

                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            Lv. {user.level}
                          </Badge>

                        </TableCell>

                        {/* POSTS */}

                        <TableCell>

                          <span className="text-sm">
                            {user._count.posts}
                          </span>

                        </TableCell>

                        {/* REPORTS */}

                        <TableCell>

                          <span
                            className={`
                              text-sm
                              ${
                                user._count
                                  .postReports > 0
                                  ? "font-medium text-red-600"
                                  : "text-muted-foreground"
                              }
                            `}
                          >
                            {user._count.postReports}
                          </span>

                        </TableCell>

                        {/* STATUS */}

                        <TableCell>

                          <Badge
                            variant="outline"
                            className={`
                              text-xs
                              font-medium
                              ${
                                status?.className ||
                                ""
                              }
                            `}
                          >
                            {status?.label ||
                              user.status}
                          </Badge>

                        </TableCell>

                        {/* DATE */}

                        <TableCell className="whitespace-nowrap">

                          <div className="text-sm">
                            {format(
                              new Date(
                                user.createdAt
                              ),
                              "MMM d, yyyy"
                            )}
                          </div>

                          <div className="text-[10px] text-muted-foreground">
                            {format(
                              new Date(
                                user.createdAt
                              ),
                              "h:mm a"
                            )}
                          </div>

                        </TableCell>

                        {/* ACTIONS */}

                        <TableCell className="pr-4 text-right">

                          <DropdownMenu>

                            <DropdownMenuTrigger
                              asChild
                            >

                              <Button
                                variant="ghost"
                                size="icon"
                                className="
                                  h-8
                                  w-8
                                  opacity-0
                                  transition-opacity
                                  group-hover:opacity-100
                                "
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-44"
                            >

                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer gap-2"
                              >

                                <Link
                                  to={`/users/edit-user/${user.id}`}
                                >
                                  <Pencil className="h-3.5 w-3.5" />

                                  View & Edit
                                </Link>

                              </DropdownMenuItem>

                            </DropdownMenuContent>

                          </DropdownMenu>

                        </TableCell>

                      </TableRow>
                    );
                  })
                )}

              </TableBody>

            </Table>

          </div>

          {/* ============================================
              PAGINATION
          ============================================ */}

          {!isLoading &&
            users.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-border/50
                  px-4
                  py-3
                "
              >

                <p className="text-xs text-muted-foreground">

                  Showing{" "}

                  {(page - 1) *
                    filters.limit +
                    1}

                  {"–"}

                  {Math.min(
                    page *
                      filters.limit,
                    total
                  )}

                  {" "}of {total}

                </p>

                <div className="flex items-center gap-1.5">

                  {/* PREVIOUS */}

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    disabled={page === 1}
                    onClick={() =>
                      handlePageChange(
                        page - 1
                      )
                    }
                  >

                    <ChevronLeft className="mr-1 h-3.5 w-3.5" />

                    Previous

                  </Button>

                  {/* PAGE NUMBERS */}

                  <div className="flex items-center gap-1">

                    {Array.from(
                      {
                        length:
                          Math.min(
                            5,
                            totalPages
                          ),
                      },
                      (_, index) => {

                        let pageNumber: number;

                        if (
                          totalPages <= 5
                        ) {
                          pageNumber =
                            index + 1;

                        } else if (
                          page <= 3
                        ) {
                          pageNumber =
                            index + 1;

                        } else if (
                          page >=
                          totalPages - 2
                        ) {
                          pageNumber =
                            totalPages -
                            4 +
                            index;

                        } else {
                          pageNumber =
                            page -
                            2 +
                            index;
                        }

                        return (
                          <Button
                            key={
                              pageNumber
                            }
                            variant={
                              pageNumber ===
                              page
                                ? "default"
                                : "ghost"
                            }
                            size="sm"
                            className="h-8 w-8 p-0 text-xs"
                            onClick={() =>
                              handlePageChange(
                                pageNumber
                              )
                            }
                          >
                            {pageNumber}
                          </Button>
                        );
                      }
                    )}

                  </div>

                  {/* NEXT */}

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    disabled={
                      page ===
                      totalPages
                    }
                    onClick={() =>
                      handlePageChange(
                        page + 1
                      )
                    }
                  >

                    Next

                    <ChevronRight className="ml-1 h-3.5 w-3.5" />

                  </Button>

                </div>

              </div>
            )}

        </CardContent>

      </Card>

    </div>
  );
}