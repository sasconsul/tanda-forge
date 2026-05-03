const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;
const HOST = "0.0.0.0";
const DIST_RENDERER = path.join(__dirname, "dist", "renderer");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.join(DIST_RENDERER, urlPath);
  const ext = path.extname(filePath);
  const mimeType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error");
      }
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeType,
      "Cache-Control": "no-cache",
      "X-Frame-Options": "ALLOWALL",
    });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Tanda Forge preview server running at http://${HOST}:${PORT}`);
  console.log(
    "Note: This is a static HTML preview of the Electron renderer. Full functionality requires the Electron desktop app."
  );
});
