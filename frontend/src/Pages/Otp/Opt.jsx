import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useOtpVerifyedMutation } from '../../features/Auth/AuthApi';

const OtpVerification = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [verification,{isLoading}]=useOtpVerifyedMutation()
   const {email}=useParams()
  const navigate=useNavigate()
  const onSubmit =async (data) => {
   const otp={
    email: email,
    otp: data.otp
   }
   try {
    const res=await verification(otp)
    if (res.data.message==='User verified successfully') {
     alert(res.data.message)
     navigate(`/login`)
    }else{
     alert(res.data.message)
    }
   } catch (error) {
     console.log('error :>> ', error);
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Verify OTP</h2>
        <p className="text-center text-gray-600">Enter the 6-digit OTP sent to your email</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter your OTP"
              maxLength="6"
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
              {...register('otp', {
                required: 'OTP is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'OTP must be a 6-digit number',
                },
              })}
            />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify OTP
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Didn’t receive an OTP?</span>
          <button className="text-sm text-blue-600 hover:text-blue-700 ml-1">Resend OTP</button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
