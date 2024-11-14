import React, { useEffect } from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Router/Router';
import { useDispatch } from 'react-redux';
import { currentUser } from './features/Auth/authSlice';
const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(currentUser())
  },[dispatch])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;