import { io } from "socket.io-client";

const socket = process.env.NODE_ENV === "production" ? io() : io("http://localhost:5000");

// Event names
export const GAME_EVENT = "GAME EVENT";

export default socket;