const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = __dirname;
const port = Number(process.env.PORT) || 3000;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.htm': 'text/html; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

function send(res, statusCode, body, contentType, cacheControl) {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': cacheControl
  });
  res.end(body);
}

function safeResolve(requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split('?')[0]);
  const normalizedPath = path.normalize(decodedPath).replace(/^([.]{2}[\/\\])+/, '');
  const absolutePath = path.join(rootDir, normalizedPath);
  if (!absolutePath.startsWith(rootDir)) return null;
  return absolutePath;
}

http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  let filePath = safeResolve(urlPath);

  if (!filePath) {
    send(res, 400, 'Bad Request', 'text/plain; charset=utf-8', 'no-store');
    return;
  }

  fs.stat(filePath, (statErr, stats) => {
    if (!statErr && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        if (path.extname(filePath) === '' && !filePath.endsWith(`${path.sep}index.html`)) {
          const fallbackPath = path.join(rootDir, 'index.html');
          fs.readFile(fallbackPath, (fallbackErr, fallbackData) => {
            if (fallbackErr) {
              send(res, 404, 'Not Found', 'text/plain; charset=utf-8', 'no-store');
              return;
            }
            send(res, 200, fallbackData, 'text/html; charset=utf-8', 'no-cache');
          });
          return;
        }

        send(res, 404, 'Not Found', 'text/plain; charset=utf-8', 'no-store');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = contentTypes[ext] || 'application/octet-stream';
      const cacheControl = ext === '.html' || ext === '.js'
        ? 'no-cache'
        : 'public, max-age=31536000, immutable';

      send(res, 200, data, contentType, cacheControl);
    });
  });
}).listen(port, () => {
  console.log(`Static site server listening on http://127.0.0.1:${port}`);
});