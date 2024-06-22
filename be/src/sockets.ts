import { Server, Socket } from 'socket.io';
import { GlobalTimers } from './timer';

export const runGlobalTimer = (io: Server) => {
    setInterval(() => {
        GlobalTimers.get().forEach(t => {
            if (!t.isPaused && t.seconds > 0) t.seconds--;
            console.log('dec')
        });
        syncAllClients(io);
    }, 1000);
};

export const onSyncServer = (io: Server, timersStr: string) => {
    GlobalTimers.setFromStr(timersStr);
    syncAllClients(io);
};

export const syncClient = (socket: Socket) => {
    const timersStr = GlobalTimers.getToStr();
    socket.emit('sync_client', timersStr);
}

export const syncAllClients = (io: Server) => {
    const timersStr = GlobalTimers.getToStr();
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