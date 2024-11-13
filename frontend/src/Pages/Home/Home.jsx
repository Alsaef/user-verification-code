import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
           <ul>
            <li className='underline'><Link to='/'>Home</Link></li>
            <li className='underline'><Link to='/login'>Login</Link></li>
           </ul>
        </div>
    );
};

export default Home;