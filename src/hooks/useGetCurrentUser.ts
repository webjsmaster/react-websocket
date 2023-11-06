import localStore from 'store'
import { LOCALSTORAGE_ITEM } from '../utils/constants'
import { useEffect, useState } from 'react'
import { IUser } from '../store/slice/types'
import { useCheckIsAuthQuery } from '../api/api-auth.rtk.ts'
import { useGetUserQuery } from '../api/api-user.rtk.ts'
import { useAppActions } from './hooks.ts'

export const useGetCurrentUser = () => {
    const getStoredState = () => {
        if (localStore.get(LOCALSTORAGE_ITEM)) {
            const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
            return accessToken
        }
    }


    const [userData, setUserData] = useState<IUser>()
    const [token] = useState(getStoredState)
    const { loginUserActionCreator, setIsAuthActionCreator } = useAppActions()


    const {
        isLoading: loadingCheckUser,
        isError: errorCheckUser,
        isSuccess: successCheckUser,
        data: checkUser
    } = useCheckIsAuthQuery(token, {
        skip: !token
    })


    const { data, isLoading: loadingGetUser, isError: errorGetUser, isSuccess: successGetUser } = useGetUserQuery({
        token,
        user: checkUser
    }, {
        skip: (!successCheckUser || !checkUser)
    })

    useEffect(() => {
        if (data) {
            setUserData(data)
            loginUserActionCreator({
                user: {
                    id: data.id,
                    login: data.login,
                    avatar: data.avatar,
                    accessToken: token
                }
            })
            setIsAuthActionCreator({ isAuth: true })
        }
    }, [data])


    const allLoading = loadingCheckUser || loadingGetUser
    const allError = errorGetUser || errorCheckUser
    const allSuccess = successGetUser || successCheckUser


    return { user: userData, isLoading: allLoading, isError: allError, isSuccess: allSuccess, token, checkUser }
}
