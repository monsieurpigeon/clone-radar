"use client";

import { EmptyState } from "@/components/EmptyState";
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
          <div className="flex flex-col gap-4">
            {clones.map((clone) => (
              <CloneItem
                key={clone.id}
                clone={clone}
                currentChannelIds={currentChannelIds}
              />
            ))}
          </div>
        ) : (
          <div className="p-8">
            <EmptyState
              title="No clones found yet..."
              description={[
                "Hit the Scan button to find your first clones.",
                "Lower the focus to find more clones.",
                "You can only scan 5 times per hour.",
              ]}
            />
          </div>
        )}
      </div>
    </>
  );
}
