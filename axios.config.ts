import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
   baseURL: "http://localhost:1337/api",
});

axiosInstance.interceptors.request.use((config) => {
   const token = Cookies.get("token");
   config.headers.Authorization = token ? `Bearer ${token}` : "";
   return config;
});
