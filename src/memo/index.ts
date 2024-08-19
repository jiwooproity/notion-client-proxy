import { type Request, type Response, Router } from "express";

import { addMemo, getMemo } from "./notion-query";
import { jsonHeader } from "../utils";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const data = await getMemo();
  res.header(jsonHeader);
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  await addMemo({ title, content });
  res.send({ status: 200 });
});

export default router;
