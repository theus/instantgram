import localize from './helpers/localize.js'
//import update from './modules/update.js'
import forEach from './helpers/forEach.js'
import isElementInViewport from './helpers/isElementInViewport.js'
import isOnArticle from './helpers/isOnArticle.js'

import searchVideoInPage from './modules/searchVideoInPage.js'
import searchImageVideoInStories from './modules/searchImageVideoInStories.js'
import searchVideoInPost from './modules/searchVideoInPost.js'
import searchVideoInModalPost from './modules/searchVideoInModalPost.js'
import searchImageInPage from './modules/searchImageInPage.js'
import searchImageInPost from './modules/searchImageInPost.js'
import searchImageInModalPost from './modules/searchImageInModalPost.js'

if (DEV) {
  console.clear()
}

const isEdge = window.navigator.userAgent.indexOf('Edge') > -1 || window.navigator.userAgent.indexOf('Edg') > -1

const program = {
  VERSION: VERSION,
  mediaImageElExpression: isEdge ? 'img[style="object-fit: cover;"]' : 'img[srcset]',
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

  setImageLink: function(link) {
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
    if (isElementInViewport(image)) {
      program.imagesOnViewPort.push(image)
    }
  }
})

// verify if are running in instagram site
if (!program.regexHostname.test(program.hostname)) {
  window.alert(localize('index@alert_onlyWorks'))
}

/* ===============================
=            Program            =
===============================*/
if (program.regexHostname.test(program.hostname)) {
  if (searchVideoInPage(program) === false) {
    if (searchImageVideoInStories(program) === false) {
      if (searchVideoInPost(program) === false) {
        if (searchVideoInModalPost(program) === false) {
          if (searchImageInPost(program) === false) {
            if (searchImageInModalPost(program) === false) {
              program.context.hasMsg = false
            }
          }
        }
      }
    }
  }

  if (DEV) {
    console.info('dev mode', program)
  }

  if (program.context.hasMsg) {
    window.alert(localize(program.context.msg))
  }
  if (program.alertNotInInstagramPost && !program.foundVideo && !program.foundImage) {
    window.alert(localize('index#program@alert_dontFound'))
  }
}
/* =====  End of Program  ======*/
