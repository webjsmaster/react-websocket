import { createSlice } from '@reduxjs/toolkit'
import { IUserSlice } from './types.ts'

const initialState: IUserSlice = {
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

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, { payload }: { payload: IUserSlice }) => {
            console.log('[21] 🥕: ', payload.user)
            state.user = payload.user
        }
    }
})
