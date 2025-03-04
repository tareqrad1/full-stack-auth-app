import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const ProtectedRoute= ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
    if (isCheckingAuth) {
        return <LoadingSpinner />;
    }
    if (!isAuthenticated) {
        return <Navigate to='/signin' replace />;
    }
    if (user?.isVerified == false) {
        return <Navigate to='/verify-email' replace />;
    }

    return children;
}

export default ProtectedRoute;