import localize from './helpers/localize.js'
import update from './modules/update.js'
import isElementInViewport from './helpers/isElementInViewport.js'

const VERSION = '$version'
const hostname = window.location.hostname
const path = window.location.pathname
const images = document.images
const videos = document.querySelectorAll('video')

const regexOriginalImage = /\/[a-z]+\d+[a-z]?x\d+[a-z]?/ // ex: url p750x750/
const regexPath = /^\/p\//
const regexHostname = /instagram\.com/

// verify if are running in instagram site
if (!regexHostname.test(hostname)) window.alert(localize('index@alert_onlyWorks'))

/* ===============================
=            Program            =
===============================*/
if (regexHostname.test(hostname)) {
  var foundVideo = false
  var foundImage = false
  /* ===============================================
  =            Video visible in screen            =
  ===============================================*/
  try {
    searchVideo: { // eslint-disable-line no-labels
      for (let video of videos) {
        if (true) { // no verification
          if (isElementInViewport(video)) { // verify if is in viewport
            let videoLink = video.src
            if (videoLink) {
              // open image in new tab
              window.open(videoLink)
              foundVideo = true
              alertNotInInstagramPost = true // if don't find nothing, alert to open the post
            }
            // if found the image stop searching
            break searchVideo // eslint-disable-line no-labels
          }
        }
      }
    }
  } catch (e) { console.error(`[instantgram] ${VERSION}`, e) }
  /* =====  End of Video visible in screen  ======*/

  /* ===============================================
  =            Image visible in screen            =
  ===============================================*/
  try {
    if (!imageLink && !foundVideo) { // verify if already found a image
      search: { // eslint-disable-line no-labels
        for (let image of images) {
          const isProfileImage = (image.parentElement.localName === 'a') // by default, instantgram detects profile image too. But we don't need it.
          if (isElementInViewport(image) && !isProfileImage) { // verify if is in viewport
            // bring the original image if had
            imageLink = (regexOriginalImage.test(image.src)) ? image.src.replace(regexOriginalImage, '') : image.src

            if (imageLink) {
              // open image in new tab
              window.open(imageLink)
              foundImage = true
            } else {
              window.alert(localize('index#program#screen@alert_dontFound'))
            }
            alertNotInInstagramPost = false // if don't find nothing, alert to open the post
            // if found the image stop searching
            break search // eslint-disable-line no-labels
          }
        }
      }
    }
  } catch (e) { console.error(`[instantgram] ${VERSION}`, e) }
  /* =====  End of Image visible in screen  ======*/

  if (regexPath.test(path) && !imageLink) { // verify if are in instagram post
    if (!foundVideo && !foundImage) { // if not find a video, search images
      /* =======================================
      =            Instagram Modal            =
      =======================================*/
      try {
        if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
          let modal = document.getElementsByTagName('article')[1]
          let modalImage = modal.querySelector('header + div img').src

          if (modalImage) { // verify if finds a post image
            // bring the original image if had
            var imageLink = (regexOriginalImage.test(modalImage)) ? modalImage.replace(regexOriginalImage, '') : modalImage

            // open image in new tab
            window.open(imageLink)
          } else {
            window.alert(localize('index#program#modal@alert_dontFound'))
          }
        }
      } catch (e) { console.error(`[instantgram] ${VERSION}`, e) }
      /* =====  End of Instagram Modal  ======*/

      /* ======================================
      =            Instagram Post            =
      ======================================*/
      try {
        if (document.getElementsByTagName('article').length === 1) { // verify if has a image post
          // document.getElementsByTagName('article')[0] post container
          let postImage = document.querySelector('article > div img').src

          // bring the original image if had
          imageLink = (regexOriginalImage.test(postImage)) ? postImage.replace(regexOriginalImage, '') : postImage

          if (imageLink) {
            // open image in new tab
            window.open(imageLink)
          } else {
            window.alert(localize('index#program#post@alert_dontFound'))
          }
        }
      } catch (e) { console.error(`[instantgram] ${VERSION}`, e) }
      /* =====  End of Instagram Post  ======*/
    }
  } else {
    var alertNotInInstagramPost = true
  }

  if (alertNotInInstagramPost && !foundVideo && !foundImage) window.alert(localize('index#program@alert_dontFound'))
  update(VERSION)
}
/* =====  End of Program  ======*/
