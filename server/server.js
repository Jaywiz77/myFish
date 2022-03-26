const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const gameport = process.env.PORT || 5000;

const GAME_EVENT = "GAME EVENT";
const SPECIAL_EVENT = "SPECIAL EVENT";
const DISCONNECT_EVENT = "DISCONNECT EVENT";

const specialEvents = {
    SYNC_STATE: "SYNC STATE"
}

// When client connects
io.on("connection", socket => {
    console.log(`Client id ${socket.id} connected`);

    socket.on(GAME_EVENT, action => {
        io.emit(GAME_EVENT, action)
    });

    socket.on(SPECIAL_EVENT, action => {
        switch (action.type) {
            case specialEvents.SYNC_STATE:
                console.log(`[${SPECIAL_EVENT}] ${action.type} | ${socket.id} ping ${action.playerid}`);
                io.to(action.playerid).emit(SPECIAL_EVENT, {
                    ...action
                });
                break;
            default:
                break;
        }
    });

    // When client disconnects
    socket.on("disconnecting", () => {
        console.log(`Client id ${socket.id} disconnecting`)
        io.emit(DISCONNECT_EVENT, socket.id);
    });
});

server.listen(gameport, () => {
    console.log(`App listening on port ${gameport}`);
});