# Work Finder - Modern React Application

A modern, scalable React application built with TypeScript, featuring a clean architecture and best practices for enterprise-level development.

## 🚀 Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite 6** - Fast build tool and development server
- **Zustand** - Lightweight state management
- **TanStack Query** - Powerful server state management
- **shadcn/ui** - Modern, accessible UI components built on Radix UI
- **Tailwind CSS v3** - Utility-first CSS framework
- **React Router v6** - Declarative routing
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **Axios** - HTTP client with interceptors

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components (Button, Card, Form, etc.)
│   └── layout/          # Layout components (Header, Sidebar, etc.)
├── pages/               # Page components (Dashboard, Jobs, etc.)
├── hooks/               # Custom React hooks
│   ├── use-api.ts       # TanStack Query hooks
│   ├── use-debounce.ts  # Utility hooks
│   └── index.ts         # Hook exports
├── stores/              # Zustand stores
│   ├── auth-store.ts    # Authentication state
│   └── app-store.ts     # Global application state
├── services/            # API services and configurations
│   └── api.ts           # Axios configuration and API methods
├── types/               # TypeScript type definitions
│   └── index.ts         # Global types and interfaces
├── utils/               # Utility functions
│   └── index.ts         # Helper functions
├── constants/           # Application constants
│   └── index.ts         # Constants and configuration
├── styles/              # Global styles and themes
│   └── global.css       # Global CSS styles
└── lib/                 # Utility functions and configurations
    └── utils.ts         # shadcn/ui utility functions
```

## 📄 License

This project is licensed under the MIT License.
