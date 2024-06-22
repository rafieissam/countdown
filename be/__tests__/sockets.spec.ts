import { Server, Socket } from 'socket.io';
import { runGlobalTimer, onSyncServer, syncClient, syncAllClients, registerSockets } from '../src/sockets';
import { Timer, GlobalTimers } from '../src/timer';

class MockServer {
  sockets = {
    fetchSockets: jest.fn().mockResolvedValue([new MockSocket()])
  };
  on = jest.fn();
}

class MockSocket {
  on = jest.fn();
  emit = jest.fn();
}

describe('Socket Handlers', () => {
  let mockServer: Server;

  beforeEach(() => {
    mockServer = new MockServer() as any as Server;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    GlobalTimers.set([]);
  });

  it('should decrement global timers every second', () => {
    const mockTimer: Timer = { id: '1', isPaused: false, seconds: 10 };
    GlobalTimers.set([mockTimer]);

    jest.useFakeTimers();
    runGlobalTimer(mockServer);

    jest.advanceTimersByTime(1000);
    expect(GlobalTimers.get()[0].seconds).toBe(9);
  });

  it('should update global timers and sync all clients', async () => {
    let mockIo = mockServer as any as Server;
    const mockSocket = new MockSocket();

    const newTimers: Timer[] = [{ id: '1', isPaused: false, seconds: 20 }];
    const newTimersStr = JSON.stringify(newTimers);

    onSyncServer(mockIo, newTimersStr);

    expect(GlobalTimers.getToStr()).toEqual(newTimersStr);

    const fetchSocketsMock = jest.fn().mockResolvedValue([mockSocket]);
    (mockIo as any).sockets = { fetchSockets: fetchSocketsMock } as any;

    await syncAllClients(mockIo);

    expect(mockSocket.emit).toHaveBeenCalledWith('sync_client', newTimersStr);
  });

  it('should sync client with global timers', () => {
    const mockSocket = new MockSocket() as any as Socket;

    GlobalTimers.set([{ id: '1', isPaused: false, seconds: 15 }]);

    syncClient(mockSocket);

    expect(mockSocket.emit).toHaveBeenCalledWith('sync_client', GlobalTimers.getToStr());
  });

  it('should sync all clients with global timers', async () => {
    const mockIo = mockServer as any as Server;
    const mockSocket1 = new MockSocket();
    const mockSocket2 = new MockSocket();

    const fetchSocketsMock = jest.fn().mockResolvedValue([mockSocket1, mockSocket2]);
    (mockIo as any).sockets = { fetchSockets: fetchSocketsMock } as any;

    GlobalTimers.set([{ id: '1', isPaused: false, seconds: 25 }]);

    await syncAllClients(mockIo);

    expect(fetchSocketsMock).toHaveBeenCalledTimes(1);
    expect(mockSocket1.emit).toHaveBeenCalledWith('sync_client', GlobalTimers.getToStr());
    expect(mockSocket2.emit).toHaveBeenCalledWith('sync_client', GlobalTimers.getToStr());
  });

  it('should register sockets and sync on connection', async () => {
    const mockIo = mockServer as any as Server;
    const mockSocket = new MockSocket();
    const timersStr = JSON.stringify([{ id: '1', isPaused: false, seconds: 30 }]);

    const fetchSocketsMock = jest.fn().mockResolvedValue([mockSocket]);
    (mockIo as any).sockets = { fetchSockets: fetchSocketsMock } as any;

    registerSockets(mockIo);

    expect(mockIo.on).toHaveBeenCalledTimes(1);

    const connectionCallback = (mockIo.on as jest.Mock).mock.calls.find(call => call[0] === 'connection')[1];
    connectionCallback(mockSocket);

    expect(mockSocket.emit).toHaveBeenCalledWith('sync_client', GlobalTimers.getToStr());

    const syncServerCallback = (mockSocket.on as jest.Mock).mock.calls.find(call => call[0] === 'sync_server')[1];
    await syncServerCallback(timersStr);

    expect(GlobalTimers.getToStr()).toEqual(timersStr);
    expect(mockSocket.emit).toHaveBeenCalledWith('sync_client', GlobalTimers.getToStr());
  });
});
