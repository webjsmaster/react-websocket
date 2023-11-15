import { FC, useEffect, useState } from 'react'
import styles from './UserItem.module.scss'
import icon from './../../assets/unknown.png'
import SendMessageIcon from '../icons/SendMessageIcon.tsx'
import CrossIcon from '../icons/CrossIcon.tsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { MESSENGER_ROUTE, USERS_ROUTE } from '../../utils/constants.ts'
import cn from 'classnames'
import { IPropsUserItem } from './types.ts'
import { useAppActions, useAppSelector } from '../../hooks/hooks.ts'

const FriendItem: FC<IPropsUserItem> = ({ user: userProps }) => {
    const { id, avatar, friend, login } = userProps

    const [current, setCurrent] = useState<string>('')
    const location = useLocation()
    const navigate = useNavigate()
    const { addFriend, removeFriend, setCurrentRecipient } = useAppActions()
    const [userRoute] = useState<boolean>(location.pathname === USERS_ROUTE)
    const { user } = useAppSelector(state => state.auth)
    const { isLoading, isSuccess } = useAppSelector(state => state.friends)

    useEffect(() => {
        if (isSuccess) {
            setCurrent('')
        }
    }, [isSuccess])

    const handleButton = () => {
        setCurrent(id)
        userRoute && !friend ?
            addFriend({ token: user?.accessToken as string, id: user?.id as string, friendId: id }) :
            removeFriend({ token: user?.accessToken as string, id: user?.id as string, friendId: id })
    }

    const handleMessageBtn = () => {
        setCurrentRecipient(userProps)
        navigate(MESSENGER_ROUTE)
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
                <button className={ styles.iconSvgSendMess }
                    disabled={ isLoading && current === id }
                    onClick={ handleMessageBtn }
                >
                    <SendMessageIcon/>
                </button>
                <button className={ cn(styles.iconSvg, (userRoute && !friend) && styles.iconSvgAdd) }
                    disabled={ isLoading && current === id }
                    onClick={ handleButton }>
                    <CrossIcon/>
                </button>
            </div>
        </div>
    )
}

export default FriendItem
