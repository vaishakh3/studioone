import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("./", import.meta.url));
const output = fileURLToPath(new URL("../../public/docs/chi/", import.meta.url));
const snapshotBytes = readFileSync(join(source, "godoc.json"));
const snapshot = JSON.parse(snapshotBytes);
const evidence = JSON.parse(readFileSync(join(output, "evidence.json"), "utf8"));
const publicOrigin = "https://www.thestudioone.xyz";
const base = "/docs/chi/";
const counts = snapshot.packages.reduce(
  (total, pkg) => ({
    functions: total.functions + pkg.funcs.length,
    types: total.types + pkg.types.length,
    methods: total.methods + pkg.types.reduce((n, type) => n + type.methods.length, 0),
  }),
  { functions: 0, types: 0, methods: 0 },
);
assert.deepEqual(counts, evidence.coverage);
assert.ok(counts.functions + counts.methods >= 20);
assert.equal(
  createHash("sha256").update(snapshotBytes).digest("hex"),
  evidence.snapshot_sha256,
);
assert.equal(snapshot.source, "sourcey-godoc");
assert.equal(snapshot.module_path, "github.com/go-chi/chi/v5");

const pages = new Map();
for (const entry of readdirSync(output, { recursive: true, withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".html")) {
    const path = join(entry.parentPath, entry.name);
    pages.set(path, readFileSync(path, "utf8"));
  }
}
assert.ok(pages.size >= 3);
for (const [path, html] of pages) {
  const pageUrl = new URL(base + relative(output, path), publicOrigin);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = new URL(href.replaceAll("&amp;", "&"), pageUrl);
    if (target.origin !== publicOrigin || !target.pathname.startsWith(base)) continue;
    const pathPart = decodeURIComponent(target.pathname.slice(base.length));
    const destination = join(output, pathPart, target.pathname.endsWith("/") ? "index.html" : "");
    assert.ok(existsSync(destination), `${relative(output, path)}: missing ${href}`);
    if (target.hash && pages.has(destination)) {
      const anchor = decodeURIComponent(target.hash.slice(1));
      assert.ok(
        pages.get(destination).includes(`id="${anchor}"`),
        `${relative(output, path)}: missing anchor ${href}`,
      );
    }
  }
}

const rendered = [...pages.values()].join("\n");
for (const pkg of snapshot.packages) {
  for (const symbol of [...pkg.funcs, ...pkg.types, ...pkg.types.flatMap(type => type.methods)]) {
    assert.ok(rendered.includes(symbol.name), `Missing symbol: ${symbol.name}`);
    if (!symbol.position) continue;
    const { file, line } = symbol.position;
    const url = `${evidence.repository}/blob/${evidence.commit}/${file}#L${line}`;
    assert.ok(rendered.includes(url), `Missing pinned source link: ${symbol.name}`);
  }
}
assert.ok(readFileSync(join(output, "LICENSE.txt"), "utf8").includes("Peter Kieltyka"));
assert.ok(readFileSync(join(output, "search-index.json"), "utf8").includes("Timeout"));
assert.ok(readFileSync(join(output, "llms-full.txt"), "utf8").includes("RequestSize"));
console.log(`Verified ${pages.size} pages and ${counts.functions + counts.types + counts.methods} API entries.`);
