import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Headset, Package, RotateCcw } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

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
      { title: "Northstar Support MVP" },
      {
        name: "description",
        content:
          "Get instant help with your Northstar orders, returns, and refunds.",
      },
      {
        property: "og:title",
        content: "Northstar Support MVP",
      },
      {
        property: "og:description",
        content:
          "Get instant help with your Northstar orders, returns, and refunds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChatPage,
});

const FALLBACK_ANSWER =
  "Hello! I can help with Order Status or Returns. What's your order ID?";

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hydrated = useHydrated();

  const sendMessage = async (text: string) => {
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

      const data = (await res.json()) as { answer?: string };
      const answer = data.answer ?? FALLBACK_ANSWER;

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: answer },
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

  const handleSubmit = async (
    { text }: { text: string; files: unknown[] },
    _event: FormEvent<HTMLFormElement>
  ) => {
    await sendMessage(text);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Headset className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            Northstar Support MVP
          </h1>
        </div>
      </header>

      <section className="flex flex-1 flex-col px-4 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-medium text-foreground">
                Chat with Northstar Support
              </h2>
              <p className="text-sm text-muted-foreground">
                We typically reply in under a minute
              </p>
            </div>

            <div className="h-[400px] sm:h-[480px]">
              <Conversation className="h-full">
                <ConversationContent>
                  {messages.length === 0 ? (
                    <ConversationEmptyState
                      icon={<Headset className="h-8 w-8" />}
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
                        <Shimmer as="span">
                          Northstar Support is typing...
                        </Shimmer>
                      </MessageContent>
                    </Message>
                  )}
                </ConversationContent>
              </Conversation>
            </div>

            <div className="border-t border-border p-3 sm:p-4">
              {hydrated ? (
                <PromptInput onSubmit={handleSubmit}>
                  <PromptInputTextarea placeholder="Type your message..." />
                  <PromptInputFooter className="justify-end">
                    <PromptInputSubmit
                      disabled={isLoading}
                      size="sm"
                      variant="default"
                    >
                      Send
                    </PromptInputSubmit>
                  </PromptInputFooter>
                </PromptInput>
              ) : (
                <div className="flex min-h-[4.5rem] items-end justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2">
                  <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
                  <div className="h-8 w-16 rounded-md bg-muted animate-pulse" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              className="h-11 w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => sendMessage("Check my order status")}
            >
              <Package className="h-4 w-4" />
              Check Order Status
            </Button>
            <Button
              variant="outline"
              className="h-11 w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => sendMessage("I want to start a return or refund")}
            >
              <RotateCcw className="h-4 w-4" />
              Start Return/Refund
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card px-4 py-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Northstar Retail Co
          </p>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact Support
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
