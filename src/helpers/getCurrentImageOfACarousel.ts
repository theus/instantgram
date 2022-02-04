export type CarouselImages = HTMLImageElement[]

export function getCurrentImageOfACarousel(carousel: CarouselImages, divPresentation?: Element): string {
  let found = false
  let imageLink = ''

  // can be any image as all of them is inside the same post
  const $divPresentation = divPresentation || carousel[0].closest('[role="presentation"]')
  const $divPresentationParent = $divPresentation.parentElement
  const arrOfControlButtonsInTheCarousel = Array.from($divPresentationParent.querySelectorAll('button[aria-label')).filter(btn => btn.parentElement === $divPresentationParent) // buttons previous / next

  const isBackButton = arrOfControlButtonsInTheCarousel.length === 1 && arrOfControlButtonsInTheCarousel[0].querySelector('.coreSpriteLeftChevron') !== null
  const isNextButton = arrOfControlButtonsInTheCarousel.length === 1 && arrOfControlButtonsInTheCarousel[0].querySelector('.coreSpriteRightChevron') !== null

  // album post
  if (!found) {
    // first image
    if (arrOfControlButtonsInTheCarousel.length === 1 && isNextButton) {
      imageLink = carousel[0].src
      found = true
    }

    // last image
    if (arrOfControlButtonsInTheCarousel.length === 1 && isBackButton) {
      imageLink = carousel[1].src
      found = true
    }

    // other images
    if (carousel.length === 3) {
      imageLink = carousel[1].src
      found = true
    }
  }

  return imageLink
}