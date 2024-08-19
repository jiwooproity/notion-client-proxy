import path from "path";
import cors from "cors";
import express from "express";
import compression from "compression";
import { isProduction } from "../utils";

const port = process.env.PORT || 8080;
const app = express();
const origin = isProduction().getMode(["*", "https://www.jiwoo.so"]);
const staticPath = isProduction().getMode(["./public", "../../public"]);

app.use(cors({ origin: origin, credentials: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, staticPath)));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin, methods: ["GET", "POST"] },
});

export { app, port, origin, server, io };
