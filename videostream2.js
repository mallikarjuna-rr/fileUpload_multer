const express = require('express')
const http = require('http')
const fs = require('fs')

const app = express()

const server = http.createServer((req, res) => {
    const videoPath = "C:/Users/MallikarjunaReddyRam/Videos/Boat.mp4"

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    console.log("file...", fileSize)

    // Set response headers
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': fileSize,
        'Accept-Ranges': 'bytes',
    });

    // Create read stream to read video file
    const readStream = fs.createReadStream(videoPath);

    // Stream chunks to response
    readStream.on('data', (chunk) => {
        // console.log("chunk...", chunk)
        res.write(chunk);
    });

    readStream.on('end', () => {
        res.end();
    });

    // Handle errors
    readStream.on('error', (err) => {
        console.error('Error streaming video:', err);
        res.statusCode = 500;
        res.end('Internal server error');
    });
})

const port = 3000; // Port on which the server will listen
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
