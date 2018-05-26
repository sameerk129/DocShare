import axios from 'axios';
import settings from '../config';


export const login = (data, callback) => {
  axios.post(settings.urls.LOGIN, data)
    .then(response => {
      console.log(response);
      let authToken = response.data.token;
      axios.defaults.headers.common[settings.AUTHORIZATION_HEADER] = settings.AUTHORIZATION_KEY + authToken;
      sessionStorage.setItem(settings.SESSION_STORAGE_AUTH_KEY, authToken);
      if (callback) callback(true);
    })
    .catch(error => {
      console.log("error is:");
      console.dir(error);
      if (callback) callback(false);
    })
};
