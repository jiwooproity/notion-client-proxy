import { type Request, type Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "준비중" });
});

export default router;
