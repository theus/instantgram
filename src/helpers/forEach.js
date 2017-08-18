// https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
// forEach method, could be shipped as part of an Object Literal/Module
export default function (array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i])
    }
}