# Northstar Chat Companion

You are a senior full-stack dev. Vibe code a baseline chatbot for "Northstar Retail Co".

Tech: Next.js 14 App Router, Tailwind, shadcn/ui, TypeScript

Requirements:

1.  Single page at app/page.tsx

2.  UI: Chat window with message history. User messages on right, Bot on left.

3.  Input box + Send button at bottom

4.  On send: POST to /api/chat with {message: string}

5.  Show "Northstar Support is typing..." while waiting

6.  For now, the /api/chat endpoint should just return: "Hello! I can help with Order Status or Returns. What's your order ID?"

7.  Make it look clean and mobile-friendly

Return 2 files: 

File 1: app/page.tsx

File 2: app/api/chat/route.ts

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5c59a3b1-0ac0-4509-aeb0-544caeff9cb0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
