"use client";

import { EmptyState } from "@/components/EmptyState";
import { useUnreadStore } from "@/store/zustand";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export function ConversationList({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const selectedConversationId = pathname.split("/").pop();
  const router = useRouter();
  const { unreadConversations: unread, conversations } = useUnreadStore();

  if (!conversations) {
    return "LOADING";
  }

  if (conversations && conversations.length === 0) {
    return (
      <div className="col-span-3 p-8">
        <Link href="/radar">
          <EmptyState
            title="No conversation yet..."
            description={[
              "Scan some clones and click their names to open a new conversation.",
              "If you lose a clone, the conversation will be destroyed.",
              "Only the last 10 messages are stored in the conversation.",
            ]}
          />
        </Link>
      </div>
    );
  }

  return (
    <>
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
                  <div className="absolute top-0 left-0 p-2 bg-red-500 rounded-full animate-bounce"></div>
                  <div className="absolute top-0 left-0 p-2 bg-red-600 rounded-full blur-sm"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {children}
    </>
  );
}
