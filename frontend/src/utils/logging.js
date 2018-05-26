// This module defines all the logging related functions

import util from 'util';

import settings from '../config';

const consoleMessage = (object, logType='log', propsToPrint={type: true, class:true, function:true}) => {
  /*
   This function will log, debug or error the console message depending on the type,
   It won't be able to console.dir the message, as it print string
   */

  if (propsToPrint.type && propsToPrint.class && propsToPrint.function && object.inside){
    console[logType]("Type: " + object.type + " Class: " + object.class + " Function: " + object.function + " Inside: " + object.inside);
  }
  else if (propsToPrint.class && propsToPrint.function && object.inside){
    console[logType]("Class: " + object.class + " Function: " + object.function + " Inside: " + object.inside);
  }
  else if (propsToPrint.type && propsToPrint.function && object.inside){
    console[logType]("Type: " + object.type + " Function: " + object.function + " Inside: " + object.inside);
  }
  else if (propsToPrint.type && propsToPrint.class && object.inside){
    console[logType]("Type: " + object.type + " Class: " + object.class + " Inside: " + object.inside);
  }
  else if (propsToPrint.type && propsToPrint.class && propsToPrint.function){
    console[logType]("Type: " + object.type + " Class: " + object.class + " Function: " + object.function);
  }
  else if (propsToPrint.function && object.inside){
    console[logType](" Function: " + object.function + " Inside: " + object.inside);
  }
  else if (propsToPrint.class && object.inside){
    console[logType](" Class: " + object.class + " Inside: " + object.inside);
  }
  else if (propsToPrint.class && propsToPrint.function){
    console[logType](" Class: " + object.class + " Function: " + object.function);
  }
  else if (propsToPrint.type && object.inside){
    console[logType]("Type: " + object.type + " Inside: " + object.inside);
  }
  else if (propsToPrint.type && propsToPrint.function){
    console[logType]("Type: " + object.type + " Function: " + object.function);
  }
  else if (propsToPrint.type && propsToPrint.class){
    console[logType]("Type: " + object.type + " Class: " + object.class);
  }
  else {
    console.log("Wrong Logging usage");
  }

  if (object.extraObj){
    for (let prop in object.extraObj) {
      if (object.extraObj.hasOwnProperty(prop)) {
        // console[logType]("" + prop + ": ");
        // console.dir(object.extraObj[prop]);
        logger.object(prop, object.extraObj[prop])
      }
    }
  }
};

const isPrintEnabledForFunction = (functionName) => {
  if (settings.LOGGING_RESTRICT_TO_FUNCTION !== null) {
    return (functionName === settings.LOGGING_RESTRICT_TO_FUNCTION);
  }
  else return true;
};

export const logger = {
  log: function(message) {
    if (settings.LOGGING_ENABLED &&
      (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
        settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {
      console.log(message);
    }
  },
  debug: function(message) {
    if (settings.LOGGING_ENABLED &&
      (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG)) {
      console.debug(message);
    }
  },
  warning: function(message) {
    if (settings.LOGGING_ENABLED &&
      (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
        settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO ||
        settings.LOGGING_LEVEL === settings.LOGGING_TYPE.WARNING)) {
      console.warn(message);
    }
  },
  error: function(message) {
    if (settings.LOGGING_ENABLED &&
      (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
        settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO ||
        settings.LOGGING_LEVEL === settings.LOGGING_TYPE.WARNING ||
        settings.LOGGING_LEVEL === settings.LOGGING_TYPE.ERROR)) {}
    console.error(message);
  },
  dir: function(object) {
    if (settings.LOGGING_ENABLED) {
      if (settings.USE_REAL_TIME_PRINTING_FOR_OBJECT) console.log(util.inspect(object));
      else console.dir(object);
    }
  },
  reducer: function(functionName, insideNameOrObj, extraObj){
    if (settings.LOGGING_ENABLED_FOR.REDUCER){
      if (settings.LOGGING_ENABLED &&
        (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
          settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {

        if (settings.LOGGING_ALLOWED_FOR.REDUCER.length > 0) {
          if (!settings.LOGGING_ALLOWED_FOR.REDUCER.includes(functionName)) return
        }

        if (!isPrintEnabledForFunction(functionName)) return;

        let obj = {
          type: 'Reducer',
          function: functionName,
        };
        if (extraObj){
          obj.inside = insideNameOrObj;
          obj.extraObj = extraObj;
        }
        else{
          if (typeof insideNameOrObj === 'object'){
            obj.extraObj = insideNameOrObj;
          }
          else{
            obj.inside = insideNameOrObj;
          }
        }
        let propsToPrint = {
          type: true,
          class: false,
          function: true,
        };
        consoleMessage(obj, 'log', propsToPrint);
      }
    }
  },
  container: function(className, functionName, insideNameOrObj, extraObj){
    if (settings.LOGGING_ENABLED_FOR.CONTAINER){
      if (settings.LOGGING_ENABLED &&
        (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
          settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {

        if (settings.LOGGING_ALLOWED_FOR.CONTAINER.length > 0) {
          if (!settings.LOGGING_ALLOWED_FOR.CONTAINER.includes(className)) return
        }

        if (!isPrintEnabledForFunction(functionName)) return;

        let obj = {
          type: 'Container',
          class: className,
          function: functionName,
        };
        if (extraObj){
          obj.inside = insideNameOrObj;
          obj.extraObj = extraObj;
        }
        else{
          if (typeof insideNameOrObj === 'object'){
            obj.extraObj = insideNameOrObj;
          }
          else{
            obj.inside = insideNameOrObj;
          }
        }
        let propsToPrint = {
          type: true,
          class: true,
          function: true,
        };
        consoleMessage(obj, 'log', propsToPrint);
      }
    }
  },
  component: function(className, functionName, insideNameOrObj, extraObj){
    if (settings.LOGGING_ENABLED_FOR.COMPONENT){
      if (settings.LOGGING_ENABLED &&
        (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
          settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {

        if (settings.LOGGING_ALLOWED_FOR.COMPONENT.length > 0) {
          if (!settings.LOGGING_ALLOWED_FOR.COMPONENT.includes(className)) return
        }

        if (!isPrintEnabledForFunction(functionName)) return;

        let obj = {
          type: 'Component',
          class: className,
          function: functionName,
        };
        if (extraObj){
          obj.inside = insideNameOrObj;
          obj.extraObj = extraObj;
        }
        else{
          if (typeof insideNameOrObj === 'object'){
            obj.extraObj = insideNameOrObj;
          }
          else{
            obj.inside = insideNameOrObj;
          }
        }
        let propsToPrint = {
          type: true,
          class: true,
          function: true,
        };
        consoleMessage(obj, 'log', propsToPrint);
      }
    }
  },
  action: function(functionName, insideNameOrObj, extraObj){
    if (settings.LOGGING_ENABLED_FOR.ACTION){
      if (settings.LOGGING_ENABLED &&
        (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
          settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {

        if (settings.LOGGING_ALLOWED_FOR.ACTION.length > 0) {
          if (!settings.LOGGING_ALLOWED_FOR.ACTION.includes(functionName)) return
        }

        if (!isPrintEnabledForFunction(functionName)) return;

        let obj = {
          type: 'ActionCreator',
          function: functionName,
        };
        if (extraObj){
          obj.inside = insideNameOrObj;
          obj.extraObj = extraObj;
        }
        else{
          if (typeof insideNameOrObj === "object"){
            obj.extraObj = insideNameOrObj;
          }
          else{
            obj.inside = insideNameOrObj;
          }
        }
        let propsToPrint = {
          type: true,
          class: false,
          function: true,
        };
        consoleMessage(obj, 'log', propsToPrint);
      }
    }
  },
  middleware: function(functionName, insideNameOrObj, extraObj){
    if (settings.LOGGING_ENABLED_FOR.MIDDLEWARE){
      if (settings.LOGGING_ENABLED &&
        (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
          settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {

        if (settings.LOGGING_ALLOWED_FOR.MIDDLEWARE.length > 0) {
          if (!settings.LOGGING_ALLOWED_FOR.MIDDLEWARE.includes(functionName)) return
        }

        if (!isPrintEnabledForFunction(functionName)) return;

        let obj = {
          type: 'Middleware',
          function: functionName,
        };
        if (extraObj){
          obj.inside = insideNameOrObj;
          obj.extraObj = extraObj;
        }
        else{
          if (typeof insideNameOrObj === 'object'){
            obj.extraObj = insideNameOrObj;
          }
          else{
            obj.inside = insideNameOrObj;
          }
        }
        let propsToPrint = {
          type: true,
          class: false,
          function: true,
        };
        consoleMessage(obj, 'log', propsToPrint);
      }
    }
  },
  object: function(name, obj, logType='log'){
    if (settings.LOGGING_ENABLED_FOR.OBJECT){
      if (settings.LOGGING_ENABLED &&
        (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
          settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {
        console[logType]("Value of " + name + " is:");
        if (settings.USE_REAL_TIME_PRINTING_FOR_OBJECT) console.log(util.inspect(obj));
        else console.dir(obj);
      }
    }
  },
  ws: function(functionName, insideNameOrObj, extraObj) {
    if (settings.LOGGING_ENABLED_FOR.WS){
      if (settings.LOGGING_ENABLED &&
        (settings.LOGGING_LEVEL === settings.LOGGING_TYPE.DEBUG ||
          settings.LOGGING_LEVEL === settings.LOGGING_TYPE.INFO)) {
        let obj = {
          type: 'WebSocket',
          function: functionName,
        };
        if (extraObj){
          obj.inside = insideNameOrObj;
          obj.extraObj = extraObj;
        }
        else{
          if (typeof insideNameOrObj === 'object'){
            obj.extraObj = insideNameOrObj;
          }
          else{
            obj.inside = insideNameOrObj;
          }
        }
        let propsToPrint = {
          type: true,
          class: false,
          function: true,
        };
        consoleMessage(obj, 'log', propsToPrint);
      }
    }
  }
};

