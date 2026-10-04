import { create } from "zustand";
import { sendChat, type Message, type Ticket } from "@/lib/api";

type ChatState = {
  messages: Message[];
  sending: boolean;
  error: string | null;
  closed: boolean; // true after READY_TO_CLOSE
  ticket: Ticket | null;
  ticketError: string | null;
  send: (text: string) => Promise<boolean>;
  reset: () => void;
};

const initial = {
  messages: [],
  sending: false,
  error: null,
  closed: false,
  ticket: null,
  ticketError: null,
};

export const useChatStore = create<ChatState>((set, get) => ({
  ...initial,

  // Returns true if the message was sent, false if it failed
  // (so the page can put the text back in the box).
  send: async (text) => {
    const { messages, sending, closed } = get();
    if (sending || closed || !text.trim()) return false;

    const withUser: Message[] = [...messages, { role: "user", content: text.trim() }];
    set({ messages: withUser, sending: true, error: null });

    try {
      const res = await sendChat(withUser); // full list, every time
      set({
        messages: [...withUser, { role: "assistant", content: res.reply }],
        sending: false,
        closed: res.ready,
        ticket: res.ticket ?? null,
        ticketError: res.ticket_error ?? null,
      });
      return true;
    } catch (e) {
      // Undo the user message so the conversation stays valid.
      set({
        messages,
        sending: false,
        error: e instanceof Error ? e.message : "Something went wrong",
      });
      return false;
    }
  },

  reset: () => set(initial),
}));
