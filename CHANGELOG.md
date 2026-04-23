# @theus/instantgram-core

## 5.2.1

### Patch Changes

- Fixed video URLs that were opening Instagram CDN byte-range fragments instead of the canonical file.
- Stopped rewriting video hosts to the old generic CDN domain so Safari keeps the valid regional asset URL.

## 5.2.0

### Minor Changes

- Rewrote the bookmarklet media picker to target the active visible item instead of the first matching Instagram node.
- Added permalink and page-meta fallback resolution so posts, reels, and stories can all open the correct image or video source.
- Moved the published bookmarklet payload into a readable source file plus loader so every language page stays in sync.

## 5.1.1

### Patch Changes

- :bug: Fix theus/instantgram#102
- :globe_with_meridians: Added Spanish language to Instantgram website (thanks [@xOrieus](https://github.com/xOrieus)! https://github.com/theus/instantgram/pull/99)

## 5.1.0

### Minor Changes

- 🐛 Bug fixes in stories and images.

  🔄🏗️ Transformed the code into a monorepo, added turbo repo and pnpm. Removed metalsmith from page generation and used astro build instead. These architectural changes aim to make it easy to fix future bugs and update the overall package (it was using an old node version and old/deprecated packages).

## Past changes

- v5.0.6 - Fix trying to get image from a story (it was opening a blank page sometimes)
- v5.0.5 - Fix carousel post always getting videos [#79](https://github.com/theus/instantgram/issues/79)
- v5.0.4 - Fix video downloads [#76](https://github.com/theus/instantgram/issues/76) (thanks to [@ghnp5](https://github.com/ghnp5))
- v5.0.3 - Fix opening stories (videos) [#75](https://github.com/theus/instantgram/issues/75) (thanks to [@mklaber](https://github.com/mklaber) 🎉👑)
- v5.0.2 - Fix open correctly image in carousel
- v5.0.1 - Fix open correctly video on posts with more than 1 (thanks to [@mklaber](https://github.com/mklaber))
- v5.0.0 - Rewrite [instantgram] to work with the last chances in Instagram
- v4.0.8 - Fix stories (thanks to [@mklaber](https://github.com/mklaber))
- v4.0.7 - Fix grabbing some videos / posts (thanks to [@mklaber](https://github.com/mklaber))
- v4.0.5 - Fix loading of videos from story (and maybe posts) [#50](https://github.com/theus/instantgram/issues/50), [#48](https://github.com/theus/instantgram/issues/48) (thanks [@joe-wee](https://github.com/joe-wee)!)
- v4.0.4 - Fix open blob video files
- v4.0.3 - Fix search images (automatically) on page
- v4.0.2 - Fix [#32](https://github.com/theus/instantgram/issues/32) set language: undefined
- v4.0.1 - Fix [#33](https://github.com/theus/instantgram/issues/33) URL Signature Mismatch on Edge Chromium
- v4.0.0 - [instangram] now working again with full support of all media types also recognizes canvas images. Also it has now support for multiple images videos in any site feed or post with modal. (thanks to @ThinkBIG-Company)
- v2.4.0 - [instangram] now supports Stories.
- v2.3.0 - [instangram] now supports localization, both app and website. Initially it has en-US and pt-BR. You can help us translate [instantgram] for your language! Cool? Read [contributing](CONTRIBUTING.md) for more information.
- v2.2.0 - [instantgram] now supports video too! :movie_camera:
- After v2.0.0, [instantgram] has your data saved in `localStorage` and can be accessed entering `localStorage.getItem('instantgram')` in console inside instagram.com. If you can't access this item, you may be using a version before v2.0.0.
