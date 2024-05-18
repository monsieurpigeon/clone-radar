"use client";

import { ellipse, viewsFormatter } from "@/utils/formatter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChannelInputProps, searchChannels } from ".";
import { addChannel } from "./actions";

export function YoutubeInput({
  myCollection,
}: {
  myCollection: ChannelInputProps[];
}) {
  const [videos, setVideos] = useState();
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleVerify = () => {
    searchChannels(value)
      .then((data) => {
        setVideos(data);
        setValue("");
      })
      .catch((error) => console.error(error));
  };

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
      <div className="flex gap-4 shadow-lg p-2 rounded-b-xl">
        <input
          value={value}
          placeholder="https://www.youtube.com/@t3dotgg"
          onChange={(e) => setValue(e.target.value)}
          className="grow rounded-lg border-0 focus:ring-0"
        />
        <button
          onClick={handleVerify}
          className="border rounded-lg p-2 bg-blue-500 text-white hover:bg-blue-600 font-semibold"
        >
          Verify
        </button>
      </div>

      <div className="flex flex-col">
        {videos &&
          videos.items?.map((item) => {
            return (
              <div
                key={item.etag}
                className="flex gap-4 p-4 border-l-4 border-purple-400 rounded-xl shadow-lg"
              >
                <div className="flex flex-col items-stretch gap-4">
                  <div className="min-w-20 max-w-20 min-h-20 max-h-20 relative grow rounded-lg overflow-hidden">
                    <Image
                      src={item.snippet.thumbnails.default.url}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      alt={item.snippet.title}
                    />
                  </div>
                  <button
                    onClick={() =>
                      handleCollect({
                        youtubeId: item.id,
                        name: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.default.url,
                        subscriberCount: parseInt(
                          item.statistics.subscriberCount
                        ),
                        videoCount: parseInt(item.statistics.videoCount),
                      })
                    }
                    className="border-2 rounded-lg px-1 hover:bg-yellow-400 hover:text-white hover:border-yellow-300 font-bold shadow-md"
                  >
                    Collect
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="font-bold">{item.snippet.title}</div>
                  <div>
                    {viewsFormatter(item.statistics?.subscriberCount)}{" "}
                    subscribers ‧ {viewsFormatter(item.statistics?.videoCount)}{" "}
                    videos
                  </div>
                  <div className="">
                    {ellipse(item.snippet.description, 180)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
