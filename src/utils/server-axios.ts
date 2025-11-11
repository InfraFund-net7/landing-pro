import axios from "axios";
import { getAccessToken } from "@/utils/get-access-token.util";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverAxios.interceptors.request.use(
  (config) => {
    const excludeAuthRoutes = ["/auth/register", "/auth/login"];

    const shouldExclude = excludeAuthRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (!shouldExclude) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default serverAxios;
