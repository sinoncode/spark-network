import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const SettingsPage = lazy(() => import("./page"));

export const settingsRoutes: RouteObject[] = [
  {
    path: "settings",
    element: <SettingsPage />,
  }
];
