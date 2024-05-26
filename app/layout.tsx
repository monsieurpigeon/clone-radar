import "@/app/globals.css";
import { CSPostHogProvider } from "@/app/providers";
import { auth } from "@/edgedb-client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clone Radar",
  description: "You are unique in many ways.",
  metadataBase: new URL("https://cloneradar.com"),
  openGraph: {
    type: "website",
    title: "Clone Radar",
    description: "You are unique in many ways.",
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
    `SELECT User {*} FILTER .id = global current_user.id`
  );

  return (
    <html lang="en">
      <CSPostHogProvider user={user}>
        <body className={inter.className}>
          <div className="flex flex-col h-full">
            <div className="grow">{children}</div>
            <footer className="z-50 flex flex-row justify-center">
              <div className="flex flex-col items-center gap-1 py-4 text-center">
                <div>
                  Made with{" "}
                  <Link
                    className="hover:underline"
                    href="https://www.edgedb.com/"
                  >
                    EdgeDB
                  </Link>{" "}
                  and{" "}
                  <Link className="hover:underline" href="https://nextjs.org/">
                    Next.js
                  </Link>
                  , hosted on{" "}
                  <Link className="hover:underline" href="https://vercel.com/">
                    Vercel
                  </Link>
                  . Clone Radar is open source on{" "}
                  <Link
                    className="hover:underline"
                    href="https://github.com/monsieurpigeon/clone-radar"
                  >
                    GitHub
                  </Link>
                  .
                </div>
              </div>
            </footer>
          </div>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
