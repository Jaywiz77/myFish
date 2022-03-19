import socket, { GAME_EVENT } from "."
import { SETUP_ID } from "../store/actions";

export default function registerGame() {
    return dispatch => {
        // Socket.io will send socket info on connect
        socket.on("connect", () => dispatch({
            type: SETUP_ID,
            id: socket.id
        }));

        socket.on(GAME_EVENT, action => dispatch(action));
    }
}