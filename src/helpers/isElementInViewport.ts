// Walf's answer in StackOverflow
// http://stackoverflow.com/a/16270434/1856898
export default function isElementInViewport(el: Element): boolean {
  const viewport = window
  const rect = el.getBoundingClientRect()

  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < viewport.innerWidth &&
    rect.top < viewport.innerHeight
}
