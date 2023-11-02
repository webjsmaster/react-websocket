import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store.ts'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import * as userActions from '../store/users/users.action.ts'
import * as friendsActions from '../store/friends/friends.action.ts'
import { actions } from '../store/slice/UserSlice.ts'


const rootActions = {
    ...userActions,
    ...friendsActions,
    ...actions
}


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = useDispatch<AppDispatch>


export const useAppActions = () => {
    const dispatch = useAppDispatch()
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

