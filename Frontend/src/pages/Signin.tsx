import React, { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { Mail, Lock, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

interface UserTypes {
    email: string;
    password: string;
}
const Signin: React.FC = (): React.JSX.Element => {
	const Navigate = useNavigate();
	const { signin, isLoading, error } = useAuthStore();
    const [userDetails, setUserDetails] = useState<UserTypes>({
        email: "",
        password: "",
    });
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserDetails((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			}
		})
	};
	const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signin(userDetails.email, userDetails.password);
		Navigate('/');
        toast.success('Logged in successfully');
	}
  return (
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md md:w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Welcome Back
				</h2>

				<form onSubmit={handleSubmit}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						onChange={handleChange}
						value={userDetails.email}
						name='email'
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						onChange={handleChange}
						value={userDetails.password}
						name='password'
					/>
					<div className='flex flex-col justify-center'>
						<Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
							Forgot password?
						</Link>
						<p className='text-red-500 mt-3 mb-2 text-sm'>{error}</p>
					</div>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-green-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
  )
}

export default Signin
