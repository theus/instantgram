export type Program = {
  VERSION: string;
  mediaImageElExpressions: MediaImageElExpressions;
  mediaImageElExpression: string;
  hostname: string;
  path: string;
  images: HTMLImageElement[];
  imagesOnViewPort: HTMLImageElement[];
  videos: NodeListOf<HTMLVideoElement>;
  regexOriginalImage: RegExp;
  regexMaxResImage: RegExp;
  regexPath: RegExp;
  regexHostname: RegExp;
  regexStoriesURI: RegExp;
  regexURL: RegExp;
  foundByModule: null|string;
  probablyHasAGallery: {
    check: null|boolean;
    byModule: string;
  };
  setImageLink: (link: string) => void;
  foundVideo: boolean;
  foundImage: boolean;
  imageLink: boolean|string;
  imageLinkBeforeParse: boolean|string;
  alertNotInInstagramPost: boolean;
  context: {
    hasMsg: boolean;
    msg: string;
  };
}


export type MediaImageElExpressions = {
  cover: string;
  srcset: string;
  img: string;
}
