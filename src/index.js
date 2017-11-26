import localize from './helpers/localize.js'
import update from './modules/update.js'
import forEach from './helpers/forEach.js'

import searchImage from './modules/searchImage.js'
import searchVideoOnScreen from './modules/searchVideoOnScreen.js'
import searchImageOnScreen from './modules/searchImageOnScreen.js'
import searchStories from './modules/searchStories.js'

const program = {
  VERSION: '$version',
  hostname: window.location.hostname,
  path: window.location.pathname,
  images: [],
  videos: document.querySelectorAll('video'),
  regexOriginalImage: /\/[a-z]+\d+[a-z]?x\d+[a-z]?/, // ex: url p750x750/
  regexPath: /^\/p\//,
  regexHostname: /instagram\.com/,
  regexStoriesURI: /stories\/(.*)+/,
  regexURL: /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/,

  foundVideo: false,
  foundImage: false,
  imageLink: false,

  alertNotInInstagramPost: false,
  context: {
    hasMsg: false,
    msg: ''
  }
}

forEach(document.images, (index, image) => program.images.push(image))

// verify if are running in instagram site
if (!program.regexHostname.test(program.hostname)) window.alert(localize('index@alert_onlyWorks'))

/* ===============================
=            Program            =
===============================*/
if (program.regexHostname.test(program.hostname)) {
  
  if (searchStories(program) === false) {
    if (searchVideoOnScreen(program) === false) {
      if (searchImage(program) === false) {
        if (searchImageOnScreen(program)) {
          program.context.hasMsg = false
        }
      }
    }
  }

  if (program.context.hasMsg) window.alert(localize(program.context.msg))
  if (program.alertNotInInstagramPost && !program.foundVideo && !program.foundImage) window.alert(localize('index#program@alert_dontFound'))
  update(program.VERSION)
}
/* =====  End of Program  ======*/
