import { FC, memo, useEffect, useState } from 'react'
import { LOCALSTORAGE_ITEM } from '../utils/constants'
import { useCheckIsAuthQuery } from '../api/newapi'

const Home: FC = () => {
    const ls = localStorage.getItem(LOCALSTORAGE_ITEM)

    const [token, setToken] = useState('')


    useEffect(() => {
        if (ls) {
            setToken(JSON.parse(ls).accessToken)
        }
    }, [])

    console.log('🧨: ', token)


    const { isLoading, data, error, isError } = useCheckIsAuthQuery(token)

    // const showToastError = (message: string) => toast.error(message, {
    //     position: toast.POSITION.TOP_CENTER
    // })
    //
    // const showToastSuccess = (message: string) => toast.success(message, {
    //     position: toast.POSITION.TOP_CENTER
    // })


    const handleClick = () => {

    }

    console.log('⭐: ', isLoading, data, error, isError)


    return (
        <div className='flex flex-col justify-center items-center'>

            <button onClick={ handleClick } className='p-4 bg-red-500 w-20 rounded-2xl text-white'>Click</button>
            Home PAge

            {isLoading && <div className='font-2xl text-red-700'>LOADING...</div>}
        </div>
    )
}

export default memo(Home)
