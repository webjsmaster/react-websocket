import React, { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react'
import styles from './Messenger.module.scss'
import Layout from '../../components/layout/Layout.tsx'
import { useConnectionSocket } from '../../hooks/useConnectSocket.ts'
import SocketApi from '../../api/socket-api.ts'
import { useAppSelector } from '../../hooks/hooks.ts'
import Message from './message/Message.tsx'
import SendMessageIcon from '../../components/icons/SendMessageIcon.tsx'


const Messenger: FC = () => {
    const [text, setText] = useState<string>('')
    const { user } = useAppSelector(state => state.auth)
    const { currentFriend } = useAppSelector(state => state.messanger)
    const { message } = useConnectionSocket()

    const sendMessage = () => {
        SocketApi.socket?.emit('server-path', { text, userId: user?.id, friendId: currentFriend.id })
        setText('')
    }

    const handlePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    const data = [
        {
            id: 1,
            from: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            to: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            message: 'Hello!'
        },
        {
            id: 2,
            from: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            to: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            message: 'И тебе не хворать!'
        },
        {
            id: 3,
            from: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            to: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            message: 'Как дела?'
        },
        {
            id: 4,
            from: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            to: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            message: 'Все хорошо, а утебя как?'
        },
        {
            id: 5,
            from: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            to: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            message: 'Да все отлично купил новую тачку'
        },
        {
            id: 6,
            from: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            to: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            message: 'А я дом себе построил, приходи смотреть)!'
        },
        {
            id: 7,
            from: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            to: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            message: 'Как дела?'
        },
        {
            id: 8,
            from: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            to: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            message: 'Все хорошо, а утебя как?'
        },
        {
            id: 9,
            from: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            to: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            message: 'Да все отлично купил новую тачку'
        },
        {
            id: 10,
            from: 'f332e2e6-e8ac-4c98-a15b-dde089c06080',
            to: 'a2495f22-8048-47e5-bb37-9ff2efb89aad', //user
            message: 'А я дом себе построил, приходи смотреть)!'
        }
    ]


    const messagesRef: RefObject<HTMLElement> = useRef(null)


    useEffect(() => {
        if (messagesRef.current) {
            const el: HTMLElement = messagesRef.current
            el.scrollTop = el.scrollHeight
        }
    }, [data])

    return (
        <Layout>
            <div className={ styles.wrapper }>
                <div className={ styles.content }>
                    <nav className={ styles.navigation }>
                        {message}
                    </nav>
                    <main className={ styles.area } ref={ messagesRef }>
                        {data.map((d) =>
                            <Message key={ d.id } message={ d.message } isMy={ d.from === user?.id }/>
                        )}
                    </main>
                    <footer className={ styles.footer }>
                        <div className={ styles.footerBlock }>
                            <input type="text"
                                value={ text }
                                onChange={ (e: ChangeEvent<HTMLInputElement>) =>
                                    setText(e.currentTarget.value) }
                                onKeyUp={ (e: React.KeyboardEvent<HTMLInputElement>) => handlePressKey(e) }
                            />
                            <button className={ styles.button } onClick={ sendMessage }>
                                <SendMessageIcon/>
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </Layout>
    )
}

export default Messenger
