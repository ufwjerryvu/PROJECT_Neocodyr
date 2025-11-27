/* Temporary page for immediate ad-hoc testing. Delete whenever not needed anymore */

import { useEffect } from 'react';
import { userService } from './services/userService';
import { authService } from './services/authService';

export const TestPage = () => {
    useEffect(() => {
        const test = async () => {
            console.log(await authService.login({username: 'celestial.wonder', password: 'password'}));
            console.log(await userService.getUser());
        }

        test();
    }, [])
    return (
        <>
        </>
    )
}