import isElementInViewport from '../helpers/isElementInViewport'
import getOriginalVideoFromBlob from '../helpers/getOriginalVideoFromBlob'
import { Module } from './Module'
import { Program } from '../types'
import { Found } from '../internal/Found'

export class VideoInModalPost extends Module {
  public getName(): string {
    return 'VideoInModalPost'
  }

  execute(program: Program): boolean {
    let found = false

    /* =======================================
    =            Instagram Modal            =
    =======================================*/
    try {
      searchVideo: { // eslint-disable-line no-labels
        if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
          const modal = document.getElementsByTagName('article')[1]

          // Multiple video
          let _mediaEl
          const liElements = Array.from(modal.querySelectorAll('div > div > div > div > div > div > div > ul:first-child > li')).filter(el => (el.firstChild != null && el.classList.length > 0))
          if (liElements.length > 1) {
            // this is the hack for instagram dont mess with me fuckers !
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
            _mediaEl = modal.querySelectorAll('video')
          }

          //console.log(_mediaEl)

          // last stage open video ?
          for (let i = 0; i < _mediaEl.length; i++) {
            //console.log(isElementInViewport(_mediaEl[i]))

            if (isElementInViewport(_mediaEl[i])) { // verify if is in viewport
              let videoLink = _mediaEl[i].src
              const foundInstance = new Found(program, this)

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
      this.error(e as Error, program)
    }
    /* =====  End of Video visible in screen  ======*/

    return found
  }
}
