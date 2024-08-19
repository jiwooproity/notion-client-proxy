import { describe, it, expect } from "vitest";
import { audioHeader } from "./get-header";

describe("get-header", () => {
  it("should return audio header to content-length: 1", () => {
    const value = audioHeader(1);

    expect(value).toStrictEqual({
      "Accept-Ranges": "bytes",
      "Content-Type": "audio/mpeg",
      "Content-Length": 1,
    });
  });
});
