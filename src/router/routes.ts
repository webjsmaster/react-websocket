import { IRoute } from './types.ts'
import { ADMIN_ROUTE, FRIENDS_ROUTE, LOGIN_ROUTE, MESSENGER_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, USERS_ROUTE } from '../utils/constants.ts'
import { Admin, Auth, Friends, Messenger, Profile, Users } from '../pages'


export const adminRoutes: IRoute[] = [
    {
        path: ADMIN_ROUTE,
        Page: Admin
    }
]

export const authRoutes: IRoute[] = [
    {
        path: FRIENDS_ROUTE,
        Page: Friends
    },
    {
        path: MESSENGER_ROUTE,
        Page: Messenger
    },
    {
        path: PROFILE_ROUTE,
        Page: Profile
    },
    {
        path: USERS_ROUTE,
        Page: Users
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
