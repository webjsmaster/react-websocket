import { FC } from 'react'
import styles from './Auth.module.scss'
import { Link, useLocation } from 'react-router-dom'
import Form from '../../components/form/Form.tsx'


const Auth: FC = () => {
    const location = useLocation()
    const isLogin = location.pathname === '/login'

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.content }>
                <div className={ styles.title }>{isLogin ? 'Вход' : 'Регистрация'}</div>
                <Form isLogin={ isLogin }/>
                <AuthChangeLink isLogin={ isLogin }/>
            </div>
        </div>
    )
}

export default Auth


const AuthChangeLink: FC<{ isLogin: boolean }> = ({ isLogin }) => {
    return (
        <div className={ styles.changeLink }>
            {isLogin ? (
                <div>Нет аккаунта? <Link to="/registration">Создать</Link></div>

            ) : (
                <div>Есть аккаунт? <Link to="/login">Войти</Link></div>
            )}
        </div>
    )
}
