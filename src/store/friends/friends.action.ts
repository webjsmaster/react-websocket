import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiFriends } from '../../api/api-friends.ts'
import { IFriendDataRequest } from '../types.ts'

export const addFriend = createAsyncThunk('addFriend',
    async (data: IFriendDataRequest, thunkApi) => {
        try {
            return await apiFriends.addFriend(data)
        } catch (e) {
            throw thunkApi.rejectWithValue({})
        }
    })

export const removeFriend = createAsyncThunk('removeFriend',
    async (data: IFriendDataRequest, thunkApi) => {
        try {
            return await apiFriends.removeFriend(data)
        } catch (e) {
            return thunkApi.rejectWithValue({})
        }
    })
