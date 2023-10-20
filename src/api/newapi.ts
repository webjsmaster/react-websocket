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
            providesTags: result => ['User']
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


//
//
// const axiosBaseQuery = (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' }
// ): BaseQueryFn<
//     {
//         url: string;
//         method?: AxiosRequestConfig['method'];
//         data?: AxiosRequestConfig['data'];
//     },
//     unknown,
//     unknown
// > => async ({ url, method, data }) => {
//     try {
//         const result = await axios({ url: baseUrl + url, method, data })
//         return { data: result.data }
//     } catch (axiosError) {
//         const err = axiosError as AxiosError
//         return { error: { status: err.status, data: err.response?.data } }
//     }
// }
//
// export const api = createApi({
//     baseQuery: axiosBaseQuery({
//         baseUrl: API_URL
//     }),
//     endpoints: (builder) => ({
//         login: builder.mutation({
//             query: (user) => ({
//                 body: user,
//                 url: 'auth/login',
//                 method: 'POST'
//             })
//         }),
//         register: builder.query({
//             query: () => ({ url: 'auth/signup' })
//         }),
//         checkIsAuth: builder.query({
//             query: (token) => ({
//                 headers: { 'authorization': `Bearer ${token}` },
//                 url: 'auth/profile'
//             }),
//             transformErrorResponse: (res: IError) => {
//                 console.log('[79] 🥕: ', res.data.message)
//                 const error: ITransformRes = {
//                     message: res.data.message,
//                     status: res.data.statusCode
//                 }
//                 return error as ITransformRes
//             }
//         })
//     })
// })

// export const { useLoginMutation, useRegisterQuery, useCheckIsAuthQuery } = api
