import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '@/store/authSlice';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch (err) {
          // Handled in hook/context
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (err) {
          dispatch(logout()); // Clear state even if API fails
        }
      },
    }),
    validateToken: builder.mutation({
      query: (token) => ({
        url: '/auth/validate',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setCredentials({ token: arg, user: data.user }));
          } else {
            dispatch(logout());
          }
        } catch (err) {
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useValidateTokenMutation } = authApi;