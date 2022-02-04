import isElementInViewport from '../helpers/isElementInViewport'
import isProfileImage from '../helpers/isProfileImage'
import { Module } from './Module'
import { Program } from '../types'
import { Found } from '../internal/Found'
import { CarouselImages, getCurrentImageOfACarousel } from '../helpers/getCurrentImageOfACarousel'

export class ImageInPage extends Module {
  public getName(): string {
    return 'ImageInPage'
  }

  public execute(program: Program): boolean {
    let found = false

    /* ===============================================
    =            Image visible in screen            =
    ===============================================*/
    try {
      searchImage: { // eslint-disable-line no-labels
        if (document.querySelectorAll('#react-root > section').length === 1) {
          let imageLink

          const nodeListOfPostCards = document.querySelectorAll('article[role="presentation"]')
          const arrOfPostsVisible: Element[] = []

          nodeListOfPostCards.forEach($post => {
            if (isElementInViewport($post)) {
              arrOfPostsVisible.push($post)
            }
          })

          const imagesOfTheMostVisiblePost: CarouselImages = []

          arrOfPostsVisible.forEach($post => {
            const nodeListOfImgsInsidePost = $post.querySelectorAll('img')

            nodeListOfImgsInsidePost.forEach($img => {
              if (isElementInViewport($img) && !isProfileImage($img)) {
                imagesOfTheMostVisiblePost.push($img)
              }
            })
          })

          // single post
          if (imagesOfTheMostVisiblePost.length === 1) {
            const $singleImage = imagesOfTheMostVisiblePost[0]

            imageLink = $singleImage.src
            found = true
          }

          if (!found) {
            imageLink = getCurrentImageOfACarousel(imagesOfTheMostVisiblePost)
          }

          if (imageLink) {
            new Found(program, this).image(imageLink)
            found = true
          } else {
            program.context = {
              hasMsg: true,
              msg: 'index#program#post@alert_dontFound'
            }
          }

          // if found the image stop searching
          break searchImage // eslint-disable-line no-labels

        }
      }
    }
    catch (e) {
      this.error(e as Error, program)
    }
    /* =====  End of Image visible in screen  ======*/

    return found
  }
}
