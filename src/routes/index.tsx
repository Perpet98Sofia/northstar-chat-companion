import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Store } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northstar Retail Co - Support Chat" },
      {
        name: "description",
        content:
          "Chat with Northstar Support for order status, returns, and general help.",
      },
      {
        property: "og:title",
        content: "Northstar Retail Co - Support Chat",
      },
      {
        property: "og:description",
        content:
          "Chat with Northstar Support for order status, returns, and general help.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hydrated = useHydrated();

  const handleSubmit = async (
    { text }: { text: string; files: unknown[] },
    _event: FormEvent<HTMLFormElement>
  ) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: trimmed },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = (await res.json()) as { response?: string };
      const response =
        data.response ??
        "Hello! I can help with Order Status or Returns. What's your order ID?";

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
      <header className="border-b border-border bg-card/80 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-foreground">
              Northstar Support
            </h1>
            <p className="text-sm text-muted-foreground">
              Here to help with orders & returns
            </p>
          </div>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        <Conversation className="flex-1">
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<Store className="h-8 w-8" />}
                title="Northstar Support"
                description="Ask about your order status, returns, or anything else."
              />
            ) : (
              messages.map((m) => (
                <Message key={m.id} from={m.role}>
                  <MessageContent>{m.content}</MessageContent>
                </Message>
              ))
            )}
            {isLoading && (
              <Message from="assistant">
                <MessageContent>
                  <Shimmer as="span">Northstar Support is typing...</Shimmer>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
        </Conversation>
      </main>

      <footer className="border-t border-border bg-card p-4">
        <div className="mx-auto max-w-3xl">
          {hydrated ? (
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea placeholder="Type your message..." />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit disabled={isLoading} />
              </PromptInputFooter>
            </PromptInput>
          ) : (
            <div className="flex min-h-[4.5rem] items-end justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2">
              <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
