import { FC } from 'react'
import styles from './Navbar.module.scss'
import LogoIcons from '../icons/LogoIcons.tsx'
import ProfileIcon from '../icons/ProfileIcon.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { LOCALSTORAGE_ITEM, LOGIN_ROUTE, MESSENGER_ROUTE, PROFILE_ROUTE } from '../../utils/constants.ts'
import LogoutIcon from '../icons/LogoutIcon.tsx'
import localStore from 'store'
import { useAppSelector } from '../../hooks/hooks.ts'


const Navbar: FC = () => {

    const navigate = useNavigate()

    const user = useAppSelector((state) => state.user)


    const handlerButton = () => {
        localStore.remove(LOCALSTORAGE_ITEM)
        navigate(LOGIN_ROUTE)
    }

    console.log('[25] 🎯: ', user)

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.content }>
                <Link to={ MESSENGER_ROUTE } className={ styles.link }>
                    <LogoIcons/>
                </Link>
                <div className='flex gap-4 items-center'>
                    <Link to={ PROFILE_ROUTE } className={ styles.icon }>
                        <ProfileIcon/>
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
