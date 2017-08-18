export default function searchImage (program) {
  var found = false
  
  if (program.regexPath.test(program.path) && !program.imageLink) { // verify if are in instagram post
    if (!program.foundVideo && !program.foundImage) { // if not find a video, search images
      /* =======================================
      =            Instagram Modal            =
      =======================================*/
      try {
        if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
          let modal = document.getElementsByTagName('article')[1]
          let modalImage = modal.querySelector('header + div img').src
          
          if (modalImage) { // verify if finds a post image
            // bring the original image if had
            program.imageLink = (program.regexOriginalImage.test(modalImage)) ? modalImage.replace(program.regexOriginalImage, '') : modalImage
            
            // open image in new tab
            window.open(program.imageLink)
            found = true
          } else {
            program.context = {
              hasMsg: true,
              msg: 'index#program#modal@alert_dontFound'
            }
          }
        }
      } catch (e) { console.error('searchImage()', `[instantgram] ${program.VERSION}`, e) }
      /* =====  End of Instagram Modal  ======*/
      
      /* ======================================
      =            Instagram Post            =
      ======================================*/
      try {
        if (document.getElementsByTagName('article').length === 1) { // verify if has a image post
          // document.getElementsByTagName('article')[0] post container
          let postImage = document.querySelector('article > div img').src
          
          // bring the original image if had
          program.imageLink = (program.regexOriginalImage.test(postImage)) ? postImage.replace(regexOriginalImage, '') : postImage
          
          if (program.imageLink) {
            // open image in new tab
            window.open(program.imageLink)
            found = true
          } else {
            program.context = {
              hasMsg: true,
              msg: 'index#program#post@alert_dontFound'
            }
          }
        }
      } catch (e) { console.error('searchImage()', `[instantgram] ${program.VERSION}`, e) }
      /* =====  End of Instagram Post  ======*/
    }
  } else {
    program.alertNotInInstagramPost = true
  }

  return found
}