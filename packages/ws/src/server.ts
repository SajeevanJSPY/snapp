import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { WsEvents } from './events';

export function setupWs(server: HttpServer) {
    const io = new Server(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket: Socket) => {
        console.log(`total clients : ${io.engine.clientsCount}`);
        console.log(`client connected : ${socket.id}`);

        socket.on('ping', () => {
            socket.emit('pong');
        });

        socket.on(WsEvents.message, (msg: string) => {
            console.log('received message:', msg);
            socket.emit('message', `Echo: ${msg}`);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
