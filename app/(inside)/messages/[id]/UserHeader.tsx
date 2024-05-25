"use client";

import { Conversation, User } from "@/dbschema/interfaces";
import Link from "next/link";
import { useState } from "react";

export function UserHeader({
  conversation,
}: {
  conversation: Conversation & { participant: User };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const matchCount = conversation.origin?.[0].matchCount;
  return (
    <div className="pb-2">
      <div className="flex gap-4">
        <div>
          <Link
            href={`https://github.com/${conversation.participant.githubUsername}`}
          >
            <span className="font-bold">{conversation.participant.name}</span>{" "}
          </Link>
        </div>
        <button
          onClick={() => {
            setIsOpen((v) => !v);
          }}
        >
          {`${matchCount} match${matchCount > 1 ? "es" : ""}`}
        </button>
      </div>

      {isOpen && (
        <div className="flex gap-1 flex-wrap">
          {conversation.origin?.[0].restrictedItems.map((item) => {
            return (
              <Link
                href={`https://youtube.com/channel/${item.youtubeId}`}
                key={item.id}
              >
                <div className="border rounded text-sm px-2 hover:shadow">
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
