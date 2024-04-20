import { createReadStream, statSync } from "fs";
import path from "path";

const imageBasePath = "../storage/image";

const getImage = (filename: string) => {
  const filePath = path.resolve(__dirname, `${imageBasePath}/${filename}.png`);
  const fileSync = statSync(filePath);
  const stream = createReadStream(filePath);
  return { stream, size: fileSync.size };
};

export { getImage };
