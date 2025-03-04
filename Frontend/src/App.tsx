import React, { useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import FloatingShape from './components/FloatingShape'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import RedirectAuthenticated from './lib/RedirectAuthenticated'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './lib/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'
import ResetPasswordPage from './pages/ResetPasswordPage'

const App: React.FC = (): React.JSX.Element => {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();
  const isMounted = useRef(true);

  useEffect(() => {
    if(isMounted.current){
      isMounted.current = false;
      checkAuth();
    };
  },[checkAuth]);
  if(isCheckingAuth) return <LoadingSpinner />
  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <Routes>
        <Route path='*' element={<h1 className='text-emerald-600'><span className='text-5xl font-extrabold select-none'>404</span></h1>} />
        <Route path='/' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path='/signup' element={<RedirectAuthenticated><Signup /></RedirectAuthenticated>} />
        <Route path='/signin' element={<RedirectAuthenticated><Signin /></RedirectAuthenticated>} />
        <Route path='/verify-email' element={user?.isVerified ? <Navigate to='/' replace /> : <VerifyEmailPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App