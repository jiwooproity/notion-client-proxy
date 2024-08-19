import fs from "fs";
import path from "path";

import { describe, it, expect } from "vitest";
import { Stream } from "stream";
import { createStream, syncAudioFile, syncDirectory } from "./sync-files";
import { PATH_ENUM, PATH } from "./sync-files";

describe("sync-files", () => {
  it("should return value object that stream instance is Stream and size type is number", () => {
    const value = createStream("Developer.mp3");
    expect(value.stream).toBeInstanceOf(Stream);
    expect(value.size).toBeTypeOf("number");
  });

  it("should return value object that path type is string and size type is number", () => {
    const value = syncAudioFile("Developer.mp3");
    expect(value.path).toBeTypeOf("string");
    expect(value.size).toBeTypeOf("number");
  });

  it("should return value is file list in target directory", () => {
    const value = syncDirectory();
    expect(value).toBeTypeOf("object");

    const fileList = fs.readdirSync(path.resolve(__dirname, `../${PATH[PATH_ENUM.AUDIO]}`));
    expect(value).toStrictEqual(fileList);
  });
});
