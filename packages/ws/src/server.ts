import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { WsConfig } from './config';

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: { origin: '*' },
});

io.on('connection', (socket: Socket) => {
    console.log(`client connected : ${socket.id}`);

    socket.on('ping', () => {
        socket.emit('pong');
    });

    socket.on('message', (msg: string) => {
        console.log('Received:', msg);
        socket.emit('message', `Echo: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = WsConfig.dev_port;
httpServer.listen(PORT, () => {
    console.log(`WebSocket server running at http://localhost:${PORT}`);
});
