import { getUnreadConversations, getUnreadMessages } from "@/app/actions";
import { Message } from "@/dbschema/interfaces";
import { create } from "zustand";

type UnreadStore = {
  count: number;
  conversations: Set<string>;
  update: () => Promise<void>;
  messages: Map<string, Message[]>;
  updateMessages: (conversationId: string) => Promise<void>;
};

export const useUnreadStore = create<UnreadStore>((set) => ({
  count: 0,
  conversations: new Set(),
  messages: new Map(),
  update: async () => {
    const result = await getUnreadConversations();
    return set(() => ({
      count: result?.length || 0,
      conversations: new Set(result?.map((c) => c.id) || []),
    }));
  },
  updateMessages: async (conversationId: string) => {
    const result = await getUnreadMessages(conversationId);

    if (!result) return;
    return set((prev) => ({
      messages: new Map(prev.messages).set(
        conversationId,
        result.lastMessages || []
      ),
    }));
  },
}));
