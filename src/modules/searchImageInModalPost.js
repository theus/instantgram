import isElementInViewport from '../helpers/isElementInViewport.js'

export default function searchImageInModalPost(program) {
  let found = false

  /* =======================================
  =            Instagram Modal            =
  =======================================*/
  try {
    if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
      const modal = document.getElementsByTagName('article')[1]

      // Multiple image
      let $imagesEls
      let liElements = [...modal.querySelectorAll('div > div > div > div > div > div > div > ul:first-child > li')].filter(el => (el.firstChild != null && el.classList.length > 0));
      if (liElements.length > 1) {
        // this is the hack for instagram dont mess with me fuckers !
        if (liElements.length == 3) {
          $imagesEls = liElements[Math.floor(liElements.length / 2)];
        } else if (liElements.length == 2) {
          if (document.getElementsByClassName('coreSpriteLeftChevron').length == 1) {
            $imagesEls = liElements.reverse().shift();
          } else {
            $imagesEls = liElements.reverse().pop();
          }
        } else {
          //console.log(liElements[Math.floor(liElements.length / 2)]);
        }

        $imagesEls = $imagesEls.querySelectorAll(program.mediaImageElExpression);

      } else {
        // Single image
        $imagesEls = modal.querySelectorAll(program.mediaImageElExpression)

        if ($imagesEls && $imagesEls.length === 0) {
          $imagesEls = modal.querySelectorAll(program.mediaImageElExpression)
        }
      }

      //console.log($imagesEls);

      // last stage open the image ?
      let i = 0;
      for (let i = 0; i < $imagesEls.length; i++) {
        //console.log(isElementInViewport($imagesEls[i]))

        if (isElementInViewport($imagesEls[i])) { // verify if is in viewport
          const imageLink = $imagesEls[i].src

          if (imageLink) {
            // open image in new tab
            window.open(imageLink)
            program.foundImage = true
            found = true
            program.foundByModule = 'searchImageInModalPost'
          } else {
            program.context = {
              hasMsg: true,
              msg: 'index#program#modal@alert_dontFound'
            }
          }
        }
      }
    }
  } catch (e) {
    console.error('searchImageInModalPost()', `[instantgram] ${program.VERSION}`, e)
  }
  /* =====  End of Image visible in screen  ======*/

  return found
}
