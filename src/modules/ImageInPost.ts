import { CarouselImages, getCurrentImageOfACarousel } from '../helpers/getCurrentImageOfACarousel'
import isElementInViewport from '../helpers/isElementInViewport'
import isProfileImage from '../helpers/isProfileImage'
import { Found } from '../internal/Found'
import { Program } from '../types'
import { Module } from './Module'

export class ImageInPost extends Module {
  public getName(): string {
    return 'ImageInPost'
  }

  public execute(program: Program): boolean {
    let found = false
    /* ==============================================
    =            Instagram Post                     =
    ===============================================*/
    try {
      if (program.regexPath.test(program.path)) { // verify user it's on post link
        let imageLink

        const $postCard = document.querySelector('article[role="presentation"]')
        const $divPresentation = $postCard.querySelector('div[role="presentation"]')

        if ($divPresentation) {
          const imagesOfTheMostVisiblePost: CarouselImages = []

          const nodeListOfImgsInsidePost = $divPresentation.querySelectorAll('img')

          nodeListOfImgsInsidePost.forEach($img => {
            if (isElementInViewport($img) && !isProfileImage($img)) {
              imagesOfTheMostVisiblePost.push($img)
            }
          })

          // single post
          if (imagesOfTheMostVisiblePost.length === 1) {
            const $singleImage = imagesOfTheMostVisiblePost[0]

            imageLink = $singleImage.src
            found = true
          }

          if (!found) {
            imageLink = getCurrentImageOfACarousel(imagesOfTheMostVisiblePost, $divPresentation)
          }

          if (imageLink) {
            new Found(program, this).image(imageLink)
            found = true
          } else {
            program.context = {
              hasMsg: true,
              msg: 'index#program#screen@alert_dontFound'
            }
          }
        }

      }
    } catch (e) {
      this.error(e as Error, program)
    }
    /* =====  End of Image visible in screen  ======*/

    return found
  }
}
