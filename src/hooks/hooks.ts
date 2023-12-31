import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store.ts'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import * as userActions from '../store/users/users.action.ts'
import * as friendsActions from '../store/friends/friends.action.ts'
import * as authActions from '../store/auth/auth.action.ts'
import * as messengerActions from '../store/messenger/messenger.action.ts'
import { valueSliceActions } from '../store/slice/ValueSlice.ts'
import { authSliceActions } from '../store/slice/AuthSlice.ts'
import { friendsSliceActions } from '../store/slice/FriendsSlice.ts'
import { messengerSliceActions } from '../store/slice/MessengerSlice.ts'

const rootActions = {
    ...authActions,
    ...friendsSliceActions,
    ...authSliceActions,
    ...valueSliceActions,
    ...userActions,
    ...friendsActions,
    ...messengerSliceActions,
    ...messengerActions
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = useDispatch<AppDispatch>

export const useAppActions = () => {
    const dispatch = useAppDispatch()
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
