import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../store/slice/types'


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
        }),
        getUser: builder.query<IUser, { token: string, user: { id: string } }>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `user/${data.user.id}`
            }),
            providesTags: () => ['User']
        }),
        avatarUpdate: builder.mutation({
            query: (data) => ({
                body: { avatar: data.avatar },
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `/user/update/${data.id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useLoginMutation, useRegisterQuery, useCheckIsAuthQuery, useAvatarUpdateMutation, useGetUserQuery } = api
