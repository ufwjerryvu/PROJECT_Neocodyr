import axios from 'axios';
import { authService } from '../services/authService';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

/* The request interceptor here doesn't do much except add the
    access token to the request header */
api.interceptors.request.use(
    (config) => {
        const access = localStorage.getItem("access");
        if (access) {
            config.headers.setAuthorization(`Bearer ${access}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

/* However, the response interceptor also tries to check if the access token
    has expired and uses the refresh token to obtain a new access token. It 
    also retries the original request but only once. */
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        /* Access token has expired or the user was never authenticated in
            the first place. Interceptor to obtain the access token using
            the refresh token and retry original request once. */

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh");

            try {
                if (refreshToken) {
                    const refreshAccess = await authService.refresh({
                        refresh: refreshToken
                    });

                    localStorage.setItem("access", refreshAccess.data.access);
                    originalRequest.headers.setAuthorization(`Bearer ${refreshAccess.data.access}`);
                    
                    return api.request(originalRequest);
                } else {
                    throw new Error("Token is not valid");
                }
            } catch (error) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("userInfo");
                
                console.error("Token is expired, invalid, or user unauthenticated.");

                /* Redirect the user to login but only after page reload */
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
)