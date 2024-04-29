import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clone Radar",
  description: "You are unique in a lot of ways.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloneradar.com",
    siteName: "Clone Radar",
    images: [
      {
        url: "https://cloneradar.com/logoCR.jpg",
        width: 1200,
        height: 630,
        alt: "Clone Radar",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
