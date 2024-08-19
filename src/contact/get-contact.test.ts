import { describe, it, expect } from "vitest";
import { getContact } from "./get-contact";

describe("get-contact", () => {
  it("should return value object that have string type of blog, notion, email, websites", () => {
    const value = getContact();

    expect(value).toBeTypeOf("object");
    expect(value.blog).toBeTypeOf("string");
    expect(value.notion).toBeTypeOf("string");
    expect(value.email).toBeTypeOf("string");
    expect(value.websites).toHaveLength(3);

    for (let v of value.websites) {
      expect(v).toBeTypeOf("string");
    }
  });
});
