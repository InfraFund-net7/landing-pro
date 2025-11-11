import { AxiosInstance } from "axios";
import { getAccessToken } from "./get-access-token.util";

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = getAccessToken();

            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) {
                console.error("API Error:", error.response.data);
                return Promise.reject(
                    new Error(error.response.data.message || "API Error"),
                );
            } else if (error.request) {
                console.error("Network Error:", error.request);
                return Promise.reject(
                    new Error("Network error, please try again later"),
                );
            } else {
                console.error("Error:", error.message);
                return Promise.reject(new Error(error.message));
            }
        },
    );
};
