"use client";

import { readConversation, sendMessage } from "@/app/actions";
import { useUnreadStore } from "@/store/zustand";
import { MAX_MESSAGE_SIZE } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

export function ChatForm({ conversationId }: { conversationId: string }) {
  const [message, setMessage] = useState("");
  const { update } = useUnreadStore();

  const refreshConversation = useCallback(async () => {
    await readConversation(conversationId);
    update();
  }, [conversationId, update]);

  useEffect(() => {
    refreshConversation();
    const interval = setInterval(() => {
      refreshConversation();
    }, 5000);

    return () => clearInterval(interval);
  }, [conversationId, refreshConversation]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(
          new FormData(e.target as HTMLFormElement) as FormData
        );
        setMessage("");
      }}
    >
      <input
        type="text"
        name="conversationId"
        defaultValue={conversationId}
        hidden
      />
      <div className="flex gap-4">
        <textarea
          name="message"
          className="flex-grow border rounded-md p-4 focus:outline-none"
          value={message}
          maxLength={MAX_MESSAGE_SIZE}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-semibold"
        >
          Send
        </button>
      </div>
    </form>
  );
}
