const VERSION = "5.2.8";
const SOURCE_URL = new URL("./bookmarklet.js", import.meta.url);

function collapseBookmarklet(source) {
  return source.replace(/^\s*\/\/.*$/gm, "").replace(/\s*\n\s*/g, "").replace(/\s{2,}/g, " ").trim();
}

async function loadBookmarkletHref() {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) throw new Error(`Unable to load ${SOURCE_URL}`);
  const source = await response.text();
  const code = `void ${collapseBookmarklet(source)}`;
  return `javascript:${code.replace(/%/g, "%25").replace(/ /g, "%20").replace(/#/g, "%23")}`;
}

function updatePage(href) {
  for (const button of document.querySelectorAll("a.btn")) {
    button.href = href;
    button.textContent = `[instantgram ${VERSION}]`;
  }

  const versionBadge = document.querySelector('img[alt="version"]');
  if (versionBadge) {
    versionBadge.src = `https://img.shields.io/badge/version-${VERSION}-green.svg?style=flat-square`;
  }
}

loadBookmarkletHref()
  .then(updatePage)
  .catch((error) => console.error("[instantgram]", VERSION, "bookmarklet-loader", error));
