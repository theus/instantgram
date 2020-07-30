import isElementInViewport from '../helpers/isElementInViewport.js'

export default function searchImageInModalPost(program) {
    var found = false
	
    /* =======================================
      =            Instagram Modal            =
      =======================================*/
    try {
        if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
            let modal = document.getElementsByTagName('article')[1]

			// Multiple image
            var _mediaEl;
            let liElements = [...modal.querySelectorAll('div > div > div > div > div > div > div > ul:first-child > li')].filter(el => (el.firstChild != null && el.classList.length > 0));
            if (liElements.length > 1) {
                // this is the hack for instagram dont mess with me fuckers !
                if (liElements.length == 3) {
                    _mediaEl = liElements[Math.floor(liElements.length / 2)];
                } else if (liElements.length == 2) {
                    if (document.getElementsByClassName('coreSpriteLeftChevron').length == 1) {
                        _mediaEl = liElements.reverse().shift();
                    } else {
                        _mediaEl = liElements.reverse().pop();
                    }
                } else {
                    //console.log(liElements[Math.floor(liElements.length / 2)]);
                }

                _mediaEl = _mediaEl.querySelectorAll('img[srcset]');

            } else {
                // Single image
                _mediaEl = modal.querySelectorAll('img[srcset]');
            }

            //console.log(_mediaEl);

            // last stage open the image ?
            var i = 0;
            for (var i = 0; i < _mediaEl.length; i++) {
                //console.log(isElementInViewport(_mediaEl[i]))

                if (isElementInViewport(_mediaEl[i])) { // verify if is in viewport
                    let imageLink = _mediaEl[i].src

                    if (imageLink) {
                        // open image in new tab
                        window.open(imageLink)
                        program.foundImage = true
                        found = true
                        program.foundByModule = 'searchImageInModalPost'
                    } else {
                        program.context = {
                            hasMsg: true,
                            msg: 'index#program#modal@alert_dontFound'
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.error('searchImageInModalPost()', `[instantgram] ${program.VERSION}`, e)
    }
    /* =====  End of Image visible in screen  ======*/

    return found
}