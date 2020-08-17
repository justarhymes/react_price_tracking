import axios from "axios";

const priceApi = axios.create({
  baseURL: "https://interview-frontend-api.herokuapp.com/" // move to env var
});

priceApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    /*if (error.response.status === 401) {
      store.dispatch(resetAuth());
    }*/
    return Promise.reject(error);
  }
);

export default priceApi;
