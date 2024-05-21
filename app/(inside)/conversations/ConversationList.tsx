"use client";

import { Conversation, User } from "@/dbschema/interfaces";
import { durationFormatter } from "@/utils/formatter";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ConversationList({
  conversations,
}: {
  conversations: (Conversation & { participant: User })[];
}) {
  const pathname = usePathname();
  const selectedConversationId = pathname.split("/").pop();

  return (
    <div className="flex flex-col gap-4">
      {conversations.map((conversation) => {
        return (
          <Link
            href={`/conversations/${conversation.id}`}
            key={conversation.id}
          >
            <div
              className={`border rounded p-4 ${selectedConversationId === conversation.id && "bg-yellow-200"}`}
            >
              <div className="flex gap-4">
                <p className="font-semibold">{conversation.participant.name}</p>
                <p>{durationFormatter(conversation.updated)}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
