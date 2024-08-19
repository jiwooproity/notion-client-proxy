import { describe, it, expect } from "vitest";

import { getMemo } from "./notion-query";

describe("notion-query", () => {
  it("should get databases columns data", async () => {
    const value = await getMemo();

    expect(value).toBeTypeOf("object");
    expect(value[0].title).toBeTypeOf("string");
    expect(value[0].content).toBeTypeOf("string");
    expect(value[0].date).toBeTypeOf("string");
    expect(value[0].reaction).toBeTypeOf("string");
  });
});
