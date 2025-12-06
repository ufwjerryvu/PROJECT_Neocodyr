import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    const [user,, loading] = useAuth();
    if (loading) return <div>Loading...</div>
    return(
        user ? <Outlet/> : <Navigate to="/login" replace/>
    );
} 