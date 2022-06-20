import axios from "axios";

const getAccessToken = () => {
  const result = localStorage.getItem("user_information");
  return result ? JSON.parse(result).token : "";
};

const instance = axios.create({
  baseURL: "https://api.realworld.io/api",
});
instance.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken()}`;

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
