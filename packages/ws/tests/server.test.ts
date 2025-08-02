import { createServer, Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';

let io: IOServer;
let httpServer: HttpServer;

beforeAll(done => {
    httpServer = createServer();
    io = new IOServer(httpServer, { cors: { origin: '*' } });

    io.on('connection', socket => {
        socket.on('ping', () => {
            socket.emit('pong');
        });
    });

    httpServer.listen(4000, done);
});

afterAll(done => {
    io.close();
    httpServer.close(done);
});

test('client should receive pong after ping', done => {
    const socket: ClientSocket = Client('http://localhost:4000');

    socket.on('connect', () => {
        socket.emit('ping');
    });

    socket.on('pong', () => {
        socket.disconnect();
        done();
    });
});
