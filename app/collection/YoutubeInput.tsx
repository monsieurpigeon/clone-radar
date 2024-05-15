"use client";

import Image from "next/image";
import { useState } from "react";
import { searchChannels } from ".";
import { viewsFormatter } from "../../utils/formatter";

export function YoutubeInput() {
  const [videos, setVideos] = useState();
  const [value, setValue] = useState("");

  const handleClick = () => {
    searchChannels(value)
      .then((data) => setVideos(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          value={value}
          placeholder="https://www.youtube.com/@t3dotgg"
          onChange={(e) => setValue(e.target.value)}
          className="grow rounded "
        />
        <button
          onClick={handleClick}
          className="border rounded-lg p-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          SEARCH
        </button>
      </div>

      <div className="flex flex-col">
        {videos &&
          videos.items.map((item) => {
            return (
              <div
                key={item.etag}
                className="flex gap-4 p-4 border-l-4 border-purple-400 rounded"
              >
                <div className="flex flex-col items-stretch gap-2">
                  <div className="min-w-20 max-w-20 h-20 relative grow rounded-lg overflow-hidden">
                    <Image
                      src={item.snippet.thumbnails.default.url}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      alt={item.snippet.title}
                    />
                  </div>
                  <button className="border-2 rounded-lg px-1 hover:bg-yellow-400 hover:text-white hover:border-yellow-300 font-bold shadow-md">
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
                  <div className="">{item.snippet.description}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
