import { Request, Response } from "express";
import { Socket } from "socket.io";

import { app, port } from "./config";
import { io, server } from "./socket";
import { getMemo, addMemo } from "./memo";

app.get("/memo", async (req: Request, res: Response) => {
  const data = await getMemo();
  res.json(data);
});

app.post("/memo", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  await addMemo({ title, content });
  res.send({ status: 200 });
});

io.on("connection", (socket: Socket) => {
  socket.on("insert", () => {
    socket.broadcast.emit("alert");
  });
});

server.listen(port, console.log(`Server started on PORT: ${port}`));
