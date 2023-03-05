export const PUBLICATION_MAIN_FOCUS = {
  VIDEO: 'VIDEO',
  IMAGE: 'IMAGE',
  ARTICLE: 'ARTICLE',
  TEXT_ONLY: 'TEXT_ONLY',
  AUDIO: 'AUDIO',
  LINK: 'LINK',
  EMBED: 'EMBED',
}

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/mp4',
  'audio/aac',
  'audio/ogg',
  'audio/webm',
  'audio/flac'
];

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime'
];

export const ALLOWED_MEDIA_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_AUDIO_TYPES, ...ALLOWED_VIDEO_TYPES];