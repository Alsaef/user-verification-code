import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/authSlice';

const Home = () => {
    const {user}=useSelector(state=>state.auth)
   const dispatch=useDispatch()
    return (
        <div>
           <ul>
            <li className='underline'><Link to='/'>Home</Link></li>
            <li className='underline'>
                {
                    !user?.email&&<Link to='/login'>Login</Link>
                }
            </li>
           </ul>
          {
            user?.email&& <button onClick={()=>dispatch(logout())} type="button" className="mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">LogOut</button>
          }
        </div>
    );
};

export default Home;