import { useEffect, useState } from 'react'
import SocketApi from '../api/socket-api.ts'


export const useMessageSocket = () => {
    const [status, setStatus] = useState<boolean>(false)
    const [chatId, setChatId] = useState<string>('')

    const setStatusWriteMessage = (chat: string) => {
        setChatId(chat)
        if (status) {
            return
        } else {
            setStatus(true)
            setTimeout(() => {
                setStatus(false)
            }, 3000)
        }
    }

    const resetStatusWriteMessage = () => {
        setStatus(false)
    }

    useEffect(() => {
        if (chatId) {
            console.log('[23] 🌻: ')
            SocketApi.socket?.emit('writing-message', { chatId, status })
        }
    }, [status, chatId])

    return { setStatusWriteMessage, resetStatusWriteMessage }
}
