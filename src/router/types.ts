import { FunctionComponent } from 'react'

export interface IRoute {
    path: string
    Page: FunctionComponent
}

export interface IAppRoute {
    user: {
        isAuth: boolean,
        role: 'ADMIN' | 'USER'
    }
}
