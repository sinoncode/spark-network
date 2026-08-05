"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { useAuthStore } from "@/store/auth.store"
import { useProfile } from "@/hooks/useProfile"

import { useNavigate } from "react-router-dom"

import {
  User,
  LogOut,
} from "lucide-react"

export function UserDropdown() {
  const navigate = useNavigate()

  const logout = useAuthStore((state) => state.logout)

  const { data: profile } = useProfile()

  const handleLogout = async () => {
    await logout()

    navigate("/auth/login", {
      replace: true,
    })
  }

  const initials =
    profile?.name
      ?.split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full h-10 w-10 p-0 overflow-hidden ml-2"
        >
          <Avatar className="h-10 w-10 border-border rounded-full">
            <AvatarImage src={profile?.avatar ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-3 rounded-xl shadow-xl"
      >
        <DropdownMenuLabel className="rounded-xl mb-3 bg-muted/50 border border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar ?? ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">
                {profile?.name || "Loading..."}
              </p>

              <p className="text-xs text-muted-foreground">
                {profile?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem
          className="gap-2 h-9 cursor-pointer"
          onClick={() => navigate("/account/profile")}
        >
          <User className="size-5" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <Button
          className="w-full h-8 justify-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}