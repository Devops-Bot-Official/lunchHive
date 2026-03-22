# LunchHive

LunchHive is a React/TypeScript web application for batched lunch ordering.

It models a delivery flow where people join a shared **hive** (office floor, coworking space, apartment block, or neighbourhood delivery zone), order from a curated daily menu, and receive grouped deliveries inside a scheduled time window.

This repository is the active LunchHive codebase.

## What the app does

- lets users choose a work or home hive
- loads a daily menu for the selected hive
- adds meals to a shared cart
- places demo orders through a mock API layer
- tracks orders, subscriptions, profile state, and delivery-side screens
- persists demo state in `localStorage`

## Product status

LunchHive currently runs as a **frontend-only demo/prototype**.

There is no real backend service yet. The app uses a mock API in:

- `src/lib/api.ts`

That layer simulates:
- user profile data
- hives and hive stats
- menu items
- order creation and order status progression
- subscriptions
- local persistence
- network latency and occasional mock failures

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- Framer Motion
- Sonner
- next-themes

## Run locally

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/Devops-Bot-Official/lunchHive.git
cd lunchHive
npm install
```

### Start the development server

```bash
npm run dev
```

If you want the server reachable on your local network:

```bash
npm run dev -- --host 0.0.0.0
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run build:dev` — build in development mode
- `npm run lint` — run ESLint
- `npm run preview` — preview the built app

## Project structure

```text
src/
├── components/      # shared UI and layout components
├── contexts/        # app state providers (user, hive, cart, rider)
├── hooks/           # reusable hooks
├── lib/             # mock API and shared utilities
├── pages/           # route-level screens
├── App.tsx          # route wiring and providers
├── main.tsx         # application entry point
└── index.css        # global styles and theme tokens
```

## Current architecture notes

- App routing is defined in `src/App.tsx`
- Mock business logic lives in `src/lib/api.ts`
- Cart state is managed by `src/contexts/CartContext.tsx`
- Hive selection and stats are managed by `src/contexts/HiveContext.tsx`
- User demo state is managed by `src/contexts/UserContext.tsx`

## Known follow-up areas

- clean up remaining hardcoded/demo-only page flows where needed
- decide whether random mock API failures should remain enabled
- reduce bundle size with route/component splitting
- replace demo data with a real backend when product requirements are ready

## License

MIT
