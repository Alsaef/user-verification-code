import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLoginUserMutation } from '../../features/Auth/AuthApi';
import { login } from '../../features/Auth/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [loginUser]=useLoginUserMutation()
  const onSubmit = async(data) => {
  const user={
    email:data.email,
    password:data.password
  }
  try {
    const res=await loginUser(user)
    if (res.data.status===true) {
     alert('login success')
    dispatch(login(res.data.token))
     navigate('/')
    }else {
      alert('Invalid credentials'); // Updated alert message
      console.log('Invalid credentials');
    }
   } catch (error) {
     console.log('error', error);
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <Link to="/register" className="text-sm text-blue-600 hover:text-blue-700"> Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
