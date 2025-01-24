import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    token: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token }) => {
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
