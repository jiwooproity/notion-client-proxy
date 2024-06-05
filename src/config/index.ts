import express from "express";
import compression from "compression";
import cors from "cors";
import path from "path";

const port = process.env.PORT || 8080;
const app = express();

const local = "*";
const prod = "https://www.jiwoo.so";
const isProduction = process.env.NODE_ENV == "production";
const origin = isProduction ? prod : local;

const corsOptions = { origin, credentials: true };

app.use(cors(corsOptions));
app.use(compression());
app.use(express.static(path.join(__dirname, isProduction ? "./public" : "../../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export { app, port, origin };
