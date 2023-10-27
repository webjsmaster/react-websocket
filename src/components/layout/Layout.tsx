import { FC, PropsWithChildren, useEffect } from 'react'
import Navbar from '../navbar/Navbar.tsx'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/constants.ts'
import LoaderPage from '../loaders/loader-page/LoaderPage.tsx'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser'
import { useAppDispatch } from '../../hooks/hooks'
import { actions } from '../../store/slice/UserSlice'


const Layout: FC<PropsWithChildren> = ({ children }) => {

    const navigate = useNavigate()


    const { token, isLoading, user, isError } = useGetCurrentUser()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            dispatch(actions.addUser(user))
        }
    }, [dispatch, user])

    // useEffect(() => {
    //     console.log('[27] 🐬: ', checkUser, user)
    // }, [checkUser])


    useEffect(() => {
        if (isError || !token) {
            navigate(LOGIN_ROUTE)
        }
    }, [isError, navigate, token])

    return (
        <div className='w-full'>
            <Navbar/>
            {isLoading ? <LoaderPage/> : children}
        </div>
    )
}

export default Layout
