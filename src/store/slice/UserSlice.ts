import { createSlice } from '@reduxjs/toolkit'
import { IUser } from './types.ts'

const initialState: IUserState = {
    user: {
        id: '',
        avatar: '',
        email: '',
        login: '',
        version: 0,
        createdAt: 1630564245,
        updatedAt: 1630564245
    }
}

interface IUserState {
    user: IUser
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, { payload }: { payload: IUser }) => {
            state.user = payload
        }
    }
})

export const { actions, reducer } = userSlice


