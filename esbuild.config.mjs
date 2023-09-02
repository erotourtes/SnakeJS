import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/main.js"],
    bundle: true,
    outfile: "./dist/main.js",
    minify: true,
  })
  .catch(() => process.exit(1));
