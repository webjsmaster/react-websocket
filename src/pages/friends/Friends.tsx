import { FC, useEffect } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { useAppActions, useAppSelector } from '../../hooks/hooks.ts'
import UserItem from '../../components/user-item/UserItem.tsx'
import { toast } from 'react-toastify'


const Friends: FC = () => {
    const { user, isAuth } = useAppSelector(state => state.auth)
    const { isLoading, friends, isSuccess, error, isError } = useAppSelector(state => state.friends)
    // const [friends, setFriends] = useState<IUserResponse>()

    const { getFriends } = useAppActions()

    const showToastError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    })

    useEffect(() => {
        if (user && isAuth) {
            if (!isSuccess) {
                getFriends({ token: user.accessToken as string, id: user.id })
            }
        }
    }, [])


    useEffect(() => {
        if (isError) {
            showToastError(error as string)
        }
    }, [isError])

    return (
        <Layout>
            {isLoading && !isSuccess ? <div className='h-full flex justify-center items-center -translate-y-16'>
                <LoaderPage/>
            </div> :
                <div className='flex flex-col justify-center items-center mx-4 mt-8'>
                    {friends.length ?
                        friends.map(friend =>
                            <UserItem
                                key={ friend.id }
                                user={ friend }
                            />
                        ) :
                        <div className='text-red-100'>У Вас пока нет друзей</div>
                    }
                </div>
            }
        </Layout>
    )
}

export default Friends
