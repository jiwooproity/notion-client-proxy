import { Request, Response } from "express";

const { getMemoList } = require("./memo/client");
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get("/memo-list", async (req: Request, res: Response) => {
  const data = await getMemoList();
  res.json(data);
});

app.listen(port, console.log(`Server started on PORT: ${port}`));
