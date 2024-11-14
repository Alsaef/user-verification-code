import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const initialState = {
    user: null,
    loading: true,
    isError:false,
    error:''
};


const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state, {payload}) => {
            state.user = payload;
        },

        clearUser: (state) => {
            state.user = null;
        },
        setLoading: (state, {payload}) => {
            state.loading = payload;
        },
    }
})

export const { setUser, clearUser, setLoading } = authSlice.actions;

// function

export const login=(token)=>(dispatch)=>{
    localStorage.setItem('user-token', token);
    const decodedToken = jwtDecode(token);
    dispatch(setUser(decodedToken));
}
export const logout=()=>(dispatch)=>{
    localStorage.removeItem('user-token');
    dispatch(clearUser());
}

export const currentUser=()=>(dispatch)=>{
    const token = localStorage.getItem('user-token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            dispatch(setUser(decodedToken))  
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            dispatch(clearUser());
        }
        dispatch(setLoading(false))
    }
}


export default authSlice.reducer;