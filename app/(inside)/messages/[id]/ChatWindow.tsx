"use client";

import { Conversation, Message, User } from "@/dbschema/interfaces";
import { durationFormatter } from "@/utils/formatter";
import { useUnreadStore } from "../../../../store/zustand";

export function ChatWindow({
  conversation,
}: {
  conversation: Conversation & { lastMessages: Message[]; participant: User };
}) {
  const { messages } = useUnreadStore();
  const lastMessages = messages.get(conversation.id) || [];

  return (
    <div className="flex flex-col-reverse gap-2 max-h-full grow overflow-y-hidden">
      {lastMessages?.map((message) => {
        const isOther = message.author.id === conversation.participant.id;
        return (
          <div
            key={message.id}
            className={`flex flex-col ${isOther ? "self-start items-start" : "self-end items-end"}`}
          >
            <div className="p-2 border max-w-80 rounded bg-white">
              <div>{message.text}</div>
            </div>
            <div
              className={`flex gap-4 text-sm opacity-50 ${isOther ? "justify-start" : "justify-end"}`}
            >
              <div className="">{durationFormatter(message.created)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
