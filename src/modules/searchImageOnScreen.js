import isElementInViewport from '../helpers/isElementInViewport.js'
import getAllNodeParent from '../helpers/getAllNodeParent.js'

export default function searchImageOnScreen (program) {
  var found = false

  /* ===============================================
  =            Image visible in screen            =
  ===============================================*/
  try {
    if (!program.imageLink && !program.foundVideo) { // verify if already found a image
      search: { // eslint-disable-line no-labels
        for (let image of program.images) {
          const isProfileImage = (image.parentElement.localName === 'a' || getAllNodeParent(image).filter(item => item.nodeName === "HEADER").length > 0) // by default, instantgram detects profile image too. But we don't need it.
          if (isElementInViewport(image) && !isProfileImage) { // verify if is in viewport
            // bring the original image if had

            program.setImageLink(image.src)
            // program.imageLink = (program.regexOriginalImage.test(image.src)) ? image.src.replace(program.regexOriginalImage, '') : image.src

            if (program.imageLink) {
              // open image in new tab
              window.open(program.imageLink)
              program.foundImage = true
              found = true
            } else {
              program.context = {
                hasMsg: true,
                msg: 'index#program#screen@alert_dontFound'
              }
            }
            program.alertNotInInstagramPost = false // if don't find nothing, alert to open the post
            // if found the image stop searching
            break search // eslint-disable-line no-labels
          }
        }
      }
    }
  } catch (e) { console.error('searchImageOnScreen()', `[instantgram] ${VERSION}`, e) }
  /* =====  End of Image visible in screen  ======*/

  return found
}
