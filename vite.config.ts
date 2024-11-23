import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5000,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "./src/server.ts",
    },
  },
});
