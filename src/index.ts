import { Socket } from "socket.io";

import { app, port } from "./config";
import { io, server } from "./socket";

// Router
import memo from "./memo";
import audio from "./audio";
import folder from "./folder";

app.use("/memo", memo);
app.use("/audio", audio);
app.use("/folder", folder);

io.on("connection", (socket: Socket) => {
  socket.on("insert", () => {
    socket.broadcast.emit("alert");
  });
});

server.listen(port, console.log(`Server started on PORT: ${port}`));
