import { createSlice } from '@reduxjs/toolkit'
import { IInputValue } from './types.ts'

const initialState: IInputValue = {
    value: ''
}

export const inputValueSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setValue: (state, { payload }: { payload: IInputValue }) => {
            state.value = payload.value
        }
    }
})


export const { actions, reducer: inputValueReducer } = inputValueSlice
