import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"  // ✅ Ensure Vercel picks up the correct build folder
  },
  server: {
    historyApiFallback: true,
  }
});
