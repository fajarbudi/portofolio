// Menyisipkan HTML hasil render React ke dist/index.html agar konten
// lengkap terbaca oleh Google & crawler AI tanpa menjalankan JavaScript.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distIndex = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const html = fs.readFileSync(distIndex, "utf-8");
const rootRe = /<div id="root">[\s\S]*?<!--\/static-fallback-->\s*<\/div>/;
if (!rootRe.test(html)) {
  throw new Error("Penanda #root tidak ditemukan di dist/index.html");
}

const out = html.replace(rootRe, () => `<div id="root" data-ssr>${render()}</div>`);
fs.writeFileSync(distIndex, out);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log("Prerender selesai: dist/index.html");
