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
