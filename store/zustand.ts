import { getUnreadConversations, getUnreadMessages } from "@/app/actions";
import { Conversation, Message } from "@/dbschema/interfaces";
import { create } from "zustand";

type UnreadStore = {
  count: number;
  unreadConversations: Set<string>;
  conversations: Conversation[] | null;
  update: () => Promise<void>;
  messages: Map<string, Message[]>;
  updateMessages: (conversationId: string) => Promise<void>;
};

export const useUnreadStore = create<UnreadStore>((set) => ({
  count: 0,
  unreadConversations: new Set(),
  conversations: null,
  messages: new Map(),
  update: async () => {
    const result = await getUnreadConversations();
    console.log(result);
    return set(() => {
      const unread = result?.filter((c) => c.isUnread) || [];
      return {
        count: unread.length || 0,
        unreadConversations: new Set(unread.map((c) => c.id) || []),
        conversations: result || [],
      };
    });
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
