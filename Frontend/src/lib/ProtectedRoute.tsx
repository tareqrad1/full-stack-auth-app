import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router-dom';

const ProtectedRoute= ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/signin' replace />;
	}

	// if (!user?.user?.isVerified) {
	// 	return <Navigate to='/verify-email' replace />;
	// }

	return children;
}

export default ProtectedRoute;