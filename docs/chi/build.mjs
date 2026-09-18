import { execFileSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../../public/docs/chi/", import.meta.url));
rmSync(output, { recursive: true, force: true });
execFileSync(
  process.execPath,
  [
    fileURLToPath(new URL("../../node_modules/sourcey/dist/cli.js", import.meta.url)),
    "build",
    "--config",
    fileURLToPath(new URL("./sourcey.config.ts", import.meta.url)),
    "--output",
    output,
  ],
  { stdio: "inherit" },
);
cpSync(
  fileURLToPath(new URL("./public/", import.meta.url)),
  output,
  { recursive: true },
);
