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
  return (
    <div className="pb-2">
      <div className="flex gap-4">
        <Link
          href={`https://github.com/${conversation.participant.githubUsername}`}
        >
          <div className="font-bold">{conversation.participant.name}</div>
        </Link>
        <button
          onClick={() => {
            setIsOpen((v) => !v);
          }}
        >
          {isOpen ? "less" : "more"}
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
