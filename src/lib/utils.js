import placeholder from './assets/placeholder.jpg';

export function handleMissingImage(e) {
  e.target.onerror = null;
  e.target.src = placeholder;
}

export const getCoverImage = (media) => {
  for (const mediaItem of media) {
    if (!!mediaItem.thumbnails) {
      return mediaItem.thumbnails.large.url
    }
  }
  return ''
}
