import {
  getPopularChannels,
  getRecentChannels,
  getRecentClones,
} from "@/app/actions";
import NextSteps from "@/components/NextSteps";
import { ThreeScene } from "@/components/ThreeScene";
import { Button } from "@/components/ui/button";
import { Channel, Clone } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import Link from "next/link";
import { ReactNode } from "react";
import { COLORS } from "../../utils/constants";

// const Dynamic3D = dynamic(() => import("../components/ThreeScene"), {
//   loading: () => <p>Loading...</p>,
// });

const wording = [
  "You are unique in many ways.",
  "One of them is the exact combination of things you love right now.",
  "Algorithms find matching patterns between us in order to predict our behavior.",
  "But they haven't connected us, until now.",
];

export default async function Home() {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();

  const popularChannels: Channel[] = (await getPopularChannels()) || [];
  const recentChannels: Channel[] = (await getRecentChannels()) || [];
  const recentClones: Clone[] = (await getRecentClones()) || [];

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

      <div className="px-6 lg:px-8 z-0">
        <div className="mx-auto max-w-2xl pt-8 sm:pt-12 lg:pt-16">
          <div className="text-center flex flex-col items-center">
            <div className="mb-6 text-base leading-7 text-gray-600 flex flex-col items-center cursor-none">
              {wording.map((sentence, index) => (
                <div key={index}>
                  {sentence.split(" ").map((word, wordIndex) => (
                    <span
                      key={`${index}-${wordIndex}`}
                      className="hover:font-bold"
                    >
                      {word}{" "}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl py-8">
              Clone Radar
            </h1>
            <div
              className="hidden lg:block"
              style={{ width: "500px", height: "500px" }}
            >
              <ThreeScene />
            </div>
            <div className="w-100">
              <NextSteps />
            </div>
            <div className="grid grid-cols-2 gap-4 pb-12 text-nowrap">
              <StatBlock
                title="Popular channels"
                className="overflow-hidden"
                items={popularChannels?.map((channel) => (
                  <Link
                    key={channel.id}
                    href={`https://www.youtube.com/channel/${channel.youtubeId}`}
                  >
                    <p className="hover:underline">{channel.name}</p>
                  </Link>
                ))}
              />
              <StatBlock
                title="Recent channels"
                className="overflow-hidden"
                items={recentChannels.map((channel) => (
                  <Link
                    key={channel.id}
                    href={`https://www.youtube.com/channel/${channel.youtubeId}`}
                  >
                    <p className="hover:underline">{channel.name}</p>
                  </Link>
                ))}
              />
              <StatBlock
                className="col-span-2"
                title="Best clones - last 30 days"
                items={
                  <div className="grid grid-cols-9 m-auto gap-x-3 gap-y-1">
                    {recentClones.map((clone) => {
                      return <CloneLine clone={clone} key={clone.id} />;
                    })}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CloneLine({ clone }: { clone: Clone }) {
  return (
    <>
      <Link
        href={`https://github.com/${clone?.users[0]?.githubUsername}`}
        className="col-span-4 text-right hover:underline"
      >
        {clone?.users[0]?.name}
      </Link>

      <span
        className={`rounded px-2 bg-${COLORS[clone.matchCount]}-500 text-white font-bold`}
      >
        {clone.matchCount}
      </span>

      <Link
        href={`https://github.com/${clone?.users[1]?.githubUsername}`}
        className="col-span-4 text-left hover:underline"
      >
        {clone?.users[1]?.name}
      </Link>
    </>
  );
}
interface StatBlockProps {
  title: string;
  items?: ReactNode[] | ReactNode;
  className?: string;
}

function StatBlock({ title, items, className }: StatBlockProps) {
  return (
    <div className={`border rounded p-4 ${className}`}>
      <div className="font-semibold mb-4">{title}</div>
      <div className="flex flex-col items-start">{items}</div>
    </div>
  );
}
