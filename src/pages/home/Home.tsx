import { FC, useEffect } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { useAppActions, useAppSelector } from '../../hooks/hooks.ts'
import UserItem from '../../components/user-item/UserItem.tsx'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser.ts'


const Home: FC = () => {

    const { token, user } = useGetCurrentUser()


    const { getFriends } = useAppActions()

    const { isLoading, friends } = useAppSelector(state => state.users)

    useEffect(() => {
        if (user) {
            getFriends({ token, id: user.id })
        }
    }, [getFriends, token, user])


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
