import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "../edgedb-client";
import "./globals.css";
import { CSPostHogProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clone Radar",
  description: "You are unique in a lot of ways.",
  metadataBase: new URL("https://cloneradar.com"),
  openGraph: {
    type: "website",
    title: "Clone Radar",
    description: "You are unique in a lot of ways.",
    url: "https://cloneradar.com",
    siteName: "Clone Radar",
    images: [
      {
        url: "/logo.png",
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
  const session = auth.getSession();
  const [user] = await session.client.query(
    `SELECT User {*} FILTER .email = global current_user.email`
  );

  return (
    <html lang="en">
      <CSPostHogProvider user={user}>
        <body className={inter.className}>
          {children}
          <footer className="absolute inset-x-0 bottom-0 z-50 flex flex-row justify-center">
            <div className="p-4">
              Made with <a href="https://www.edgedb.com/">EdgeDB</a> and{" "}
              <a href="https://nextjs.org/">Next.js</a>, hosted on{" "}
              <a href="https://vercel.com/">Vercel</a>. Clone Radar is open
              source on{" "}
              <a href="https://github.com/monsieurpigeon/clone-radar">GitHub</a>
              .
            </div>
          </footer>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
