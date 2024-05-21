import {
  getPopularChannels,
  getRecentChannels,
  getRecentScans,
} from "@/app/actions";
import NextSteps from "@/components/NextSteps";
import { ThreeScene } from "@/components/ThreeScene";
import { Button } from "@/components/ui/button";
import { Channel, Clone } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import Link from "next/link";
import { ReactNode } from "react";

// const Dynamic3D = dynamic(() => import("../components/ThreeScene"), {
//   loading: () => <p>Loading...</p>,
// });

export default async function Home() {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();

  const popularChannels: Channel[] = (await getPopularChannels()) || [];
  const recentChannels: Channel[] = (await getRecentChannels()) || [];
  const recentScans: Clone[] = (await getRecentScans()) || [];

  return (
    <div>
      <header className="inset-x-0 top-0 sticky z-10">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end space-x-2">
            {!signedIn ? (
              <>
                <Link
                  href={auth.getBuiltinUIUrl()}
                  className="text-sm font-semibold leading-6 text-gray-800"
                >
                  <button className="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md">
                    Sign in
                  </button>
                </Link>
                <Link
                  href={auth.getBuiltinUISignUpUrl()}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  <button className="bg-primary px-4 py-2 rounded-md text-white">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <Link
                href="collection"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <Button>My Collection</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <div className="px-6 py-14 lg:px-8 z-0">
        <div className="mx-auto max-w-2xl pt-16 sm:pt-24 lg:pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Clone Radar
            </h1>
            <div className="mt-6 text-base leading-7 text-gray-600 flex flex-col items-center">
              <div>You are unique in a lot of ways.</div>
              <div>
                One of them is the perfect combination of the things you love
                now.
              </div>

              <div style={{ width: "800px", height: "800px" }}>
                <ThreeScene />
              </div>
              <NextSteps />
              <div className="grid grid-cols-2 gap-4">
                <StatBlock
                  title="Popular channels"
                  items={popularChannels?.map((channel) => (
                    <Link
                      key={channel.id}
                      href={`https://www.youtube.com/channel/${channel.youtubeId}`}
                    >
                      <div>{channel.name}</div>
                    </Link>
                  ))}
                />
                <StatBlock
                  title="Recent channels"
                  items={recentChannels.map((channel) => (
                    <Link
                      key={channel.id}
                      href={`https://www.youtube.com/channel/${channel.youtubeId}`}
                    >
                      <div>{channel.name}</div>
                    </Link>
                  ))}
                />
                <StatBlock
                  className="col-span-2"
                  title="Best scans - 30 days"
                  items={recentScans.map((scan, index) => {
                    return (
                      <div key={index}>
                        <div>
                          <span>{scan.matchCount} : </span>
                          <Link
                            href={`https://github.com/${scan?.users[0]?.githubUsername}`}
                          >
                            {scan?.users[0]?.githubUsername}
                          </Link>
                          <span>{" <=> "}</span>
                          <Link
                            href={`https://github.com/${scan?.users[1]?.githubUsername}`}
                          >
                            {scan?.users[1]?.githubUsername}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
interface StatBlockProps {
  title: string;
  items?: ReactNode[];
  className?: string;
}

function StatBlock({ title, items, className }: StatBlockProps) {
  return (
    <div className={`border rounded p-4 ${className}`}>
      <div className="font-semibold">{title}</div>
      <div className="flex flex-col items-start">{items}</div>
    </div>
  );
}
