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

const title =
  "Portfolio Minute – Craft Your Stunning Portfolio in Just One Minute!";
const description =
  "Portfolio Minute is your ultimate tool for unleashing creativity and efficiency, enabling you to effortlessly construct a visually striking portfolio in just 60 seconds. Say goodbye to hours of tedious work and hello to a showcase that dazzles and impresses with ease.";
const image = "https://portfoliominute.in/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [image],
  },
  metadataBase: new URL("https://portfoliominute.in"),
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
