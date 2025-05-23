import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import compression from "vite-plugin-compression";
import { fileURLToPath } from "url";
import strip from "rollup-plugin-strip";
import { visualizer } from "rollup-plugin-visualizer";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    host: "0.0.0.0", 
    port: 5173,
  },
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress", 
      ext: ".br",
      threshold: 10240, 
    }),
    visualizer({
      open: true, 
      filename: "visualizer-stats.html", 
    }),
    strip({
      include: "src/**/*.js",
      function: ["console.*"],
    }),
  ],
  build: {
    outDir: "dist", 
    minify: "esbuild",
    sourcemap: false, 
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), 
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactRouter: ["react-router", "react-router-dom"],
          utility: ["clsx", "class-variance-authority", "tailwind-merge"],
        },
        chunkSizeWarningLimit: 500, 
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  define: {
    global: "globalThis", 
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", 
      },
      plugins: [],
    },
  },
});
