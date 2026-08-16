import { createFileRoute } from "@tanstack/react-router";

type ChatRequestBody = {
  message?: string;
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        const message =
          typeof body.message === "string" ? body.message.trim() : "";

        if (!message) {
          return new Response(
            JSON.stringify({ error: "Message is required" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const response =
          "Hello! I can help with Order Status or Returns. What's your order ID?";

        return new Response(JSON.stringify({ response }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
