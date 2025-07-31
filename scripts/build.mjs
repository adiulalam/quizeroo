import { build } from "esbuild";
import pkg from "../package.json" assert { type: "json" };

console.log("Starting to bundle the server...");

await build({
  // The entry point for your server application
  entryPoints: ["src/server/api/wssProdServer.ts"],

  // The final output file
  outfile: "dist/server.js",

  // Tells esbuild to resolve and include all imported files
  bundle: true,

  // Optimizes for the Node.js environment
  platform: "node",

  // Specifies the output format as ES Module
  format: "esm",

  // Excludes node_modules from the bundle, as they will be available at runtime
  // This is crucial for keeping the bundle size small
  external: Object.keys(pkg.dependencies),

  // Enables path aliases from your tsconfig
  tsconfig: "tsconfig.json",

  // Minify the code for production
  minify: true,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

console.log("Server bundled successfully at dist/server.js");
