import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TimeCounter } from "../components/TimeCounter";
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
          <div className="flex flex-col h-screen">
            <div className="flex-grow">{children}</div>
            <footer className="z-50 flex flex-row justify-center">
              <div className="flex flex-col items-center gap-1 pb-4 text-center">
                <div>
                  This is my entry for the{" "}
                  <a href="https://hackathon.edgedb.com/">
                    <span className="p-1 underline hover:bg-sky-100">
                      EdgeDB hackthon
                    </span>
                  </a>{" "}
                  and you still have <TimeCounter /> to build a better app and
                  win 5k$
                </div>
                <div>
                  Made with <a href="https://www.edgedb.com/">EdgeDB</a> and{" "}
                  <a href="https://nextjs.org/">Next.js</a>, hosted on{" "}
                  <a href="https://vercel.com/">Vercel</a>. Clone Radar is open
                  source on{" "}
                  <a href="https://github.com/monsieurpigeon/clone-radar">
                    GitHub
                  </a>
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
