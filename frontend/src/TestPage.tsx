/* Temporary page for immediate ad-hoc testing. Delete whenever not needed anymore */

import { useEffect } from 'react';
import { userService } from './services/userService';
import { authService } from './services/authService';
import { AuthContext, useAuth } from './contexts/AuthContext';

export const TestPage = () => {
    const [user, setUser] = useAuth();

    useEffect(() => {
        const testLogin = async () => {

            try {
                const response = await authService.login({ username: "celestial.wonder", password: "password" });
                localStorage.setItem("access", response.data.access);

                const userInfo = await userService.getUser();
                localStorage.setItem("userInfo", JSON.stringify(userInfo));

                setUser(userInfo);
            } catch (error) {}
        }

        testLogin();

    }, [])

    useEffect(() => {
        console.log('User information from auth context', user);
    }, [user]);

    return (
        <>
        </>
    )
}