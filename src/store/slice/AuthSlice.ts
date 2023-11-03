import { createSlice } from '@reduxjs/toolkit'
import { IAuthSlice } from './types.ts'

const initialState: IAuthSlice = {
    isAuth: false,
    user: {
        id: '',
        avatar: '',
        login: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthActionCreator: (state, { payload }: { payload: IAuthSlice }) => {
            state.isAuth = payload.isAuth
        },
        loginUserActionCreator: (state, { payload }: { payload: IAuthSlice }) => {
            state.user = payload.user
        },
        logoutUserActionCreator: () => initialState
    }
})

export const { actions: authSliceActions, reducer: authSliceReducer } = authSlice
