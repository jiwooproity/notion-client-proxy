import { describe, expect, it, vi } from "vitest";
import { isProduction } from "./get-enviroment";

describe("get-enviroment", () => {
  it("should return value is dev", () => {
    vi.stubEnv("NODE_ENV", "development");
    const value = isProduction().getMode(["prod", "dev"]);

    expect(value).toBe("dev");
  });

  it("should return value is prod", () => {
    vi.stubEnv("NODE_ENV", "production");

    const value = isProduction().getMode(["prod", "dev"]);

    expect(value).toBe("prod");
  });
});
