import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthDataReqiest } from '../types.ts'
import { apiAuth } from '../../api/api-auth.ts'
import { IErrorSlise } from '../slice/types.ts'

export const login = createAsyncThunk('login',
    async (data: IAuthDataReqiest, thunkApi) => {
        try {
            const { accessToken, refreshToken, user } = await apiAuth.login(data)
            return { accessToken, refreshToken, ...user }
        } catch (e) {
            const error = e as IErrorSlise
            throw thunkApi.rejectWithValue(error.response.data.message)
        }
    })

export const register = createAsyncThunk('register',
    async (data: IAuthDataReqiest, thunkApi) => {
        try {
            return await apiAuth.register(data)
        } catch (e) {
            return thunkApi.rejectWithValue({})
        }
    })
