import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

export interface SparkSettings {
  logoUrl: string | null;
  applicationName: string;
  tagline: string;
  description: string;
}

interface SparkSettingsResponse {
  success: boolean;
  data: SparkSettings;
  message?: string;
}

const readSettingsResponse = (response: SparkSettingsResponse): SparkSettings => {
  const data = response.data;
  if (
    !response.success ||
    !data ||
    (data.logoUrl !== null && typeof data.logoUrl !== "string") ||
    typeof data.applicationName !== "string" ||
    typeof data.tagline !== "string" ||
    typeof data.description !== "string"
  ) {
    throw new Error(response.message || "Unable to process spark settings.");
  }

  return data;
};

export const getSparkSettings = async (): Promise<SparkSettings> => {
  const response = await api.get<SparkSettingsResponse>(ENDPOINTS.SPARK_SETTINGS);
  return readSettingsResponse(response.data);
};

export const updateSparkSettings = async (
  settings: SparkSettings,
  logoFile?: File | null
): Promise<SparkSettings> => {
  if (logoFile) {
    const formData = new FormData();
    formData.append("logo", logoFile);
    formData.append("applicationName", settings.applicationName);
    formData.append("tagline", settings.tagline);
    formData.append("description", settings.description);

    const response = await api.patch<SparkSettingsResponse>(
      ENDPOINTS.SPARK_SETTINGS,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return readSettingsResponse(response.data);
  }

  const response = await api.patch<SparkSettingsResponse>(
    ENDPOINTS.SPARK_SETTINGS,
    settings
  );
  return readSettingsResponse(response.data);
};
