import { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './Form.module.scss'
import { IFormData, IFormProps } from './types.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import LoaderButton from '../loaders/loader-button/LoaderButton.tsx'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../../api/api-auth.rtk.ts'
import { isFetchBaseQueryError } from '../../api/helpers.ts'
import localStore from 'store'
import { FRIENDS_ROUTE, LOCALSTORAGE_ITEM } from '../../utils/constants.ts'

const Form: FC<IFormProps> = ({ isLogin }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [login, {
        data: dataLogin,
        isLoading: isLoadingLogin,
        isError: isErrorLogin,
        error: errorLogin,
        isSuccess
    }] = useLoginMutation()

    const showToastError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    })

    const showToastSuccess = (message: string) => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    })
    

    useEffect(() => {
        if (isErrorLogin && errorLogin) {
            if (isFetchBaseQueryError(errorLogin)) {
                const errMsg = 'error' in errorLogin ? errorLogin.error : errorLogin.data.message
                showToastError(errMsg as string)
            }
        }
    }, [isErrorLogin, errorLogin])


    useEffect(() => {
        setIsLoading(isLoadingLogin)
    }, [isLoadingLogin])


    useEffect(() => {
        if (isSuccess) {
            localStore.set(LOCALSTORAGE_ITEM, dataLogin)
            showToastSuccess('Добро пожаловать! 🤩')
            reset()
            navigate(FRIENDS_ROUTE)
        }
    }, [dataLogin, isSuccess])


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
            // localStore.set(LOCALSTORAGE_ITEM, res)
            // showToastSuccess('Добро пожаловать! 🤩')
            // reset()
            // navigate(FRIENDS_ROUTE)
        } else {
            // await loginApi.register(data).then(res => {
            //     showToastSuccess(`Пользователь с логином ${res.login} зарегистрирован`)
            //     reset()
            //     navigate(LOGIN_ROUTE)
            // }).catch(res => {
            //     showToastError(res.message)
            // })
        }
        // setIsLoading(false)
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
