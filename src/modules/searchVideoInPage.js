import isElementInViewport from '../helpers/isElementInViewport.js'

export default function searchVideoInPage(program) {
    var found = false

    /* ====================================
    =            Video on page            =
    ==================================== */
    try {
        searchVideo: { // eslint-disable-line no-labels
            if (document.querySelectorAll('main > section').length === 1) {
                var $container = document.querySelector('main > section');

                // Multiple video
                // first stage
                var _articleElement;
                let articleElements = $container.querySelectorAll('div > div > div > article');
                if (articleElements.length > 1) {
                    // this is the hack for instagram dont mess with me fuckers !
                    if (articleElements.length == 3) {
                        _articleElement = articleElements[Math.floor(articleElements.length / 2)];
                    } else if (articleElements.length == 2) {
                        if (document.getElementsByClassName('coreSpriteLeftChevron').length == 1) {
                            _articleElement = articleElements.reverse().shift();
                        } else {
                            _articleElement = articleElements.reverse().pop();
                        }
                    } else {
                        _articleElement = articleElements[Math.floor(articleElements.length / 2)];
                    }
                } else {
                    // Single video
                    _articleElement = $container.querySelectorAll('video');
                }

                // second stage			
                var _mediaEl;
                let liElements = [..._articleElement.querySelectorAll('div > div > div > div > div > div > div > ul:first-child > li')].filter(el => (el.firstChild != null && el.classList.length > 0));
                if (liElements.length > 1) {
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
                    _mediaEl = $container.querySelectorAll('video');
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
                                program.foundByModule = 'searchVideoInPage'
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
        console.error('searchVideoInPage()', `[instantgram] ${program.VERSION}`, e)
    }
    /* =====  End of Image visible in screen  ======*/

    return found
}