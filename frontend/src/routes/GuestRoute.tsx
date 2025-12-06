import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const GuestRoute = () => {
    const [user,, loading] = useAuth();

    if(loading) return <div>Loading...</div>
    return(
        user ? <Navigate to="/dashboard" replace/> : <Outlet/>
    )
}