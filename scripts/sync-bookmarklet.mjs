import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const loaderPath = path.join(root, "bookmarklet-loader.js")
const sourcePath = path.join(root, "bookmarklet.js")
const htmlPaths = [
  "index.html",
  "lang/de-de/index.html",
  "lang/en-us/index.html",
  "lang/es-es/index.html",
  "lang/pt-br/index.html"
]

function collapseBookmarklet(source) {
  return source.replace(/^\s*\/\/.*$/gm, "").replace(/\s*\n\s*/g, "").replace(/\s{2,}/g, " ").trim()
}

const loader = await readFile(loaderPath, "utf8")
const version = loader.match(/const VERSION = "(\d+\.\d+\.\d+)"/)?.[1]
if (!version) throw new Error("Unable to read VERSION from bookmarklet-loader.js")

const source = await readFile(sourcePath, "utf8")
const code = `void ${collapseBookmarklet(source)}`
const href = `javascript:${code.replace(/%/g, "%25").replace(/ /g, "%20").replace(/#/g, "%23")}`
const htmlHref = href
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")

for (const relativePath of htmlPaths) {
  const filePath = path.join(root, relativePath)
  const original = await readFile(filePath, "utf8")
  const updated = original
    .replace(/href="javascript:[^"]*" class="btn"/, `href="${htmlHref}" class="btn"`)
    .replace(/\[instantgram \d+\.\d+\.\d+\]/, `[instantgram ${version}]`)
    .replace(/version-\d+\.\d+\.\d+-green/g, `version-${version}-green`)

  if (!/<a href="javascript:[^"]*" class="btn"/.test(updated)) {
    throw new Error(`Unable to find the bookmarklet button in ${relativePath}`)
  }
  if (updated !== original) await writeFile(filePath, updated)
}

const paramsPath = path.join(root, "params.json")
const params = JSON.parse(await readFile(paramsPath, "utf8"))
const encodedHref = `javascript:${encodeURIComponent(code)}`
params.body = params.body
  .replace(/version-\d+\.\d+\.\d+-green/g, `version-${version}-green`)
  .replace(/\[1\]:javascript:[^\r\n]*/, `[1]:${encodedHref}`)
await writeFile(paramsPath, `${JSON.stringify(params, null, 2)}\n`)
await writeFile(path.join(root, "safari-bookmarklet.txt"), `${href}\n`)

console.log(`Synced instantgram ${version} (${href.length} characters) into ${htmlPaths.length} pages and params.json`)
