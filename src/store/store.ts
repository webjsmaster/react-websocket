import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSliceReducer } from './slice/AuthSlice.ts'
import { apiAuthRtk } from '../api/api-auth.rtk.ts'
import { valueSliceReducer } from './slice/ValueSlice.ts'
import { usersSlice } from './slice/UsersSlice.ts'
import { friendsSliceReducer } from './slice/FriendsSlice.ts'
import { messangerSliceReducer } from './slice/MessangerSlice.ts'


const appReducers = combineReducers({
    auth: authSliceReducer,
    friends: friendsSliceReducer,
    users: usersSlice.reducer,
    value: valueSliceReducer,
    messanger: messangerSliceReducer,
    [apiAuthRtk.reducerPath]: apiAuthRtk.reducer
})

// const logger = (store: any) => (next: any) => (action: any) => {
//     console.group(action.type)
//     console.info('dispatching', action)
//     const result = next(action)
//     console.log('next state', store.getState()) // выводим текущее состояние в консоль
//     console.groupEnd()
//     return result
// }

export const store = configureStore({
    reducer: appReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAuthRtk.middleware)
    // .concat(logger)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
