import { defineConfig } from "vitest/config";
import packageJson from "./package.json";

export default defineConfig({
  test: {
    name: packageJson.name,
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
      exclude: ["src/**/index.ts", "src/socket/*", "src/folder/*", "src/config/*"],
    },
  },
});
