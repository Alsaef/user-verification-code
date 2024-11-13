
import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import OtpVerification from "../Pages/Otp/Opt";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
            path:'/otp/:email',
            element:<OtpVerification/>
        }
      ]
    },
  ]);