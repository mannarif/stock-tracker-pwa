import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",        // 👈 REQUIRED for Vercel
  build: {
    outDir: "dist"  // 👈 default, but make explicit
  }
});
