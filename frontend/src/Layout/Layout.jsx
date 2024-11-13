import React from 'react';
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <div>
            <div className='min-h-screen'>
               <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;