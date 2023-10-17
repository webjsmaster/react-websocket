import { FC, useState } from 'react'
import { LOCALSTORAGE_ITEM, LOGIN_ROUTE } from '../utils/constants.ts'
import { useNavigate } from 'react-router-dom'
import localStore from 'store'
import { useCheckIsAuthQuery } from '../api/newapi.ts'
import { toast } from 'react-toastify'

const Home: FC = () => {

    const navigate = useNavigate()
    const getStoredState = () => {
        const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
        return accessToken
    }

    const [token] = useState(getStoredState)


    const showToastError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    })
    //
    const showToastSuccess = (message: string) => toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    })

    const { isLoading, data, error, isError, isSuccess } = useCheckIsAuthQuery(token, {
        skip: !token
    })


    const handleClick = () => {
        navigate(LOGIN_ROUTE)
    }


    if (isError) {
        navigate(LOGIN_ROUTE)
    }


    return (
        <div className='flex flex-col justify-center items-center'>

            <button onClick={ handleClick } className='p-4 bg-red-500 w-20 rounded-2xl text-white'>Click</button>
            Home PAge

            {isLoading && <div className='font-2xl text-red-700'>LOADING...</div>}
        </div>
    )
}

export default Home
