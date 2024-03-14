const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const CHUNK_SIZE = 1024 * 1024; // 1 MB in bytes

const server = http.createServer((req, res) => {
    const videoPath = 'path_to_your_video'; // Update this with the path to your video file

    // Determine content type based on file extension
    const contentType = mime.lookup(videoPath);
    if (!contentType || !contentType.startsWith('video/')) {
        res.statusCode = 400;
        res.end('Unsupported file format');
        return;
    }

    // Set response headers
    res.writeHead(200, {
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
    });

    // Create read stream to read video file
    const readStream = fs.createReadStream(videoPath, { highWaterMark: CHUNK_SIZE });

    // Stream chunks to response
    readStream.on('data', (chunk) => {
        res.write(chunk);
    });

    // End response when all chunks are streamed
    readStream.on('end', () => {
        res.end();
    });

    // Handle errors
    readStream.on('error', (err) => {
        console.error('Error streaming video:', err);
        res.statusCode = 500;
        res.end('Internal server error');
    });
});

const port = 3000; // Port on which the server will listen
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
