import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FloatingShape from './components/FloatingShape'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import { Toaster } from 'react-hot-toast'

const App: React.FC = (): React.JSX.Element => {
  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <Routes>
        <Route path='*' element={<h1 className='text-emerald-600'><span className='text-5xl font-extrabold select-none'>404</span></h1>} />
        <Route path='/' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/verify-email' element={<VerifyEmailPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App