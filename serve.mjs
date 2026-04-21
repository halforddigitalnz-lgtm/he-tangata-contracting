import { createServer } from 'http';
import { readFile } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer((req, res) => {
    let filePath = join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = extname(filePath);

    let contentType = 'text/html';
    switch (ext) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
        case '.jpg':
        case '.jpeg':
        case '.gif':
        case '.heic':
            contentType = 'image/' + ext.slice(1);
            break;
    }

    readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});