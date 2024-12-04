import placeholder from './assets/placeholder.jpg';

export function handleMissingImage(e) {
  e.target.onerror = null;
  e.target.src = placeholder;
}

export const getCoverImage = (media) => {
  for (const mediaItem of media) {
    // TODO: Check on pending feature request for thumbnails from SyncInc.
    // Not currently available.
    return mediaItem
  }
  return ''
}
