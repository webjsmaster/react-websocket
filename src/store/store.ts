import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slice/AuthSlice.ts'
import { api } from '../api/newapi.ts'
import { userSlice } from './slice/UserSlice.ts'

const appReducers = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: appReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
