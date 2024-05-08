"use client";

import { useState } from "react";
import { sendMessage } from "./actions";

export function ChatForm({ conversationId }: { conversationId: string }) {
  const [message, setMessage] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
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
        <input
          type="text"
          name="message"
          className="flex-grow border rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-semibold">
          Send
        </button>
      </div>
    </form>
  );
}
