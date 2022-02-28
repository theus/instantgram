# [instantgram] v4.0.7
![GitHub release](https://img.shields.io/badge/release-v4.0.7-blue)

![badge](https://img.shields.io/badge/for-instagram-yellow.svg?style=flat-square)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

[Versão em Português =)](http://theus.github.io/instantgram/lang/pt-br)

[instantgram] is a bookmarklet with the purpose of downloading Instagram images. It is tiny, simple, and doesn't require extensions or downloads. Just access [this link][1] and drag the [instantgram] button to the bookmark bar of your browser, navigate to instagram.com (web), open an Instagram post (photo) and click on the bookmarklet. That's all it takes!

### [:arrow_right: Bookmarklet][1]

![gif demo](img/demo.gif)

:bulb: Now in version 4.0.0, [instantgram] now working again with full support of all media types also recognizes canvas images.\
Also it has now support for multiple images videos in any site feed or post with modal.

## Compatibility

|       Browser         |     Compatible?    |
| --------------------- | -------------------|
| Google Chrome         | :white_check_mark: |
| Mozilla Firefox**     | :warning:          |
| Internet Explorer 11  | :white_check_mark: |
| Edge on chromium >=80 | :white_check_mark: |
| Edge*                 | :warning:          |
*_apparently Edge doesn't allow you to drag a button to the bookmark bar_
**_apparently Firefox don't allow drag a bookmarklet (link with `javascript:)` to bookmarkbar_

## Roadmap

- ~~a way of notify updates in [instantgram]~~ :heavy_check_mark: in v2.0.0
- ~~make a gif explaining the [instantgram]~~ :heavy_check_mark:
- ~~video :smirk_cat:~~ :heavy_check_mark: in v2.2.0

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for more information. :heart:

## Changelog
- v4.0.7 - Fix grabbing some videos / posts (thanks to @mklaber)
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


[1]:http://theus.github.io/instantgram
