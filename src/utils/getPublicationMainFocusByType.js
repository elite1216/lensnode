import { PUBLICATION_MAIN_FOCUS, ALLOWED_IMAGE_TYPES, ALLOWED_AUDIO_TYPES, ALLOWED_VIDEO_TYPES } from '../constants/lens.js'

export const getPublicationMainFocusByType = (fileType = '') => {
  if (ALLOWED_IMAGE_TYPES.includes(fileType)) {
    return PUBLICATION_MAIN_FOCUS.IMAGE;
  }

  if (ALLOWED_AUDIO_TYPES.includes(fileType)) {
    return PUBLICATION_MAIN_FOCUS.AUDIO;
  }

  if (ALLOWED_VIDEO_TYPES.includes(fileType)) {
    return PUBLICATION_MAIN_FOCUS.VIDEO;
  }

  return PUBLICATION_MAIN_FOCUS.TEXT_ONLY;
};