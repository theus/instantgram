import forEach from '../helpers/forEach.js'

export default function searchStories (program) {
  var found = false

  /* =====================================
  =            Search Stories            =
  ===================================== */
  try {
    if (program.regexStoriesURI.test(program.path)) {
      const $root = document.getElementById('react-root')
      const $divs = $root.querySelectorAll('section section div')

      let story = ''

      forEach($divs, (index, div) => {
        const match = div.style.backgroundImage.match(program.regexURL)
        if (match !== null) story = match[0]
      })

      if (story.length > 0) {
        program.setImageLink(story)
        // program.imageLink = (program.regexOriginalImage.test(story)) ? story.replace(program.regexOriginalImage, '') : story

        // open image in new tab
        window.open(program.imageLink)
        found = true
        program.foundImage = true
        program.foundByModule = 'searchStories'
      }

      if (found === false) {
        if (program.videos.length > 0) {
          let videoLink = program.videos[0].src
          if (!videoLink && program.videos[0].children) videoLink = program.videos[0].children[0].src

          if (videoLink) {
            // open image in new tab
            window.open(videoLink)
            found = true
            program.foundVideo = true
            program.foundByModule = 'searchStories'
            program.alertNotInInstagramPost = true // if don't find nothing, alert to open the post
          }
        }
      }
    }
  } catch (e) { console.error('searchStories()', `[instantgram] ${program.VERSION}`, e) }
  /* =====  End of search stories  ======*/
  return found
}
