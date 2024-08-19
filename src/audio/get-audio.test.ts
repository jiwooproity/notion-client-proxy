import { describe, it, expect } from "vitest";

import { Stream } from "stream";
import { getMusic, getMusicList } from "./get-audio";

describe("get-audio", () => {
  it("should return value object that stream instance is Stream and size type is number", () => {
    const value = getMusic("Developer");

    expect(value.stream).instanceOf(Stream);
    expect(value.size).toBeTypeOf("number");
  });

  it("should return value object that image information", () => {
    const value = getMusicList();

    expect(value).toBeTypeOf("object");
    expect(value[0].cover).toBeTypeOf("string");
    expect(value[0].fileName).toBeTypeOf("string");
    expect(value[0].title).toBeTypeOf("string");
    expect(value[0].type).toBeTypeOf("string");
  });
});
