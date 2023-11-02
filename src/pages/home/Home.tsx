import { FC, useEffect } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { useAppActions, useAppSelector } from '../../hooks/hooks.ts'
import localStore from 'store'
import { LOCALSTORAGE_ITEM } from '../../utils/constants.ts'
import UserItem from '../../components/user-item/UserItem.tsx'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser.ts'


const Home: FC = () => {

    const { token, user } = useGetCurrentUser()

    const navigate = useNavigate()

    const getStoredState = () => {
        if (localStore.get(LOCALSTORAGE_ITEM)) {
            const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
            return accessToken
        }
    }

    const { getFriends } = useAppActions()

    const { isLoading, friends, error } = useAppSelector(state => state.users)

    useEffect(() => {
        if (user) {
            getFriends({ token, id: user.id })
        }
    }, [getFriends, token, user])

    // const {
    //     data: friends,
    //     isLoading,
    //     isSuccess,
    //     error,
    //     isError
    // } = useGetFriendsQuery({ token: getStoredState(), id: user.id }, {
    //     skip: !user.id
    // })
    //
    // function isFetchBaseQueryError(error: unknown): error is IBaseError {
    //     return typeof error === 'object' && error != null && 'status' in error
    // }
    //
    //
    // useEffect(() => {
    //     if (error) {
    //         navigate(LOGIN_ROUTE)
    //     }
    // }, [error, navigate])


    return (
        <Layout>
            <div className='flex flex-col justify-center items-center mx-4 mt-8'>
                {isLoading ? <LoaderPage/> : friends.length ?
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
