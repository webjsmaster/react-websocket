import { FC, PropsWithChildren, useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar.tsx'
import { useNavigate } from 'react-router-dom'
import localStore from 'store'
import { LOCALSTORAGE_ITEM, LOGIN_ROUTE } from '../../utils/constants.ts'
import { useCheckIsAuthQuery } from '../../api/newapi.ts'
import LoaderPage from '../loaders/loader-page/LoaderPage.tsx'

const Layout: FC<PropsWithChildren> = ({ children }) => {

    const navigate = useNavigate()
    const getStoredState = () => {
        if (localStore.get(LOCALSTORAGE_ITEM)) {
            const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
            return accessToken
        }
    }

    const [token] = useState(getStoredState)


    const { isLoading, data, isError, isSuccess } = useCheckIsAuthQuery(token, {
        skip: !token
    })

    console.log('[26] 🌻: ', data)

    useEffect(() => {
        if (isError || !token) {
            navigate(LOGIN_ROUTE)
        } else if (isSuccess) {
            console.log('[32] 🚧: ')
        }
    }, [isError, navigate, isSuccess])

    return (
        <div className='w-full h-full'>
            <Navbar/>
            {isLoading ? <LoaderPage/> : children}
        </div>
    )
}

export default Layout
