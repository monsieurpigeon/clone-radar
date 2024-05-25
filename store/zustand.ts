import { getUnreadConversations } from "@/app/actions";
import { create } from "zustand";

type UnreadStore = {
  count: number;
  update: () => Promise<void>;
};

export const useUnreadStore = create<UnreadStore>((set) => ({
  count: 0,
  update: async () => {
    const result = await getUnreadConversations();
    return set(() => ({ count: result || 0 }));
  },
}));
