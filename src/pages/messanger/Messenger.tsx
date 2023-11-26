import React, { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react'
import styles from './Messenger.module.scss'
import Layout from '../../components/layout/Layout.tsx'
import { useAppSelector } from '../../hooks/hooks.ts'
import { useConnectionSocket } from '../../hooks/useConnectSocket.ts'
import SocketApi from '../../api/socket-api.ts'
import { IMessageResponse } from '../../store/slice/types.ts'
import Message from './message/Message.tsx'
import SendMessageIcon from '../../components/icons/SendMessageIcon.tsx'
import { useToasts } from '../../hooks/useToasts.ts'
import { useMessageSocket } from '../../hooks/useMessageSocket.ts'
import WritingMessage from '../../components/loaders/writing-message/WritingMessage.tsx'


const Messenger: FC = () => {
    const [text, setText] = useState<string>('')
    const [messages, setMessages] = useState<IMessageResponse[]>([])
    const [mount, setMount] = useState<boolean>(false)
    const { user } = useAppSelector(state => state.auth)
    const { currentRecipient } = useAppSelector(state => state.messanger)
    const { showToastError } = useToasts()
    const { connectSocket, response, error, statusWriteMessage } = useConnectionSocket()
    const { setStatusWriteMessage, resetStatusWriteMessage } = useMessageSocket()


    const sendMessage = () => {
        if (text) {
            SocketApi.socket?.emit('send-message', {
                chatId: response?.chatId,
                content: text
            })
            setText('')
            resetStatusWriteMessage()
        }
    }

    const handlePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage()
        }

        if (response?.chatId && !statusWriteMessage.status) {
            setStatusWriteMessage(response?.chatId)
        }
    }

    useEffect(() => {
        setMount(true)
    }, [])


    useEffect(() => {
        if (mount && user && currentRecipient) {
            connectSocket({ id: user.id, recipientId: currentRecipient.id, token: user.accessToken })
        }
    }, [mount])

    const messagesRef: RefObject<HTMLElement> = useRef(null)

    useEffect(() => {
        if (messagesRef.current) {
            const el: HTMLElement = messagesRef.current
            el.scrollTop = el.scrollHeight
        }
    }, [response, messages, statusWriteMessage])


    useEffect(() => {
        if (response?.messages) {
            setMessages(response.messages)
        }
        // if (messagesRef.current) {
        //     const el: HTMLElement = messagesRef.current
        //     el.scrollTop = el.scrollHeight
        // }
    }, [messages, response])


    useEffect(() => {
        if (error) {
            showToastError(error)
        }
    }, [error])


    useEffect(() => {
    }, [statusWriteMessage.status])

    return (
        <Layout>
            <div className={ styles.wrapper }>
                <div className={ styles.content }>
                    <header className={ styles.recipient }>
                        <div className={ styles.login }>
                            {currentRecipient.login}
                            <span></span>
                        </div>
                        <div className={ styles.icon }>
                            {currentRecipient.avatar && <img src={ currentRecipient.avatar } alt="icon"/>}
                        </div>
                    </header>
                    <main className={ styles.area } ref={ messagesRef }>
                        {messages.map((message) =>
                            < Message
                                key={ message.id }
                                message={ message }
                                isMy={ message.user_id === user?.id }
                            />
                        )}
                        {(statusWriteMessage.status && statusWriteMessage.userId !== user?.id) &&
                            <div className={ styles.writing }>
                                <WritingMessage/>
                            </div>}
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
