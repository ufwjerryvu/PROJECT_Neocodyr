/* Temporary page for immediate ad-hoc testing. Delete whenever not needed anymore */

import React, { useEffect } from 'react';
import AlertModal from './components/AlertModal';
import { userService } from './services/userService';
import { authService } from './services/authService';
import { AuthContext, useAuth } from './contexts/AuthContext';
import { api } from './utils/interceptor';

export const TestPage = () => {
    const handleClick = async (e: React.MouseEvent) => {
        try{
            const baseURL = process.env.REACT_APP_API_URL;
            console.log(await api.get(`${baseURL}/users/me/`));
        }catch(error){
            console.log("An error occurred");
        }
    }
    return (
        <>
        <button onClick={handleClick}>
            This button checks the /api/users/me/ endpoint for ad-hoc testing.
        </button>
        </>
    )
}