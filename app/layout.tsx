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

const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Interaction Kit",
  description: "Copy-and-paste components React components.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Interaction Kit",
    description: "Copy-and-paste components React components.",
    url: siteUrl,
    siteName: "Interaction Kit",
    images: [
      {
        url: `${siteUrl}/app/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Interaction Kit"
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interaction Kit',
    description: 'Copy-and-paste components React components.',
    images: [`${siteUrl}/app/og.jpg`]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
