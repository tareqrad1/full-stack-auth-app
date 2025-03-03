import React from 'react'
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

const RedirectAuthenticated = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user } = useAuthStore();
    if(user?.user?.isVerified && isAuthenticated){
        return <Navigate to='/' replace/>
    };
    return children;
}

export default RedirectAuthenticated