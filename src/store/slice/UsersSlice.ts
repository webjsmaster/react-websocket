import { getUsers } from '../users/users.action.ts'
import { createSlice } from '@reduxjs/toolkit'
import { IUsersSlice } from './types.ts'

const initialState: IUsersSlice = {
    isLoading: false,
    error: '',
    users: [],
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
            // state.users = []
            state.isLoading = true
            state.isSuccess = false
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.meta = action.payload.meta
            state.users = action.payload.data
            state.isSuccess = true
        }).addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false
            console.log('[21] 🚧: action.payload.error', action)
            // state.error = action.payload.error
            state.users = []
            state.isSuccess = false
        })
    }
})

export const { actions, reducer } = usersSlice
