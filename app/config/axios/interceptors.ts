"use client";

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import http from "./http";
import {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
} from "./token";

interface CustomConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();

        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomConfig;

        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = refreshResponse.data?.token;

                if (newToken) {
                    setAccessToken(newToken);
                    http.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                    originalRequest.headers = originalRequest.headers ?? {};
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                }

                return http(originalRequest);
            } catch (refreshErr) {
                clearAccessToken();
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

export default http;
