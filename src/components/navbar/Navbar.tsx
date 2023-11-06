import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import styles from './Navbar.module.scss'
import LogoIcons from '../icons/LogoIcons.tsx'
import ProfileIcon from '../icons/ProfileIcon.tsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FRIENDS_ROUTE, LOCALSTORAGE_ITEM, MESSENGER_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from '../../utils/constants.ts'
import LogoutIcon from '../icons/LogoutIcon.tsx'
import localStore from 'store'
import ImageIcon from './image-icon/ImageIcon'
import { useAppActions, useAppSelector } from '../../hooks/hooks'
import PeopleIcon from '../icons/PeopleIcon.tsx'
import FindIcon from '../icons/FindIcon.tsx'
import cn from 'classnames'
import ArrowIcon from '../icons/ArrowIcon.tsx'


const Navbar: FC = () => {
    const { user } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const [isShow, setIsShow] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const { pathname } = useLocation()
    const { setValueActionCreator, logoutUserActionCreator } = useAppActions()

    const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handlerFindButton()
        }
    }

    const handlerLogoutButton = () => {
        localStore.remove(LOCALSTORAGE_ITEM)
        logoutUserActionCreator()
    }

    const handlerFindButton = () => {
        setValueActionCreator({ value: inputValue })
        if (pathname !== USERS_ROUTE) {
            navigate(USERS_ROUTE)
        }

    }

    const handlerArrowButton = () => {
        setIsShow(!isShow)
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.content }>
                <Link to={ MESSENGER_ROUTE } className={ styles.link }>
                    <LogoIcons/>
                </Link>

                <div className='flex items-center'>
                    <div className={ styles.inputWrapper }>
                        <input className={ cn(styles.input, isShow && styles.inputActive) } type="text"
                            placeholder={ inputValue }
                            onChange={ (e) => handlerInput(e) }
                            onKeyDown={ (e) => handlerKeyDown(e)
                            }/>
                        <div className={ cn(styles.findIcon, isShow && styles.findIconActive) }
                            onClick={ handlerFindButton }>
                            <FindIcon/>
                        </div>
                    </div>

                    <div className={ cn(styles.arrowIcon, isShow && styles.arrowIconActive) }
                        onClick={ handlerArrowButton }>
                        <ArrowIcon/>
                    </div>

                    <div className='flex gap-4 items-center'>

                        <Link to={ FRIENDS_ROUTE } className={ styles.peopleLink }>
                            <PeopleIcon theme={ 'white' }/>
                            <span className='uppercase'>Friends</span>
                        </Link>

                        <div className='text-xl text-red-500 uppercase mr-4'>{user?.login}</div>
                        <Link to={ PROFILE_ROUTE } className={ styles.icon }>
                            {user?.avatar ? <ImageIcon img={ user.avatar }/> : <ProfileIcon/>}
                        </Link>
                        <button className={ styles.logout } onClick={ handlerLogoutButton }>
                            <LogoutIcon/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
