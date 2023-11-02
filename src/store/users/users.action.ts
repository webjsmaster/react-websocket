import { createAsyncThunk } from '@reduxjs/toolkit'
import { IGetUsersRequest } from '../../pages/home/types.ts'
import { usersApi } from '../../api/api-users.ts'

export const getUsers = createAsyncThunk('users', async (data: IGetUsersRequest, thunkApi) => {
    try {
        return await usersApi.findUsers(data)
    } catch (e) {
        console.log('[9] 🥕: ERROR', e)
        thunkApi.rejectWithValue([])
    }
})

export const getFriends = createAsyncThunk('friends', async (data: { id: string, token: string }, thunkApi) => {
    try {
        return await usersApi.getFriends(data)
    } catch (e) {
        console.log('[9] 🥕: ERROR', e)
        throw thunkApi.rejectWithValue({})
    }
})
