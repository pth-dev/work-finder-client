import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      components: "/src/components",
      hooks: "/src/hooks",
      stores: "/src/stores",
      constants: "/src/constants",
      utils: "/src/utils",
      services: "/src/services",
      types: "/src/types",
      assets: "/src/assets",
    },
  },
});
