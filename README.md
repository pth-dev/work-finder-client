# WorkFinder Client

A modern job search platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🔍 Advanced job search and filtering
- 🏢 Company profiles and following
- 📝 Job applications management
- 👤 User authentication with HttpOnly cookies
- 🌐 Internationalization (English/Vietnamese)
- 📱 Responsive design
- ⚡ Server-side rendering with App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Authentication**: HttpOnly cookies
- **Internationalization**: next-intl
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                # Utilities and API functions
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── constants/          # Application constants
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
