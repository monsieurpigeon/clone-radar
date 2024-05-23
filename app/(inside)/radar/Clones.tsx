"use client";

import { Channel, Clone } from "@/dbschema/interfaces";
import { CloneItem } from "./Clone";

interface Props {
  clones: Clone[];
  currentChannels: Channel[] | undefined;
}

export default function Clones({ clones, currentChannels }: Props) {
  const currentChannelIds = new Set(
    currentChannels?.map((channel) => channel.id)
  );

  return (
    <>
      <div>
        {clones?.length ? (
          <div className="grid grid-cols-[auto_auto_auto] gap-4">
            {clones.map((clone) => (
              <CloneItem
                key={clone.id}
                clone={clone}
                currentChannelIds={currentChannelIds}
              />
            ))}
          </div>
        ) : (
          <div>
            <div>No clones found yet...</div>
            <div>Hit the Scan button to find your first clones</div>
          </div>
        )}
      </div>
    </>
  );
}
