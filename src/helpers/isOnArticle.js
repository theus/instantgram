import getAllNodeParent from './getAllNodeParent.js'

export default function isOnArticle (el) {
  return getAllNodeParent(el).filter(item => item.nodeName === "ARTICLE").length > 0
}
