import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "three", test: /node_modules\/three/, priority: 20 },
            {
              name: "react-three",
              test: /node_modules\/@react-three\/fiber/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
