import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { User, Lock, Mail, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore'
interface UserTypes {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Signup: React.FC = (): React.JSX.Element => {
    const { isLoading, error, signup } = useAuthStore();
    const [userDetails, setUserDetails] = useState<UserTypes>({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const Navigate = useNavigate();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserDetails((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    };
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signup(userDetails.fullname, userDetails.email, userDetails.password, userDetails.confirmPassword);
        Navigate("/verify-email");
    }
  return (
    <motion.div
    
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md md:w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
		>
        <div className='px-4'>
            <h1 className='py-5 text-4xl text-center capitalize bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text font-bold'>create account</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
                <Input icon={User}
						type='text'
						placeholder='Full Name'
                        onChange={handleChange}
                        value={userDetails.fullname}
                        name='fullname'/>
                <Input icon={Mail}
						type='email'
						placeholder='Email'
                        onChange={handleChange}
                        value={userDetails.email}
                        name='email'/>
                <Input icon={Lock}
						type='password'
						placeholder='Password'
                        onChange={handleChange}
                        value={userDetails.password}
                        name='password'
                        />
                <Input icon={Lock}
						type='password'
						placeholder='Confirm Password'
                        onChange={handleChange}
                        value={userDetails.confirmPassword}
                        name='confirmPassword'/>
                <motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
					>
						{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
				</motion.button>
            </form>
            {error && <p className='text-red-500 mt-2'>{error}</p>}
            <PasswordStrengthMeter password={userDetails.password} />
        </div>
        <div className='bg-gray-900 bg-opacity-50 mt-7 text-center py-2'>
            <p className='text-gray-400 flex justify-center items-center flex-row'>already have an account? <Link to='/signin' className='text-green-500 ml-1'>Sign in</Link></p>
        </div>
    </motion.div>
  )
}

export default Signup