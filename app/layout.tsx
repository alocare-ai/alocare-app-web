import type { Metadata, Viewport } from "next";
import "@alocare/design-system/styles.css";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "Alocare — Health Portal",
    template: "%s | Alocare",
  },
  description:
    "Secure browser access for doctors, clinicians, hospitals, and patients.",
  icons: {
    icon: [{ url: "/logo-alocare.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo-alocare.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
