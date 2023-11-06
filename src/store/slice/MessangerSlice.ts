import { createSlice } from '@reduxjs/toolkit'
import { IMessangerSlice, IUser } from './types.ts'


const initialState: IMessangerSlice = {
    currentFriend: {
        id: '',
        avatar: '',
        login: ''
    }
}

export const messangerSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setCurrentFriend: (state, { payload }: { payload: IUser }) => {
            state.currentFriend = payload
        }
    }
})

export const { actions: messangerSliceActions, reducer: messangerSliceReducer } = messangerSlice
