import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { isProduction } from "./get-enviroment";

dotenv.config();

enum PATH_ENUM {
  AUDIO,
  IMAGE,
}

const PATH: { [key in PATH_ENUM]: string } = {
  [PATH_ENUM.AUDIO]: process.env.AUDIO_BASE_PATH as string,
  [PATH_ENUM.IMAGE]: process.env.IMAGE_BASE_PATH as string,
};

export function createStream(fileName: string) {
  const audio = syncAudioFile(fileName);
  return { stream: fs.createReadStream(audio.path), size: audio.size };
}

export function syncAudioFile(fileName: string) {
  const start = isProduction().getMode([".", ".."]);
  const destination = path.resolve(__dirname, `${start}/${PATH[PATH_ENUM.AUDIO]}/${fileName}`);
  const info = fs.statSync(destination);
  return { path: destination, size: info.size };
}

export function syncDirectory() {
  const start = isProduction().getMode([".", ".."]);
  const destination = path.resolve(__dirname, `${start}/${PATH[PATH_ENUM.AUDIO]}`);
  return fs.readdirSync(destination);
}
