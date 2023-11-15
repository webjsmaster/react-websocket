import { createAsyncThunk } from '@reduxjs/toolkit'
import { IGetMessagesDataRequest } from '../types.ts'
import { apiMessages } from '../../api/api-messages.ts'


export const getMessagesUser = createAsyncThunk('getMessageUser',
    async (data: IGetMessagesDataRequest, thunkApi) => {
        try {
            return await apiMessages.getMessages(data)
        } catch (e) {
            throw thunkApi.rejectWithValue(e)
        }
    })
