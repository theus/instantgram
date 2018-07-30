export default function getVideoOnPage (program) {
  var found = false

  /* ====================================
  =            Video on page            =
  ==================================== */
  try {
    if (!program.imageLink && !program.foundVideo) { // verify if already found a image
      const og_tag =
        document.querySelector('[property="og:video"]') ?
          document.querySelector('[property="og:video"]') : document.querySelector('[property="og:video:secure_url"]') ?
            document.querySelector('[property="og:video:secure_url"]') : null

      const video_link = og_tag ? og_tag.content : false

      if (video_link) {
        // open image in new tab
        window.open(video_link)
        found = true
        program.foundVideo = true
        program.alertNotInInstagramPost = true // if don't find nothing, alert to open the post
      }
    }
  } catch (e) { console.error('getVideoOnPage()', `[instantgram] ${VERSION}`, e) }
  /* =====  End of Image visible in screen  ======*/

  return found
}
