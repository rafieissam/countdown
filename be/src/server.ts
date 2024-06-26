import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { registerSockets } from './sockets';

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to the Socket API for Countdown App");
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:4200", "http://db7cgvxs2naqk.cloudfront.net"],
        methods: ["GET", "POST"]
    }
});

registerSockets(io);

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
