import { AxiosRequestConfig } from "axios";
import { getAccessToken } from "@/utils/get-access-token.util";
import _axios from "@/utils/axios.utils";

interface ApiService {
    get: <T>(url: string, params?: AxiosRequestConfig) => Promise<T>;
    post: <T>(url: string, data?: object, config?: AxiosRequestConfig) => Promise<T>;
    put: <T>(url: string, data?: object, config?: AxiosRequestConfig) => Promise<T>;
    patch: <T>(url: string, data?: object, config?: AxiosRequestConfig) => Promise<T>;
}

function reWriteUrl(url: string): string {
    return `/api${url}`;
}

async function getAxiosRequestConfig(url: string): Promise<AxiosRequestConfig> {
    const excludeAuth = url.includes("/auth/register");
    const token = excludeAuth ? null : getAccessToken();

    return {
        headers: {
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };
}

const apiService: ApiService = {
    get: async <T>(url: string, params = {}): Promise<T> => {
        try {
            const config = await getAxiosRequestConfig(url);
            const response = await _axios.get<T>(reWriteUrl(url), {
                ...params,
                ...config,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    post: async <T>(url: string, data?: object, config = {}): Promise<T> => {
        try {
            const rewrittenUrl = reWriteUrl(url);
            const excludeAuth = url.includes("/auth/register");
            const token = excludeAuth ? null : getAccessToken();

            const headers = {
                Accept: "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            };

            const response = await _axios.post<T>(rewrittenUrl, data, {
                ...config,
                headers: { ...config.headers, ...headers },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    put: async <T>(url: string, data?: object, config = {}): Promise<T> => {
        try {
            const requestConfig = await getAxiosRequestConfig(url);
            const response = await _axios.put<T>(reWriteUrl(url), data, {
                ...config,
                ...requestConfig,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    patch: async <T>(url: string, data?: object, config = {}): Promise<T> => {
        try {
            const requestConfig = await getAxiosRequestConfig(url);
            const response = await _axios.patch<T>(reWriteUrl(url), data, {
                ...config,
                ...requestConfig,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;