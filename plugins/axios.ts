import axios from "axios";
const env = process.env.NODE_ENV
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = (env == 'development') ? "https://jsonplaceholder.typicode.com/" : '';

  const api = axios.create({
    baseURL: defaultUrl,
    headers: {
    },
  });
  
  return {
    provide: {
      axios: api,
    },
  };
});