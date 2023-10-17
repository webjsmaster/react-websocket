import { createSlice } from '@reduxjs/toolkit'
import { IAuthSlice } from './types.ts'

const initialState: IAuthSlice = {
    isAuth: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeIsAuth: (state, { payload }: { payload: IAuthSlice }) => {
            state.isAuth = payload.isAuth
        }
    }
})

export const { changeIsAuth } = authSlice.actions
