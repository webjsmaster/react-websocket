import { FC, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { FRIENDS_ROUTE } from '../utils/constants.ts'
import { useAppSelector } from '../hooks/hooks.ts'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser.ts'
import LoaderPage from '../components/loaders/loader-page/LoaderPage.tsx'
import { authRoutes, publicRoutes } from './routes.ts'
import { IRoute } from './types.ts'


const AppRouter: FC = () => {
    const { isAuth } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const { isLoading } = useGetCurrentUser()


    useEffect(() => {
        if (isAuth) {
            navigate(FRIENDS_ROUTE)
        }
    }, [isAuth])


    return (
        <>
            {isLoading ? <LoaderPage/> :
                <Routes>
                    {isAuth && authRoutes.map(({ path, Page }: IRoute) =>
                        <Route key={ path } path={ path } element={ <Page/> }/>
                    )}
                    {publicRoutes.map(({ path, Page }: IRoute) =>
                        <Route key={ path } path={ path } element={ <Page/> }/>
                    )}
                    <Route path="*" element={ <Navigate to="/login"/> }></Route>
                </Routes>
            }


        </>

    )
}

export default AppRouter
