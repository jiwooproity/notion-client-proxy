import path from "path";
import cors from "cors";
import express from "express";
import compression from "compression";

import { isProduction } from "../utils";

class ServerInit {
  public origin: string;
  public port: number;
  public staticPath: string;
  public credentials: boolean;

  constructor() {
    this.origin = "";
    this.staticPath = "";
    this.credentials = true;
    this.port = (process.env.PORT || 8080) as number;
  }

  init() {
    this.origin = isProduction().getMode(["*", "https://www.jiwoo.so"]);
    this.staticPath = isProduction().getMode(["./public", "../../public"]);
    return this;
  }
}

const app = express();
const { origin, port, credentials, staticPath } = new ServerInit().init();

app.use(cors({ origin, credentials }));
app.use(compression());
app.use(express.static(path.join(__dirname, staticPath)));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export { app, port, origin };
