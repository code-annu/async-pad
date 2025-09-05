import { io, Socket } from "socket.io-client";

// const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
const URL = "http://localhost:3000";

// Create the socket but don't connect immediately (we’ll connect with auth)
export const socket: Socket = io(URL, {
  autoConnect: false,
});
