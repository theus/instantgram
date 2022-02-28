import isElementInViewport from '../helpers/isElementInViewport'
import getOriginalVideoFromBlob from '../helpers/getOriginalVideoFromBlob'
import { Module } from './Module'
import { Program } from '../types'
import { Found } from '../internal/Found'

export class VideoInModalPost extends Module {
  public getName(): string {
    return 'VideoInModalPost'
  }

  // test images with videos https://www.instagram.com/p/CZFtsdZuvln/

  execute(program: Program): boolean {
    let found = false

    /* =======================================
    =            Instagram Modal            =
    =======================================*/
    try {
      searchVideo: { // eslint-disable-line no-labels
        if (program.regexPath.test(program.path)) { // verify user it's on post link
          const arrOfVisibleVideos = Array.from(program.videos).filter(isElementInViewport)

          if (arrOfVisibleVideos.length) {
            const $firstVideo = arrOfVisibleVideos[0]

            let videoLink = $firstVideo.src
            const foundInstance = new Found(program, this)

            if (videoLink) {
              if (videoLink.indexOf('blob:') !== -1) {
                videoLink = getOriginalVideoFromBlob($firstVideo)
                foundInstance.video(videoLink)
                found = true
              } else {
                foundInstance.video(videoLink)
                found = true
              }
            }
          }

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
