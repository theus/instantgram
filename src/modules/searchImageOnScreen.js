import isElementInViewport from '../helpers/isElementInViewport.js'
import getAllNodeParent from '../helpers/getAllNodeParent.js'
import isProfileImage from '../helpers/isProfileImage.js'

export default function searchImageOnScreen (program) {
  var found = false

  /* ===============================================
  =            Image visible in screen            =
  ===============================================*/
  try {
    if (!program.imageLink && !program.foundVideo) { // verify if already found a image
      search: { // eslint-disable-line no-labels
        for (let image of program.images) {
          if (isElementInViewport(image) && !isProfileImage(image)) { // verify if is in viewport
            // bring the original image if had

            const hasAGallery = getAllNodeParent(image).filter(item => item.nodeName === "UL").length > 0

            if (hasAGallery) {
              program.probablyHasAGallery.check = hasAGallery
              program.probablyHasAGallery.byModule = 'searchImageOnScreen'
              let foundOnGallery = false

              const $slider = getAllNodeParent(image).filter(item => item.style && item.style.transform && item.style.transform !== "")[0]
              const $ul = $slider.querySelector('ul')

              const transform = +$slider.style.transform.split('(')[1].replace('px)', '')
              const indexSlider = transform / image.width
              const indexOfActualImage = indexSlider < 0 ? indexSlider * -1 : indexSlider

              const imageOnGalleryVisible = $ul.children[indexOfActualImage].querySelector('img')

              program.setImageLink(imageOnGalleryVisible.src)
              foundOnGallery = true
            } else {
              program.setImageLink(image.src)
              // program.imageLink = (program.regexOriginalImage.test(image.src)) ? image.src.replace(program.regexOriginalImage, '') : image.src
            }


            if (program.imageLink) {
              // open image in new tab
              window.open(program.imageLink)
              program.foundImage = true
              program.foundByModule = 'searchImageOnScreen'
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
  } catch (e) { console.error('searchImageOnScreen()', `[instantgram] ${program.VERSION}`, e) }
  /* =====  End of Image visible in screen  ======*/

  return found
}
