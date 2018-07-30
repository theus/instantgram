import localize from './helpers/localize.js'
import update from './modules/update.js'
import forEach from './helpers/forEach.js'
import isElementInViewport from './helpers/isElementInViewport.js'
import isOnArticle from './helpers/isOnArticle.js'

import searchImage from './modules/searchImage.js'
import searchVideoOnScreen from './modules/searchVideoOnScreen.js'
import searchImageOnScreen from './modules/searchImageOnScreen.js'
import searchStories from './modules/searchStories.js'
import getVideoOnPage from './modules/getVideoOnPage.js'

if (DEV) console.clear()

const program = {
  VERSION: VERSION,
  hostname: window.location.hostname,
  path: window.location.pathname,
  images: [],
  imagesOnViewPort: [],
  videos: document.querySelectorAll('video'),
  regexOriginalImage: /\/[a-z]+\d+[a-z]?x\d+[a-z]?/, // ex: url p750x750/
  regexMaxResImage: /\/[a-z]+[1080]+[a-z]?x[1080]+[a-z]?/, // ex: url p1080x1080/
  regexPath: /^\/p\//,
  regexHostname: /instagram\.com/,
  regexStoriesURI: /stories\/(.*)+/,
  regexURL: /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/,
  foundByModule: null,

  probablyHasAGallery: {
    check: null,
    byModule: ''
  },

  setImageLink: function (link) {
    this.imageLinkBeforeParse = link

    if (this.regexMaxResImage.test(link)) {
      this.imageLink = link
    } else {
      this.imageLink = (this.regexOriginalImage.test(link)) ? link.replace(this.regexOriginalImage, '') : link
    }
  },

  foundVideo: false,
  foundImage: false,
  imageLink: false,
  imageLinkBeforeParse: false,

  alertNotInInstagramPost: false,
  context: {
    hasMsg: false,
    msg: ''
  }
}

const documentImages = document.images

forEach(documentImages, (index, image) => {
  if (isOnArticle(image) || documentImages.length === 2) { // story has only 2 images (the main and the avatar)
    program.images.push(image)
    if (isElementInViewport(image)) program.imagesOnViewPort.push(image)
  }
})

// verify if are running in instagram site
if (!program.regexHostname.test(program.hostname)) window.alert(localize('index@alert_onlyWorks'))

/* ===============================
=            Program            =
===============================*/
if (program.regexHostname.test(program.hostname)) {
  if (getVideoOnPage(program) === false) {
    if (searchStories(program) === false) {
      if (searchVideoOnScreen(program) === false) {
        if (searchImage(program) === false) {
          if (searchImageOnScreen(program) === false) {
            program.context.hasMsg = false
          }
        }
      }
    }
  }

  if (DEV) console.info('dev mode', program)

  if (program.context.hasMsg) window.alert(localize(program.context.msg))
  if (program.alertNotInInstagramPost && !program.foundVideo && !program.foundImage) window.alert(localize('index#program@alert_dontFound'))
  update(program.VERSION)
}
/* =====  End of Program  ======*/
