export const audioHeader = (size: number) => ({
  "Accept-Ranges": "bytes",
  "Content-Type": "audio/mpeg",
  "Content-Length": size,
});

export const jsonHeader = {
  "Cache-Control": "public, max-age=60",
  "Content-Type": "application/json",
};
