const root = import.meta.dir;
const port = Number(process.env.PORT || 5173);
const hostname = process.env.HOST || "127.0.0.1";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function cleanPath(pathname) {
  const decoded = decodeURIComponent(pathname === "/" ? "/index.html" : pathname);
  const segments = decoded.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "..")) return null;
  return `${root}/${segments.join("/")}`;
}

Bun.serve({
  hostname,
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const filePath = cleanPath(url.pathname);
    if (!filePath) return new Response("Not found", { status: 404 });

    const file = Bun.file(filePath);
    if (!(await file.exists())) return new Response("Not found", { status: 404 });

    const extension = filePath.slice(filePath.lastIndexOf("."));
    return new Response(file, {
      headers: {
        "content-type": mime[extension] || "application/octet-stream",
        "cache-control": "no-store",
      },
    });
  },
});

console.log(`HTML in Canvas Cloth running at http://${hostname}:${port}`);
