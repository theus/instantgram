import { Found } from '../internal/Found'
import { Program } from '../types'
import { Module } from './Module'

export class ImageVideoInStories extends Module {
  public getName(): string {
    return 'ImageVideoInStories'
  }

  public execute(program: Program): boolean {
    let found = false
    let storyType: null|'video'|'image' = null

    /* =====================================
    =            Search in Stories         =
    ===================================== */
    try {
      if (program.regexStoriesURI.test(program.path)) {
        const $root = document.getElementById('react-root')

        const $video = $root.querySelectorAll('video > source') as NodeListOf<HTMLVideoElement>

        const arrOfButtons = $root.querySelectorAll('button[aria-label]')

        const $previousStoryButton = arrOfButtons[0] // first button of the page
        const $actualStoryWrapper = $previousStoryButton.nextElementSibling
        const $img = ($actualStoryWrapper.querySelector(program.mediaImageElExpression) || $root.querySelector(program.mediaImageElExpressions.img)) as HTMLImageElement

        let story = ''

        if ($video.length > 0) {
          story = $video[0].src
          storyType = 'video'
        } else {
          story = $img.src
          storyType = 'image'
        }

        const foundInstance = new Found(program, this)

        if (story) {
          foundInstance[storyType](story)
          found = true
        }

        if (found === false) {
          if (program.videos.length > 0) {
            let videoLink = program.videos[0].src
            if (!videoLink && program.videos[0].children) {
              const video = program.videos[0].children[0] as HTMLVideoElement
              videoLink = video.src
            }

            if (videoLink) {
              foundInstance.video(videoLink)
              found = true
            }
          }
        }
      }
    } catch (e) {
      this.error(e as Error, program)
    }
    /* =====  End of search stories  ======*/
    return found
  }
}
