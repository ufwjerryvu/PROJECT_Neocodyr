import axios from 'axios';
import { api } from '../utils/interceptor';

const baseUrl = process.env.REACT_APP_API_URL;

export interface BasicUserInfo{
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    role: string
};

export interface ExtendedUserInfo{
    username: string, 
    first_name: string,
    last_name: string,
    email: string,
    bio: string | null,
    date_joined: Date,
    image: string | null,
    role: string
}

export interface RegisterUserInfo{
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export interface UpdateUserInfo{
    username: string,
    first_name: string,
    last_name: string,
    bio: string
}

export const userService = {
    getUser: async () => {
        const response = await api.get("/users/me/");
        const user = response.data;
        return user;
    },

    registerUser: async (registerInfo: RegisterUserInfo) => {
        const response = await api.post("/auth/register/", registerInfo);
        const user = response.data;
        return user;
    },

    updateUser: async(updateInfo: UpdateUserInfo) => {
        const response = await api.patch("/users/me/", updateInfo);
        const updated = response.data;
        return updated;
    }
};