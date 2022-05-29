import axios from "axios";

const getAccessToken = () => localStorage.getItem("access_token");

const instance = axios.create({
  baseURL: "https://api.realworld.io/api",
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
