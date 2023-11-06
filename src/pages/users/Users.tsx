import { FC, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import { useAppActions, useAppSelector } from '../../hooks/hooks.ts'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import UserItem from '../../components/user-item/UserItem.tsx'
import Pagination from '../../components/pagination/Pagination.tsx'
import { IMetaResponse, IUserResponse } from '../../store/slice/types.ts'
import styles from './Users.module.scss'
import cn from 'classnames'


const Users: FC = () => {
    const { value } = useAppSelector(state => state.value)
    const { user, isAuth } = useAppSelector(state => state.auth)
    const { friends } = useAppSelector(state => state.friends)
    const { isLoading, users: usersStore, meta, isSuccess } = useAppSelector(state => state.users)

    const [btnPressed, setBtnPressed] = useState<boolean>(false)
    const [users, setUsers] = useState<IUserResponse[]>([])
    const [paginationInfo, setPaginationInfo] = useState<IMetaResponse>({
        hasNextPage: false, hasPreviousPage: false, itemCount: 0, page: 0, pageCount: 0, take: 0
    })
    const take: number = 8


    const { getUsers } = useAppActions()


    useEffect(() => {
        if (isAuth && user) {
            getUsers({ token: user.accessToken as string, value, page: 1, take })
        }
    }, [value])

    useEffect(() => {
        setUsers(usersStore.map(user => {
            const friend = friends.find(friend => {
                return friend.id === user.id
            })

            return { ...user, friend: !!friend }
        }))
        setPaginationInfo(meta)
    }, [usersStore, friends])


    const handlerChangePage = (p: number) => {
        setBtnPressed(true)
        getUsers({ token: user?.accessToken as string, value, page: p, take })
    }

    useEffect(() => {
        if (isSuccess) {
            setBtnPressed(false)
        }
    }, [isSuccess])

    return (
        <Layout>
            {isLoading && !isSuccess && !btnPressed ?
                <div className='h-full flex justify-center items-center -translate-y-16'>
                    <LoaderPage/>
                </div> :
                <>
                    <div className={ cn(styles.wrapper, btnPressed && styles.wrapperDisabled) }>
                        {users.length ? users.map(user =>
                            <UserItem key={ user.id } user={ user }/>)
                            :
                            <div>Not Found</div>
                        }
                    </div>
                    <div className={ styles.pagination }>
                        {paginationInfo.pageCount > 0 && paginationInfo.itemCount > paginationInfo.take &&
                            <Pagination
                                meta={ paginationInfo }
                                handlerChangePage={ handlerChangePage }
                                isLoading={ isLoading }
                            />
                        }
                    </div>
                </>

            }
        </Layout>
    )
}

export default Users
