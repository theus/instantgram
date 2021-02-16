import getAllNodeParent from './getAllNodeParent'

export default function isOnArticle (el: Element): boolean {
  return getAllNodeParent(el).filter(item => item.nodeName === "ARTICLE").length > 0
}
