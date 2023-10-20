import { FC } from 'react'
import styles from './Navbar.module.scss'
import LogoIcons from '../icons/LogoIcons.tsx'
import ProfileIcon from '../icons/ProfileIcon.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_ROUTE, LOCALSTORAGE_ITEM, LOGIN_ROUTE, MESSENGER_ROUTE, PROFILE_ROUTE } from '../../utils/constants.ts'
import LogoutIcon from '../icons/LogoutIcon.tsx'
import localStore from 'store'
import ImageIcon from './image-icon/ImageIcon'
import { useAppSelector } from '../../hooks/hooks'
import PeopleIcon from '../icons/PeopleIcon.tsx'


const Navbar: FC = () => {
    const { user } = useAppSelector(state => state.user)
    const navigate = useNavigate()

    const handlerButton = () => {
        localStore.remove(LOCALSTORAGE_ITEM)
        navigate(LOGIN_ROUTE)
    }


    return (
        <div className={ styles.wrapper }>
            <div className={ styles.content }>
                <Link to={ MESSENGER_ROUTE } className={ styles.link }>
                    <LogoIcons/>
                </Link>
                <div className='flex gap-4 items-center'>
                    <Link to={ HOME_ROUTE } className={ styles.peopleLink }>
                        <PeopleIcon theme={ 'white' }/>
                        People
                    </Link>
                    <div className='text-xl text-red-500 uppercase mr-4'>{user?.login}</div>
                    <Link to={ PROFILE_ROUTE } className={ styles.icon }>
                        {user?.avatar ? <ImageIcon img={ user.avatar }/> : <ProfileIcon/>}
                    </Link>
                    <button className={ styles.logout } onClick={ handlerButton }>
                        <LogoutIcon/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
