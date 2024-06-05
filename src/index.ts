import { Request, Response } from "express";
import { Socket } from "socket.io";

import { app, port } from "./config";
import { io, server } from "./socket";
import { getMemo, addMemo } from "./memo";
import { getMusic, getMusicList } from "./music";

const audioHeader = (size: number) => ({
  "Accept-Ranges": "bytes",
  "Content-Type": "audio/mpeg",
  "Content-Length": size,
});

const jsonHeader = {
  "Cache-Control": "public, max-age=60",
  "Content-Type": "application/json",
};

app.get("/memo", async (req: Request, res: Response) => {
  const data = await getMemo();
  res.header(jsonHeader);
  res.json(data);
});

app.post("/memo", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  await addMemo({ title, content });
  res.send({ status: 200 });
});

app.get("/audio", async (req: Request, res: Response) => {
  const { filename } = req.query as { filename: string };

  const getAudioSearch = (filename: string) => {
    try {
      const { stream, size } = getMusic(filename);
      res.writeHead(200, audioHeader(size));
      stream.pipe(res);
    } catch (e) {
      res.header(jsonHeader);
      res.send({ status: 404, msg: "Not found" });
    }
  };

  const getAudioList = () => {
    const fileList = getMusicList();
    res.header(jsonHeader);
    res.send(fileList);
  };

  if (filename) getAudioSearch(filename);
  else getAudioList();
});

io.on("connection", (socket: Socket) => {
  socket.on("insert", () => {
    socket.broadcast.emit("alert");
  });
});

server.listen(port, console.log(`Server started on PORT: ${port}`));
