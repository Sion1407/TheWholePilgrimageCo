import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async ({ mode }) => {
  const isProd = mode === "production";

  const plugins = [
    react(),
    runtimeErrorOverlay(),
  ];

  // Only add Replit dev plugins in dev mode on Replit
  if (!isProd && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    plugins.push(cartographer(), devBanner());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"), // matches server static path
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Optional: split vendor code to reduce main bundle size
            react: ["react", "react-dom"],
          },
        },
      },
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
      watch: {
        usePolling: true, // useful in some containerized environments like Replit
      },
    },
  };
});