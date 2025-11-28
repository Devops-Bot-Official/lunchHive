# Frontend Development Template

A modern, production-ready frontend template for React applications.

## Tech Stack

This template is built with:

- **Vite** - Lightning-fast build tool
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Features

✅ Pre-configured with all essential dependencies
✅ Complete set of shadcn/ui components
✅ Dark mode support with next-themes
✅ Routing with React Router
✅ Form handling with React Hook Form + Zod
✅ Toast notifications (Sonner)
✅ ESLint configuration
✅ TypeScript setup
✅ Responsive design utilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
# or
bun install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui components
│   └── NavLink.tsx  # Example component
├── pages/           # Page components
│   ├── Index.tsx    # Home page
│   └── NotFound.tsx # 404 page
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Customization

### Colors & Theming

Edit `src/index.css` to customize the color scheme. All colors use HSL values for easy theming.

### Adding Routes

Add new routes in `src/App.tsx`:

```tsx
<Route path="/your-route" element={<YourPage />} />
```

### Adding Components

Use shadcn/ui CLI to add more components:

```sh
npx shadcn@latest add [component-name]
```

## Deployment

Build the project:

```sh
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps
- AWS S3 + CloudFront
- etc.

## License

MIT

---

**Template maintained by Dee-Empire**
