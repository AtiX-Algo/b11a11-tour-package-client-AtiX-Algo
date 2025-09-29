// src/routes/GuideRoute.jsx

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useRole from "../hooks/useRole";

const GuideRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (authLoading || isRoleLoading) {
        return <div className="text-center my-20"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    
    if (user && role === 'tour_guide') {
        return children;
    }

    // If not a guide, redirect them away
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default GuideRoute;