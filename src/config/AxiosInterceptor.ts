import axios from 'axios';
import store from '../redux/store';
import { loadingActionHandler } from '../redux/slices/Loader';

export const sessionTimeoutHandler = (isSessionTimeout = false) => {
  localStorage.removeItem('token');

  if (isSessionTimeout) {
    // window.location.href = '/session-timeout';
  } else {
    window.location.href = '/login';
  }
};

// ------------------------------------ Authorized routes ------------------------------------
const ApiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

ApiRequest.interceptors.request.use(
  function (config: any) {
    store.dispatch(loadingActionHandler(true)); // Show loader
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + token,
      };
    }
    return config;
  },
  (error) => {
    store.dispatch(loadingActionHandler(false)); // Hide loader on error
    return Promise.reject(error);
  }
);

ApiRequest.interceptors.response.use(
  function (response) {
    store.dispatch(loadingActionHandler(false)); // Hide loader on response
    return response;
  },
  function (error) {
    store.dispatch(loadingActionHandler(false)); // Hide loader on error
    if (!error.response || error.response.status === 401) {
      sessionTimeoutHandler(true);
    } else {
      return Promise.reject(error);
    }
  }
);

export { ApiRequest };
