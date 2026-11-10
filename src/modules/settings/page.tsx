import { useEffect, useState } from "react";
import { ImagePlus, Loader2, RefreshCw, Save, Settings, Trash2 } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";
import {
  getSparkSettings,
  SparkSettings,
  updateSparkSettings,
} from "@/api/services/sparkSettings.service";

const emptySettings: SparkSettings = {
  logoUrl: null,
  applicationName: "",
  tagline: "",
  description: "",
};

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string; error?: { message?: string } }>(error)) {
    return (
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      error.message
    );
  }

  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SparkSettings>(emptySettings);
  const [savedSettings, setSavedSettings] = useState<SparkSettings | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    if (!logoFile) {
      setLogoPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const data = await getSparkSettings();
        if (isMounted) {
          setSettings(data);
          setSavedSettings(data);
          setLogoFile(null);
          setLoadError("");
        }
      } catch (error) {
        if (isMounted) {
          const message = getErrorMessage(error);
          setLoadError(message);
          toast.error(`Unable to load settings: ${message}`);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadSettings();
    return () => {
      isMounted = false;
    };
  }, [loadAttempt]);

  const hasChanges =
    savedSettings !== null &&
    (logoFile !== null ||
      settings.logoUrl !== savedSettings.logoUrl ||
      settings.applicationName !== savedSettings.applicationName ||
      settings.tagline !== savedSettings.tagline ||
      settings.description !== savedSettings.description);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedSettings = await updateSparkSettings(
        {
          ...settings,
          logoUrl: settings.logoUrl?.trim() || null,
        },
        logoFile
      );
      setSettings(updatedSettings);
      setSavedSettings(updatedSettings);
      setLogoFile(null);
      toast.success("Settings saved successfully.");
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(`Unable to save settings: ${message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-16 flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Loading settings" />
      </div>
    );
  }

  return (
    <main className="mt-16 min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex items-center gap-4">
          <div className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-lg">
            <Settings className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Application Branding</h1>
            <p className="mt-1 text-muted-foreground">
              Update the logo, name, tagline, and description.
            </p>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Brand details</CardTitle>
            <CardDescription>
              Changes are loaded from and saved to the application settings API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Other settings controls are intentionally omitted; this API supports these four fields only. */}
            {loadError && (
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
              >
                <span>{loadError}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLoadError("");
                    setIsLoading(true);
                    setLoadAttempt((attempt) => attempt + 1);
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="logoFile">Application logo</Label>
                <Input
                  id="logoFile"
                  type="file"
                  accept="image/*"
                  disabled={Boolean(loadError) || isSaving}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (!file.type.startsWith("image/")) {
                      toast.error("Choose an image file for the logo.");
                      event.target.value = "";
                      return;
                    }
                    setLogoFile(file);
                    setSettings((current) => ({ ...current, logoUrl: null }));
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  Choose an image file, then save changes to upload it.
                </p>
                {(logoFile || settings.logoUrl) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={Boolean(loadError) || isSaving}
                    onClick={() => {
                      setLogoFile(null);
                      setSettings((current) => ({ ...current, logoUrl: null }));
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove logo
                  </Button>
                )}
              </div>
              <div className="flex h-28 w-44 items-center justify-center overflow-hidden rounded-md border bg-muted/30 p-3">
                {logoPreview || settings.logoUrl ? (
                  <img
                    src={logoPreview ?? settings.logoUrl ?? ""}
                    alt={`${settings.applicationName || "Application"} logo preview`}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <ImagePlus className="h-6 w-6" />
                    No logo selected
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationName">Application name</Label>
              <Input
                id="applicationName"
                value={settings.applicationName}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    applicationName: event.target.value,
                  }))
                }
                disabled={Boolean(loadError)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={settings.tagline}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    tagline: event.target.value,
                  }))
                }
                disabled={Boolean(loadError)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                rows={4}
                disabled={Boolean(loadError)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={Boolean(loadError) || !hasChanges || isSaving}
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
                    Save changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
