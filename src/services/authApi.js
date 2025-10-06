import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '@/store/authSlice'; // We'll create authSlice next

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust if your backend base URL differs (e.g., 'http://localhost:5000/api')
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login', // Adjust if your endpoint is different (e.g., '/login')
        method: 'POST',
        body: credentials, // { username, password }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch to auth slice to store token/user in Redux state
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch (err) {
          // Error handled in component
        }
      },
    }),
    // Add more endpoints later, e.g., logout, getUser
  }),
});

export const { useLoginMutation } = authApi;