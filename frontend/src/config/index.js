const environment =  process.env.NODE_ENV;

let configSettings = null;
let commonSettings = require('./common');

if (environment === 'development'){
  configSettings = require('./development');
}
else if ( environment === 'test') {
  configSettings = require('./testing');
}
else if (environment === 'production') {
  configSettings = require('./production');
}
else throw Error('invalid Environment');

const settings = {
  ...commonSettings,
  ...configSettings,
  urls: commonSettings.urls(configSettings.hostAdd, configSettings.rootUrl
  )};

export default settings;
