import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slice/AuthSlice.ts'
import { api } from '../api/newapi.ts'
import { reducer } from './slice/UserSlice.ts'
import { inputValueReducer } from './slice/InputValueSlice.ts'

const appReducers = combineReducers({
    auth: authSlice.reducer,
    user: reducer,
    inputValue: inputValueReducer,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: appReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
