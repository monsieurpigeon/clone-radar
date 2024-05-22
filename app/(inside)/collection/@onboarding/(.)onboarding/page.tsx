"use client";

import { addChannels, getPopularChannels } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";
import { Channel } from "@/dbschema/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ellipse, viewsFormatter } from "../../../../../utils/formatter";

export default function OnboardingPage() {
  const router = useRouter();
  const [tops, setTops] = useState<Channel[]>([]);
  const [selected, setSelected] = useState<Map<string, Channel>>(new Map());
  useEffect(() => {
    getPopularChannels().then((data) => {
      setTops(data || []);
    });
  }, []);

  return (
    <Dialog open>
      <InterceptedDialogContent>
        <div className="grid grid-cols-2">
          <div className="p-4">
            <div className="text-xl font-bold">Welcome to Clone Radar</div>
            <div className="flex flex-col gap-4 p-4 mt-7 w-11/12">
              <Hero emoji="🤩" text="Collect your favorite YouTube channels" />
              <Hero
                emoji="📡"
                text="Go to the Radar tab and Hit Scan to find your clones"
              />

              <Hero emoji="👯" text="Connect with your clones" />

              <Hero
                emoji="🤫"
                text="Your collection stays secret, your clones only know the matching
                channels"
              />
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col text-sm gap-4">
              <div className="font-bold text-xl">Popular Channels</div>
              <ul className="grid grid-cols-2 gap-2">
                {tops.map((top) => (
                  <li
                    key={top.id}
                    className="cursor-pointer"
                    onClick={() => {
                      const newSelected = new Map(selected);
                      if (selected.has(top.id)) {
                        newSelected.delete(top.id);
                      } else {
                        newSelected.set(top.id, top);
                      }
                      setSelected(newSelected);
                    }}
                  >
                    <div
                      className={`flex rounded-lg overflow-hidden hover:shadow-md transition-shadow	 border-2 ${selected.has(top.id) && "border-yellow-300 shadow-md"}`}
                    >
                      <Image
                        alt={top.name}
                        src={top.thumbnailUrl}
                        width={88}
                        height={88}
                      />
                      <div
                        className={`bg-slate-100 p-4 w-full flex flex-col justify-between ${selected.has(top.id) && "bg-yellow-100"}`}
                      >
                        <div className="font-semibold leading-4">
                          {ellipse(top.name, 30)}
                        </div>
                        <div>
                          {viewsFormatter(top.subscriberCount || 0)} subscribers
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                className="self-end"
                onClick={async () => {
                  try {
                    await addChannels(Array.from(selected.values()));
                    router.replace("/collection");
                    router.refresh();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Collect {selected.size} channel{selected.size > 1 ? "s" : ""}
              </Button>
            </div>
          </div>
        </div>
      </InterceptedDialogContent>
    </Dialog>
  );
}

function Hero({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="text-3xl">{emoji}</div>
      <div className="text-xl">{text}</div>
    </div>
  );
}
