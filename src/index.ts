import { Request, Response } from "express";

const { getMemoList, createMemo } = require("./memo/client");
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/memo", async (req: Request, res: Response) => {
  const data = await getMemoList();
  res.json(data);
});

app.post("/memo", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  await createMemo({ title, content });
  res.send({ status: 200 });
});

app.listen(port, console.log(`Server started on PORT: ${port}`));
