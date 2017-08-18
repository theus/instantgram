import isElementInViewport from '../helpers/isElementInViewport.js'

export default function searchVideoOnScreen (program) {
  var found = false

  /* ===============================================
  =            Video visible in screen            =
  ===============================================*/
  try {
    searchVideo: { // eslint-disable-line no-labels
      for (let video of program.videos) {
        if (isElementInViewport(video)) { // verify if is in viewport
          let videoLink = video.src
          if (videoLink) {
            // open image in new tab
            window.open(videoLink)
            found = true
            program.foundVideo = true
            program.alertNotInInstagramPost = true // if don't find nothing, alert to open the post
          }
          // if found the image stop searching
          break searchVideo // eslint-disable-line no-labels
        }
      }
    }
  } catch (e) { console.error('searchVideoOnScreen()', `[instantgram] ${program.VERSION}`, e) }
  /* =====  End of Video visible in screen  ======*/
  return found
}