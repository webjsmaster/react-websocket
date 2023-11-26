import { createSlice } from '@reduxjs/toolkit'
import { IMessengerSlice, IUser } from './types.ts'
import { getMessagesUser } from '../messenger/messenger.action.ts'

const initialState: IMessengerSlice = {
    currentRecipient: {
        id: '',
        avatar: '',
        login: '',
        accessToken: ''
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

export const messengerSlice = createSlice({
    name: 'messenger',
    initialState: initialState,
    reducers: {
        setCurrentRecipient: (state, { payload }: { payload: IUser }) => {
            state.currentRecipient = payload
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload]
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getMessagesUser.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getMessagesUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.messages = action.payload.data
                state.meta = action.payload.meta
            })
            .addCase(getMessagesUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                console.log('[34] 🚧: ', action.payload)
            })
})

export const { actions: messengerSliceActions, reducer: messengerSliceReducer } = messengerSlice
