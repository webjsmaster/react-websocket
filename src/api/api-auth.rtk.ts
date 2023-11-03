import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './api.ts'


export type CustomizedFetchBaseQueryError = {
    data: {
        statusCode?: number,
        message?: string
    },
    status: number
}

export const apiAuthRtk = createApi({
    reducerPath: 'apiAuthRtk',
    tagTypes: ['User'],
    baseQuery: <BaseQueryFn<string | FetchArgs, unknown, CustomizedFetchBaseQueryError>>fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (arg) => ({
                body: arg,
                url: '/auth/login',
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: (arg) => ({
                body: arg,
                url: '/auth/signup',
                method: 'POST'
            })
        }),
        checkIsAuth: builder.query({
            query: (token) => ({
                headers: { 'authorization': `Bearer ${token}` },
                url: '/auth/profile'
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useCheckIsAuthQuery
} = apiAuthRtk
