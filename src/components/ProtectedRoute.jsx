import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = () => {
    const {user, loading} = useAuth();
    
    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }
    
    if(!user)
    {
        return <Navigate to='/login' replace/>
    }

    return <Outlet />
}

export default ProtectedRoute;