import { FC, PropsWithChildren, useEffect } from 'react'
import { useAppSelector } from '../hooks/hooks.ts'

const ErrorHandlingMiddleware: FC<PropsWithChildren> = ({ children }) => {
    // Проверяем, есть ли ошибка в ответе сервера
    // if (props.error) {
    //     // Если есть ошибка, то перенаправляем на страницу логина
    //     return <Redirect to="/login"/>
    // }

    // Если ошибки нет, то просто рендерим дочерние компоненты


    const { error: errorUsers } = useAppSelector(state => state.users)
    const { error: errorFriends } = useAppSelector(state => state.friends)
    const { error: errorAuth } = useAppSelector(state => state.auth)

    useEffect(() => {
        console.groupCollapsed('🌲 MIDDLEWARE')
        console.info('[19] 🚧: ERROR USERS', errorUsers)
        console.info('[19] 🚧: ERROR FRIENDS', errorFriends)
        console.info('[19] 🚧: ERROR AUTH', errorAuth)
        console.groupEnd()
    }, [errorFriends, errorUsers, errorAuth])

    return children
}

export default ErrorHandlingMiddleware

