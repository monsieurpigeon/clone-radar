"use client";

import { addChannel } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ellipse, viewsFormatter } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaShareSquare } from "react-icons/fa";
import { ChannelInputProps, searchChannels } from ".";

export function YoutubeInput({
  myCollection = [],
  channel,
  setChannel,
}: {
  myCollection: ChannelInputProps[] | undefined;
  channel: ChannelInputProps | undefined;
  setChannel: (channel: ChannelInputProps | undefined) => void;
}) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleVerify = () => {
    searchChannels(value)
      .then((data) => {
        const item = data.items[0];
        const channel = {
          youtubeId: item.id,
          name: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.medium.url,
          subscriberCount: parseInt(item.statistics.subscriberCount),
          videoCount: parseInt(item.statistics.videoCount),
        };
        setChannel(channel);
        setValue("");
      })
      .catch((error) => console.error(error));
  };

  const collected = useMemo(() => {
    const collected = new Set();
    myCollection?.forEach((channel) => collected.add(channel.youtubeId));
    return collected;
  }, [myCollection]);

  const isCollected = (youtubeId: string) => collected.has(youtubeId);

  const handleCollect = async (channel: ChannelInputProps) => {
    try {
      await addChannel(channel);
    } catch (error) {
      console.error(error);
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 shadow-md p-2 rounded-b-xl">
        <input
          value={value}
          placeholder="https://www.youtube.com/@t3dotgg"
          onChange={(e) => setValue(e.target.value)}
          className="grow rounded-lg border-0 focus:outline-none px-4 shadow-inner"
        />
        <Button onClick={handleVerify}>Verify</Button>
      </div>

      <div className="flex flex-col">
        {channel && (
          <div className="flex gap-4 p-4 border-l-4 border-purple-400 rounded-xl shadow-lg">
            <div className="flex flex-col items-stretch gap-4">
              <div className="min-w-20 max-w-20 min-h-20 max-h-20 relative grow rounded-lg overflow-hidden">
                <Image
                  src={channel.thumbnailUrl || ""}
                  fill={true}
                  style={{ objectFit: "cover" }}
                  alt={channel.name}
                />
              </div>
              {isCollected(channel.youtubeId) ? (
                <div className="border-2 rounded-lg px-1 bg-green-400 text-white border-green-300 font-bold shadow-md text-center">
                  ✓
                </div>
              ) : (
                <button
                  onClick={() => handleCollect(channel)}
                  className="border-2 rounded-lg px-1 hover:bg-yellow-400 hover:text-white hover:border-yellow-300 font-bold shadow-md"
                >
                  Collect
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="font-bold">{channel.name}</div>
                  <Link
                    href={`https://www.youtube.com/channel/${channel.youtubeId}`}
                  >
                    <div>
                      <FaShareSquare className="hover:fill-slate-500" />
                    </div>
                  </Link>
                </div>

                <button
                  className="self-end"
                  onClick={() => setChannel(undefined)}
                >
                  Close
                </button>
              </div>
              <div>
                {viewsFormatter(channel.subscriberCount || 0)} subscribers ‧{" "}
                {viewsFormatter(channel.videoCount || 0)} videos
              </div>
              <div className="">{ellipse(channel.description, 180)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
