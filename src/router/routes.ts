import { IRoute } from './types.ts'
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MESSENGER_ROUTE, REGISTRATION_ROUTE } from '../utils/constants.ts'
import { Admin, Auth, Home, Messenger } from '../pages'


export const adminRoutes: IRoute[] = [
    {
        path: ADMIN_ROUTE,
        Page: Admin
    }
]

export const authRoutes: IRoute[] = [
    {
        path: HOME_ROUTE,
        Page: Home
    },
    {
        path: MESSENGER_ROUTE,
        Page: Messenger
    }
]

export const publicRoutes: IRoute[] = [
    {
        path: LOGIN_ROUTE,
        Page: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Page: Auth
    }
]
