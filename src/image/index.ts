import { createReadStream, statSync } from "fs";
import path from "path";

const isProd = process.env.NODE_ENV == "production";
const imageBasePath = `${isProd ? "." : ".."}/storage/image`;

const getImage = (filename: string) => {
  const filePath = path.resolve(__dirname, `${imageBasePath}/${filename}.png`);
  const fileSync = statSync(filePath);
  const stream = createReadStream(filePath);
  return { stream, size: fileSync.size };
};

export { getImage };
