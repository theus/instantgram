import update from './modules/update.js'

const VERSION = "$version"

const hostname = location.hostname
const path = location.pathname
const href = location.href
const images = document.images

const regex_original_image = /\/[a-z]+\d+[a-z]?x\d+[a-z]?/ // ex: url p750x750/
const regex_path = /^\/p\//

{ // verify if are running in instagram site
  var regex_hostname = /instagram\.com/
  if ( !regex_hostname.test(hostname) ) alert("[instantgram] only works in instagram.com")
}

/*===============================
=            Program            =
===============================*/
if ( regex_hostname.test(hostname) ) {
  if ( regex_path.test(path) ) { // verify if are in instagram post

    /*=======================================
    =            Instagram Modal            =
    =======================================*/
    try {
      if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
        let modal = document.getElementsByTagName('article')[1]
        let modal_image = document.querySelector("article > div img").src

        if (modal_image) {// verify if finds a post image
          { // bring the original image if had
          var image_link = (regex_original_image.test(modal_image)) ? modal_image.replace(regex_original_image, '') : modal_image
          }
          // open image in new tab
          window.open(image_link)
        }else{
          alert("[instantgram] don't found a image in instagram post. Try open the link in new tab.")
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
          alert ("ops, [instantgram] don't found the image :(")
        }
      }
    } catch(e) {console.error(`[instantgram] ${VERSION}`, e)}
  } else {
    alert ("ops, are you in a instagram post? ex: instagram.com/p/82jd828jd")
  }
  /*=====  End of Instagram Post  ======*/
  update()
}
/*=====  End of Program  ======*/
