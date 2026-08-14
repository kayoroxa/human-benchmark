const http = require('http');
const { readFile, stat } = require('fs/promises');
const { extname, resolve, sep } = require('path');

const port = Number(process.env.PORT) || 3000;
const root = resolve(__dirname);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function send(response, status, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(status, { 'Content-Type': contentType });
  response.end(body);
}

http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    send(response, 405, 'Method Not Allowed');
    return;
  }

  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  let filePath = resolve(root, `.${pathname}`);

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    send(response, 403, 'Forbidden');
    return;
  }

  try {
    if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, 'index.html');
    const body = await readFile(filePath);
    const contentType = contentTypes[extname(filePath)] || 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    send(response, 404, 'Not Found');
  }
}).listen(port, () => {
  console.log(`Benchmarks: http://localhost:${port}`);
});
