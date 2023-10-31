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

const logger = (store: any) => (next: any) => (action: any) => {
    console.group(action.type)
    console.info('dispatching', action)
    const result = next(action)
    console.log('next state', store.getState()) // выводим текущее состояние в консоль
    console.groupEnd()
    return result
}

export const store = configureStore({
    reducer: appReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).concat(logger)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
