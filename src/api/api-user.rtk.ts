import { IUser } from '../store/slice/types.ts'
import { apiAuthRtk } from './api-auth.rtk.ts'

export const apiUserRtk = apiAuthRtk.injectEndpoints({
    endpoints: (builder) => ({
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


export const {
    useGetUserQuery,
    useAvatarUpdateMutation
} = apiUserRtk
