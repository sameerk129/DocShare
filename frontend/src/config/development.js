import { LOGGING_TYPE } from './common';

export const hostAdd = 'localhost:8000';
export const rootUrl = 'http://' + hostAdd;

export const LOGGING_ALLOWED_FOR = {
  ACTION: [],
  CONTAINER: [],
  COMPONENT: [],
  REDUCER: [],
  MIDDLEWARE: [],
  OBJECT: [],
  WS: [],
};
export const LOGGING_RESTRICT_TO_FUNCTION = null;

export const USE_REAL_TIME_PRINTING_FOR_OBJECT = false;

export const LOGGING_ENABLED_FOR = {
  ACTION: false,
  CONTAINER: false,
  COMPONENT: true,
  REDUCER: false,
  MIDDLEWARE: false,
  OBJECT: true,
  WS: false,
};

export const LOGGING_ENABLED = true;

export const LOGGING_LEVEL = LOGGING_TYPE.DEBUG;
