"use client";

import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TicketCard } from "@/components/ticket-card";
import { useChatStore } from "@/store/chat";

export default function ChatPage() {
  const { messages, sending, error, closed, ticket, ticketError, send, reset } = useChatStore();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // keep the newest message in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending, ticket]);

  async function handleSend() {
    const text = draft;
    setDraft("");
    const ok = await send(text);
    if (!ok) setDraft(text); // give the text back if sending failed
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4">
      <header>
        <h1 className="text-2xl font-semibold">Customer Support</h1>
        <p className="text-sm text-muted-foreground">
          Tell us about your problem. We will ask a few short questions.
        </p>
      </header>

      <section className="flex flex-1 flex-col gap-3 rounded-lg border p-4">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">Say hello to start the chat.</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
              m.role === "user" ? "self-end bg-primary text-primary-foreground" : "self-start bg-muted"
            }`}
          >
            {m.content}
          </div>
        ))}
        {sending && <p className="self-start text-sm text-muted-foreground">Agent is typing…</p>}
        <div ref={bottomRef} />
      </section>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Message not sent</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {closed && ticket && <TicketCard ticket={ticket} />}
      {closed && !ticket && (
        <Alert variant="destructive">
          <AlertTitle>Chat closed, but the ticket was not saved</AlertTitle>
          <AlertDescription>{ticketError ?? "Unknown error"}</AlertDescription>
        </Alert>
      )}

      {closed ? (
        <Button onClick={reset}>Start a new chat</Button>
      ) : (
        <form
          className="flex gap-2"
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
            rows={2}
            disabled={sending}
          />
          <Button type="submit" disabled={sending || !draft.trim()}>
            Send
          </Button>
        </form>
      )}
    </main>
  );
}
