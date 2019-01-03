import isElementInViewport from '../helpers/isElementInViewport.js'
import getAllNodeParent from '../helpers/getAllNodeParent.js'
import isProfileImage from '../helpers/isProfileImage.js'
import isProfileImageOfAFriendThatLikeThePost from '../helpers/isProfileImageOfAFriendThatLikeThePost.js'

export default function searchImageOnScreen (program) {
  var found = false

  /* ===============================================
  =            Image visible in screen            =
  ===============================================*/
  try {
    if (!program.imageLink && !program.foundVideo) { // verify if already found a image
      search: { // eslint-disable-line no-labels
        program.images.reverse() // reverse order of images -> the probably of images on screen is in the end of array
        for (let image of program.images) {

          if (isElementInViewport(image) && !isProfileImage(image) && !isProfileImageOfAFriendThatLikeThePost(image)) { // verify if is in viewport
            // bring the original image if had

            const ULs = getAllNodeParent(image).filter(item => item.nodeName === "UL")
            const hasAGallery = ULs.length > 0

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
              found = true
              program.foundByModule = 'searchImageOnScreen'
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
