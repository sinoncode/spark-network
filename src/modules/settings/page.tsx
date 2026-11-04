"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Palette,
  Image as ImageIcon,
  Type,
  Globe,
  Bell,
  Shield,
  Database,
  Save,
  RefreshCw,
  Upload,
  X,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Smartphone,
  Monitor,
  Tablet,
  Sun,
  Moon,
  Laptop,
  Sparkles,
  Trash2,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Copy,
  CheckCircle2,
  XCircle,
  Loader2,
  Zap,
  Layers,
  Sliders,
  Home,
  Users,
  BarChart3,
  FileText,
  Camera,
  Link2,
  Unlink,
  Clock,
  Calendar,
  Tag,
  Star,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Info,
  HelpCircle,
  Keyboard,
  Accessibility,
  Languages,
  Volume2,
  Mic,
  Video,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// ============================================
// TYPES & INTERFACES
// ============================================

interface BrandSettings {
  logo: string;
  logoDark: string;
  favicon: string;
  appName: string;
  appDescription: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontFamily: string;
  fontSize: "small" | "medium" | "large";
  theme: "light" | "dark" | "system";
  customCSS: string;
}

interface GeneralSettings {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  siteUrl: string;
  adminEmail: string;
  supportEmail: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  language: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailVerification: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  weeklyReports: boolean;
  mentionNotifications: boolean;
  taskAssignments: boolean;
  deadlineReminders: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  quietHours: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  minPasswordLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  loginAttempts: number;
  lockoutDuration: number;
  ipWhitelist: string[];
  allowedDomains: string[];
  ssoEnabled: boolean;
  ssoProvider: string;
  auditLog: boolean;
  dataEncryption: boolean;
  autoBackup: boolean;
  backupFrequency: string;
}

interface IntegrationSettings {
  googleAnalytics: boolean;
  googleAnalyticsId: string;
  stripeEnabled: boolean;
  stripeKey: string;
  stripeSecret: string;
  slackEnabled: boolean;
  slackWebhook: string;
  discordEnabled: boolean;
  discordWebhook: string;
  zoomEnabled: boolean;
  zoomApiKey: string;
  zoomApiSecret: string;
  openaiEnabled: boolean;
  openaiKey: string;
  awsEnabled: boolean;
  awsAccessKey: string;
  awsSecretKey: string;
  awsRegion: string;
}

interface AppearanceSettings {
  sidebarCollapsed: boolean;
  sidebarColor: string;
  navbarColor: string;
  cardShadow: "none" | "sm" | "md" | "lg" | "xl";
  cardBorder: boolean;
  animationSpeed: number;
  enableAnimations: boolean;
  reduceMotion: boolean;
  compactMode: boolean;
  showBreadcrumbs: boolean;
  showFooter: boolean;
  footerText: string;
  customLogo: string;
  watermarkEnabled: boolean;
  watermarkText: string;
}

// ============================================
// ANIMATION VARIANTS
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

// ============================================
// COLOR PRESETS
// ============================================

const colorPresets = [
  { name: "Blue", primary: "#3B82F6", secondary: "#1D4ED8", accent: "#60A5FA" },
  { name: "Purple", primary: "#8B5CF6", secondary: "#6D28D9", accent: "#A78BFA" },
  { name: "Green", primary: "#10B981", secondary: "#059669", accent: "#34D399" },
  { name: "Orange", primary: "#F97316", secondary: "#EA580C", accent: "#FB923C" },
  { name: "Red", primary: "#EF4444", secondary: "#DC2626", accent: "#F87171" },
  { name: "Pink", primary: "#EC4899", secondary: "#DB2777", accent: "#F472B6" },
  { name: "Indigo", primary: "#6366F1", secondary: "#4F46E5", accent: "#818CF8" },
  { name: "Teal", primary: "#14B8A6", secondary: "#0D9488", accent: "#2DD4BF" },
  { name: "Cyan", primary: "#06B6D4", secondary: "#0891B2", accent: "#22D3EE" },
  { name: "Amber", primary: "#F59E0B", secondary: "#D97706", accent: "#FBBF24" },
  { name: "Emerald", primary: "#10B981", secondary: "#047857", accent: "#34D399" },
  { name: "Rose", primary: "#F43F5E", secondary: "#E11D48", accent: "#FB7185" },
];

const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Poppins", label: "Poppins" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Lato", label: "Lato" },
  { value: "Nunito", label: "Nunito" },
  { value: "Work Sans", label: "Work Sans" },
  { value: "DM Sans", label: "DM Sans" },
  { value: "System", label: "System Default" },
];

const timezoneOptions = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland",
];

// ============================================
// MAIN SETTINGS PAGE COMPONENT
// ============================================

export default function SettingsPage() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [activeTab, setActiveTab] = useState("brand");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Brand Settings State
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    logo: "",
    logoDark: "",
    favicon: "",
    appName: "My Application",
    appDescription: "A powerful and flexible application",
    tagline: "Built with modern technology",
    primaryColor: "#3B82F6",
    secondaryColor: "#1D4ED8",
    accentColor: "#60A5FA",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
    borderRadius: 8,
    fontFamily: "Inter",
    fontSize: "medium",
    theme: "light",
    customCSS: "",
  });

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteTitle: "My Application",
    siteDescription: "A powerful and flexible application",
    siteKeywords: "app, software, platform",
    siteUrl: "https://example.com",
    adminEmail: "admin@example.com",
    supportEmail: "support@example.com",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    language: "en",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
    weeklyReports: false,
    mentionNotifications: true,
    taskAssignments: true,
    deadlineReminders: true,
    soundEnabled: true,
    soundVolume: 70,
    quietHours: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    minPasswordLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    loginAttempts: 5,
    lockoutDuration: 15,
    ipWhitelist: [],
    allowedDomains: [],
    ssoEnabled: false,
    ssoProvider: "google",
    auditLog: true,
    dataEncryption: true,
    autoBackup: true,
    backupFrequency: "daily",
  });

  // Integration Settings State
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    googleAnalytics: false,
    googleAnalyticsId: "",
    stripeEnabled: false,
    stripeKey: "",
    stripeSecret: "",
    slackEnabled: false,
    slackWebhook: "",
    discordEnabled: false,
    discordWebhook: "",
    zoomEnabled: false,
    zoomApiKey: "",
    zoomApiSecret: "",
    openaiEnabled: false,
    openaiKey: "",
    awsEnabled: false,
    awsAccessKey: "",
    awsSecretKey: "",
    awsRegion: "us-east-1",
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    sidebarCollapsed: false,
    sidebarColor: "#1F2937",
    navbarColor: "#FFFFFF",
    cardShadow: "md",
    cardBorder: true,
    animationSpeed: 1,
    enableAnimations: true,
    reduceMotion: false,
    compactMode: false,
    showBreadcrumbs: true,
    showFooter: true,
    footerText: "© 2024 My Application. All rights reserved.",
    customLogo: "",
    watermarkEnabled: false,
    watermarkText: "CONFIDENTIAL",
  });

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    // Simulate loading settings
    const loadSettings = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    // Track changes
    setHasChanges(true);
  }, [brandSettings, generalSettings, notificationSettings, securitySettings, integrationSettings, appearanceSettings]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSaving(false);
    setSaveSuccess(true);
    setHasChanges(false);

    // Reset success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    // Reset all settings to defaults
    setBrandSettings({
      logo: "",
      logoDark: "",
      favicon: "",
      appName: "My Application",
      appDescription: "A powerful and flexible application",
      tagline: "Built with modern technology",
      primaryColor: "#3B82F6",
      secondaryColor: "#1D4ED8",
      accentColor: "#60A5FA",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      borderRadius: 8,
      fontFamily: "Inter",
      fontSize: "medium",
      theme: "light",
      customCSS: "",
    });
    setHasChanges(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "logoDark" | "favicon") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandSettings((prev) => ({
          ...prev,
          [type]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setBrandSettings((prev) => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    }));
  };

  // ============================================
  // RENDER HELPERS
  // ============================================

  const renderColorPicker = (
    label: string,
    value: string,
    onChange: (color: string) => void,
    description?: string
  ) => (
    <motion.div variants={itemVariants} className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-20 cursor-pointer rounded-lg border border-input bg-background"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-32 font-mono text-sm"
          placeholder="#000000"
        />
        <div
          className="h-10 w-10 rounded-lg border shadow-sm"
          style={{ backgroundColor: value }}
        />
      </div>
    </motion.div>
  );

  const renderSwitch = (
    label: string,
    description: string,
    checked: boolean,
    onCheckedChange: (checked: boolean) => void
  ) => (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between rounded-lg border p-4"
    >
      <div className="space-y-0.5">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </motion.div>
  );

  const renderSlider = (
    label: string,
    description: string,
    value: number,
    onValueChange: (value: number) => void,
    min: number,
    max: number,
    step: number = 1,
    unit: string = ""
  ) => (
    <motion.div variants={itemVariants} className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">{label}</Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <span className="text-sm font-mono text-muted-foreground">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onValueChange(v)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </motion.div>
  );

  // ============================================
  // LOADING SKELETON
  // ============================================

  if (isLoading) {
    return (
      <div className="mt-16 space-y-6 p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <Skeleton className="h-96 rounded-xl" />
          <div className="space-y-6 lg:col-span-3">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <TooltipProvider>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mt-16 min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 lg:p-8"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-4 shadow-lg"
              >
                <Settings className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
                >
                  Settings
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-1 text-muted-foreground"
                >
                  Manage your application settings and preferences
                </motion.p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-600"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Saved!
                  </motion.div>
                )}
              </AnimatePresence>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Preview Changes</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleReset}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset to Defaults</TooltipContent>
              </Tooltip>

              <Button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* CHANGES INDICATOR */}
          <AnimatePresence>
            {hasChanges && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4"
              >
                <Alert className="border-amber-500/50 bg-amber-500/10">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-600">Unsaved Changes</AlertTitle>
                  <AlertDescription className="text-amber-600/80">
                    You have unsaved changes. Don't forget to save your settings.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Separator className="my-6" />

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* SIDEBAR NAVIGATION */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Settings Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {[
                    { id: "brand", label: "Brand & Identity", icon: Palette },
                    { id: "general", label: "General", icon: Globe },
                    { id: "appearance", label: "Appearance", icon: Sparkles },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "security", label: "Security", icon: Shield },
                    { id: "integrations", label: "Integrations", icon: Zap },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {activeTab === item.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="ml-auto h-2 w-2 rounded-full bg-primary-foreground"
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* CONTENT AREA */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* BRAND & IDENTITY TAB */}
              {activeTab === "brand" && (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* LOGO SECTION */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Logo & Icons
                      </CardTitle>
                      <CardDescription>
                        Upload your brand logos and icons
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Main Logo */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-3"
                        >
                          <Label>Main Logo (Light)</Label>
                          <div className="flex flex-col items-center gap-3">
                            <div className="relative flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50">
                              {brandSettings.logo ? (
                                <img
                                  src={brandSettings.logo}
                                  alt="Logo"
                                  className="max-h-24 max-w-full object-contain"
                                />
                              ) : (
                                <div className="text-center">
                                  <Camera className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    Click to upload
                                  </p>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleLogoUpload(e, "logo")}
                                className="absolute inset-0 cursor-pointer opacity-0"
                              />
                            </div>
                            {brandSettings.logo && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setBrandSettings((prev) => ({ ...prev, logo: "" }))
                                }
                              >
                                <Trash2 className="mr-2 h-3 w-3" />
                                Remove
                              </Button>
                            )}
                          </div>
                        </motion.div>

                        {/* Dark Logo */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-3"
                        >
                          <Label>Logo (Dark Mode)</Label>
                          <div className="flex flex-col items-center gap-3">
                            <div className="relative flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-gray-900 transition-colors hover:border-primary/50">
                              {brandSettings.logoDark ? (
                                <img
                                  src={brandSettings.logoDark}
                                  alt="Dark Logo"
                                  className="max-h-24 max-w-full object-contain"
                                />
                              ) : (
                                <div className="text-center">
                                  <Camera className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    Dark mode logo
                                  </p>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleLogoUpload(e, "logoDark")}
                                className="absolute inset-0 cursor-pointer opacity-0"
                              />
                            </div>
                            {brandSettings.logoDark && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setBrandSettings((prev) => ({ ...prev, logoDark: "" }))
                                }
                              >
                                <Trash2 className="mr-2 h-3 w-3" />
                                Remove
                              </Button>
                            )}
                          </div>
                        </motion.div>

                        {/* Favicon */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="space-y-3"
                        >
                          <Label>Favicon</Label>
                          <div className="flex flex-col items-center gap-3">
                            <div className="relative flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50">
                              {brandSettings.favicon ? (
                                <img
                                  src={brandSettings.favicon}
                                  alt="Favicon"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                <div className="text-center">
                                  <Star className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    32x32 or 16x16
                                  </p>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleLogoUpload(e, "favicon")}
                                className="absolute inset-0 cursor-pointer opacity-0"
                              />
                            </div>
                            {brandSettings.favicon && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setBrandSettings((prev) => ({ ...prev, favicon: "" }))
                                }
                              >
                                <Trash2 className="mr-2 h-3 w-3" />
                                Remove
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BRAND IDENTITY */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Type className="h-5 w-5" />
                        Brand Identity
                      </CardTitle>
                      <CardDescription>
                        Define your application's name and description
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="appName">Application Name</Label>
                        <Input
                          id="appName"
                          value={brandSettings.appName}
                          onChange={(e) =>
                            setBrandSettings((prev) => ({
                              ...prev,
                              appName: e.target.value,
                            }))
                          }
                          placeholder="My Application"
                          className="max-w-md"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input
                          id="tagline"
                          value={brandSettings.tagline}
                          onChange={(e) =>
                            setBrandSettings((prev) => ({
                              ...prev,
                              tagline: e.target.value,
                            }))
                          }
                          placeholder="Built with modern technology"
                          className="max-w-md"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="appDescription">Description</Label>
                        <Textarea
                          id="appDescription"
                          value={brandSettings.appDescription}
                          onChange={(e) =>
                            setBrandSettings((prev) => ({
                              ...prev,
                              appDescription: e.target.value,
                            }))
                          }
                          placeholder="Describe your application..."
                          rows={3}
                          className="max-w-2xl"
                        />
                      </motion.div>
                    </CardContent>
                  </Card>

                  {/* COLOR SCHEME */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Color Scheme
                      </CardTitle>
                      <CardDescription>
                        Customize your brand colors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Color Presets */}
                      <motion.div variants={itemVariants} className="space-y-3">
                        <Label>Quick Presets</Label>
                        <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-12">
                          {colorPresets.map((preset) => (
                            <motion.button
                              key={preset.name}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => applyColorPreset(preset)}
                              className="group relative h-10 w-full rounded-lg shadow-sm transition-shadow hover:shadow-md"
                              style={{ backgroundColor: preset.primary }}
                              title={preset.name}
                            >
                              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                {preset.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      <Separator />

                      {/* Custom Colors */}
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {renderColorPicker(
                          "Primary Color",
                          brandSettings.primaryColor,
                          (color) =>
                            setBrandSettings((prev) => ({ ...prev, primaryColor: color })),
                          "Main brand color used for buttons and links"
                        )}
                        {renderColorPicker(
                          "Secondary Color",
                          brandSettings.secondaryColor,
                          (color) =>
                            setBrandSettings((prev) => ({ ...prev, secondaryColor: color })),
                          "Used for hover states and accents"
                        )}
                        {renderColorPicker(
                          "Accent Color",
                          brandSettings.accentColor,
                          (color) =>
                            setBrandSettings((prev) => ({ ...prev, accentColor: color })),
                          "For highlights and special elements"
                        )}
                        {renderColorPicker(
                          "Background Color",
                          brandSettings.backgroundColor,
                          (color) =>
                            setBrandSettings((prev) => ({ ...prev, backgroundColor: color })),
                          "Main background color"
                        )}
                        {renderColorPicker(
                          "Text Color",
                          brandSettings.textColor,
                          (color) =>
                            setBrandSettings((prev) => ({ ...prev, textColor: color })),
                          "Primary text color"
                        )}
                      </div>

                      <Separator />

                      {/* Border Radius */}
                      {renderSlider(
                        "Border Radius",
                        "Roundness of corners across the UI",
                        brandSettings.borderRadius,
                        (v) => setBrandSettings((prev) => ({ ...prev, borderRadius: v })),
                        0,
                        24,
                        1,
                        "px"
                      )}

                      {/* Font Family */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label>Font Family</Label>
                        <Select
                          value={brandSettings.fontFamily}
                          onValueChange={(value) =>
                            setBrandSettings((prev) => ({ ...prev, fontFamily: value }))
                          }
                        >
                          <SelectTrigger className="max-w-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map((font) => (
                              <SelectItem key={font.value} value={font.value}>
                                <span style={{ fontFamily: font.value }}>{font.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Font Size */}
                      <motion.div variants={itemVariants} className="space-y-3">
                        <Label>Base Font Size</Label>
                        <RadioGroup
                          value={brandSettings.fontSize}
                          onValueChange={(value: "small" | "medium" | "large") =>
                            setBrandSettings((prev) => ({ ...prev, fontSize: value }))
                          }
                          className="flex gap-4"
                        >
                          {(["small", "medium", "large"] as const).map((size) => (
                            <div key={size} className="flex items-center space-x-2">
                              <RadioGroupItem value={size} id={`size-${size}`} />
                              <Label
                                htmlFor={`size-${size}`}
                                className="cursor-pointer capitalize"
                              >
                                {size}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </motion.div>

                      {/* Theme */}
                      <motion.div variants={itemVariants} className="space-y-3">
                        <Label>Default Theme</Label>
                        <div className="flex gap-3">
                          {[
                            { value: "light", icon: Sun, label: "Light" },
                            { value: "dark", icon: Moon, label: "Dark" },
                            { value: "system", icon: Laptop, label: "System" },
                          ].map((theme) => (
                            <motion.button
                              key={theme.value}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setBrandSettings((prev) => ({
                                  ...prev,
                                  theme: theme.value as "light" | "dark" | "system",
                                }))
                              }
                              className={`flex flex-1 flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                                brandSettings.theme === theme.value
                                  ? "border-primary bg-primary/5"
                                  : "border-muted hover:border-muted-foreground/50"
                              }`}
                            >
                              <theme.icon
                                className={`h-6 w-6 ${
                                  brandSettings.theme === theme.value
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                              <span
                                className={`text-sm font-medium ${
                                  brandSettings.theme === theme.value
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {theme.label}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Custom CSS */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="customCSS">Custom CSS</Label>
                        <p className="text-xs text-muted-foreground">
                          Add custom CSS to further customize the appearance
                        </p>
                        <Textarea
                          id="customCSS"
                          value={brandSettings.customCSS}
                          onChange={(e) =>
                            setBrandSettings((prev) => ({
                              ...prev,
                              customCSS: e.target.value,
                            }))
                          }
                          placeholder="/* Add your custom CSS here */"
                          rows={6}
                          className="font-mono text-sm"
                        />
                      </motion.div>
                    </CardContent>
                  </Card>

                  {/* LIVE PREVIEW */}
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Live Preview
                      </CardTitle>
                      <CardDescription>
                        See how your brand settings look
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        animate={{
                          backgroundColor: brandSettings.backgroundColor,
                        }}
                        className="rounded-xl border p-6 shadow-inner"
                        style={{ borderRadius: `${brandSettings.borderRadius}px` }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            {brandSettings.logo && (
                              <img
                                src={brandSettings.logo}
                                alt="Logo"
                                className="h-10 w-10 object-contain"
                              />
                            )}
                            <div>
                              <h3
                                className="text-xl font-bold"
                                style={{
                                  color: brandSettings.textColor,
                                  fontFamily: brandSettings.fontFamily,
                                }}
                              >
                                {brandSettings.appName}
                              </h3>
                              <p
                                className="text-sm"
                                style={{ color: brandSettings.textColor, opacity: 0.7 }}
                              >
                                {brandSettings.tagline}
                              </p>
                            </div>
                          </div>
                          <p
                            className="text-sm"
                            style={{ color: brandSettings.textColor, opacity: 0.8 }}
                          >
                            {brandSettings.appDescription}
                          </p>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md"
                              style={{
                                backgroundColor: brandSettings.primaryColor,
                                borderRadius: `${brandSettings.borderRadius}px`,
                              }}
                            >
                              Primary Button
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md"
                              style={{
                                backgroundColor: brandSettings.secondaryColor,
                                borderRadius: `${brandSettings.borderRadius}px`,
                              }}
                            >
                              Secondary
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-lg border-2 px-4 py-2 text-sm font-medium shadow-sm"
                              style={{
                                borderColor: brandSettings.accentColor,
                                color: brandSettings.accentColor,
                                borderRadius: `${brandSettings.borderRadius}px`,
                              }}
                            >
                              Accent
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* GENERAL SETTINGS TAB */}
              {activeTab === "general" && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Site Information
                      </CardTitle>
                      <CardDescription>
                        Basic information about your application
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="siteTitle">Site Title</Label>
                          <Input
                            id="siteTitle"
                            value={generalSettings.siteTitle}
                            onChange={(e) =>
                              setGeneralSettings((prev) => ({
                                ...prev,
                                siteTitle: e.target.value,
                              }))
                            }
                          />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="siteUrl">Site URL</Label>
                          <Input
                            id="siteUrl"
                            value={generalSettings.siteUrl}
                            onChange={(e) =>
                              setGeneralSettings((prev) => ({
                                ...prev,
                                siteUrl: e.target.value,
                              }))
                            }
                          />
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="siteDescription">Site Description</Label>
                        <Textarea
                          id="siteDescription"
                          value={generalSettings.siteDescription}
                          onChange={(e) =>
                            setGeneralSettings((prev) => ({
                              ...prev,
                              siteDescription: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="siteKeywords">Keywords</Label>
                        <Input
                          id="siteKeywords"
                          value={generalSettings.siteKeywords}
                          onChange={(e) =>
                            setGeneralSettings((prev) => ({
                              ...prev,
                              siteKeywords: e.target.value,
                            }))
                          }
                          placeholder="comma, separated, keywords"
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate keywords with commas
                        </p>
                      </motion.div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="adminEmail">Admin Email</Label>
                          <Input
                            id="adminEmail"
                            type="email"
                            value={generalSettings.adminEmail}
                            onChange={(e) =>
                              setGeneralSettings((prev) => ({
                                ...prev,
                                adminEmail: e.target.value,
                              }))
                            }
                          />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="supportEmail">Support Email</Label>
                          <Input
                            id="supportEmail"
                            type="email"
                            value={generalSettings.supportEmail}
                            onChange={(e) =>
                              setGeneralSettings((prev) => ({
                                ...prev,
                                supportEmail: e.target.value,
                              }))
                            }
                          />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Localization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label>Timezone</Label>
                          <Select
                            value={generalSettings.timezone}
                            onValueChange={(value) =>
                              setGeneralSettings((prev) => ({ ...prev, timezone: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timezoneOptions.map((tz) => (
                                <SelectItem key={tz} value={tz}>
                                  {tz}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label>Date Format</Label>
                          <Select
                            value={generalSettings.dateFormat}
                            onValueChange={(value) =>
                              setGeneralSettings((prev) => ({ ...prev, dateFormat: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                              <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label>Time Format</Label>
                          <RadioGroup
                            value={generalSettings.timeFormat}
                            onValueChange={(value: "12h" | "24h") =>
                              setGeneralSettings((prev) => ({ ...prev, timeFormat: value }))
                            }
                            className="flex gap-4 pt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="12h" id="12h" />
                              <Label htmlFor="12h">12 Hour</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="24h" id="24h" />
                              <Label htmlFor="24h">24 Hour</Label>
                            </div>
                          </RadioGroup>
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label>Default Language</Label>
                        <Select
                          value={generalSettings.language}
                          onValueChange={(value) =>
                            setGeneralSettings((prev) => ({ ...prev, language: value }))
                          }
                        >
                          <SelectTrigger className="max-w-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sliders className="h-5 w-5" />
                        Site Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Maintenance Mode",
                        "Temporarily disable access to the application",
                        generalSettings.maintenanceMode,
                        (checked) =>
                          setGeneralSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                      )}
                      {renderSwitch(
                        "Enable Registration",
                        "Allow new users to register accounts",
                        generalSettings.registrationEnabled,
                        (checked) =>
                          setGeneralSettings((prev) => ({
                            ...prev,
                            registrationEnabled: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Email Verification",
                        "Require email verification for new accounts",
                        generalSettings.emailVerification,
                        (checked) =>
                          setGeneralSettings((prev) => ({
                            ...prev,
                            emailVerification: checked,
                          }))
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* APPEARANCE TAB */}
              {activeTab === "appearance" && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Layout Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {renderSwitch(
                        "Collapsed Sidebar",
                        "Start with the sidebar in collapsed state",
                        appearanceSettings.sidebarCollapsed,
                        (checked) =>
                          setAppearanceSettings((prev) => ({
                            ...prev,
                            sidebarCollapsed: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Show Breadcrumbs",
                        "Display navigation breadcrumbs at the top",
                        appearanceSettings.showBreadcrumbs,
                        (checked) =>
                          setAppearanceSettings((prev) => ({
                            ...prev,
                            showBreadcrumbs: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Show Footer",
                        "Display the footer section",
                        appearanceSettings.showFooter,
                        (checked) =>
                          setAppearanceSettings((prev) => ({
                            ...prev,
                            showFooter: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Compact Mode",
                        "Reduce spacing for a denser layout",
                        appearanceSettings.compactMode,
                        (checked) =>
                          setAppearanceSettings((prev) => ({
                            ...prev,
                            compactMode: checked,
                          }))
                      )}

                      {appearanceSettings.showFooter && (
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="footerText">Footer Text</Label>
                          <Input
                            id="footerText"
                            value={appearanceSettings.footerText}
                            onChange={(e) =>
                              setAppearanceSettings((prev) => ({
                                ...prev,
                                footerText: e.target.value,
                              }))
                            }
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Visual Effects
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {renderSwitch(
                        "Enable Animations",
                        "Allow animated transitions throughout the UI",
                        appearanceSettings.enableAnimations,
                        (checked) =>
                          setAppearanceSettings((prev) => ({
                            ...prev,
                            enableAnimations: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Reduce Motion",
                        "Minimize animations for accessibility",
                        appearanceSettings.reduceMotion,
                        (checked) =>
                          setAppearanceSettings((prev) => ({
                            ...prev,
                            reduceMotion: checked,
                          }))
                      )}

                      {renderSlider(
                        "Animation Speed",
                        "Speed of UI animations",
                        appearanceSettings.animationSpeed,
                        (v) =>
                          setAppearanceSettings((prev) => ({ ...prev, animationSpeed: v })),
                        0.5,
                        2,
                        0.1,
                        "x"
                      )}

                      <motion.div variants={itemVariants} className="space-y-3">
                        <Label>Card Shadow</Label>
                        <div className="flex gap-2">
                          {(["none", "sm", "md", "lg", "xl"] as const).map((shadow) => (
                            <motion.button
                              key={shadow}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setAppearanceSettings((prev) => ({
                                  ...prev,
                                  cardShadow: shadow,
                                }))
                              }
                              className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition-all ${
                                appearanceSettings.cardShadow === shadow
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-muted hover:border-muted-foreground/50"
                              }`}
                            >
                              {shadow}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {renderSwitch(
                        "Card Borders",
                        "Show borders around card components",
                        appearanceSettings.cardBorder,
                        (checked) =>
                          setAppearanceSettings((prev) => ({ ...prev, cardBorder: checked }))
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Watermark
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Enable Watermark",
                        "Add a watermark overlay to the application",
                        appearanceSettings.watermarkEnabled,
                        (checked) =>
                          setAppearanceSettings((prev) => ({
                            ...prev,
                            watermarkEnabled: checked,
                          }))
                      )}

                      {appearanceSettings.watermarkEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <Label htmlFor="watermarkText">Watermark Text</Label>
                          <Input
                            id="watermarkText"
                            value={appearanceSettings.watermarkText}
                            onChange={(e) =>
                              setAppearanceSettings((prev) => ({
                                ...prev,
                                watermarkText: e.target.value,
                              }))
                            }
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Channels
                      </CardTitle>
                      <CardDescription>
                        Choose how you want to receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Email Notifications",
                        "Receive notifications via email",
                        notificationSettings.emailNotifications,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            emailNotifications: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Push Notifications",
                        "Receive browser push notifications",
                        notificationSettings.pushNotifications,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            pushNotifications: checked,
                          }))
                      )}
                      {renderSwitch(
                        "SMS Notifications",
                        "Receive notifications via SMS",
                        notificationSettings.smsNotifications,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            smsNotifications: checked,
                          }))
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Notification Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Security Alerts",
                        "Important security notifications",
                        notificationSettings.securityAlerts,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            securityAlerts: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Marketing Emails",
                        "Product updates and promotional content",
                        notificationSettings.marketingEmails,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            marketingEmails: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Weekly Reports",
                        "Summary of your activity each week",
                        notificationSettings.weeklyReports,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            weeklyReports: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Mention Notifications",
                        "When someone mentions you",
                        notificationSettings.mentionNotifications,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            mentionNotifications: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Task Assignments",
                        "When tasks are assigned to you",
                        notificationSettings.taskAssignments,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            taskAssignments: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Deadline Reminders",
                        "Reminders before task deadlines",
                        notificationSettings.deadlineReminders,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            deadlineReminders: checked,
                          }))
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        Sound & Volume
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {renderSwitch(
                        "Notification Sounds",
                        "Play sounds for notifications",
                        notificationSettings.soundEnabled,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            soundEnabled: checked,
                          }))
                      )}

                      {notificationSettings.soundEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          {renderSlider(
                            "Sound Volume",
                            "Volume of notification sounds",
                            notificationSettings.soundVolume,
                            (v) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                soundVolume: v,
                              })),
                            0,
                            100,
                            1,
                            "%"
                          )}
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Quiet Hours
                      </CardTitle>
                      <CardDescription>
                        Pause notifications during specific hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Enable Quiet Hours",
                        "Silence notifications during set hours",
                        notificationSettings.quietHours,
                        (checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            quietHours: checked,
                          }))
                      )}

                      {notificationSettings.quietHours && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="space-y-2">
                            <Label>Start Time</Label>
                            <Input
                              type="time"
                              value={notificationSettings.quietHoursStart}
                              onChange={(e) =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  quietHoursStart: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Time</Label>
                            <Input
                              type="time"
                              value={notificationSettings.quietHoursEnd}
                              onChange={(e) =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  quietHoursEnd: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Authentication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Two-Factor Authentication",
                        "Require 2FA for all user accounts",
                        securitySettings.twoFactorAuth,
                        (checked) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            twoFactorAuth: checked,
                          }))
                      )}

                      {securitySettings.twoFactorAuth && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="ml-4 space-y-4 border-l-2 pl-4"
                        >
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Two-Factor Authentication Enabled</AlertTitle>
                            <AlertDescription>
                              Users will be required to set up 2FA on their next login.
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}

                      {renderSwitch(
                        "Single Sign-On (SSO)",
                        "Enable SSO authentication",
                        securitySettings.ssoEnabled,
                        (checked) =>
                          setSecuritySettings((prev) => ({ ...prev, ssoEnabled: checked }))
                      )}

                      {securitySettings.ssoEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="ml-4 space-y-4 border-l-2 pl-4"
                        >
                          <div className="space-y-2">
                            <Label>SSO Provider</Label>
                            <Select
                              value={securitySettings.ssoProvider}
                              onValueChange={(value) =>
                                setSecuritySettings((prev) => ({
                                  ...prev,
                                  ssoProvider: value,
                                }))
                              }
                            >
                              <SelectTrigger className="max-w-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="microsoft">Microsoft</SelectItem>
                                <SelectItem value="okta">Okta</SelectItem>
                                <SelectItem value="auth0">Auth0</SelectItem>
                                <SelectItem value="azure">Azure AD</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Password Policy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {renderSlider(
                        "Minimum Password Length",
                        "Minimum characters required",
                        securitySettings.minPasswordLength,
                        (v) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            minPasswordLength: v,
                          })),
                        6,
                        32,
                        1,
                        " chars"
                      )}

                      {renderSlider(
                        "Password Expiry",
                        "Days before password must be changed",
                        securitySettings.passwordExpiry,
                        (v) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            passwordExpiry: v,
                          })),
                        30,
                        365,
                        1,
                        " days"
                      )}

                      <div className="space-y-3">
                        <Label>Password Requirements</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            {
                              label: "Uppercase Letters",
                              value: securitySettings.requireUppercase,
                              key: "requireUppercase",
                            },
                            {
                              label: "Lowercase Letters",
                              value: securitySettings.requireLowercase,
                              key: "requireLowercase",
                            },
                            {
                              label: "Numbers",
                              value: securitySettings.requireNumbers,
                              key: "requireNumbers",
                            },
                            {
                              label: "Special Symbols",
                              value: securitySettings.requireSymbols,
                              key: "requireSymbols",
                            },
                          ].map((req) => (
                            <motion.div
                              key={req.key}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center space-x-2 rounded-lg border p-3"
                            >
                              <Checkbox
                                id={req.key}
                                checked={req.value}
                                onCheckedChange={(checked) =>
                                  setSecuritySettings((prev) => ({
                                    ...prev,
                                    [req.key]: checked,
                                  }))
                                }
                              />
                              <Label htmlFor={req.key} className="cursor-pointer text-sm">
                                {req.label}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Session & Login
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {renderSlider(
                        "Session Timeout",
                        "Minutes of inactivity before logout",
                        securitySettings.sessionTimeout,
                        (v) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            sessionTimeout: v,
                          })),
                        5,
                        480,
                        5,
                        " min"
                      )}

                      {renderSlider(
                        "Max Login Attempts",
                        "Attempts before account lockout",
                        securitySettings.loginAttempts,
                        (v) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            loginAttempts: v,
                          })),
                        3,
                        10,
                        1,
                        " attempts"
                      )}

                      {renderSlider(
                        "Lockout Duration",
                        "Minutes to lock account after failed attempts",
                        securitySettings.lockoutDuration,
                        (v) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            lockoutDuration: v,
                          })),
                        5,
                        60,
                        5,
                        " min"
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Data Protection
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Audit Logging",
                        "Log all user actions for security review",
                        securitySettings.auditLog,
                        (checked) =>
                          setSecuritySettings((prev) => ({ ...prev, auditLog: checked }))
                      )}
                      {renderSwitch(
                        "Data Encryption",
                        "Encrypt sensitive data at rest",
                        securitySettings.dataEncryption,
                        (checked) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            dataEncryption: checked,
                          }))
                      )}
                      {renderSwitch(
                        "Automatic Backups",
                        "Regularly backup application data",
                        securitySettings.autoBackup,
                        (checked) =>
                          setSecuritySettings((prev) => ({ ...prev, autoBackup: checked }))
                      )}

                      {securitySettings.autoBackup && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <Label>Backup Frequency</Label>
                          <Select
                            value={securitySettings.backupFrequency}
                            onValueChange={(value) =>
                              setSecuritySettings((prev) => ({
                                ...prev,
                                backupFrequency: value,
                              }))
                            }
                          >
                            <SelectTrigger className="max-w-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* INTEGRATIONS TAB */}
              {activeTab === "integrations" && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Analytics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Google Analytics",
                        "Track user behavior and traffic",
                        integrationSettings.googleAnalytics,
                        (checked) =>
                          setIntegrationSettings((prev) => ({
                            ...prev,
                            googleAnalytics: checked,
                          }))
                      )}

                      {integrationSettings.googleAnalytics && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <Label htmlFor="gaId">Measurement ID</Label>
                          <Input
                            id="gaId"
                            value={integrationSettings.googleAnalyticsId}
                            onChange={(e) =>
                              setIntegrationSettings((prev) => ({
                                ...prev,
                                googleAnalyticsId: e.target.value,
                              }))
                            }
                            placeholder="G-XXXXXXXXXX"
                            className="max-w-md font-mono"
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Payment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Payment Processing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Stripe",
                        "Accept payments via Stripe",
                        integrationSettings.stripeEnabled,
                        (checked) =>
                          setIntegrationSettings((prev) => ({
                            ...prev,
                            stripeEnabled: checked,
                          }))
                      )}

                      {integrationSettings.stripeEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="ml-4 space-y-4 border-l-2 pl-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="stripeKey">Publishable Key</Label>
                            <Input
                              id="stripeKey"
                              value={integrationSettings.stripeKey}
                              onChange={(e) =>
                                setIntegrationSettings((prev) => ({
                                  ...prev,
                                  stripeKey: e.target.value,
                                }))
                              }
                              placeholder="pk_test_..."
                              className="font-mono"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="stripeSecret">Secret Key</Label>
                            <Input
                              id="stripeSecret"
                              type="password"
                              value={integrationSettings.stripeSecret}
                              onChange={(e) =>
                                setIntegrationSettings((prev) => ({
                                  ...prev,
                                  stripeSecret: e.target.value,
                                }))
                              }
                              placeholder="sk_test_..."
                              className="font-mono"
                            />
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Communication */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Communication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        {renderSwitch(
                          "Slack",
                          "Send notifications to Slack",
                          integrationSettings.slackEnabled,
                          (checked) =>
                            setIntegrationSettings((prev) => ({
                              ...prev,
                              slackEnabled: checked,
                            }))
                        )}
                        {integrationSettings.slackEnabled && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="ml-4 space-y-2 border-l-2 pl-4"
                          >
                            <Label htmlFor="slackWebhook">Webhook URL</Label>
                            <Input
                              id="slackWebhook"
                              value={integrationSettings.slackWebhook}
                              onChange={(e) =>
                                setIntegrationSettings((prev) => ({
                                  ...prev,
                                  slackWebhook: e.target.value,
                                }))
                              }
                              placeholder="https://hooks.slack.com/..."
                              className="font-mono"
                            />
                          </motion.div>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        {renderSwitch(
                          "Discord",
                          "Send notifications to Discord",
                          integrationSettings.discordEnabled,
                          (checked) =>
                            setIntegrationSettings((prev) => ({
                              ...prev,
                              discordEnabled: checked,
                            }))
                        )}
                        {integrationSettings.discordEnabled && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="ml-4 space-y-2 border-l-2 pl-4"
                          >
                            <Label htmlFor="discordWebhook">Webhook URL</Label>
                            <Input
                              id="discordWebhook"
                              value={integrationSettings.discordWebhook}
                              onChange={(e) =>
                                setIntegrationSettings((prev) => ({
                                  ...prev,
                                  discordWebhook: e.target.value,
                                }))
                              }
                              placeholder="https://discord.com/api/webhooks/..."
                              className="font-mono"
                            />
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI & APIs */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        AI & APIs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "OpenAI",
                        "Enable AI features powered by OpenAI",
                        integrationSettings.openaiEnabled,
                        (checked) =>
                          setIntegrationSettings((prev) => ({
                            ...prev,
                            openaiEnabled: checked,
                          }))
                      )}

                      {integrationSettings.openaiEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="ml-4 space-y-2 border-l-2 pl-4"
                        >
                          <Label htmlFor="openaiKey">API Key</Label>
                          <Input
                            id="openaiKey"
                            type="password"
                            value={integrationSettings.openaiKey}
                            onChange={(e) =>
                              setIntegrationSettings((prev) => ({
                                ...prev,
                                openaiKey: e.target.value,
                              }))
                            }
                            placeholder="sk-..."
                            className="font-mono"
                          />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Cloud Storage */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Cloud Storage
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderSwitch(
                        "Amazon S3",
                        "Store files in AWS S3",
                        integrationSettings.awsEnabled,
                        (checked) =>
                          setIntegrationSettings((prev) => ({
                            ...prev,
                            awsEnabled: checked,
                          }))
                      )}

                      {integrationSettings.awsEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="ml-4 grid grid-cols-1 gap-4 border-l-2 pl-4 md:grid-cols-2"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="awsKey">Access Key ID</Label>
                            <Input
                              id="awsKey"
                              value={integrationSettings.awsAccessKey}
                              onChange={(e) =>
                                setIntegrationSettings((prev) => ({
                                  ...prev,
                                  awsAccessKey: e.target.value,
                                }))
                              }
                              className="font-mono"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="awsSecret">Secret Access Key</Label>
                            <Input
                              id="awsSecret"
                              type="password"
                              value={integrationSettings.awsSecretKey}
                              onChange={(e) =>
                                setIntegrationSettings((prev) => ({
                                  ...prev,
                                  awsSecretKey: e.target.value,
                                }))
                              }
                              className="font-mono"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Region</Label>
                            <Select
                              value={integrationSettings.awsRegion}
                              onValueChange={(value) =>
                                setIntegrationSettings((prev) => ({
                                  ...prev,
                                  awsRegion: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                                <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                                <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                                <SelectItem value="eu-central-1">Europe (Frankfurt)</SelectItem>
                                <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                                <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* FOOTER ACTIONS */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            Changes are applied immediately after saving
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset All
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Changes
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
}