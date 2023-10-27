import { FC, useEffect } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import { useGetFriendsQuery } from '../../api/friends.api.ts'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { useAppSelector } from '../../hooks/hooks.ts'
import localStore from 'store'
import { LOCALSTORAGE_ITEM, LOGIN_ROUTE } from '../../utils/constants.ts'
import UserItem from '../../components/user-item/UserItem.tsx'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {

    const { user } = useAppSelector(state => state.user)

    const navigate = useNavigate()

    const getStoredState = () => {
        if (localStore.get(LOCALSTORAGE_ITEM)) {
            const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
            return accessToken
        }
    }

    const { data: friends, isLoading, isSuccess, error, isError } = useGetFriendsQuery({ token: getStoredState(), id: user.id }, {
        skip: !user.id
    })


    useEffect(() => {
        if (isError && error.status === 403) {
            navigate(LOGIN_ROUTE)
        }
    }, [isError])

    return (
        <Layout>
            <div className='flex flex-col justify-center items-center mx-4 mt-8'>
                {isLoading ? <LoaderPage/> : isSuccess && friends.length ?
                    friends.map(friend =>
                        <UserItem
                            key={ friend.id }
                            id={ friend.id }
                            login={ friend.login }
                            avatar={ friend.avatar }
                        />
                    ) :
                    <div className='text-red-100'>У Вас пока нет друзей</div>
                }
            </div>
        </Layout>
    )
}

export default Home
