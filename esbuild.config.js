const { build } = require("esbuild");
const { copy } = require("esbuild-plugin-copy");

build({
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/client.js",
  platform: "node",
  bundle: true,
  minify: true,
  plugins: [
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: ["./src/storage/**/*"],
          to: ["./dist/storage"],
        },
      ],
    }),
  ],
});
