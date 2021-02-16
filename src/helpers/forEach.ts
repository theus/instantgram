// https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
// forEach method, could be shipped as part of an Object Literal/Module
export default function (
  collection: HTMLCollectionOf<Element>,
  callback: (index: number, el: Element) => void,
  scope?: unknown): void {
  for (let i = 0; i < collection.length; i++) {
    callback.call(scope, i, collection[i])
  }
}
