import { api } from "../api/Api";


const AuthApi=api.injectEndpoints({
    endpoints: (builder) => ({
       createAccount:builder.mutation({
        query:(data)=>({
            url:'/api/v1/register',
            method:"POST",
            body:data
        }),
        invalidatesTags:['user']
       }),
       otpVerifyed:builder.mutation({
        query:(data)=>({
            url:'/api/v1/verify-otp',
            method:"POST",
            body:data
        }),
        invalidatesTags:['user']
       }),
       loginUser:builder.mutation({
        query:(data)=>({
            url:'/api/v1/login',
            method:"POST",
            body:data
        }),
        invalidatesTags:['user']
       })
    })
})

export const {useCreateAccountMutation,useOtpVerifyedMutation,useLoginUserMutation}=AuthApi