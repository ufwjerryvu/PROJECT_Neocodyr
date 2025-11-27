import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export interface BasicUserInfo{
    username: string,
    first_name: string,
    last_name: string,
    email: string
};

export const userService = {
    getUser: async () => {
        const token = localStorage.getItem("access");
        const response = await axios.get(`${baseUrl}/users/me/`, 
            {headers: { Authorization: `Bearer ${token}`}}
        );
        
        const user: BasicUserInfo = response.data;

        return user;
    }
};