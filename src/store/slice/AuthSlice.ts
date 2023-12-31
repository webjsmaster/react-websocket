import { createSlice } from '@reduxjs/toolkit'
import { IAuthSlice } from './types.ts'
import { login, register } from '../auth/auth.action.ts'

const initialState: IAuthSlice = {
    isAuth: false,
    user: {
        id: '',
        avatar: '',
        login: '',
        accessToken: ''
    },
    isLoading: false,
    isError: false,
    isSuccess: false
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
    }, extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.isLoading = true
            state.isError = false
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.isError = false
            state.user = action.payload
        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isAuth = false
            state.user = initialState.user
            state.error = action.payload as string
        }).addCase(register.pending, state => {
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        }).addCase(register.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        }).addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.user = initialState.user
            state.error = action.payload as string
        })
    }
})

export const { actions: authSliceActions, reducer: authSliceReducer } = authSlice
