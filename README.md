This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## App Description

This is a Next.js app that showcases a virtualized list of Pokémon. It uses the PokeAPI to fetch Pokémon data and displays it in a table format with pagination. The app is designed to handle large datasets efficiently by only rendering the visible items in the list.

## Features

- Fetches Pokémon data from the PokeAPI if not already cached.
- Displays Pokémon in a virtualized list for performance (Option 1).
- Implements table with pagination to navigate through the Pokémon data (Option 2).
- Offline notification and support for previously fetched Pokémon data.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
