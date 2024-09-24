/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    reporters: ["verbose"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
