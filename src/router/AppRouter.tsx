import { FC } from 'react'
import { IAppRoute, IRoute } from './types.ts'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from './routes.ts'


const AppRouter: FC<IAppRoute> = ({ user }) => {
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Page }: IRoute) =>
                <Route key={ path } path={ path } element={ <Page/> }/>
            )}
            {user.role === 'ADMIN' && authRoutes.map(({ path, Page }: IRoute) =>
                <Route key={ path } path={ path } element={ <Page/> }/>
            )}
            {publicRoutes.map(({ path, Page }: IRoute) =>
                <Route key={ path } path={ path } element={ <Page/> }/>
            )}
            <Route path="*" element={ <Navigate to="/login"/> }></Route>
        </Routes>
    )
}

export default AppRouter
