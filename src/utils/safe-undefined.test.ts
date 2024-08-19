import { describe, it, expect } from "vitest";
import { safeUndefined } from "./safe-undefined";

describe("safe-undefined", () => {
  it("should return value type to empty string", () => {
    const object = {};
    const value = safeUndefined<typeof object, typeof undefined>(object, "info.name", "");
    expect(value).toBe("");
  });

  it("should return value is user name", () => {
    const object = { info: { name: "james" } };
    const value = safeUndefined<typeof object, typeof undefined>(object, "info.name", "");
    expect(value).toBe("james");
  });
});
