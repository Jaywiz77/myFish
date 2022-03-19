import socket, { GAME_EVENT } from ".";

export function broadcastToAll(action) {
    socket.emit(GAME_EVENT, action);
}