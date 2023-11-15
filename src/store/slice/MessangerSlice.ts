import { createSlice } from '@reduxjs/toolkit'
import { IMessangerSlice, IUser } from './types.ts'
import { getMessagesUser } from '../messanger/messanger.action.ts'


const initialState: IMessangerSlice = {
    currentRecipient: {
        id: '',
        avatar: '',
        login: ''
    },
    messages: [],
    meta: {
        page: NaN,
        take: NaN,
        itemCount: NaN,
        pageCount: NaN,
        hasPreviousPage: false,
        hasNextPage: false
    }
}

export const messangerSlice = createSlice({
    name: 'messanger',
    initialState: initialState,
    reducers: {
        setCurrentRecipient: (state, { payload }: { payload: IUser }) => {
            state.currentRecipient = payload
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload]
        }
    },
    extraReducers: builder =>
        builder.addCase(getMessagesUser.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(getMessagesUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.messages = action.payload.data
            state.meta = action.payload.meta
        }).addCase(getMessagesUser.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            console.log('[34] 🚧: ', action.payload)
        })
})

export const { actions: messangerSliceActions, reducer: messangerSliceReducer } = messangerSlice
