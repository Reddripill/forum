import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
   baseURL: "https://fortunate-badge-00cc300cbd.strapiapp.com/api",
});

axiosInstance.interceptors.request.use((config) => {
   const token = Cookies.get("token");
   config.headers.Authorization = token ? `Bearer ${token}` : "";
   return config;
});
