import { Request, Response } from "express";
import { Socket } from "socket.io";

const { getMemoList, createMemo } = require("./memo/client");
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.get("/memo", async (req: Request, res: Response) => {
  const data = await getMemoList();
  res.json(data);
});

app.post("/memo", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  await createMemo({ title, content });
  res.send({ status: 200 });
});

io.on("connection", (socket: Socket) => {
  socket.on("insert", () => {
    socket.broadcast.emit("alert");
  });
});

server.listen(port, console.log(`Server started on PORT: ${port}`));
