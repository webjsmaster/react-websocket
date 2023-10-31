import { FC, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import { useAppSelector } from '../../hooks/hooks.ts'
import { useFindUsersQuery, useLazyFindUsersQuery } from '../../api/users.api.ts'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { IMetaResponse, IUserResponse } from '../home/types.ts'
import UserItem from '../../components/user-item/UserItem.tsx'
import { useGetFriendsQuery } from '../../api/friends.api.ts'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser.ts'
import { IUser } from '../../store/slice/types.ts'
import Pagination from '../../components/pagination/Pagination.tsx'


const Users: FC = () => {

    const { value } = useAppSelector(state => state.inputValue)
    const [users, setUsers] = useState<IUserResponse[]>([])
    const [user, setUser] = useState<IUser>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [paginationInfo, setPaginationInfo] = useState<IMetaResponse>({
        hasNextPage: false, hasPreviousPage: false, itemCount: 0, page: 0, pageCount: 0, take: 0
    })
    const { user: currentUser, token } = useGetCurrentUser()
    const take: number = 2

    const { data: findUsersData } = useFindUsersQuery({ token, value, take, page: currentPage }, {
        skip: !value
    })

    const [findUsersDataQuery, { isFetching, isLoading }] = useLazyFindUsersQuery()

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
        if (findUsersData) {
            // setUsers(findUsers)
            setUsers(findUsersData.data.map(user => {
                const friend = friends?.every(friend => {
                    return friend.id !== user.id
                })

                return { ...user, friend: !friend }
            }))
            setPaginationInfo(findUsersData.meta)
        }
    }, [findUsersData, friends])

    const handlerChangePage = (p: number) => {
        setCurrentPage(p)
    }


    useEffect(() => {
        findUsersDataQuery({ token, value, take, page: currentPage }).then(({ data }) => {
            if (data) {
                setUsers(data.data.map(user => {
                    const friend = friends?.find(friend => {
                        return friend.id === user.id
                    })
                    return { ...user, friend: !!friend }
                }))
                setPaginationInfo(data.meta)
            }
        })
    }, [currentPage])


    return (
        <Layout>
            <div className='flex flex-col justify-center items-center mx-4 mt-8'>
                {isLoading ? <LoaderPage/> : (users.length ? users.map(user =>
                    <UserItem key={ user.id } user={ user }/>)
                    :
                    <div>Not Found</div>)
                }
                {paginationInfo.pageCount > 0 && paginationInfo.itemCount > paginationInfo.take &&
                    <Pagination
                        meta={ paginationInfo }
                        handlerChangePage={ handlerChangePage }
                        isLoading={ isFetching }
                    />
                }
            </div>
        </Layout>
    )
}

export default Users
