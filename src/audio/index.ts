import { type Request, type Response, Router } from "express";
import { getMusic, getMusicList } from "./get-audio";
import { audioHeader, jsonHeader } from "../utils";

const router = Router();

router.get("/", async (req: Request<null, null, null, { filename: string }>, res: Response) => {
  if (req.query.filename) {
    try {
      const music = getMusic(req.query.filename);
      res.writeHead(200, audioHeader(music.size));
      music.stream.pipe(res);
    } catch (e) {
      res.header(jsonHeader);
      res.send({ status: 404, msg: "Not Found" });
    }
  } else {
    res.header(jsonHeader);
    res.send(getMusicList());
  }
});

export default router;
