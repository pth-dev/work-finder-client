import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      hooks: "/src/hooks",
      stores: "/src/stores",
      constants: "/src/constants",
    },
  },
});
