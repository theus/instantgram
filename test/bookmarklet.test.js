const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const test = require("node:test")
const vm = require("node:vm")

const root = path.resolve(__dirname, "..")
const readableSource = fs.readFileSync(path.join(root, "bookmarklet.js"), "utf8")
const source = readableSource.replace(/^\s*\/\/.*$/gm, "").replace(/\s*\n\s*/g, "").replace(/\s{2,}/g, " ").trim()
const installedSource = `void ${source}`
const installedHref = `javascript:${installedSource.replace(/%/g, "%25").replace(/ /g, "%20").replace(/#/g, "%23")}`
const installedHtmlHref = installedHref.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

class MediaElement {
  constructor({ tagName, src = "", srcset = "", alt = "", width, height, rect, link = null }) {
    this.tagName = tagName
    this.currentSrc = src
    this.src = src
    this.srcset = srcset
    this.alt = alt
    this.width = width
    this.height = height
    this.rect = rect
    this.link = link
  }

  getBoundingClientRect() {
    return this.rect
  }

  closest(selector) {
    if (selector === "header,nav,aside") return null
    if (selector.startsWith("a[")) return this.link
    if (selector.startsWith("article,")) return this.link ? { querySelector: () => this.link } : null
    return null
  }
}

async function runBookmarklet({
  hostname = "www.instagram.com",
  pathname = "/",
  media = [],
  resources = [],
  html = "",
  popupBlocked = false
} = {}) {
  const href = `https://${hostname}${pathname}`
  const alerts = []
  const fetches = []
  const popup = popupBlocked
    ? null
    : { closed: false, location: "", opener: {}, close() { this.closed = true } }
  const document = {
    querySelectorAll(selector) {
      if (selector === "video,img") return media
      return []
    },
    querySelector() {
      return null
    }
  }
  const context = {
    URL,
    atob,
    alert: message => alerts.push(message),
    document,
    fetch: async url => {
      fetches.push(url)
      return { text: async () => html }
    },
    innerHeight: 800,
    innerWidth: 1000,
    location: { hostname, href, pathname },
    open: () => popup,
    performance: { getEntriesByType: () => resources.map(name => ({ name })) },
    DOMParser: class {
      parseFromString() {
        return { querySelectorAll: () => [] }
      }
    }
  }

  await vm.runInNewContext(source, context)
  return { alerts, fetches, popup }
}

test("selects the centered image instead of any visible video and uses its largest srcset", async () => {
  const link = { href: "https://www.instagram.com/p/current/" }
  const image = new MediaElement({
    tagName: "IMG",
    src: "https://scontent.cdninstagram.com/medium.jpg",
    srcset: "https://scontent.cdninstagram.com/small.jpg 320w, https://scontent.cdninstagram.com/original.jpg 1440w",
    width: 600,
    height: 600,
    rect: { left: 200, right: 800, top: 100, bottom: 700 },
    link
  })
  const video = new MediaElement({
    tagName: "VIDEO",
    src: "https://scontent.cdninstagram.com/unrelated.mp4",
    width: 500,
    height: 200,
    rect: { left: 100, right: 600, top: 740, bottom: 940 }
  })

  const result = await runBookmarklet({ media: [video, image] })

  assert.equal(result.popup.location, "https://scontent.cdninstagram.com/original.jpg")
  assert.equal(result.fetches.length, 0)
  assert.deepEqual(result.alerts, [])
})

test("opens a loaded reel video, excluding its audio-only resource and byte range", async () => {
  const videoEfg = encodeURIComponent(Buffer.from('{"encode_tag":"dash_video"}').toString("base64"))
  const audioEfg = encodeURIComponent(Buffer.from('{"encode_tag":"dash_audio"}').toString("base64"))
  const videoUrl = `https://scontent.cdninstagram.com/video.mp4?efg=${videoEfg}&_nc_ht=old.example&bytestart=10&byteend=99`
  const audioUrl = `https://scontent.cdninstagram.com/audio.mp4?efg=${audioEfg}&bytestart=0&byteend=9`
  const media = [new MediaElement({
    tagName: "VIDEO",
    src: "blob:https://www.instagram.com/123",
    width: 400,
    height: 600,
    rect: { left: 300, right: 700, top: 100, bottom: 700 }
  })]

  const result = await runBookmarklet({ pathname: "/reel/example/", media, resources: [videoUrl, audioUrl] })
  const opened = new URL(result.popup.location)

  assert.equal(opened.pathname, "/video.mp4")
  assert.equal(opened.searchParams.get("_nc_ht"), "scontent.cdninstagram.com")
  assert.equal(opened.searchParams.has("bytestart"), false)
  assert.equal(opened.searchParams.has("byteend"), false)
  assert.equal(result.fetches.length, 0)
})

test("parses fallback metadata regardless of meta attribute order", async () => {
  const html = '<meta content="https://scontent.cdninstagram.com/photo.jpg?x=1&amp;y=2" property="og:image">'
  const result = await runBookmarklet({ pathname: "/p/example/", html })

  assert.equal(result.popup.location, "https://scontent.cdninstagram.com/photo.jpg?x=1&y=2")
  assert.equal(result.fetches.length, 1)
})

test("uses the visible story image instead of profile metadata", async () => {
  const image = new MediaElement({
    tagName: "IMG",
    src: "https://scontent.cdninstagram.com/story.jpg",
    width: 400,
    height: 700,
    rect: { left: 300, right: 700, top: 50, bottom: 750 }
  })
  const html = '<meta property="og:image" content="https://scontent.cdninstagram.com/t51.2885-19/profile.jpg">'
  const result = await runBookmarklet({ pathname: "/stories/user/123/", media: [image], html })

  assert.equal(result.popup.location, "https://scontent.cdninstagram.com/story.jpg")
  assert.equal(result.fetches.length, 1)
})

test("rejects lookalike Instagram hostnames", async () => {
  const result = await runBookmarklet({ hostname: "evilinstagram.com" })

  assert.equal(result.popup.closed, true)
  assert.deepEqual(result.alerts, ["[instantgram] only works on instagram.com."])
})

test("reports a blocked popup", async () => {
  const result = await runBookmarklet({ popupBlocked: true })

  assert.deepEqual(result.alerts, ["[instantgram] Please allow popups for instagram.com."])
})

test("installed javascript URL returns undefined for Safari", () => {
  const popup = { close() {} }
  const result = vm.runInNewContext(installedSource, {
    URL,
    alert() {},
    document: { querySelectorAll: () => [] },
    location: { hostname: "example.com", href: "https://example.com/", pathname: "/" },
    open: () => popup
  })

  assert.equal(result, undefined)
})

test("Safari payload stays compact and decodes to the tested source", () => {
  assert.ok(installedHref.length < 4500, `bookmarklet is ${installedHref.length} characters`)
  assert.equal(installedHref.includes("#"), false)
  assert.equal(/\s/.test(installedHref), false)
  assert.equal(decodeURIComponent(installedHref.slice("javascript:".length)), installedSource)
  assert.equal(fs.readFileSync(path.join(root, "safari-bookmarklet.txt"), "utf8"), `${installedHref}\n`)
})

test("published install links exactly match bookmarklet.js", () => {
  const pages = [
    "index.html",
    "lang/de-de/index.html",
    "lang/en-us/index.html",
    "lang/es-es/index.html",
    "lang/pt-br/index.html"
  ]

  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), "utf8")
    const href = html.match(/<a href="(javascript:[^"]*)" class="btn"/)?.[1]
    assert.equal(href, installedHtmlHref, `${page} contains a stale bookmarklet`)
  }
})
