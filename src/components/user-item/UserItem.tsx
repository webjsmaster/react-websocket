import { FC, useState } from 'react'
import styles from './UserItem.module.scss'
import icon from './../../assets/unknown.png'
import SendMessageIcon from '../icons/SendMessageIcon.tsx'
import CrossIcon from '../icons/CrossIcon.tsx'
import { useLocation } from 'react-router-dom'
import { USERS_ROUTE } from '../../utils/constants.ts'
import cn from 'classnames'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser.ts'
import { useCreateFriendMutation, useDeleteFriendMutation } from '../../api/friends.api.ts'
import { IPropsUserItem } from './types.ts'

const FriendItem: FC<IPropsUserItem> = ({ user: userProps }) => {

    const { id, avatar, friend, login } = userProps

    const location = useLocation()

    const { user, token } = useGetCurrentUser()

    const [addFriend, { isLoading: isLoadingAdd }] = useCreateFriendMutation()
    const [deleteFriend, { isLoading: isLoadingDelete }] = useDeleteFriendMutation()

    const [userRoute] = useState<boolean>(location.pathname === USERS_ROUTE)

    const handleButton = () => {
        userRoute && !friend ?
            addFriend({ token, id: user?.id as string, friendId: id }) :
            deleteFriend({ token, id: user?.id as string, friendId: id })
    }

    console.log('🌻:', isLoadingDelete, isLoadingAdd)


    return (
        <div className={ styles.wrapper }>
            <div className={ styles.userInfo }>
                <div className={ styles.image }>
                    <img src={ avatar ? avatar : icon } alt="image"/>
                </div>
                <div className={ styles.title }>
                    {login}
                </div>
            </div>
            <div className={ styles.blockIcon }>
                <div className={ styles.iconSvgSendMess }>
                    <SendMessageIcon/>
                </div>
                <button className={ cn(styles.iconSvg,
                    (userRoute && !friend) && styles.iconSvgAdd)
                }
                onClick={ handleButton }
                disabled={ isLoadingAdd || isLoadingDelete }
                >
                    <CrossIcon/>
                </button>
            </div>
        </div>
    )
}

export default FriendItem
