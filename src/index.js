import localize from './helpers/localize.js'
import update from './modules/update.js'
import isElementInViewport from './helpers/isElementInViewport.js'

const VERSION = "$version"

const hostname = location.hostname
const path = location.pathname
const href = location.href
const images = document.images

const regex_original_image = /\/[a-z]+\d+[a-z]?x\d+[a-z]?/ // ex: url p750x750/
const regex_path = /^\/p\//
const regex_image_id = /pImage_\d+/

{ // verify if are running in instagram site
  var regex_hostname = /instagram\.com/
  if ( !regex_hostname.test(hostname) ) alert(localize('index@alert_onlyWorks'))
}

/*===============================
=            Program            =
===============================*/
if ( regex_hostname.test(hostname) ) {

  var foundVideo = false
  /*===============================================
  =            Video visible in screen            =
  ===============================================*/
  try {
    search_video: {
      for (let video of document.querySelectorAll('video')) {
        if ( true ) { // no verification
          if ( isElementInViewport(video) ) { // verify if is in viewport
            let video_link = video.src
            if (video_link) {
              // open image in new tab
              window.open(video_link)
              foundVideo = true
              alertNotInInstagramPost = true // if don't find nothing, alert to open the post
            }
            break search_video // if found the image stop searching
          }
        }
      }
    }
  } catch(e) { console.error(`[instantgram] ${VERSION}`, e) }
  /*=====  End of Video visible in screen  ======*/


  if ( regex_path.test(path) ) { // verify if are in instagram post
    if (!foundVideo) { // if not find a video, search images

      /*=======================================
      =            Instagram Modal            =
      =======================================*/
      try {
        if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
          let modal = document.getElementsByTagName('article')[1]
          let modal_image = modal.querySelector("header + div img").src

          if (modal_image) {// verify if finds a post image
            { // bring the original image if had
            var image_link = (regex_original_image.test(modal_image)) ? modal_image.replace(regex_original_image, '') : modal_image
            }
            // open image in new tab
            window.open(image_link)
          }else{
            alert(localize('index#program#modal@alert_dontFound'))
          }

        }
      } catch(e) { console.error(`[instantgram] ${VERSION}`, e)}
      /*=====  End of Instagram Modal  ======*/

      /*======================================
      =            Instagram Post            =
      ======================================*/
      try {
        if (document.getElementsByTagName('article').length === 1) { // verify if has a image post
          let post = document.getElementsByTagName('article')[0]
          let post_image = document.querySelector("article > div img").src
          { // bring the original image if had
            var image_link = (regex_original_image.test(post_image)) ? post_image.replace(regex_original_image, '') : post_image
          }
          if (image_link) {
            // open image in new tab
            window.open(image_link)
          }else{
            alert(localize('index#program#post@alert_dontFound'))
          }
        }
      } catch(e) {console.error(`[instantgram] ${VERSION}`, e)}
      /*=====  End of Instagram Post  ======*/
    }
  } else {
    var alertNotInInstagramPost = true
  }

  /*===============================================
  =            Image visible in screen            =
  ===============================================*/
  try {
    if (!image_link && !foundVideo) { // verify if already found a image
      search: {
        for (let image of document.images) {
          if ( regex_image_id.test(image.id) ) { // get only images posts
            if ( isElementInViewport(image) ) { // verify if is in viewport

              { // bring the original image if had
                var image_link = (regex_original_image.test(image.src)) ? image.src.replace(regex_original_image, '') : image.src
              }
              if (image_link) {
                // open image in new tab
                window.open(image_link)
              }else{
                alert(localize('index#program#screen@alert_dontFound'))
              }
              alertNotInInstagramPost = false // if don't find nothing, alert to open the post
              break search // if found the image stop searching
            }
          }
        }
      }
    }
  } catch(e) { console.error(`[instantgram] ${VERSION}`, e) }
  /*=====  End of Image visible in screen  ======*/

  if (alertNotInInstagramPost && !foundVideo) alert(localize('index#program@alert_dontFound'))
  update(VERSION)
}
/*=====  End of Program  ======*/
