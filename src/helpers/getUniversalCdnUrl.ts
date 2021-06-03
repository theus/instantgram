export function getUniversalCdnUrl(cdnLink: string): string {
  const cdn = new URL(cdnLink)
  cdn.host = 'scontent.cdninstagram.com'
  return cdn.href
}
