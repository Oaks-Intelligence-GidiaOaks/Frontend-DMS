import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  main: "src/main.jsx",
  plugins: [react()],
  define: {
    "process.env": {
      VITE_SECURE_LOCAL_STORAGE_HASH_KEY:
        "This is the secret for storing sensitive data in localStorage.",
      VITE_SECURE_LOCAL_STORAGE_PREFIX: "@oaks",
    },
  },
});
