import { api } from './newapi.ts'
import { IUser } from '../store/slice/types.ts'
import { IUserResponse } from '../pages/home/types.ts'

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<IUser, { token: string, user: { id: string } }>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `user/${data.user.id}`
            })
            // providesTags: () => ['User']
        }),

        findUsers: builder.query<IUserResponse[] | [], { token: string, value: string }>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `/user/find?value=${data.value}`
            })
        }),

        avatarUpdate: builder.mutation({
            query: (data) => ({
                body: { avatar: data.avatar },
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `/user/update/${data.id}`,
                method: 'PUT'
            })
            // invalidatesTags: ['User']
        })
    })
})


export const {
    useGetUserQuery,
    useAvatarUpdateMutation,
    useFindUsersQuery,
    useLazyFindUsersQuery
} = usersApi
