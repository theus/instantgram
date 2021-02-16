import isElementInViewport from '../helpers/isElementInViewport'
import getOriginalVideoFromBlob from '../helpers/getOriginalVideoFromBlob'
import { Program } from '../types'
import { Module } from './Module'
import { Found } from '../internal/Found'

export class VideoInPage implements Module {
  public getName(): string {
    return 'VideoInPage'
  }

  public execute(program: Program): boolean {
    let found = false

    /* ====================================
    =            Video on page            =
    ==================================== */
    try {
      searchVideo: { // eslint-disable-line no-labels
        if (document.querySelectorAll('main > section').length === 1) {
          const $container = document.querySelector('main > section')

          // Multiple video
          // first stage
          let _articleElement
          const articleElements = Array.from($container.querySelectorAll('div > div > div > article'))
          if (articleElements.length > 1) {
            // this is the hack for instagram dont mess with me fuckers !
            if (articleElements.length == 3) {
              _articleElement = articleElements[Math.floor(articleElements.length / 2)]
            } else if (articleElements.length == 2) {
              if (document.getElementsByClassName('coreSpriteLeftChevron').length == 1) {
                _articleElement = articleElements.reverse().shift()
              } else {
                _articleElement = articleElements.reverse().pop()
              }
            } else {
              _articleElement = articleElements[Math.floor(articleElements.length / 2)]
            }
          } else {
            // Single video
            _articleElement = $container.querySelector('video')
          }

          // second stage
          let _mediaEl
          const liElements = Array.from(_articleElement.querySelectorAll('div > div > div > div > div > div > div > ul:first-child > li')).filter(el => (el.firstChild != null && el.classList.length > 0))
          if (liElements.length > 1) {
            if (liElements.length == 3) {
              _mediaEl = liElements[Math.floor(liElements.length / 2)]
            } else if (liElements.length == 2) {
              if (document.getElementsByClassName('coreSpriteLeftChevron').length == 1) {
                _mediaEl = liElements.reverse().shift()
              } else {
                _mediaEl = liElements.reverse().pop()
              }
            } else {
              //console.log(liElements[Math.floor(liElements.length / 2)]);
            }

            _mediaEl = _mediaEl.querySelectorAll('video')

          } else {
            // Single video
            _mediaEl = $container.querySelectorAll('video')
          }

          //console.log(_mediaEl)

          // last stage open video ?
          for (let i = 0; i < _mediaEl.length; i++) {
            //console.log(isElementInViewport(_mediaEl[i]))

            if (isElementInViewport(_mediaEl[i])) { // verify if is in viewport
              const foundInstance = new Found(program, this)

              let videoLink = _mediaEl[i].src
              if (videoLink) {

                if (videoLink.indexOf('blob:') !== -1) {
                  videoLink = getOriginalVideoFromBlob(_mediaEl[i])
                  foundInstance.video(videoLink)
                  break searchVideo // eslint-disable-line no-labels
                } else {
                  foundInstance.video(videoLink)
                  found = true
                }
              }
            }
          }

          // if found the video stop searching
          break searchVideo // eslint-disable-line no-labels

        }
      }
    }
    catch (e) {
      console.error('searchVideoInPage()', `[instantgram] ${program.VERSION}`, e)
    }
    /* =====  End of Image visible in screen  ======*/

    return found
  }
}
