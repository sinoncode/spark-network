import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import UIThemeProvider from "@/providers/ui-theme-provider"
import { router } from "@/routes"

import "@/index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UIThemeProvider>
          <RouterProvider router={router} />

          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "10px",
              },
            }}
          />
        </UIThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)