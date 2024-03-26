import { app, origin } from "../config";

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin, methods: ["GET", "POST"] },
});

export { server, io };
