import placeholder from './assets/placeholder.jpg';

export function handleMissingImage(e) {
  e.target.onerror = null;
  e.target.src = placeholder;
}
