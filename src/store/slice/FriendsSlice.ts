import { getFriends } from '../users/users.action.ts'
import { createSlice } from '@reduxjs/toolkit'
import { addFriend, removeFriend } from '../friends/friends.action.ts'
import { IFriendsSlice } from './types.ts'


const initialState: IFriendsSlice = {
    isLoading: false,
    error: '',
    isError: false,
    isSuccess: false,
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

export const friendsSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getFriends.pending, state => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(getFriends.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.error = ''
            state.friends = action.payload
        }).addCase(getFriends.rejected, (state, action) => {
            state.isSuccess = false
            state.isLoading = false
            console.log('[39] 🚧: erorr get Friends slice', action.payload)
            state.error = action.payload as string
            state.isError = true
        })

        builder.addCase(addFriend.pending, state => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(addFriend.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.friends = [...state.friends, action.payload]
        }).addCase(addFriend.rejected, (state, action) => {
            console.log('[54] 🎯: ERROR', action)
            state.isLoading = false
            state.isSuccess = false
        })

        builder.addCase(removeFriend.pending, state => {
            state.isLoading = true
        }).addCase(removeFriend.fulfilled, (state, action) => {
            state.isLoading = false
            state.friends = [...state.friends.filter(f => f.id !== action.payload.id)]
        })
    }
})

export const { actions: friendsSliceActions, reducer: friendsSliceReducer } = friendsSlice
