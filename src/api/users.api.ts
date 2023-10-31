import { api } from './newapi.ts'
import { IUser } from '../store/slice/types.ts'
import { IGetUsersRequest, IGetUsersResponse } from '../pages/home/types.ts'

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<IUser, { token: string, user: { id: string } }>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `user/${data.user.id}`
            })
            // providesTags: () => ['User']
        }),

        findUsers: builder.query<IGetUsersResponse, IGetUsersRequest>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `/user/find?value=${data.value}`,
                params: {
                    ...{
                        page: data.page,
                        take: data.take
                    }
                }
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
