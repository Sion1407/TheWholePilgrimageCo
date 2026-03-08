// server/static.ts
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: express.Express) {
  const distPath = path.resolve(__dirname, "../dist/public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve static files first
  app.use(express.static(distPath));

  // SPA fallback: serve index.html for any request that didn't match a static file
  app.use((req, res, next) => {
    // Only handle GET requests
    if (req.method !== "GET") return next();

    // Check if request matches a file in dist
    const potentialFile = path.join(distPath, req.path);
    if (fs.existsSync(potentialFile) && fs.statSync(potentialFile).isFile()) {
      return next(); // file exists, serve normally
    }

    // Otherwise, serve index.html
    res.sendFile(path.join(distPath, "index.html"));
  });
}