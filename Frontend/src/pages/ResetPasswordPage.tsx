import React, { ChangeEvent, FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { Lock } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

interface UserTypes {
    password: string;
    confirmPassword: string;
};
const ResetPasswordPage = () => {
    const { resetPassword, error, message, isLoading } = useAuthStore();
    const [newData, setNewData] = useState<UserTypes>({
        password: '',
        confirmPassword: '',
    });
    const { token } = useParams();
	
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
		if(newData.password !== newData.confirmPassword) return toast.error('Password does not match');
        await resetPassword(token, newData.password);
        toast.success('Password reset successfully');
        <Navigate to='/signin'/>
    };

  return (
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Reset Password
				</h2>
				{message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={newData.password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setNewData({ ...newData, password: e.target.value })}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={newData.confirmPassword}
						onChange={(e) => setNewData({ ...newData, confirmPassword: e.target.value })}
						required
					/>
					{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
			</div>
		</motion.div>
  )
}

export default ResetPasswordPage