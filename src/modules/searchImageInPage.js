import isElementInViewport from '../helpers/isElementInViewport.js'
import getAllNodeParent from '../helpers/getAllNodeParent.js'
import isProfileImage from '../helpers/isProfileImage.js'
import isProfileImageOfAFriendThatLikeThePost from '../helpers/isProfileImageOfAFriendThatLikeThePost.js'

export default function searchImageInPage(program) {
  let found = false

  /* ===============================================
  =            Image visible in screen            =
  ===============================================*/
  try {
    searchImage: { // eslint-disable-line no-labels
      if (document.querySelectorAll('#react-root > section').length === 1) {
        const $container = document.querySelector('#react-root > section')
        const $article = $container.querySelectorAll('div > div > div > article')

        let imageLink
        for (let i=0; i<$article.length; i++) {
          if (isElementInViewport($article[i])) {

            /*
            Single image
            */
            let singleImage = $article[i].querySelector('div > div > div > div > img')
            if (singleImage) {
              imageLink = singleImage.src
            }

            break
          }
        }

        if (!imageLink) {
          // Next
          /*
          Series image
          */
          let multiImage = [...$article[i].querySelectorAll('div > div > div > div > div > div > div > ul:first-child > li')].filter(el => (el.firstChild != null && el.classList.length > 0));
          //console.log(multiImage.length)
          if (multiImage) {

            let _mediaEl;
            if (multiImage.length > 1) {
              // this is the hack for instagram dont mess with me fuckers !
              if (multiImage.length == 3) {
                _mediaEl = multiImage[Math.floor(multiImage.length / 2)]
              } else if (multiImage.length == 2) {
                if ($article[i].querySelector('div > div > div > div > div > div').getElementsByClassName('coreSpriteLeftChevron').length == 1) {
                  _mediaEl = multiImage.reverse().shift()
                } else {
                  _mediaEl = multiImage.reverse().pop()
                }
                //console.log(_mediaEl.querySelector(program.mediaImageElExpression))
              } else {
                //console.log(multiImage[Math.floor(multiImage.length / 2)])
              }

              _mediaEl = _mediaEl.querySelector(program.mediaImageElExpression)
              imageLink = _mediaEl.src

            }
          }
        }

        // bring the original image if had
        program.setImageLink(imageLink)

        if (program.imageLink) {
          // open image in new tab
          window.open(program.imageLink)
          found = true
          program.foundByModule = 'searchImageInPage'
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
    console.error('searchImageInPage()', `[instantgram] ${program.VERSION}`, e)
  }
  /* =====  End of Image visible in screen  ======*/

  return found
}
