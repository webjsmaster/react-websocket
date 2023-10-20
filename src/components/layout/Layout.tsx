import { FC, PropsWithChildren, useEffect } from 'react'
import Navbar from '../navbar/Navbar.tsx'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/constants.ts'
import LoaderPage from '../loaders/loader-page/LoaderPage.tsx'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser'
import { useAppDispatch } from '../../hooks/hooks'
import { actions } from '../../store/slice/UserSlice'


// interface IUserCheck {
//     id: string
//     login: string
//     exp: string
//     iat: string
// }


const Layout: FC<PropsWithChildren> = ({ children }) => {

    const navigate = useNavigate()
    // const getStoredState = () => {
    //     if (localStore.get(LOCALSTORAGE_ITEM)) {
    //         const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
    //         return accessToken
    //     }
    // }
    //
    //
    // const [userData, setUserData] = useState<IUser>()
    //
    //
    // const [token] = useState(getStoredState)
    //
    //
    // const { isLoading, isError, isSuccess, data: checkUser } = useCheckIsAuthQuery(token, {
    //     skip: !token
    // })
    //
    //
    // const { data, isLoading: loadingGetUser } = useGetUserQuery({ token, user: checkUser }, {
    //     skip: (!isSuccess || !checkUser)
    // })
    //
    // useEffect(() => {
    //     setUserData(data)
    // }, [data])

    const { token, isSuccess, isLoading, user, isError } = useGetCurrentUser()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            dispatch(actions.addUser(user))
        }
    }, [user])


    useEffect(() => {
        if (isError || !token) {
            navigate(LOGIN_ROUTE)
        } else if (isSuccess) {

            console.log('[32] 🚧: ', user)
        }
    }, [isError, navigate, isSuccess])

    return (
        <div className='w-full h-full'>
            <Navbar login={ user?.login }/>
            {isLoading ? <LoaderPage/> : children}
        </div>
    )
}

export default Layout
