import { createServer } from "http";
import { Server } from "socket.io";

let ioServer: Server | null = null;

export const initIoServer = (httpServer: ReturnType<typeof createServer>) => {
  if (ioServer) {
    return ioServer;
  }

  ioServer = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  ioServer.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("room:join", (roomId) => {
      socket.join(roomId);
      socket.data = { roomId };
      console.log("socket joined room: ", roomId);
    });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", socket.id, reason);
    });
  });

  return ioServer;
};

export const io = (): Server => {
  if (!ioServer) {
    throw new Error(
      "Socket.IO not initialized - call initIo(httpServer) first."
    );
  }
  return ioServer;
};
