import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({children}: {children:ReactNode}) => {

    const {isAuthenticated} = useAuth();

    if(!isAuthenticated)
    {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
}

export default ProtectedRoute