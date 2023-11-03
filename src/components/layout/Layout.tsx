import { FC, PropsWithChildren } from 'react'
import Navbar from '../navbar/Navbar.tsx'
import LoaderPage from '../loaders/loader-page/LoaderPage.tsx'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser'


const Layout: FC<PropsWithChildren> = ({ children }) => {

    // const navigate = useNavigate()
    const { token, isLoading, user, isError } = useGetCurrentUser()
    // const { loginUserActionCreator } = useAppActions()
    //
    // useEffect(() => {
    //     if (user) {
    //         loginUserActionCreator({ user })
    //     }
    // }, [loginUserActionCreator, user])
    //
    //
    // useEffect(() => {
    //     if (isError || !token) {
    //         console.log('[25] 🎯: ERROR')
    //         navigate(LOGIN_ROUTE)
    //     }
    // }, [isError, navigate, token])

    return (
        <div className='w-full'>
            <Navbar/>
            {isLoading ? <LoaderPage/> : children}
        </div>
    )
}

export default Layout
