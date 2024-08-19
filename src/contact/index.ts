import { type Request, type Response, Router } from "express";
import { getContact } from "./get-contact";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(getContact());
});

export default router;
