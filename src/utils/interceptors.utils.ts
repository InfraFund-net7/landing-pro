import { AxiosInstance } from 'axios';

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        const detail = data?.detail || data?.message || 'API Error';
        return Promise.reject(new ApiError(status, detail));
      } else if (error.request) {
        return Promise.reject(new ApiError(0, 'Network error, please try again later'));
      } else {
        return Promise.reject(new ApiError(0, error.message));
      }
    }
  );
};
