import { api } from './newapi.ts'
import { IUserResponse } from '../pages/home/types.ts'

export const friendsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query<IUserResponse[] | [], { token: string, id: string }>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                url: `friends/${data.id}`
            }),
            providesTags: () => ['Friends']
        }),
        createFriend: builder.mutation<IUserResponse[], { token: string, id: string, friendId: string }>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                body: { friendId: data.friendId },
                url: `friends/${data.id}`,
                method: 'POST'
            }),
            invalidatesTags: ['Friends']
        }),
        deleteFriend: builder.mutation<IUserResponse[], { token: string, id: string, friendId: string }>({
            query: (data) => ({
                headers: { 'authorization': `Bearer ${data.token}` },
                body: { friendId: data.friendId },
                url: `friends/${data.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Friends']
        })
    })
})


export const {
    useGetFriendsQuery,
    useCreateFriendMutation,
    useDeleteFriendMutation
} = friendsApi
