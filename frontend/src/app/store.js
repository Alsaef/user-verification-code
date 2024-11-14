import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/Auth/authSlice';
import { api } from '../features/api/Api';
export const store = configureStore({
  reducer: {
    auth:authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})