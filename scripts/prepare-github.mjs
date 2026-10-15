import { cp, access, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".next-build");
await access(path.join(output, "index.html"));
// Copy only generated public files; never replace source files or Git history.
for (const name of ["index.html", "index.txt", "404.html", "_next", "images", "videos", "resume.docx", "resume.pdf"]) {
  const source = path.join(output, name);
  try { await access(source); }
  catch (error) { if (error.code === "ENOENT") continue; throw error; }
  await cp(source, path.join(root, name), { recursive: true });
}
await writeFile(path.join(root, ".nojekyll"), "\n");
console.log("GitHub Pages files updated in the repository root. Source files and .git were preserved.");
