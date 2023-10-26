import axios from "axios";
const env = process.env.NODE_ENV
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = (env == 'development') ? "http://127.0.0.1/ups-mpph/" : 'https://ups-mpph.ebasid.com/';

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