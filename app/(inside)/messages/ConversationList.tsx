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
    <div className="flex flex-col gap-2 border rounded-md overflow-hidden">
      {conversations.map((conversation) => (
        <Link
          href={
            conversation.id === selectedConversationId
              ? "/messages"
              : `/messages/${conversation.id}`
          }
          key={conversation.id}
        >
          <div
            className={`hover:bg-slate-50 ${selectedConversationId === conversation.id && "border-l-4 border-blue-500 bg-slate-50 border-b-1"}`}
          >
            <div className="flex flex-col p-3">
              <p className="font-semibold">{conversation.participant.name}</p>
              <p className="text-sm">
                {durationFormatter(conversation.updated)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
