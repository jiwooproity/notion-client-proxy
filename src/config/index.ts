const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();

const local = "*";
const prod = "https://www.jiwoo.so/";
const isProduction = process.env.NODE_ENV == "production";
const origin = isProduction ? prod : local;

const corsOptions = { origin, credentials: true };

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export { app, port, origin };
