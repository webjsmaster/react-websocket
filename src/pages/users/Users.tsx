import { FC, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.tsx'
import { useAppSelector } from '../../hooks/hooks.ts'
import { useFindUsersQuery } from '../../api/users.api.ts'
import localStore from 'store'
import { LOCALSTORAGE_ITEM } from '../../utils/constants.ts'
import LoaderPage from '../../components/loaders/loader-page/LoaderPage.tsx'
import { IUserResponse } from '../home/types.ts'
import UserItem from '../../components/user-item/UserItem.tsx'


const Users: FC = () => {

    const { value } = useAppSelector(state => state.inputValue)
    const [users, setUsers] = useState<IUserResponse[]>([])

    const getStoredState = () => {
        if (localStore.get(LOCALSTORAGE_ITEM)) {
            const { accessToken } = localStore.get(LOCALSTORAGE_ITEM)
            return accessToken
        }
    }

    const { data, isFetching } = useFindUsersQuery({ token: getStoredState(), value }, {
        skip: !value
    })


    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])


    return (
        <Layout>
            <div className='flex flex-col justify-center items-center mx-4 mt-8'>
                {isFetching ? <LoaderPage/> : (users.length ? users.map(user =>
                    <UserItem key={ user.id } id={ user.id } login={ user.login } avatar={ user.avatar }/>)
                    :
                    <div>Not Found</div>)
                }
            </div>
        </Layout>
    )
}

export default Users
