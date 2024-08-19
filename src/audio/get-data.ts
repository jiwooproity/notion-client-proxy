import { createStream, isProduction, syncDirectory } from "../utils";

function getAudioInfo(fileName: string) {
  const [name, type] = fileName.split(".");
  const url = isProduction().getMode(["https://api.jiwoo.so", "http://localhost:8080"]);
  const cover = `${url}/image/${name}.png`.replace(/(\s)/g, "%20");
  return { title: name, fileName, cover, type };
}

export function getMusic(fileName: string) {
  return createStream(`${fileName}.mp3`);
}

export function getMusicList() {
  const audioDir = syncDirectory();
  return audioDir.map(getAudioInfo);
}
