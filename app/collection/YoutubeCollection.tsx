"use client";
import { Channel } from "@/dbschema/interfaces";
import { useState } from "react";
import { CollectionList } from "./CollectionList";
import { YoutubeInput } from "./YoutubeInput";

export function YoutubeCollection({
  channels,
}: {
  channels: Channel[] | undefined;
}) {
  const [channel, setChannel] = useState<Omit<Channel, "id" | "fans">>();

  return (
    <div className="flex flex-col gap-4">
      <YoutubeInput
        myCollection={channels}
        channel={channel}
        setChannel={setChannel}
      />
      <div className="flex flex-col gap-4">
        <CollectionList channels={channels} setChannel={setChannel} />
      </div>
    </div>
  );
}
