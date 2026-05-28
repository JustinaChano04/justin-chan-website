import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { absoluteUrl, siteOrigin } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: {
    default: "Justin Chan | AI Engineer Portfolio",
    template: "%s | Justin Chan",
  },
  description:
    "Portfolio of Justin Chan, an AI engineer building agentic AI, machine learning systems, and product-focused software.",
  applicationName: "Justin Chan Portfolio",
  keywords: [
    "Justin Chan",
    "AI engineer",
    "machine learning engineer",
    "agentic AI",
    "LLM systems",
    "portfolio",
    "product engineer",
  ],
  authors: [{ name: "Justin Chan", url: absoluteUrl("/") }],
  creator: "Justin Chan",
  publisher: "Justin Chan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "Justin Chan | AI Engineer Portfolio",
    description:
      "Portfolio of Justin Chan, an AI engineer building agentic AI, machine learning systems, and product-focused software.",
    siteName: "Justin Chan Portfolio",
    images: [
      {
        url: absoluteUrl("/headshot-casual.jpg"),
        width: 1200,
        height: 1500,
        alt: "Justin Chan outdoors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Chan | AI Engineer Portfolio",
    description:
      "Portfolio of Justin Chan, an AI engineer building agentic AI, machine learning systems, and product-focused software.",
    images: [absoluteUrl("/headshot-casual.jpg")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
