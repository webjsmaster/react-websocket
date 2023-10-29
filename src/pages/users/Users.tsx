import { FC, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import { useAppSelector } from '../../hooks/hooks.ts'
import { useFindUsersQuery } from '../../api/users.api.ts'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { IUserResponse } from '../home/types.ts'
import UserItem from '../../components/user-item/UserItem.tsx'
import { useGetFriendsQuery } from '../../api/friends.api.ts'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser.ts'
import { IUser } from '../../store/slice/types.ts'


const Users: FC = () => {

    const { value } = useAppSelector(state => state.inputValue)
    const [users, setUsers] = useState<IUserResponse[]>([])
    const [user, setUser] = useState<IUser>()
    const { user: currentUser, token } = useGetCurrentUser()

    const { data: findUsers, isFetching } = useFindUsersQuery({ token, value }, {
        skip: !value
    })

    const {
        data: friends
    } = useGetFriendsQuery({ token, id: user?.id as string }, {
        skip: !user?.id
    })


    useEffect(() => {
        setUser(currentUser)
        friends?.map(f => f.id)
    }, [currentUser, friends])


    useEffect(() => {
        if (findUsers) {
            // setUsers(findUsers)
            setUsers(findUsers.map(user => {
                const friend = friends?.every(friend => {
                    return friend.id !== user.id
                })

                return { ...user, friend: !friend }
            }))
        }
    }, [findUsers, friends])


    return (
        <Layout>
            <div className='flex flex-col justify-center items-center mx-4 mt-8'>
                {isFetching ? <LoaderPage/> : (users.length ? users.map(user =>
                    <UserItem key={ user.id } user={ user }/>)
                    :
                    <div>Not Found</div>)
                }
            </div>
        </Layout>
    )
}

export default Users
