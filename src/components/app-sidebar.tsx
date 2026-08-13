"use client"

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  ChartNoAxesCombined,
  Grid2X2,
  Building2,
  Handshake,
  Users,
  Phone,
  Mail,
  NotebookPen,
  LucidePuzzle,
  UserRound,
  CirclePile,
  ScrollText,
  Settings,
  Layers,
  Book,
  BrickWallShield,
  MessageCircleQuestionMark,
  Gavel,
  Store,
} from "lucide-react"



import { MdOutlineRealEstateAgent } from "react-icons/md";
import { GiAngelOutfit } from "react-icons/gi";
import { GrCloudSoftware } from "react-icons/gr";

import CloudKeyOutlineIcon from "@/components/icons/mdi-cloud-key-outline";
import AccountSettingsVariantIcon from "@/components/icons/mdi-account-settings-variant";
import LeaderboardOutlineIcon from "@/components/icons/leaderboard";
import RewardsOutlineIcon from "@/components/icons/rewards";

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"

import LogoIcon from "../assets/logo/spark-icon.png"
import LogoText from "../assets/logo/spark-text.png"

// This is sample data.
const data = {
  user: {
    name: "Alex Martin",
    email: "alex@example.com",
    avatar: "https://untitledui.com/images/avatars/madeleine-pitts",
  },
  teams: [
    {
      name: "Spark Network",
      logo: GalleryVerticalEnd,
      plan: "React Admin",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: Grid2X2,
      isActive: true,

    },
    {
      title: "Permission",
      url: "permission",
      icon: AccountSettingsVariantIcon,
    },
    {
      title: "Leaderboard",
      url: "leaderboard/list",
      icon: LeaderboardOutlineIcon,
    },
    {
      title: "Rewards",
      url: "rewards",
      icon: RewardsOutlineIcon,
    },
    {
      title: "Post",
      url: "post/list",
      icon: NotebookPen,
    },
    // {
    //   title: "Properties",
    //   url: "properties/list",
    //   icon: Building2,
    // },
    // {
    //   title: "New Projects",
    //   url: "properties/add-property",
    //   icon: BrickWallShield,
    // },
    // {
    //   title: "Requests",
    //   url: "requests/list",
    //   icon: MessageCircleQuestionMark,
    // },
    {
      title: "Users",
      url: "leads/list",
      icon: Users,
    },
    {
      title: "Category",
      url: "category/list",
      icon: LucidePuzzle,
    },
    // {
    //   title: "Contact",
    //   url: "contacts/list",
    //   icon: Phone,
    // },
    // {
    //   title: "Emails",
    //   url: "emails/list",
    //   icon: Mail,
    // },
    // {
    //   title: "Dossiers",
    //   url: "dossiers/list",
    //   icon: Book,
    // },
    // {
    //   title: "Agenda",
    //   url: "agenda",
    //   icon: NotebookPen,
    // },
    // {
    //   title: "Activites",
    //   url: "docs",
    //   icon: LucidePuzzle,
    // },
    // {
    //   title: "Reports",
    //   url: "docs",
    //   icon: ChartNoAxesCombined,
    // },

    // {
    //   title: "Angel",
    //   url: "docs",
    //   icon: GiAngelOutfit,
    // },
    // {
    //   title: "Agent",
    //   url: "docs",
    //   icon: MdOutlineRealEstateAgent,
    // },
    // {
    //   title: "Partners",
    //   url: "docs",
    //   icon: Gavel,
    // },
    // {
    //   title: "Agency",
    //   url: "docs",
    //   icon: Store,
    // },

    //   {
    //   title: "Cloud",
    //   url: "docs",
    //   icon: CloudKeyOutlineIcon,
    // },

    // {
    //   title: "Billing",
    //   url: "docs",
    //   icon: ScrollText,
    // },
    {
      title: "Settings",
      url: "docs",
      icon: Settings,
    },
    // {
    //   title: "eCommerce",
    //   url: "#",
    //   icon: ShoppingCart,
    //   items: [
    //     {
    //       title: "Product List",
    //       url: "eCommerce/product-list",
    //     },
    //     {
    //       title: "Product Grid",
    //       url: "eCommerce/product-grid",
    //     },
    //     {
    //       title: "Add Product",
    //       url: "eCommerce/add-product",
    //     },
    //     {
    //       title: "Categories",
    //       url: "eCommerce/categories",
    //     },
    //     {
    //       title: "Order List",
    //       url: "eCommerce/order-list",
    //     },
    //     {
    //       title: "Order Details",
    //       url: "eCommerce/order-details",
    //     },
    //     {
    //       title: "Customer List",
    //       url: "eCommerce/customer-list",
    //     },
    //     {
    //       title: "Customer Details",
    //       url: "eCommerce/customer-details",
    //     },
    //     {
    //       title: "Invoice",
    //       url: "eCommerce/invoice",
    //     },

    //   ],
    // },
    // {
    //   title: "Widgets",
    //   url: "#",
    //   icon: Tv,
    //   items: [
    //     {
    //       title: "Data Widgets",
    //       url: "widgets/data",
    //     },
    //     {
    //       title: "Statistics Widgets",
    //       url: "widgets/statistics",
    //     },
    //   ],
    // },
    // {
    //   title: "Applications",
    //   url: "#",
    //   icon: LayoutGrid,
    //   items: [
    //     {
    //       title: "Chatbox",versionRateCard = lazy(() => import("./ConversionRateCard"))
// const SalesAnalysisCard = lazy(() => import("./SalesAnalysisCard"))
// const RecentOrdersCard = lazy(() => import("./RecentOrdersCard"))
// const SalesByCountriesCard = lazy(() => import("./SalesByCountr
    //       url: "app/chatbox",
    //     },
    //      {
    //       title: "Calendar",
    //       url: "app/calendar",
    //     },
    //      {
    //       title: "File Manager",
    //       url: "app/file-manager",
    //     },
    //      {
    //       title: "Invoice Card",
    //       url: "app/invoice-card",
    //     },
    //   ],
    // },
    // {
    //   title: "Components",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "Alerts",
    //       url: "components/alerts",
    //     },
    //     {
    //       title: "Accordion",
    //       url: "components/accordion",
    //     },
    //     {
    //       title: "Sooner",
    //       url: "components/sooner",
    //     },
    //     {
    //       title: "Badges",
    //       url: "components/badges",
    //     },
    //     {
    //       title: "Buttons",
    //       url: "components/buttons",
    //     },
    //     {
    //       title: "Cards",
    //       url: "components/cards",
    //     },
    //     {
    //       title: "List Groups",
    //       url: "components/list-groups",
    //     },
    //     {
    //       title: "Carousels",
    //       url: "components/carousels",
    //     },
    //     {
    //       title: "Media Object",
    //       url: "components/media-object",
    //     },
    //     {
    //       title: "Navbars",
    //       url: "components/navbars",
    //     },
    //     {
    //       title: "Progress",
    //       url: "components/progress",
    //     },
    //     {
    //       title: "Spinners",
    //       url: "components/spinners",
    //     },
    //   ],
    // },
    // {
    //   title: "Forms",
    //   url: "#",
    //   icon: File,
    //   items: [
    //     {
    //       title: "Basic Inputs",
    //       url: "forms/basic-inputs",
    //     },
    //     {
    //       title: "Input Groups",
    //       url: "forms/input-groups",
    //     },
    //     {
    //       title: "Radio & Checkboxes",
    //       url: "forms/radio-checkboxes",
    //     },
    //     {
    //       title: "Form Layouts",
    //       url: "forms/form-layouts",
    //     },
    //     {
    //       title: "Form Wizard",
    //       url: "forms/form-wizard",
    //     },
    //     {
    //       title: "Text Editor",
    //       url: "forms/text-editor",
    //     },
    //     {
    //       title: "File Upload",
    //       url: "forms/file-upload",
    //     },
    //     {
    //       title: "Date Pickers",
    //       url: "forms/date-pickers",
    //     },
    //     {
    //       title: "Select",
    //       url: "forms/select",
    //     },
    //     {
    //       title: "Form Repeat",
    //       url: "forms/form-repeat",
    //     },
    //   ],
    // },
    // {
    //   title: "Tables",
    //   url: "#",
    //   icon: Grid2x2,
    //   items: [
    //     {
    //       title: "Basic Tables",
    //       url: "tables/basic-tables",
    //     },
    //     {
    //       title: "Data Tables",
    //       url: "tables/data-tables",
    //     },
    //     {
    //       title: "Advanced Tables",
    //       url: "tables/advanced-tables",
    //     },
    //   ],
    //  },
    //  {
    //   title: "Icons",
    //   url: "#",
    //   icon: Droplet,
    //   items: [
    //     {
    //       title: "Boxicons",
    //       url: "icons/boxicons",
    //     },
    //      {
    //       title: "Bootstrap",
    //       url: "icons/bootstrap",
    //     },
    //      {
    //       title: "Lucide",
    //       url: "icons/lucide",
    //     },
    //   ],
    //  },
    //  {
    //   title: "Pricing",
    //   url: "pricing/pricing-tables",
    //   icon: Landmark,
    // },
    // {
    //   title: "Authentication",
    //   url: "#",
    //   icon: LockKeyhole,
    //   items: [
    //     {
    //       title: "Basic",
    //       url: "#",
    //       items: [
    //         {
    //           title: "Login",
    //           url: "auth/basic/login",
    //         },
    //         {
    //           title: "Register",
    //           url: "auth/basic/register",
    //         },
    //         {
    //           title: "Verify Email",
    //           url: "auth/basic/verify-email",
    //         },
    //         {
    //           title: "Forgot Password",
    //           url: "auth/basic/forgot-password",
    //         },
    //         {
    //           title: "New Password",
    //           url: "auth/basic/reset-password",
    //         },
    //         {
    //           title: "Reset Success",
    //           url: "auth/basic/password-reset-success",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Cover",
    //       url: "#",
    //       items: [
    //         {
    //           title: "Login",
    //           url: "auth/cover/login",
    //         },
    //         {
    //           title: "Register",
    //           url: "auth/cover/register",
    //         },
    //         {
    //           title: "Verify Email",
    //           url: "auth/cover/verify-email",
    //         },
    //         {
    //           title: "Forgot Password",
    //           url: "auth/cover/forgot-password",
    //         },
    //         {
    //           title: "New Password",
    //           url: "auth/cover/new-password",
    //         },
    //         {
    //           title: "Reset Success",
    //           url: "auth/cover/password-reset-success",
    //         },
    //       ],
    //     },
    //   ],
    // },
    //  {
    //   title: "Accounts",
    //   url: "#",
    //   icon: CircleUserRound,
    //   items: [
    //     {
    //       title: "Profile",
    //       url: "account/profile",
    //     },
    //     {
    //       title: "Edit Profile",
    //       url: "account/edit-profile",
    //     },
    //     {
    //       title: "Password Setting",
    //       url: "account/password-setting",
    //     },
    //     {
    //       title: "Noitifications",
    //       url: "account/notifications",
    //     },
    //   ],
    // },
    //  {
    //   title: "Charts",
    //   url: "#",
    //   icon: ChartNoAxesCombined,
    //   items: [
    //     {
    //       title: "ReCharts",
    //       url: "charts/recharts",
    //     },
    //     {
    //       title: "Apex Charts",
    //       url: "charts/apex-charts",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "docs",
    //   icon: Code,
    // },
    //  {
    //   title: "FAQ",
    //   url: "faq",
    //   icon: BookOpen,
    // },
    //  {
    //   title: "Error Pages",
    //   url: "#",
    //   icon: TriangleAlert,
    //   items: [
    //     {
    //       title: "404 Not Found",
    //       url: "error/error-404",
    //     },
    //     {
    //       title: "500 Server Error",
    //       url: "error/error-500",
    //     },
    //     {
    //       title: "coming soon",
    //       url: "error/coming-soon",
    //     },
    //   ],
    // },
  ],

}

// This is the sidebar component used in the app layout.
type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  onHoverChange?: (value: boolean) => void
}

// The sidebar component used in the app layout. It receives an `onHoverChange` prop to notify the parent layout when the sidebar is hovered or not.
export function AppSidebar({ onHoverChange, ...props }: AppSidebarProps) {
  return (
    <div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <Sidebar collapsible="icon" {...props} className="h-screen z-50 bg-[linear-gradient(180deg,#FC8D0E_0%,#F87A0A_30%,#EF5510_65%,#E33210_100%)]">
        <SidebarHeader className="border-b h-16 ">
          <SidebarMenuButton size="lg" asChild className="px-2 py-3">
            <a href="/" className="flex justify-center hover:bg-transparent active:bg-transparent">
              <div className="mx-0">
                <img src={LogoIcon} alt="2morrow icon" />
              </div>
              <div className="leading-tight -ms-3">
                <img src={LogoText} alt="2morrow icon" />
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex min-h-full flex-col">
              <NavMain items={data.navMain as any} />
              {/* <NavProjects projects={data.projects} /> */}
            </div>
          </ScrollArea>
        </SidebarContent>

        {/* <SidebarFooter className="border-t h-16 justify-center">
          <NavUser user={data.user} />
        </SidebarFooter> */}

        {/* <SidebarRail /> */}
      </Sidebar>
    </div>
  )
}
