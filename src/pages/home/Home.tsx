import { FC, useEffect } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import { useGetFriendsQuery } from '../../api/friends.api.ts'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { useAppSelector } from '../../hooks/hooks.ts'
import localStore from 'store'
import { LOCALSTORAGE_ITEM, LOGIN_ROUTE } from '../../utils/constants.ts'
import UserItem from '../../components/user-item/UserItem.tsx'
import { useNavigate } from 'react-router-dom'


interface IBaseError {
    message: string,
    status: number
}

const Home: FC = () => {

    const { user } = useAppSelector(state => state.user)

    const navigate = useNavigate()

    const getStoredState = () => {
        if (localStore.get(LOCALSTORAGE_ITEM)) {
            const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
            return accessToken
        }
    }

    const {
        data: friends,
        isLoading,
        isSuccess,
        error,
        isError
    } = useGetFriendsQuery({ token: getStoredState(), id: user.id }, {
        skip: !user.id
    })

    function isFetchBaseQueryError(error: unknown): error is IBaseError {
        return typeof error === 'object' && error != null && 'status' in error
    }


    useEffect(() => {
        if (isError) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    navigate(LOGIN_ROUTE)
                }
            }
        }
    }, [error, isError, navigate])

    return (
        <Layout>
            <div className='flex flex-col justify-center items-center mx-4 mt-8'>
                {isLoading ? <LoaderPage/> : isSuccess && friends.length ?
                    friends.map(friend =>
                        <UserItem
                            key={ friend.id }
                            user={ friend }
                        />
                    ) :
                    <div className='text-red-100'>У Вас пока нет друзей</div>
                }
            </div>
        </Layout>
    )
}

export default Home
