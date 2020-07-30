import isElementInViewport from '../helpers/isElementInViewport.js'

export default function searchVideoInModalPost(program) {
    var found = false

    /* =======================================
      =            Instagram Modal            =
      =======================================*/
    try {
        searchVideo: { // eslint-disable-line no-labels
            if (document.getElementsByTagName('article').length === 2) { // when instagram post is a modal
                let modal = document.getElementsByTagName('article')[1]

                // Multiple video
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

                    _mediaEl = _mediaEl.querySelectorAll('video');

                } else {
                    // Single video
                    _mediaEl = modal.querySelectorAll('video');
                }

                //console.log(_mediaEl)

                // last stage open video ?
                var i = 0;
                for (var i = 0; i < _mediaEl.length; i++) {
                    //console.log(isElementInViewport(_mediaEl[i]))

                    if (isElementInViewport(_mediaEl[i])) { // verify if is in viewport
                        let videoLink = _mediaEl[i].src

                        if (videoLink) {
                            if (videoLink.indexOf('blob:') !== -1) {
                                program.context = {
                                    hasMsg: true,
                                    msg: 'index#program@alert_videoBlob'
                                }
                                break searchVideo // eslint-disable-line no-labels
                            } else {
                                // open video in new tab
                                window.open(videoLink)
                                found = true
                                program.foundVideo = true
                                program.foundByModule = 'searchVideoInModalPost'
                                program.alertNotInInstagramPost = true // if don't find nothing, alert to open the post
                            }
                        }
                    }
                }

                // if found the video stop searching
                break searchVideo // eslint-disable-line no-labels

            }
        }
    }
    catch (e) {
        console.error('searchVideoInModalPost()', `[instantgram] ${program.VERSION}`, e)
    }
    /* =====  End of Video visible in screen  ======*/

    return found
}