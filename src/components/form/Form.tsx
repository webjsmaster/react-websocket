import { ChangeEvent, FC, useEffect } from 'react'
import styles from './Form.module.scss'
import { IFormData, IFormProps } from './types.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import LoaderButton from '../loaders/loader-button/LoaderButton.tsx'
import { toast } from 'react-toastify'
import { useAppActions, useAppSelector } from '../../hooks/hooks.ts'
import localStore from 'store'
import { FRIENDS_ROUTE, LOCALSTORAGE_ITEM } from '../../utils/constants.ts'

const Form: FC<IFormProps> = ({ isLogin }) => {
    const navigate = useNavigate()
    const { login } = useAppActions()
    const { isAuth, user, isLoading, isError: isErrorLogin, error: errorLogin } = useAppSelector(state => state.auth)


    const showToastError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    })

    // const showToastSuccess = (message: string) => toast.success(message, {
    //     position: toast.POSITION.BOTTOM_CENTER
    // })


    useEffect(() => {
        if (isErrorLogin) {
            showToastError(errorLogin as string)
        }
    }, [isErrorLogin, errorLogin])

    useEffect(() => {
        if (isAuth) {
            localStore.set(LOCALSTORAGE_ITEM, { accessToken: user?.accessToken, refreshToken: user?.refreshToken })
            //TODO добвить экран приветствия
            // showToastSuccess('Добро пожаловать! 🤩')
            reset()
            navigate(FRIENDS_ROUTE)
        }
    }, [isAuth, user])


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors
    } = useForm<IFormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })


    const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
        if (isLogin) {
            login(data)
        } else {
            //TODO registration
            // await loginApi.register(data).then(res => {
            //     showToastSuccess(`Пользователь с логином ${res.login} зарегистрирован`)
            //     reset()
            //     navigate(LOGIN_ROUTE)
            // }).catch(res => {
            //     showToastError(res.message)
            // })
        }
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        clearErrors([`${e.target.id}` as 'email' | 'password'])
    }


    return (
        <form className={ styles.form } onSubmit={ handleSubmit(onSubmit) } noValidate={ true }>
            <div className={ styles.inputWrapper }>
                <label htmlFor="email">
                    <input type="email" id='email' placeholder='Email'
                        { ...register('email', {
                            onChange: (e) => handleChangeInput(e),
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Неверный формат email'
                            }
                        }) }
                    />
                </label>
            </div>
            {errors.email && <div className={ styles.error }>{errors.email.message}</div>}
            <div className={ styles.inputWrapper }>
                <label htmlFor="password">
                    <input type="password" id='password' placeholder='Password'
                        className={ errors.password && 'border-red-600' }
                        { ...register('password', {
                            onChange: (e) => handleChangeInput(e),
                            required: true,
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                                message: 'Минимум 8 символов, одна буква, одна цифра и спец.символ'
                            }
                        }) }
                    />
                </label>
            </div>
            {errors.password && <div className={ styles.error }>{errors.password.message}</div>}
            {!isLogin && <div className={ styles.inputWrapper }>
                <label htmlFor="login">
                    <input type="login" id='login' placeholder='Login'
                        { ...register('login', {
                            required: true,
                            minLength: {
                                value: 3,
                                message: 'Минимум 3 символа'
                            },
                            maxLength: {
                                value: 15,
                                message: 'Максимум 15 символов'
                            }
                        }) }
                    />
                </label>
            </div>}
            {errors.login && <div className={ styles.error }>{errors.login.message}</div>}
            <div className={ styles.button }>
                <button type='submit' disabled={ isLoading }>
                    {isLoading ? <LoaderButton/> : isLogin ? 'Вход' : 'Регистрация'}
                </button>
            </div>
        </form>
    )
}

export default Form
