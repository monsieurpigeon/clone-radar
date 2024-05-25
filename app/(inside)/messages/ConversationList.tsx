"use client";

import { Conversation, User } from "@/dbschema/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { useUnreadStore } from "../../../store/zustand";

export function ConversationList({
  conversations,
}: {
  conversations: (Conversation & { participant: User })[];
}) {
  const pathname = usePathname();
  const selectedConversationId = pathname.split("/").pop();
  const router = useRouter();
  const { conversations: unread } = useUnreadStore();

  return (
    <div className="flex flex-col border rounded-md overflow-hidden">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className="cursor-pointer"
          onClick={() => {
            router.replace(
              conversation.id === selectedConversationId
                ? "/messages"
                : `/messages/${conversation.id}`
            );
          }}
        >
          <div
            className={`flex items-center justify-between hover:bg-slate-50 ${selectedConversationId === conversation.id && "border-l-4 border-blue-500 bg-slate-50"}`}
          >
            <div className="flex flex-col p-3">
              <p className="font-semibold">{conversation.participant.name}</p>
            </div>
            {unread.has(conversation.id) && (
              <div className="mx-4 p-2 relative">
                <div className="absolute top-0 left-0 p-2 bg-red-500 rounded-full blur-sm"></div>
                <div className="absolute top-0 left-0 p-2 bg-red-500 rounded-full animate-bounce"></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
