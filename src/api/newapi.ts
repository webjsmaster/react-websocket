import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://localhost:8080/'

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        login: builder.query({
            query: () => 'auth/login'
        }),
        register: builder.query({
            query: () => 'auth/signup'
        })
    })
})

export const { useLoginQuery } = api
