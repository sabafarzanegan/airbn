"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <Toaster />
      <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    </>
  );
}
