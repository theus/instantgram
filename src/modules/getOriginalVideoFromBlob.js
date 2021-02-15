export default function getOriginalVideoFromBlob(program, videoEl) {
  let found = false

  /* =======================================
  =            Instagram Modal            =
  =======================================*/
  try {
    const instanceKey = Object.keys(videoEl).find(key => key.includes('Instance'))
    const $react = videoEl[instanceKey]
    const videoLink = $react.return.memoizedProps.fallbackSrc

    if (videoLink) {
      // open video in new tab
      window.open(videoLink)
      found = true
      program.foundVideo = true
      program.foundByModule = 'getOriginalVideoFromBlob'
      program.alertNotInInstagramPost = true // if don't find nothing, alert to open the post
    }
  } catch (e) {
    program.context = {
      hasMsg: true,
      msg: 'index#program@alert_videoBlob'
    }
    console.error('getOriginalVideoFromBlob()', `[instantgram] ${program.VERSION}`, e)
  }
  return found
}
