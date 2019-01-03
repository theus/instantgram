import getAllNodeParent from './getAllNodeParent.js'

export default function isProfileImageOfAFriendThatLikeThePost(image) {
  return image.parentElement.nodeName === 'SPAN' && image.parentElement.getAttribute('role') === 'link' // by default, instantgram detects profile image of a friend that liked. But we don't need it.
}
