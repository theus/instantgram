import localize from './helpers/localize'
import forEach from './helpers/forEach'
import isElementInViewport from './helpers/isElementInViewport'
import isOnArticle from './helpers/isOnArticle'

import { VideoInPage } from './modules/VideoInPage'
import { ImageVideoInStories } from './modules/ImageVideoInStories'
import { VideoInPost } from './modules/VideoInPost'
import { VideoInModalPost } from './modules/VideoInModalPost'
import { ImageInPage } from './modules/ImageInPage'
import { ImageInPost } from './modules/ImageInPost'
import { ImageInModalPost } from './modules/ImageInModalPost'
import { MediaImageElExpressions, Program } from './types'

if (process.env.DEV) {
  console.clear()
}

const isEdge = window.navigator.userAgent.indexOf('Edge') > -1 || window.navigator.userAgent.indexOf('Edg') > -1

const mediaImageElExpressions: MediaImageElExpressions = {
  cover: 'img[style="object-fit: cover;"]',
  srcset: 'img[srcset]',
  img: 'img'
}

const program: Program = {
  VERSION: process.env.VERSION as string,
  mediaImageElExpressions,
  mediaImageElExpression: isEdge ? mediaImageElExpressions.cover : mediaImageElExpressions.srcset,
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

forEach(documentImages, (_, el) => {
  const image = el as HTMLImageElement
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
  if (new VideoInPage().execute(program) === false) {
    if (new ImageVideoInStories().execute(program) === false) {
      if (new VideoInPost().execute(program) === false) {
        if (new VideoInModalPost().execute(program) === false) {
          if (new ImageInPost().execute(program) === false) {
            if (new ImageInModalPost(). execute(program) === false) {
              if (new ImageInPage().execute(program) === false) {
                program.context.hasMsg = false
              }
            }
          }
        }
      }
    }
  }

  if (process.env.DEV) {
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
