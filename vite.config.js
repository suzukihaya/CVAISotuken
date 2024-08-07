import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5172,
  },
  preview: {
    port: 5172,
  },
  build: {
    rollupOptions: {
      external: ["@mui/icons-material/ArrowDropup"],
    },
  },
});
