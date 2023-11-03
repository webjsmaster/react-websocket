import { createSlice } from '@reduxjs/toolkit'
import { IInputValue } from './types.ts'

const initialState: IInputValue = {
    value: ''
}

export const valueSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setValueActionCreator: (state, { payload }: { payload: IInputValue }) => {
            state.value = payload.value
        }
    }
})


export const { actions: valueSliceActions, reducer: valueSliceReducer } = valueSlice
