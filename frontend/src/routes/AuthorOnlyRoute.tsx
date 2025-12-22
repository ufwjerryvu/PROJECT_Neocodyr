import react from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AuthorOnlyRoute = () => {
    const [user, setUser, loading] = useAuth();

    if (loading) return <div>Loading...</div>
    if (!user) return <Navigate to="/error/unauthorized" replace/>

    return (
        user.role.toLowerCase() === "author" ? <Outlet/> : <Navigate to="/error/forbidden" replace/>
    )
}