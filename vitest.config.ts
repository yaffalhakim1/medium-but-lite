import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,

    environment: "jsdom",
    alias: {
      "@/": new URL("./", import.meta.url).pathname,
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: "/" }],
  },
});
