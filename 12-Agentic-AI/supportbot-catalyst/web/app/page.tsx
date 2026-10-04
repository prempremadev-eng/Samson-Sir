"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Clock, Gauge, Hash, Headset, RotateCcw, SendHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TicketCard } from "@/components/ticket-card";
import { useChatStore } from "@/store/chat";

const SUGGESTIONS = [
  "My order hasn't arrived yet",
  "I was charged twice",
  "My product stopped working",
];

const STEPS = [
  { icon: Hash, title: "Order or account number", text: "So we can find your purchase." },
  { icon: AlertCircle, title: "What went wrong", text: "A short description of the problem." },
  { icon: Gauge, title: "How urgent it is", text: "In your own words, e.g. “by tomorrow”." },
];

function AgentAvatar() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Headset className="size-4" />
    </span>
  );
}

export default function ChatPage() {
  const { messages, sending, error, closed, ticket, ticketError, send, reset } = useChatStore();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // keep the newest message in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending, ticket]);

  async function handleSend(text = draft) {
    setDraft("");
    const ok = await send(text);
    if (!ok) setDraft(text); // give the text back if sending failed
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 p-4 lg:grid-cols-[1fr_300px] lg:py-8">
      {/* Chat window */}
      <section className="flex h-[calc(100dvh-7.5rem)] min-h-[520px] flex-col overflow-hidden rounded-xl border bg-white shadow-sm lg:h-[calc(100dvh-9.5rem)]">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-3">
            <AgentAvatar />
            <div className="leading-tight">
              <p className="text-sm font-semibold">Support Agent</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {closed ? "Conversation closed" : "Online · usually replies in seconds"}
              </p>
            </div>
          </div>
          {messages.length > 0 && !closed && (
            <Button variant="ghost" size="sm" onClick={reset} disabled={sending}>
              <RotateCcw /> Restart
            </Button>
          )}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 px-5 py-6">
          {messages.length === 0 && (
            <div className="mx-auto flex max-w-md flex-col items-center pt-8 text-center">
              <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Headset className="size-6" />
              </span>
              <h1 className="text-lg font-semibold">How can we help today?</h1>
              <p className="mt-1 text-sm text-slate-500">
                Describe your problem and our agent will ask a few short questions to open a ticket.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    disabled={sending}
                    className="rounded-full border bg-white px-3.5 py-1.5 text-sm text-slate-700 shadow-xs transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end gap-2.5">
                <div className="max-w-[75%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-xs">
                  {m.content}
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                  <User className="size-4" />
                </span>
              </div>
            ) : (
              <div key={i} className="flex gap-2.5">
                <AgentAvatar />
                <div className="max-w-[75%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border bg-white px-4 py-2.5 text-sm text-slate-800 shadow-xs">
                  {m.content}
                </div>
              </div>
            )
          )}

          {sending && (
            <div className="flex gap-2.5">
              <AgentAvatar />
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border bg-white px-4 py-3 shadow-xs">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="size-1.5 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {closed && ticket && <TicketCard ticket={ticket} />}
          {closed && !ticket && (
            <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">Chat closed, but the ticket was not saved</p>
                <p className="text-red-800/80">{ticketError ?? "Unknown error"}</p>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t bg-white p-4">
          {error && (
            <p className="mb-3 flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="size-4 shrink-0" />
              Message not sent: {error}
            </p>
          )}
          {closed ? (
            <Button className="w-full" size="lg" onClick={reset}>
              <RotateCcw /> Start a new chat
            </Button>
          ) : (
            <form
              className="flex items-end gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  // Enter sends, Shift+Enter makes a new line
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message…"
                maxLength={2000}
                rows={1}
                disabled={sending}
                className="max-h-32 min-h-10 resize-none"
              />
              <Button type="submit" size="icon-lg" disabled={sending || !draft.trim()} aria-label="Send">
                <SendHorizontal />
              </Button>
            </form>
          )}
          <p className="mt-2 hidden text-center text-xs text-slate-400 sm:block">
            Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </section>

      {/* Side panel */}
      <aside className="hidden space-y-4 lg:block">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold">What we will ask</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-slate-500">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex gap-3 rounded-xl border bg-white p-5 text-sm shadow-sm">
          <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-slate-600">
            When the chat ends, a ticket is created automatically and our team sees it on the dashboard.
          </p>
        </div>
      </aside>
    </main>
  );
}
