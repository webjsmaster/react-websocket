import { FC, useState } from 'react'
import styles from './UserItem.module.scss'
import icon from './../../assets/unknown.png'
import SendMessageIcon from '../icons/SendMessageIcon.tsx'
import CrossIcon from '../icons/CrossIcon.tsx'
import { IUserResponse } from '../../pages/home/types.ts'
import { useLocation } from 'react-router-dom'
import { USERS_ROUTE } from '../../utils/constants.ts'
import cn from 'classnames'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser.ts'
import { useCreateFriendsMutation } from '../../api/friends.api.ts'

const FriendItem: FC<IUserResponse> = ({ id, login, avatar }) => {

    const location = useLocation()

    const { user, token } = useGetCurrentUser()

    const [addFriends] = useCreateFriendsMutation()

    const [userRoute] = useState<boolean>(location.pathname === USERS_ROUTE)

    const handleButton = () => {
        addFriends({ token, id: user?.id as string, friendId: id })
    }

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
                <div className={ cn(styles.iconSvg, userRoute && styles.iconSvgAdd) } onClick={ handleButton }>
                    <CrossIcon/>
                </div>
            </div>
        </div>
    )
}

export default FriendItem
