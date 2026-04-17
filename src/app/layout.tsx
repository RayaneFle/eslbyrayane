import type { Metadata } from "next";
import Providers from "@/components/Providers";
import PageLoader from "@/components/PageLoader";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESLbyRayane — Learn English the fun way",
  description: "Interactive ESL platform with courses, fun activities and progress tracking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <body className="min-h-screen bg-surface-50 antialiased">
        <Providers><Suspense fallback={null}><PageLoader /></Suspense>{children}</Providers>
      </body>
    </html>
  );
}
