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


## App Description

This is a Next.js app that showcases a virtualized list of Pokémon. It uses the PokeAPI to fetch Pokémon data and displays it in a table format with pagination. The app is designed to handle large datasets efficiently by only rendering the visible items in the list.


## Features

- Fetches Pokémon data from the PokeAPI if not already cached.
- Displays Pokémon in a virtualized list for performance (Option 1).
- Implements a table with pagination to navigate through the Pokémon data (Option 2).
- Offline notification and support for previously fetched Pokémon data.
  

## TODO

-  More tests (unit, integration)
-  Implement a caching strategy 
-  Implement better styling
-  Offline friendly

## Snapshots of the App
#### Home screen
<img width="1158" height="888" alt="Screenshot 2025-07-23 at 10 13 08" src="https://github.com/user-attachments/assets/38824f21-f288-4017-9217-61753d05d683" />

#### Table view
<img width="821" height="657" alt="Screenshot 2025-07-23 at 10 13 31" src="https://github.com/user-attachments/assets/1ed0aa33-a9b7-4e57-a273-6f3d59fee1d0" />

#### Detail view of a Pokemon
<img width="1634" height="809" alt="Screenshot 2025-07-23 at 10 14 50" src="https://github.com/user-attachments/assets/16b06cf4-d312-4a1e-b846-4cfeec7f01b1" />

#### Virtualize view
<img width="1606" height="796" alt="Screenshot 2025-07-23 at 10 14 06" src="https://github.com/user-attachments/assets/94aba4b2-04d9-477d-bace-d06b28ea6d78" />




