import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    let isAuthenticated = localStorage.getItem('accessToken');

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
