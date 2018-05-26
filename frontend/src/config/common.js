export const urls = (hostAdd, rootUrl) => ({
  LOGIN: rootUrl + '/api/login/',
  LOGOUT: rootUrl + '/api/logout/',
  FOLDERS_LIST: rootUrl + '/api/folders/',
  FOLDER_NOTES_LIST: rootUrl + '/api/folders/%s/notes/',
  FOLDER_NOTE: rootUrl + '/api/folders/%s/notes/%s/',
  NEW_NOTE: rootUrl + '/api/folders/%s/notes/',
  SHARED_NOTE: rootUrl + '/api/notes/%s/',
  NEW_FOLDER: rootUrl + '/api/folders/',
  EDIT_FOLDER: rootUrl + '/api/folders/%s/',
});

export const uiRoutingUrls = {
  LOGIN: '/login',
  SHARED_NOTE: '/shared/:noteId',
  FOLDERS: '/folders',
  FOLDER_NOTES: '/folders/:folderId/notes',
  FOLDER_NOTE: '/folders/:folderId/notes',
  LANDING: '/landing',
  NOT_FOUND: '/not-found/',
};

export const uiRouteUrls = {
  FOLDERS: '/folders',
  FOLDER_NOTES: '/folders/%s/notes/',
  FOLDER_NOTE: '/folders/%s/notes/',
  LANDING: '/landing',
  NOT_FOUND: '/not-found/',
};

export const AUTHORIZATION_HEADER = "Authorization";

export const AUTHORIZATION_KEY = "Token ";

export const SESSION_STORAGE_AUTH_KEY = "userToken";

export const LOGGING_TYPE = {
  DEBUG: 'debug',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};