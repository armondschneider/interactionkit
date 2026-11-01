import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? "https://interactionkit.org";
const title = "InteractionKit — React components that feel native";
const description = "Fluid, accessible React components for web apps that feel native. Thoughtful motion, keyboard support, and customizable styles.";
const imageAlt = "InteractionKit preview in a minimal white browser window";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "InteractionKit",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title,
    description,
    siteName: "InteractionKit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/opengraph-image.jpg", alt: imageAlt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-0 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
