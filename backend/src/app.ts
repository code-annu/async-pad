import express from "express";
import { createServer } from "http";
import { connectDB } from "./config/db";
import { authRouter } from "./api/router/auth-router";
import { docfileRouter } from "./api/router/docfile-router";
import { validateToken } from "./api/middleware/validate-token";
import { invitationRouter } from "./api/router/invitation-router";
import { userRouter } from "./api/router/user-router";
import { initIoServer } from "./config/io-server";
import Request from "../src/types/express/index";

import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
initIoServer(server);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you're sending cookies or auth headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/documents", validateToken, docfileRouter);
app.use("/api/invitations", validateToken, invitationRouter);
app.use("/api/users/:username", validateToken, userRouter);

const PORT = 3000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening at: http://localhost:${PORT}/api`);
  });
});
