import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/services/authApi'; // We'll create this next
import authReducer from './authSlice'; // We'll create this next

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});