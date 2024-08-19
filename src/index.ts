import { Socket } from "socket.io";
import { app, port, server, io } from "./config";

// Router
import memo from "./memo";
import audio from "./audio";
import contact from "./contact";

app.use("/memo", memo);
app.use("/audio", audio);
app.use("/contact", contact);

io.on("connection", (socket: Socket) => {
  socket.on("insert", () => {
    socket.broadcast.emit("alert");
  });
});

server.listen(port, console.log(`Server started on http://localhost:${port}/`));
