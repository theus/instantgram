import getAllNodeParent from './getAllNodeParent'

export default function isProfileImage (image: HTMLImageElement): boolean {
  return (image.parentElement.localName === 'a' || getAllNodeParent(image).filter(item => item.nodeName === "HEADER").length > 0) // by default, instantgram detects profile image too. But we don't need it.
}
