import { readdirSync, statSync, createReadStream } from "fs";
import path from "path";

const isProd = process.env.NODE_ENV == "production";
const audioBasePath = `${isProd ? "." : ".."}/storage/audio`;

const syncFile = (filename: string) => {
  const filePath = path.resolve(__dirname, `${audioBasePath}/${filename}`);
  const fileSync = statSync(filePath);
  return { path: filePath, size: fileSync.size };
};

const syncDir = () => {
  const filePath = path.resolve(__dirname, audioBasePath);
  return readdirSync(filePath);
};

const getMusic = (filename: string) => {
  const { path, size } = syncFile(`${filename}.mp3`);
  return { stream: createReadStream(path), size };
};

const getMusicList = () => {
  const audioDir = syncDir();

  const getAudioInfo = (file: string) => {
    const [filename, type] = file.split(".");
    const url = isProd ? "https://api.jiwoo.so" : "http://localhost:8080";

    return {
      title: filename,
      filename,
      cover: `${url}/image/${filename}`.replace(/(\s)/g, "%20"),
      type,
    };
  };

  return audioDir.map(getAudioInfo);
};

export { getMusic, getMusicList };
