"use client";

import { Channel } from "@/dbschema/interfaces";
import { useState } from "react";
import { CollectionItem } from "./CollectionItem";

export function CollectionList({
  channels,
}: {
  channels: Channel[] | undefined;
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-bold leading-4 tracking-tight text-gray-900">
          My Collection
        </p>
        <button onClick={() => setShow((v) => !v)}>
          {show ? "Hide" : "Reveal"}
        </button>
      </div>

      <div className="relative">
        <div className="border-2 rounded-lg p-4 shadow-lg overflow-hidden">
          <div className="blur-xl">
            <div className="grid grid-cols-4 grid-rows-4 gap-4">
              {channels &&
                channels
                  .sort((a, b) => a.subscriberCount - b.subscriberCount)
                  .map((item) => <CollectionItem key={item.id} item={item} />)}
            </div>
          </div>

          {show && (
            <div className="absolute left-4 right-4 top-4 bottom-4 grid grid-cols-4 grid-rows-4 gap-4">
              {channels &&
                channels
                  .sort((a, b) => a.subscriberCount - b.subscriberCount)
                  .map((item) => <CollectionItem key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
