import { Server, Socket } from 'socket.io';
import { Timer } from './timer';

let globalTimers: Timer[] = [];

const runGlobalTimer = (io: Server) => {
    setInterval(() => {
        globalTimers.forEach(t => {
            if (!t.isPaused) t.seconds--;
        });
        syncAllClients(io);
    }, 1000);
};

const onSyncServer = (io: Server, timersStr: string) => {
    const timers: Timer[] = JSON.parse(timersStr);
    globalTimers = timers;
    syncAllClients(io);
};

const syncClient = (socket: Socket) => {
    const timersStr = JSON.stringify(globalTimers);
    socket.emit('sync_client', timersStr);
}

const syncAllClients = (io: Server) => {
    const timersStr = JSON.stringify(globalTimers);
    io.sockets.fetchSockets().then(sockets => {
        sockets.forEach(socket => {
            socket.emit('sync_client', timersStr);
        });
    });
}

export const registerSockets = (io: Server) => {
    runGlobalTimer(io);

    io.on('connection', (socket: Socket) => {
        syncClient(socket);
        socket.on('sync_server', (payload: string) => onSyncServer(io, payload));
    });
};