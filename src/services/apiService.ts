import { AxiosRequestConfig } from "axios";
import _axios from "../utils/axios.utils";
import { getAccessToken } from "@/utils/get-access-token.util";

interface ApiService {
    get: <T>(url: string, params?: object) => Promise<T>;
    post: <T>(url: string, data?: object) => Promise<T>;
    put: <T>(url: string, data: object) => Promise<T>;
    patch: <T>(url: string, data: object) => Promise<T>;
}

function reWriteUrl(url: string) {
    return `api${url}`
}

function getAxiosRequestConfig(): AxiosRequestConfig {
    const token = getAccessToken()
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    }

}

const apiService: ApiService = {
    get: async <T>(url: string, params = {}): Promise<T> => {
        try {
            const response = await _axios.get<T>(reWriteUrl(url), {
                ...getAxiosRequestConfig()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    post: async <T>(url: string, data?: object): Promise<T> => {
        try {
            const response = await _axios.post<T>(reWriteUrl(url), data ?? {}, {
                ...getAxiosRequestConfig()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    put: async <T>(url: string, data: object): Promise<T> => {
        try {
            const response = await _axios.put<T>(reWriteUrl(url), data, {
                ...getAxiosRequestConfig()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    patch: async <T>(url: string, data: object): Promise<T> => {
        try {
            const response = await _axios.patch<T>(reWriteUrl(url), data, {
                ...getAxiosRequestConfig()
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default apiService;