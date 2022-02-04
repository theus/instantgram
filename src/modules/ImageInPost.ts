import isElementInViewport from '../helpers/isElementInViewport'
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
      if (document.getElementsByTagName('article').length === 1) { // verify if has a image post
        const $container = document.querySelector('article')

        // Multiple image
        let _mediaEl
        const liElements = Array.from($container.querySelectorAll('div > div > div > div > div > div > div > ul:first-child > li')).filter(el => (el.firstChild != null && el.classList.length > 0))
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

          _mediaEl = _mediaEl.querySelectorAll(program.mediaImageElExpression)

        } else {
          // Single image
          _mediaEl = $container.querySelectorAll(program.mediaImageElExpression)
        }

        //console.log(_mediaEl);

        // last stage open the image ?
        for (let i = 0; i < _mediaEl.length; i++) {
          //console.log(isElementInViewport(_mediaEl[i]))

          if (isElementInViewport(_mediaEl[i])) { // verify if is in viewport
            const img = _mediaEl[i] as HTMLImageElement
            const imageLink = img.src

            if (imageLink) {
              new Found(program, this).image(imageLink)
              found = true
            } else {
              program.context = {
                hasMsg: true,
                msg: 'index#program#screen@alert_dontFound'
              }
            }
            program.alertNotInInstagramPost = false
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
