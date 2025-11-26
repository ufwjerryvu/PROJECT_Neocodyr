import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.REACT_APP_API_URL;

interface LoginCredentialFields{
    username: string,
    password: string
};

interface TokenRefreshFields{
    refresh: string
};

interface UserRegisterFields{
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
};

/* NOTE: functions with axios will throw an error on HTTP response 
        4xx and 5xx. Caller will need to explicitly handle errors. 
        Handle errors where appropriate. */

export const login = async (fields: LoginCredentialFields) => {
    const response = await axios.post(`${apiUrl}/auth/login`, fields);
    return {data: response.data, status: response.status};
}

export const refresh = async (fields: TokenRefreshFields) => {
    const response = await axios.post(`${apiUrl}/auth/refresh/`, fields);
    return {data: response.data, status: response.status};
};

export const register = async (fields: UserRegisterFields) => {
    const response = await axios.post(`${apiUrl}/auth/register/`, fields);
    return {data: response.data, status: response.status};
}