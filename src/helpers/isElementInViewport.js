// Walf's answer in StackOverflow
// http://stackoverflow.com/a/16270434/1856898
export default function isElementInViewport (el) {
  var rect = el.getBoundingClientRect()

  return rect.bottom > 0 &&
  rect.right > 0 &&
  rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
  rect.top < (window.innerHeight || document.documentElement.clientHeight)
}
