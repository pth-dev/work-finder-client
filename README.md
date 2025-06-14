# Work Finder - Modern React Application

A modern, scalable React application built with TypeScript, featuring a clean architecture and best practices for enterprise-level development.

## 🚀 Technology Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Zustand** - Lightweight state management
- **TanStack Query** - Powerful server state management
- **Ant Design** - Enterprise-class UI components
- **React Router** - Declarative routing
- **Axios** - HTTP client with interceptors

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Loading, ErrorBoundary)
│   ├── forms/           # Form components (LoginForm, etc.)
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
└── lib/                 # Third-party library configurations
    └── antd-config.ts   # Ant Design theme configuration
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## 🛠️ Features

### ✅ **State Management**

- **Zustand** for client state (auth, UI state)
- **TanStack Query** for server state (API data, caching)
- Persistent authentication state
- Global notification system

### ✅ **UI/UX**

- **Ant Design** components with custom theming
- Responsive design with mobile support
- Loading states and error boundaries
- Notification system
- Dark/light theme support (configurable)

### ✅ **Authentication**

- JWT token-based authentication
- Automatic token refresh
- Protected routes
- Persistent login state

### ✅ **API Integration**

- Axios with request/response interceptors
- Automatic error handling
- Loading state management
- Request timeout and retry logic

### ✅ **Developer Experience**

- TypeScript for type safety
- ESLint for code quality
- Hot module replacement (HMR)
- Lazy loading for better performance
- Custom hooks for reusability

## 🚦 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd work-finder-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_APP_TITLE=Work Finder
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application includes a complete authentication system:

- **Login/Logout** functionality
- **JWT token** management with automatic refresh
- **Protected routes** that require authentication
- **Persistent sessions** across browser refreshes

### Demo Login

For development, you can use the login form with any email/password combination (the API calls are mocked for demonstration).

## 🎨 Theming

The application uses Ant Design's theming system with custom configurations:

- **Primary color**: #1890ff
- **Custom component styling**
- **Responsive breakpoints**
- **Consistent spacing and typography**

Modify `src/lib/antd-config.ts` to customize the theme.

## 🏗️ Architecture Highlights

### State Management Pattern

```typescript
// Zustand store example
const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        // Login logic with error handling
      },
      logout: () => {
        // Cleanup logic
      },
    }),
    { name: "auth-storage" }
  )
);
```

### API Integration Pattern

```typescript
// TanStack Query hook example
export const useJobs = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: async () => {
      const response = await apiService.jobs.getJobs(params);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## 🔧 Development Guidelines

### Component Structure

- Use functional components with hooks
- Implement proper TypeScript typing
- Follow the single responsibility principle
- Use composition over inheritance

### State Management

- Use Zustand for client-side state
- Use TanStack Query for server state
- Avoid prop drilling with proper state architecture
- Implement proper error boundaries

### Styling

- Use Ant Design components as base
- Implement responsive design patterns
- Follow consistent spacing and typography
- Use CSS custom properties for theming

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The build artifacts will be stored in the `dist/` directory.

## 📚 Key Dependencies

| Package        | Version | Purpose          |
| -------------- | ------- | ---------------- |
| React          | ^19.1.0 | UI Library       |
| TypeScript     | ~5.8.3  | Type Safety      |
| Vite           | ^6.3.5  | Build Tool       |
| Zustand        | Latest  | State Management |
| TanStack Query | Latest  | Server State     |
| Ant Design     | ^5.26.0 | UI Components    |
| React Router   | ^6.30.1 | Routing          |
| Axios          | ^1.9.0  | HTTP Client      |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
