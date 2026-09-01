import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Building2, Globe, User, Lock, Mail, Phone, MapPin, Upload } from "lucide-react";

const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),
  domain: z
    .string()
    .min(3, "Domain is required")
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/, "Invalid domain format")
    .transform((val) => val.toLowerCase()),
  adminUsername: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  adminEmail: z
    .string()
    .email("Please enter a valid email address"),
  adminPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  contactPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  address: z
    .string()
    .min(5, "Address is too short")
    .max(200, "Address is too long"),
  logoUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
    selectedModules: z
  .array(z.string())
  .min(1, "Please select at least one module"),
});

type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyOnboardingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CompanyFormData) => void;
  isLoading?: boolean;
}

export const CompanyOnboardingModal = ({
  open,
  onClose,
  onSave,
  isLoading = false,
}: CompanyOnboardingModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      domain: "",
      adminUsername: "",
      adminEmail: "",
      adminPassword: "",
      contactPhone: "",
      address: "",
      logoUrl: "",
      selectedModules: [],
    },
  });

  const selectedModules = watch("selectedModules") || [];

  useEffect(() => {
    if (open) {
      reset({
        companyName: "",
        domain: "",
        adminUsername: "",
        adminEmail: "",
        adminPassword: "",
        contactPhone: "",
        address: "",
        logoUrl: "",
        selectedModules: [],
      });
    }
  }, [open, reset]);

  const toggleModule = (moduleValue: string, checked: boolean) => {
    const next = checked
      ? [...selectedModules, moduleValue]
      : selectedModules.filter((item) => item !== moduleValue);

    setValue("selectedModules", next, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = (data: CompanyFormData) => {
    onSave({
      ...data,
      companyName: data.companyName.trim(),
      domain: data.domain.trim(),
      adminUsername: data.adminUsername.trim(),
      adminEmail: data.adminEmail.trim().toLowerCase(),
      address: data.address.trim(),
    });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] rounded-3xl border-0 shadow-2xl p-0 overflow-hidden glass-card">
        {/* ── Header ── */}
        <div className="modal-header-glow px-6 py-6 ">
          {/* Floating orbs */}
          <div className="modal-orb modal-orb--3" aria-hidden="true" />
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">
                Onboard New Company
              </DialogTitle>
            </div>
            <DialogDescription className="text-indigo-100 text-sm">
              Register a new tenant. This will create their admin account and provision their workspace.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-130px)]">

          {/* Company Details Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              Company Details
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/20 dark:text-gray-300">
                Company Name
              </label>
              <Input
                {...register("companyName")}
                placeholder="e.g. Acme Corporation"
                className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base"
              />
              {errors.companyName && (
                <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/20 dark:text-gray-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  Subdomain
                </label>
                <div className="relative">
                  <Input
                    {...register("domain")}
                    placeholder="acme"
                    className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base pr-20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    .spark.app
                  </span>
                </div>
                {errors.domain && (
                  <p className="text-xs text-red-500 mt-1">{errors.domain.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/20 dark:text-gray-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  Contact Phone
                </label>
                <Input
                  {...register("contactPhone")}
                  placeholder="+1 234 567 890"
                  className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base"
                />
                {errors.contactPhone && (
                  <p className="text-xs text-red-500 mt-1">{errors.contactPhone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/20 dark:text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Office Address
              </label>
              <Input
                {...register("address")}
                placeholder="123 Business Ave, Suite 100, New York, NY 10001"
                className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base"
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/20 dark:text-gray-300 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-gray-400" />
                Company Logo URL
              </label>
              <Input
                {...register("logoUrl")}
                placeholder="https://cdn.example.com/logo.png"
                className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base"
              />
              {errors.logoUrl && (
                <p className="text-xs text-red-500 mt-1">{errors.logoUrl.message}</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-800" />



          {/* ── Select Module Section ── */}
<div className="space-y-4">
  <div>
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
      <Building2 className="w-3.5 h-3.5" />
      Select Modules
    </h3>

    <p className="text-xs text-gray-400 mt-1">
      Choose the modules this company will have access to.
    </p>
  </div>

  <div className="grid grid-cols-2 gap-3">
    {[
      {
        label: "Dashboard",
        value: "dashboard",
        description: "Overview & analytics",
      },
      {
        label: "Permission",
        value: "permission",
        description: "Manage permissions",
      },
      {
        label: "Leaderboard",
        value: "leaderboard",
        description: "View rankings",
      },
      {
        label: "Rewards",
        value: "rewards",
        description: "Manage rewards",
      },
      {
        label: "Post",
        value: "post",
        description: "Manage posts",
      },
      {
        label: "Users",
        value: "users",
        description: "Manage users",
      },
      {
        label: "Category",
        value: "category",
        description: "Manage categories",
      },
      {
        label: "Settings",
        value: "settings",
        description: "System settings",
      },
    ].map((module) => {
      const checked = selectedModules.includes(module.value);

      return (
        <label
          key={module.value}
          className="group flex items-start gap-3 p-3 rounded-xl border border-primary dark:border-primary/20 cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/50 dark:hover:bg-primary/20"
        >
          <Checkbox
            checked={checked}
            onCheckedChange={(value) =>
              toggleModule(module.value, Boolean(value))
            }
            className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:text-white border-primary dark:border-primary/20"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary/20 dark:text-primary">
              {module.label}
            </p>

            <p className="text-xs text-gray-400 mt-0.5">
              {module.description}
            </p>
          </div>
        </label>
      );
    })}
  </div>

  {errors.selectedModules && (
    <p className="text-xs text-red-500">
      {errors.selectedModules.message}
    </p>
  )}
</div>

{/* Divider */}

<div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Admin Account Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Admin Account
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/20 dark:text-gray-300">
                  Username
                </label>
                <Input
                  {...register("adminUsername")}
                  placeholder="admin_user"
                  className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base"
                />
                {errors.adminUsername && (
                  <p className="text-xs text-red-500 mt-1">{errors.adminUsername.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/20 dark:text-gray-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  Email
                </label>
                <Input
                  {...register("adminEmail")}
                  type="email"
                  placeholder="admin@company.com"
                  className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base"
                />
                {errors.adminEmail && (
                  <p className="text-xs text-red-500 mt-1">{errors.adminEmail.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/20 dark:text-gray-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                Password
              </label>
              <Input
                {...register("adminPassword")}
                type="password"
                placeholder="Create a strong password"
                className="h-11 rounded-xl border-primary dark:border-primary/20 focus-visible:ring-2 focus-visible:ring-indigo-500 text-base"
              />
              {errors.adminPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.adminPassword.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="h-11 px-6 rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 px-6 rounded-xl bg-primary text-white transition-all duration-200 shadow-lg shadow-primary/20 dark:shadow-none"
            >
              {isLoading ? "Provisioning..." : "Create Tenant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
