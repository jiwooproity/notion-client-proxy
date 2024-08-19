import { type Request, type Response, Router } from "express";
import { getMusic, getMusicList } from "./get-audio";
import { audioHeader, jsonHeader } from "../utils/get-header";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { filename } = req.query as { filename: string };

  const getAudioSearch = (filename: string) => {
    try {
      const { stream, size } = getMusic(filename);
      res.writeHead(200, audioHeader(size));
      stream.pipe(res);
    } catch (e) {
      res.header(jsonHeader);
      res.send({ status: 404, msg: "Not found" });
    }
  };

  const getAudioList = () => {
    const fileList = getMusicList();
    res.header(jsonHeader);
    res.send(fileList);
  };

  if (filename) getAudioSearch(filename);
  else getAudioList();
});

export default router;
