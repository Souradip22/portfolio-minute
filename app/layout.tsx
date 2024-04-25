import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Minute",
  description: "Souradip",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // data-dark-mode={theme === "dark" ? "true" : "false"}
    >
      <body
        className={` relative h-screen overflow-hidden bg-light text-dark dark:bg-dark-2 dark:text-light ${
          process.env.NODE_ENV == "development" ? "debug-screens" : ""
        }`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
