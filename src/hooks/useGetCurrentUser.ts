import localStore from 'store'
import { LOCALSTORAGE_ITEM } from '../utils/constants'
import { useEffect, useState } from 'react'
import { IUser } from '../store/slice/types'
import { useCheckIsAuthQuery } from '../api/newapi'
import { useGetUserQuery } from '../api/users.api.ts'


export const useGetCurrentUser = () => {
    const getStoredState = () => {
        if (localStore.get(LOCALSTORAGE_ITEM)) {
            const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
            return accessToken
        }
    }


    const [userData, setUserData] = useState<IUser>()
    const [token] = useState(getStoredState)


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
        setUserData(data)
    }, [data])


    const allLoading = loadingCheckUser || loadingGetUser
    const allError = errorGetUser || errorCheckUser
    const allSuccess = successGetUser || successCheckUser


    return { user: userData, isLoading: allLoading, isError: allError, isSuccess: allSuccess, token, checkUser }
}
