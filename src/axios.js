import axios from "axios";
import router from "./router";

// with env -> URL_PROD: VITE_API_URL_PROD
// with env -> URL_LOCAL: VITE_API_URL_LOCAL

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_PROD}/api`,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.navigate("/login");
      return error;
    }
    throw error;
  }
);

export default axiosClient;
