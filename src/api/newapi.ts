import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:8080/'

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                body: user,
                url: '/auth/login',
                method: 'POST'
            })
        }),
        register: builder.query({
            query: () => 'auth/signup'
        }),
        checkIsAuth: builder.query({
            query: (token) => ({
                headers: { 'authorization': `Bearer ${token}` },
                url: '/auth/profile'
            })
        })
    })
})

export const { useLoginMutation, useRegisterQuery, useCheckIsAuthQuery } = api
