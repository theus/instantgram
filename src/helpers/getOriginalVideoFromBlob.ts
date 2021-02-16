export default function getOriginalVideoFromBlob(videoEl: HTMLVideoElement): string|null {
  const instanceKey = Object.keys(videoEl).find(key => key.includes('Instance'))
  const $react = videoEl[instanceKey]
  const videoLink = $react.return.memoizedProps.fallbackSrc

  if (videoLink) return videoLink
  return null
}
