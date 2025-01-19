import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@firebase")) {
              return "firebase";
            }
            if (id.includes("react")) {
              return "react";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("popmotion")) {
              return "popmotion";
            }
            if (id.includes("recharts")) {
              return "recharts";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
