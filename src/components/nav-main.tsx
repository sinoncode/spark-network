"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type MenuItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: MenuItem[]
}

export function NavMain({ items }: { items: MenuItem[] }) {
  const location = useLocation()

  const isActiveRoute = (url: string) => {
    return location.pathname.startsWith(`/${url}`)
  }

  const renderMenuItems = (menuItems: MenuItem[]) => {
    return menuItems.map((item) => {
      const hasChildren = item.items && item.items.length > 0

      const isParentActive =
        hasChildren &&
        item.items!.some((sub) => {
          if (isActiveRoute(sub.url)) return true
          if (sub.items) {
            return sub.items.some((child) => isActiveRoute(child.url))
          }
          return false
        })

      // Level 1: Standard Item (No children)
      if (!hasChildren) {
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={isActiveRoute(item.url)}
              className="h-9 transition-all duration-200 hover:bg-sidebar-accent/50 data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary"
            >
              <Link to={item.url} className="flex items-center gap-3 h-full">
                {item.icon && <item.icon className="h-20 w-20 shrink-0 transition-transform duration-200 group-hover/menu-item:scale-405" />}
                <span className="text-lg tracking-tight">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      }

      // Level 1: Collapsible Item with Children
      return (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={isParentActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isParentActive}
                className="h-9 transition-all duration-200 hover:bg-sidebar-accent/50 data-[active=true]:font-semibold"
              >
                {item.icon && <item.icon className="h-20 w-20 shrink-0" />}
                <span className="text-sm tracking-tight">{item.title}</span>
                <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-data-[state=open]/collapsible:rotate-90 text-muted-foreground/70" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down transition-all">
              <SidebarMenuSub className="my-1 ml-3.5 space-y-1 border-l border-sidebar-border/60 pl-2">
                {item.items?.map((subItem) =>
                  subItem.items ? (
                    // Level 2: Nested Collapsible Item
                    <SidebarMenuSubItem key={subItem.title}>
                      <Collapsible
                        defaultOpen={subItem.items.some((child) =>
                          isActiveRoute(child.url)
                        )}
                        className="group/subcollapsible"
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuSubButton className="h-8 transition-colors duration-200 hover:bg-sidebar-accent/40">
                            {subItem.icon && <subItem.icon className="h-20 w-20 shrink-0" />}
                            <span className="text-xs font-medium">{subItem.title}</span>
                            <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-data-[state=open]/subcollapsible:rotate-90 text-muted-foreground/70" />
                          </SidebarMenuSubButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                          <SidebarMenuSub className="my-1 ml-3 space-y-1 border-l border-sidebar-border/40 pl-2">
                            {subItem.items.map((child) => (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActiveRoute(child.url)}
                                  className="h-7 text-xs transition-colors duration-200 hover:bg-sidebar-accent/40 data-[active=true]:font-medium data-[active=true]:text-sidebar-primary"
                                >
                                  <Link to={child.url}>
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuSubItem>
                  ) : (
                    // Level 2: Standard Sub-Item
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActiveRoute(subItem.url)}
                        className="h-8 text-xs transition-colors duration-200 hover:bg-sidebar-accent/40 data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary"
                      >
                        <Link to={subItem.url} className="flex items-center gap-2">
                          {subItem.icon && <subItem.icon className="h-3.5 w-3.5 shrink-0" />}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                )}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      )
    })
  }

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1.5 px-2">
        {renderMenuItems(items)}
      </SidebarMenu>
    </SidebarGroup>
  )
}