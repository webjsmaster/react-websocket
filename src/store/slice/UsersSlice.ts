import { getFriends, getUsers } from '../users/users.action.ts'
import { createSlice } from '@reduxjs/toolkit'
import { IMetaResponse, IUserResponse } from '../../pages/home/types.ts'
import { addFriend, removeFriend } from '../friends/friends.action.ts'


export interface IStateUsers {
    isLoading: boolean,
    error: string,
    users: IUserResponse[],
    friends: IUserResponse[],
    meta: IMetaResponse
}

const initialState: IStateUsers = {
    isLoading: false,
    error: '',
    users: [],
    friends: [],
    meta: {
        page: NaN,
        take: NaN,
        itemCount: NaN,
        pageCount: NaN,
        hasPreviousPage: false,
        hasNextPage: false
    }
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsers.pending, state => {
            state.isLoading = true
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.meta = action.payload.meta
            state.users = action.payload.data
        }).addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false
            console.log('[21] 🚧: action.payload.error', action)
            // state.error = action.payload.error
            state.users = []
        })

        builder.addCase(getFriends.pending, state => {
            state.isLoading = true
        }).addCase(getFriends.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.friends = action.payload
        }).addCase(getFriends.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message as string
        })

        builder.addCase(addFriend.pending, state => {
            state.isLoading = true
        }).addCase(addFriend.fulfilled, (state, action) => {
            state.isLoading = false
            state.friends = [...state.friends, action.payload]
        }).addCase(addFriend.rejected, (state, action) => {
            console.log('[54] 🎯: ERROR', action)
            state.isLoading = false
        })

        builder.addCase(removeFriend.pending, state => {
            state.isLoading = true
        }).addCase(removeFriend.fulfilled, (state, action) => {
            state.isLoading = false
            state.friends = [...state.friends.filter(f => f.id !== action.payload.id)]
        })
    }
})

export const { actions, reducer } = usersSlice
